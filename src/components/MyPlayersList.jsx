import React, { useState } from "react";
import { usePlayers } from "../context/PlayersProvider";
import { Col, Container, Row, Table } from "react-bootstrap";
import "../index.css";
import AlternativePlayers from "./AlternativePlayers";

export default function MyPlayersList() {
  const { myPlayers } = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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

  console.log(selectedPlayer);

  return (
    <Container fluid className="p-4">
      <Row className="gy-4">
        <Col xs={12} className="d-flex justify-content-center">
          <div className="w-100">
            <div>
              <h1 className="text-start fw-semibold fs-5 bg-dark text-white m-0 p-3">
                Current Team:
              </h1>
            </div>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table className="w-100" hover>
                <thead className="sticky-top">
                  <tr className="custom-neon-green">
                    <th>#</th>
                    <th colSpan={2}>Player</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {myPlayers &&
                    myPlayers.map((player, index) => (
                      <tr
                        key={index}
                        className="custom-hover"
                        onClick={() => setSelectedPlayer(player)}
                      >
                        <td className="bg-dark text-white">{index + 1}</td>
                        <td className="bg-dark">
                          <img
                            src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.data.code}.png`}
                            alt="Player"
                            className="img-fluid custom-player-img"
                            style={{
                              height: "75px",
                              maxWidth: "75px",
                              objectFit: "contain",
                            }}
                          />
                        </td>
                        <td className="bg-dark text-white fw-semibold">{`${player.data.first_name} ${player.data.second_name}`}</td>
                        <td className="bg-dark text-white fw-semibold">
                          {teamHashmap[player.data.team]}
                        </td>
                        <td className="bg-dark text-white fw-semibold">
                          {positionHashmap[player.data.element_type]}
                        </td>
                        <td className="bg-dark text-white fw-semibold">
                          Cost: {player.data.now_cost}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
        <Col xs={12} className="d-flex justify-content-center">
          {selectedPlayer ? (
            <AlternativePlayers selectedPlayer={selectedPlayer} />
          ) : (
            <div
              className="p-4 border rounded bg-light w-100 border border-5"
              // style={{ maxWidth: "800px" }}
            >
              <h4>Extra Information</h4>
              <p>Select a player to view better alternatives!</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
