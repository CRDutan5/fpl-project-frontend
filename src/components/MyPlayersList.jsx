import React from "react";
import { usePlayers } from "../context/PlayersProvider";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import PlayerCard from "./PlayerCard";

export default function MyPlayersList() {
  const { myPlayers } = usePlayers();

  return (
    <Container fluid>
      {myPlayers &&
        myPlayers.map((player) => (
          <Row
            className="d-flex flex-wrap"
            key={player.id}
            style={{ margin: "80px 0" }}
          >
            <Col>
              <PlayerCard player={player} />
            </Col>
            <Col className="d-flex" style={{ minHeight: "fit-content" }}>
              {player.alts
                ? player.alts.map((altPlayer) => (
                    <Col key={altPlayer.id}>
                      <PlayerCard player={altPlayer} />
                    </Col>
                  ))
                : "No Alternatives!"}
            </Col>
          </Row>
        ))}
    </Container>
  );
}
