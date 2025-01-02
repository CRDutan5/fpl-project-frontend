import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export default function PlayerCard({ player }) {
  const teamHashmap = {
    1: "Arsenal",
    2: "Aston Villa",
    3: "Bournemouth",
    4: "Brentford",
    5: "Brighton & Hove Albion",
    6: "Chelsea",
    7: "Crystal Palace",
    8: "Everton",
    9: "Fulham",
    10: "Ipswich Town",
    11: "Leicester City",
    12: "Liverpool FC",
    13: "Manchester City",
    14: "Manchester United",
    15: "Newcastle United FC",
    16: "Nottingham Forest",
    17: "Southampton",
    18: "Tottenham Hotspur",
    19: "West Ham United",
    20: "Wolverhampton Wanderers",
  };

  return (
    <Card style={{ width: "18rem", height: "100%" }} className="text-center">
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Text>
          {`${player.data.first_name} ${player.data.second_name}`}
        </Card.Text>
        <Card.Img
          style={{ height: "150px", objectFit: "contain" }}
          src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.data.code}.png`}
        />
      </Card.Body>
      <ListGroup className="flex-grow-1">
        <ListGroup.Item>{teamHashmap[player.data.team]}</ListGroup.Item>
        <ListGroup.Item>Goals: {player.data.goals_scored}</ListGroup.Item>
        <ListGroup.Item>Assists: {player.data.assists}</ListGroup.Item>
        <ListGroup.Item>Form: {player.data.form}</ListGroup.Item>
        <ListGroup.Item>Cost: {player.data.now_cost}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
