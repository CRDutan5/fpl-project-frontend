import React, { useEffect } from "react";

const App = () => {
  const team_id_key = import.meta.env.VITE_MY_TEAM_ID;

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/team/${team_id_key}/alternatives`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div className="">
      <h1>App</h1>
    </div>
  );
};

export default App;
