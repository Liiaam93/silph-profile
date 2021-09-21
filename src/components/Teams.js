import React from "react";
import { useState } from "react";

const Teams = ({ trainerData }) => {
  if (!trainerData) {
    return null;
  }

  let pokemap = trainerData.slice(1).map((team, index) => (
    <div class="child" id={index}>
      <img src={team.sprite} />
      <br />
      {team.pokemon}
    </div>
  ));
  return (
    <>
      <div className="MainDiv">
        {trainerData[0].bout}
        <br />
        {trainerData[0].role}
        <div className="container">{pokemap}</div>
        {trainerData[0].wins && "Score:"}
        <br />
        {trainerData[0].wins &&
          trainerData[0].wins + "-" + (3 - trainerData[0].wins)}
      </div>
    </>
  );
};

export default Teams;
