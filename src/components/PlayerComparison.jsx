import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayers } from "../context/PlayersProvider";
import { Col, Container, Row } from "react-bootstrap";
import PlayerCard from "./PlayerCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

export default function PlayerComparison() {
  const { id, altid } = useParams();
  const { altPlayers, myPlayers, findPlayer, fetchPlayersHistory } =
    usePlayers();
  const [altPlayer, setAltPlayer] = useState(null);
  const [myPlayer, setMyPlayer] = useState(null);

  useEffect(() => {
    if (altPlayers.length > 0) {
      const foundPlayer = findPlayer(+altid, "alts");
      setAltPlayer(foundPlayer);
    }
  }, [altPlayers, altid]);

  useEffect(() => {
    if (myPlayers.length > 0) {
      const foundPlayer = findPlayer(+id, "team");
      setMyPlayer(foundPlayer);
    }
  }, [myPlayers, id]);

  useEffect(() => {
    if (altPlayer && myPlayer) {
      fetchPlayersHistory(myPlayer.id, altPlayer.id);
    }
  }, [altPlayer, myPlayer]);

  if (!altPlayer || !myPlayer) {
    return <div>Loading...</div>;
  }

  const lineData = {
    labels: ["Game 1", "Game 2", "Game 3"], // Dummy labels for games
    datasets: [
      {
        label: "Player 1",
        data: [12, 19, 3], // Dummy data for Player 1
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Player 2",
        data: [6, 12, 8], // Dummy data for Player 2
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Container style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Row
        className="justify-content-start align-items-start"
        style={{ minHeight: "100vh" }}
      >
        <Col className="d-flex justify-content-start align-items-center">
          <PlayerCard player={myPlayer} />
        </Col>
        {lineData && (
          <Col>
            <Line data={lineData} height={5} width={10} />
          </Col>
        )}

        <Col className="d-flex justify-content-start align-items-center">
          <PlayerCard player={altPlayer} />
        </Col>
      </Row>
    </Container>
  );
}
