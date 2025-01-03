import React, { useEffect, useState } from "react";
import { PlayersProvider, usePlayers } from "./context/PlayersProvider";
import MyPlayersList from "./components/MyPlayersList";
import UserNavbar from "./components/UserNavbar";
import { Route, Routes } from "react-router-dom";
import PlayerComparison from "./components/PlayerComparison";

const App = () => {
  return (
    <PlayersProvider>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<MyPlayersList />} />
        <Route
          path="/playerComparison/player/:id/altPlayer/:altid"
          element={<PlayerComparison />}
        />
      </Routes>
    </PlayersProvider>
  );
};

export default App;
