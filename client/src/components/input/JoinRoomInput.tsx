import React from "react";

const JoinRoomInput = () => {
  return (
    <div className="flex mt-2">
      <input type="text" className="px-8 rounded-l text-black" />
      <button className="bg-orange text-white rounded-r font-bold px-2 py-3 text-sm">
        Join Room
      </button>
    </div>
  );
};

export default JoinRoomInput;
