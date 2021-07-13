import React from "react";

const Squads = ({ squadz }) => {
  return (
    <React.Fragment>
      <br />
      <img src={squadz.teamStats.logo} />
      <br />
      {squadz.teamStats.name}
      <br />
      {squadz.teamStats.wl}
    </React.Fragment>
  );
};

export default Squads;
