import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateRoomButton = () => {
  const navigate = useNavigate();
  const createRoom = () => {
    const newRoom = uuidv4();
    navigate(`/editor/${newRoom}`);
  };
  return (
    <button
      className="px-16 md:px-40 py-2 rounded-3xl md:text-2xl font-bold bg-orange"
      onClick={createRoom}
    >
      Create Code Room
    </button>
  );
};

export default CreateRoomButton;
