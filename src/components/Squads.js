import React from "react";

const Squads = ({ teamStats }) => {
  return (
    <React.Fragment>
      <img src={teamStats.logo} />
    </React.Fragment>
  );
};

export default Squads;
