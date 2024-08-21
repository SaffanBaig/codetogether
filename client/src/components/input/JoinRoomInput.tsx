import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const JoinRoomInput = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const joinRoom = () => {
    if (!roomId) {
      toast.error("Please enter room id");
      return;
    }
    navigate(`/editor/${roomId}`);
  };
  return (
    <div className="flex mt-2">
      <Toaster />
      <input
        type="text"
        className="px-8 rounded-l text-black"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        className="bg-orange text-white rounded-r font-bold px-2 py-3 text-sm"
        onClick={joinRoom}
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoomInput;
