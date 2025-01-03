import React from "react";
import { usePlayers } from "../context/PlayersProvider";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import PlayerCard from "./PlayerCard";
import { Link } from "react-router-dom";

export default function MyPlayersList() {
  const { myPlayers } = usePlayers();

  return (
    <Container fluid className="">
      {myPlayers &&
        myPlayers.map((player) => (
          <Row
            className="d-flex flex-wrap"
            key={player.id}
            style={{ margin: "80px 0" }}
          >
            <Col className="">
              <PlayerCard player={player} />
            </Col>
            {/* {player.alts.length > 0 && (
              <Col className="d-flex align-items-center">
                Click on the following player to view an analysis
              </Col>
            )} */}

            <Col
              className="d-flex flex-wrap justify-content-space gap-3"
              style={{ minHeight: "fit-content" }}
            >
              {player.alts
                ? player.alts.map((altPlayer) => (
                    <Col
                      key={altPlayer.id}
                      className="d-flex flex-wrap justify-content-end column-gap-3"
                    >
                      <Link
                        to={`/playerComparison/player/${player.id}/altPlayer/${altPlayer.id}`}
                      >
                        <PlayerCard player={altPlayer} />
                      </Link>
                    </Col>
                  ))
                : "No Alternatives!"}
            </Col>
          </Row>
        ))}
    </Container>
  );
}
