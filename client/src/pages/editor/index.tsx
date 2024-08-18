import { Controlled as CodeMirror } from "react-codemirror2";

import { ClipboardCopy, LogOut, Play } from "lucide-react";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

const Editor = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-right justify-end gap-4 pt-16">
        <div className="">
          <CopyToClipboard text={"Test"}>
            <button className="flex gap-2 w-full text-orange bg-black py-2 px-4 rounded-lg">
              Copy room ID <ClipboardCopy size={20} />
            </button>
          </CopyToClipboard>
        </div>
        <select
          className="text-orange bg-black p-2 rounded-lg"
          defaultValue={"nodejs"}
        >
          <option value={"nodejs"}>JavaScript</option>
          <option value={"python2"}>Python 2</option>
          <option value={"python3"}>Python 3</option>
          <option value={"php"}>PHP</option>
        </select>
        <button className="text-orange bg-black p-2 rounded-lg">
          <LogOut />
        </button>
      </div>
      <div className="mt-4">
        <CodeMirror
          value={"test"}
          options={{
            lineWrapping: true,
            lint: true,
            mode: "javascript",
            lineNumbers: true,
            theme: "material",
          }}
          onBeforeChange={(editor, data, value) => {
            console.log(editor, data, value);
          }}
        />
        <div className="bg-black px-2 pt-2">
          <button className="flex gap-2 text-white bg-green py-2 px-4 rounded-lg">
            <Play className="fill-white" /> Run
          </button>

          <div
            dangerouslySetInnerHTML={{
              __html: "test".replace(/(\\n)/gm, "<br />").replace(/(")/gm, ""),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
