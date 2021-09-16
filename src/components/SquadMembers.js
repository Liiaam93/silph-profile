import React, { useEffect, useState } from "react";
import Teams from "./Teams";

const SquadMembers = ({ squadz }) => {
  const [teams, setTeams] = useState([]);

  const loadStats = async (player) => {
    setTeams([]);
    const req = await fetch(`/api/player/${player}`);
    const json = await req.json();
    setTeams(json);
  };

  if (!squadz.teamStats) {
    return null;
  }

  let member = squadz.playerStats;

  let squadMap = member.map((player, index) => (
    <>
      {" "}
      <React.Fragment key={index}>
        <br />{" "}
        <div>
          <br />
          {player.map((stats, idx) => (
            <React.Fragment key={stats.player}>
              <div className="squad-child">
                <button
                  id={"btn" + index}
                  value={stats.player}
                  onClick={() => loadStats(stats.player)}
                >
                  {stats.player}
                </button>
                <p>{stats.role}</p>
                <p>{stats.win_rate}</p>
                <p>{stats.matches}</p>
                <p>{stats.total_battles} Total Battles</p>
                <p>{stats.score}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
        <br />
      </React.Fragment>
    </>
  ));
  return (<Teams teams={teams} />), (<div className="squad">{squadMap}</div>);
};

export default SquadMembers;
