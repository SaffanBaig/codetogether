import { Controlled as CodeMirror } from "react-codemirror2";

import { ClipboardCopy, LoaderCircle, LogOut, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { useSocket } from "../../context/socket";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Editor = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const [code, setCode] = useState<string>("");
  const [codeResponse, setCodeResponse] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [languageCode, setLanguageCode] = useState("nodejs");
  const navigate = useNavigate();

  useEffect(() => {
    if (roomId) {
      socket.emit("join-room", roomId);
      socket.on("code-typed", (data) => {
        setCode(data);
      });
      socket.on("retrieve-data", (data) => {
        setCode(data);
      });
      return () => {
        socket.emit("leave-room", roomId);
      };
    }
  }, [roomId, socket]);

  const handleChange = (val: string) => {
    setCode(val);
    socket.emit("code-typed", val);
  };

  const executeCode = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}execute`,
        {
          code,
          language_code: languageCode,
        }
      );

      if (res.data) {
        if (res.data.type === "error") {
          setIsError(true);
          setCodeResponse(JSON.stringify(res.data.data) || "");
        } else {
          setIsError(false);
          let consoleOutputRaw = JSON.stringify(res.data.data) || "";
          consoleOutputRaw.replace(/(\r\n|\r|"|\\n)/gm, "");
          setCodeResponse(consoleOutputRaw);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-right justify-end gap-4 pt-16">
        <div className="">
          {roomId && (
            <CopyToClipboard text={roomId}>
              <button className="flex gap-2 w-full text-orange bg-black py-2 px-4 rounded-lg">
                Copy room ID <ClipboardCopy size={20} />
              </button>
            </CopyToClipboard>
          )}
        </div>
        <div>
          <select
            className="text-orange bg-black p-2 rounded-lg"
            defaultValue={"nodejs"}
            onChange={(e) => setLanguageCode(e.target.value)}
          >
            <option value={"nodejs"}>JavaScript</option>
            <option value={"python2"}>Python 2</option>
            <option value={"python3"}>Python 3</option>
            <option value={"php"}>PHP</option>
          </select>
        </div>
        <div>
          <button
            className="text-orange bg-black p-2 rounded-lg"
            onClick={() => navigate("/")}
          >
            <LogOut />
          </button>
        </div>
      </div>

      <div className="mt-4 min-h-[60vh]">
        <CodeMirror
          className="h-full"
          value={code}
          options={{
            lineWrapping: true,
            lint: true,
            mode: "javascript",
            lineNumbers: true,
            theme: "material",
          }}
          onBeforeChange={(editor, data, value) => {
            handleChange(value);
          }}
        />
        <div className="bg-black px-4 py-4">
          <button
            className="flex gap-2 text-white bg-green py-2 px-4 rounded-lg"
            onClick={executeCode}
          >
            <Play className="fill-white" /> Run
          </button>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <LoaderCircle />
              </svg>
            </div>
          ) : (
            <div
              className={
                !isError
                  ? "flex text-white mt-4 text-2xl overflow-y-auto max-h-[80px]"
                  : "flex text-red mt-4 text-2xl overflow-y-auto max-h-[80px]"
              }
              dangerouslySetInnerHTML={{
                __html: codeResponse
                  .replace(/(\\n)/gm, "<br />")
                  .replace(/(")/gm, ""),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
