import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AlternativePlayers({ selectedPlayer }) {
  const [selectedPlayerAlts, setSelectedPlayerAlts] = useState([]);

  useEffect(() => {
    if (selectedPlayer) {
      setSelectedPlayerAlts(selectedPlayer.alts);
    }
  }, [selectedPlayer]);

  console.log(selectedPlayer);

  return (
    <Container
      className="p-4 border rounded glass bg-dark w-100 border border-1"
      fluid
    >
      {!selectedPlayerAlts && (
        <Row className="text-white gx-2">
          Click the player to compare their stats
        </Row>
      )}
      <Row className="d-flex justify-content-center align-items-center text-center">
        {selectedPlayerAlts.length > 0 ? (
          selectedPlayerAlts.map((altPlayer) => (
            <Col
              key={altPlayer.id}
              className="d-flex justify-content-center mb-4"
            >
              <Link
                to={`/playerComparison/player/${selectedPlayer.id}/altPlayer/${altPlayer.id}`}
              >
                <div className="card-wrapper">
                  <PlayerCard player={altPlayer} isMyPlayer={false} />
                </div>
              </Link>
            </Col>
          ))
        ) : (
          <Container className="text-white">No Valid Players</Container>
        )}
      </Row>
    </Container>
  );
}
