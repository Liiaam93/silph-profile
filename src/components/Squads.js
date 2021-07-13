import React from "react";

const Squads = ({ squad }) => {
  return (
    <React.Fragment>
      <br />
      <img src={squad.teamStats.logo} />
      <br />
      {squad.teamStats.name}
      <br />
      {squad.teamStats.wl}
    </React.Fragment>
  );
};

export default Squads;
