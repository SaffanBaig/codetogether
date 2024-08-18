import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "../pages/lobby";
import Editor from "../pages/editor";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/editor/:roomId" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
