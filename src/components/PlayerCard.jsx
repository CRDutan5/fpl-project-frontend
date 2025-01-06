import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export default function PlayerCard({ player, isMyPlayer }) {
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

  const positionHashmap = {
    1: "Goalkeeper",
    2: "Defender",
    3: "Midfielder",
    4: "Forward",
  };

  return (
    // height: "100%"
    <Card
      style={{ width: "18rem" }}
      className={`${
        isMyPlayer ? "card-background" : "alt-card-background"
      } text-center`}
    >
      <Card.Body className="d-flex fw-bolder text-gray flex-column justify-content-between">
        <Card.Text className="fw-bolder">
          {`${player.data.first_name} ${player.data.second_name}`}
        </Card.Text>
        <Card.Img
          // className={isMyPlayer ? "card-background" : "alt-card-background"}
          style={{
            height: "150px",
            objectFit: "contain",
          }}
          src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.data.code}.png`}
        />
        <Card.Text className="mt-3">
          Team: {teamHashmap[player.data.team]}
        </Card.Text>
        <Card.Text>
          Position: {positionHashmap[player.data.element_type]}
        </Card.Text>
        <Card.Text>Cost: {[player.data.now_cost]}</Card.Text>
      </Card.Body>
      {/* <ListGroup>
        <ListGroup.Item>{teamHashmap[player.data.team]}</ListGroup.Item>
        <ListGroup.Item>
          Position: {positionHashmap[player.data.element_type]}
        </ListGroup.Item>
        <ListGroup.Item
          style={{ borderBottom: "none" }}
          className="d-flex justify-content-center my-auto"
        >
          Cost: {player.data.now_cost}
        </ListGroup.Item>
      </ListGroup> */}
    </Card>
  );
}
