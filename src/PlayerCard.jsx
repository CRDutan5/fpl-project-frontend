import React, { useEffect, useState } from "react";

const PlayerCard = ({ player }) => {
  const playerImageURL = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.my_player.code}.png`;

  return (
    <div>
      <img src={playerImageURL} alt="" />
      <h1>{player.my_player.first_name}</h1>
    </div>
  );
};

export default PlayerCard;
