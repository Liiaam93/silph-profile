import React from "react"; // react dependencies
import { getTeam } from "../utils/squadapi";

const Squads = () => {
  let data = getTeam();
  let name = data.teamStats.Name;
  return (
    <React.Fragment>
      <br />{" "}
      <div class="container">
        <React.Fragment>
          <br /> <div class="bout">{name}</div>
          <div class="child"></div>
        </React.Fragment>
        ))
      </div>
      <br />
    </React.Fragment>
  );
};

export default Squads;
