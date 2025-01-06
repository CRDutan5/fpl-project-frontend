import React, { useEffect, useState } from "react";
import { PlayersProvider, usePlayers } from "./context/PlayersProvider";
import MyPlayersList from "./components/MyPlayersList";
import UserNavbar from "./components/UserNavbar";
import { Route, Routes } from "react-router-dom";
import PlayerComparison from "./components/PlayerComparison";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  return (
    // <Container fluid className="background" style={{ minHeight: "100vh" }}>
    //   <Row>
    //     {/* Sidebar (UserNavbar) */}
    //     <Col xs={2} className="bg-light">
    //       <UserNavbar />
    //     </Col>

    //     {/* Main content area */}
    //     <Col xs={9} className="flex-grow-1">
    //       <PlayersProvider>
    //         <Routes>
    //           <Route path="/" element={<MyPlayersList />} />
    //           <Route
    //             path="/playerComparison/player/:id/altPlayer/:altid"
    //             element={<PlayerComparison />}
    //           />
    //         </Routes>
    //       </PlayersProvider>
    //     </Col>
    //   </Row>
    // </Container>

    <Container
      className="background d-flex flex-column"
      fluid
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <UserNavbar />
      </Row>
      <PlayersProvider>
        {/* Potential sidebar??? */}
        {/* <UserNavbar /> */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MyPlayersList />} />
            <Route
              path="/playerComparison/player/:id/altPlayer/:altid"
              element={<PlayerComparison />}
            />
          </Routes>
        </div>
      </PlayersProvider>
    </Container>
  );
};

export default App;
