import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";

const App = () => {
  const team_id_key = import.meta.env.VITE_MY_TEAM_ID;

  const [myPlayers, setMyPlayers] = useState();

  const [goalkeepers, setGoalkeepers] = useState();
  const [defenders, setDefenders] = useState();
  const [midfielders, setMidfielders] = useState();
  const [forwards, setForwards] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/team/${team_id_key}/alternatives`)
      .then((res) => res.json())
      .then((data) => {
        setMyPlayers(data);
        setGoalkeepers(data.goalkeepers);
        setDefenders(data.defenders);
        setMidfielders(data.midfielders);
        setForwards(data.forwards);
      });
  }, []);
  // console.log(defenders);
  return (
    <div className="">
      {/* Goalkeepers */}
      <div>
        <div>
          <h1 className="text-3xl">Goalkeepers:</h1>
        </div>
        <div>
          {goalkeepers &&
            goalkeepers.map((player) => (
              <div key={player.my_player.id}>
                <PlayerCard player={player} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
