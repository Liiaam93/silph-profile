import React from "react";

const SquadData = ({ squadz }) => {
  if (!squadz.teamStats) {
    return null;
  }
  return (
    <>
      <div class="teamData">
        <h2>{squadz.teamStats.name}</h2>
        <img src={squadz.teamStats.logo}></img>
        <br />
        {squadz.teamStats.wl}
        <br />
      </div>
    </>
  );
};

export default SquadData;
