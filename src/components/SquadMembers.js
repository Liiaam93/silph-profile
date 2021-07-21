import React, { useEffect, useState } from "react";
import Teams from "./Teams";
/*                <button
value={stats.player}
onClick={() => loadStats(stats.player)}
>
{stats.player}
</button>
*/

const SquadMembers = ({ squadz }) => {
  const [teams, setTeams] = useState([]);

  const loadStats = async (player) => {
    document.getElementsByClassName("player-container").innerHTML = "";
    setTeams([]);
    const req = await fetch(`/api/player/${player}`);
    const json = await req.json();
    setTeams(json);
    return <Teams teams={teams} />;
  };

  if (!squadz.teamStats) {
    return null;
  }
  let member = squadz.playerStats;

  return member.map((player, index) => (
    <>
      {" "}
      <React.Fragment key={index}>
        <br />{" "}
        <div>
          <br />
          {player.map((stats, idx) => (
            <React.Fragment key={stats.player}>
              <div class="flex-child">
                <button id={"btn" + index} value={stats.player}>
                  {stats.player}
                </button>
                <p>{stats.role}</p>
                <p>{stats.win_rate}</p>
                <p>{stats.matches}</p>
                <p>{stats.total_battles} Total Battles</p>
                <p>{stats.score} / Points Earned</p>
              </div>
            </React.Fragment>
          ))}
        </div>
        <br />
      </React.Fragment>
    </>
  ));
};

export default SquadMembers;
