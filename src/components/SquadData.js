import React from "react";

const SquadData = ({ squadz }) => {
  if (!squadz.teamStats) {
    return null;
  }
  return (
    <>
      <div>{squadz.teamStats.name}</div>
      <br />
      <img src={squadz.teamStats.logo}></img>
      <br />
      <p>{squadz.teamStats.wl}</p>
    </>
  );
};

export default SquadData;
