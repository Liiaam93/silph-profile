import React from "react";

const SquadMembers = ({ squadz }) => {
  if (!squadz.teamStats) {
    return null;
  }
  let member = squadz.playerStats;

  return member.map((player, index) => (
    <React.Fragment key={index}>
      <br />{" "}
      <div>
        <br />
        {player.map((stats) => (
          <React.Fragment key={stats.player}>
            <div>{stats.player}</div>
            <br /> <div>{stats.role}</div>
            <div>
              <p>{stats.win_rate}</p>
              <p>{stats.matches}</p>
              <p>{stats.score}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <br />
    </React.Fragment>
  ));
};

export default SquadMembers;
