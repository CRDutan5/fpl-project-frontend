import React, { useEffect, useState } from "react";
import { PlayersProvider, usePlayers } from "./context/PlayersProvider";
import MyPlayersList from "./components/MyPlayersList";

const App = () => {
  return (
    <PlayersProvider>
      <MyPlayersList />
    </PlayersProvider>
  );
};

export default App;
