import React, { useContext, useEffect, useState } from "react";

const PlayersContext = React.createContext();

export function usePlayers() {
  return useContext(PlayersContext);
}

export function PlayersProvider({ children }) {
  const [myPlayers, setMyPlayers] = useState([]);
  const [altPlayers, setAltPlayers] = useState([]);
  const [playersHistory, setPlayersHistory] = useState([]);
  const [myPlayerHistory, setMyPlayerHistory] = useState();
  const [altPlayerHistory, setAltPlayerHistory] = useState();
  const teamId = import.meta.env.VITE_MY_TEAM_ID;

  function findPlayer(id, listType) {
    if (listType === "alts") {
      return altPlayers.find((player) => player.id === id);
    } else if (listType === "team") {
      return myPlayers.find((player) => player.id === id);
    }
  }

  const fetchPlayersHistory = async (playerId, altplayerId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/player/${playerId}/altplayer/${altplayerId}`
      );
      const data = await res.json();
      setPlayersHistory(data);
      setMyPlayerHistory(data[`${playerId}`]["history"]);
      setAltPlayerHistory(data[`${altplayerId}`]["history"]);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/team/${teamId}/alternatives`)
      .then((res) => res.json())
      .then((data) => {
        setMyPlayers(data.team);
        const allAltPlayers = data.team.reduce((acc, player) => {
          if (player.alts) {
            acc.push(...player.alts);
          }
          return acc;
        }, []);
        setAltPlayers(allAltPlayers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        myPlayers,
        altPlayers,
        findPlayer,
        fetchPlayersHistory,
        playersHistory,
        myPlayerHistory,
        altPlayerHistory,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}
