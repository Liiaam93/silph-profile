import React from "react"; // react dependencies

const Stats = ({ playerStats, teamStats }) => {
  // create Teams component
  return  (
  <div>
    {teamStats.Name}{teamStats.Logo}{teamStats.WL}


  </div>
  )
};

export default Stats;
