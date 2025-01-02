import React, { useContext, useEffect, useState } from "react";

const PlayersContext = React.createContext();

export function usePlayers() {
  return useContext(PlayersContext);
}

export function PlayersProvider({ children }) {
  const [myPlayers, setMyPlayers] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/team/7926142/alternatives`)
      .then((res) => res.json())
      .then((data) => setMyPlayers(data.team));
  }, []);

  return (
    <PlayersContext.Provider value={{ myPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
}
