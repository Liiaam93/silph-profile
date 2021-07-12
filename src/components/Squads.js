import React from "react";

const Squads = ({ squad }) => {
  console.log(squad);

  return (
    <React.Fragment>
      <br />
      <img src={squad[playerStats].player} />
      <br />
      {squad.teamStats}
      <br />
      {squad.teamStats}
    </React.Fragment>
  );
};

export default Squads;
