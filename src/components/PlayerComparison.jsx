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

import { Line } from "react-chartjs-2";

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
  const {
    altPlayers,
    myPlayers,
    findPlayer,
    fetchPlayersHistory,
    myPlayerHistory,
    altPlayerHistory,
  } = usePlayers();
  const [altPlayer, setAltPlayer] = useState(null);
  const [myPlayer, setMyPlayer] = useState(null);
  const [lineData, setLineData] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true, // Show the title
        text: "Player Goals Comparison", // Title text
        font: {
          size: 20, // Font size for the title
          weight: "bold", // Font weight
        },
        padding: {
          top: 10,
          bottom: 10,
        },
        color: "black", // Title color
      },
    },
  };

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

  useEffect(() => {
    if (myPlayerHistory && myPlayer && altPlayer && altPlayerHistory) {
      setLineData({
        labels: myPlayerHistory.map((week, index) => `Gameweek ${index + 1}`),
        datasets: [
          {
            label: `${myPlayer.data.first_name} ${myPlayer.data.second_name}`,
            data: myPlayerHistory.reduce((acc, week, index) => {
              if (index === 0) {
                acc.push(week.goals_scored);
              } else {
                acc.push(acc[index - 1] + week.goals_scored);
              }
              return acc;
            }, []),
            fill: false,
            borderColor: "#2360ef",
            tension: 0.1,
          },
          {
            label: `${altPlayer.data.first_name} ${altPlayer.data.second_name}`,
            data: altPlayerHistory.reduce((acc, week, index) => {
              if (index === 0) {
                acc.push(week.goals_scored);
              } else {
                acc.push(acc[index - 1] + week.goals_scored);
              }
              return acc;
            }, []),
            fill: false,
            borderColor: "#ee2d2d",
            tension: 0.1,
          },
        ],
      });
    }
  }, [myPlayerHistory, myPlayer, altPlayer, altPlayerHistory]);

  if (!altPlayer || !myPlayer || !lineData) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Row
        className="justify-content-start align-items-start"
        style={{ minHeight: "100vh" }}
      >
        <Col className="d-flex-col justify-content-center align-items-center">
          <PlayerCard player={myPlayer} isMyPlayer={true} />
          <Col className="bg-white d-flex-col flex-grow">
            <p>Points Per Game: {myPlayer.data.points_per_game}</p>
            <p>Points Per Game Rank: {myPlayer.data.points_per_game_rank}</p>
            <p>Selected By: {myPlayer.data.selected_by_percent}%</p>
            <p>Total Points: {myPlayer.data.total_points}</p>
          </Col>
        </Col>
        {myPlayerHistory && myPlayer && altPlayer && altPlayerHistory && (
          <Col className="d-flex justify-content-center align-items-center bg-white">
            <Line data={lineData} height={3} width={5} options={options} />
          </Col>
        )}

        <Col className="d-flex-col justify-content-center align-items-center">
          <PlayerCard player={altPlayer} isMyPlayer={false} />
          <Col className="bg-white d-flex-col flex-grow">
            <p>Points Per Game: {altPlayer.data.points_per_game}</p>
            <p>Points Per Game Rank: {altPlayer.data.points_per_game_rank}</p>
            <p>Selected By: {altPlayer.data.selected_by_percent}%</p>
            <p>Total Points: {altPlayer.data.total_points}</p>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
