import React from "react";
import CreateRoomButton from "../../components/buttons/CreateRoomButton";
import JoinRoomInput from "../../components/input/JoinRoomInput";

const Lobby = () => {
  return (
    <div className="h-screen flex flex-col items-center py-16  md:py-16 text-white">
      <div className="w-max px-2 py-4 md:py-8">
        <h1 className="text-4xl md:text-8xl font-bold animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-1 text-white font-bold">
          CODE TOGETHER
        </h1>
      </div>
      <p className="text-xl md:text-3xl text-pretty w-[80%] break-words text-center">
        Code and collborate live together without any hassle of language setup.
      </p>
      <div className="mt-40 md:mt-40">
        <CreateRoomButton />
      </div>
      <p className="mt-8 md:mt-16 text-xl md:text-3xl text-pretty w-[80%] break-words text-center">
        Join Existing Room
      </p>
      <div>
        <JoinRoomInput />
      </div>
    </div>
  );
};

export default Lobby;
