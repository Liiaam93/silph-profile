import React, { useEffect, useState } from "react";
import Teams from "./Teams";
import { atom, useRecoilState } from "recoil";

import { teamz } from "../pages";

const SquadMembers = ({ squadz }) => {
  const [teams, setTeams] = useRecoilState(teamz);
  const [loading, setLoading] = useState(false);

  const loadStats = async (player) => {
    setTeams([]);
    setLoading(true);
    const req = await fetch(`/api/player/${player}`);
    const json = await req.json();
    setTeams(json);
    setLoading(false);
    window.scrollTo(0, 0);
    return <Teams teams={teams} />;
  };

  if (!squadz.teamStats) {
    return null;
  }

  let member = squadz.playerStats;

  let squadMap = member.map((player, index) => (
    <>
      {" "}
      <React.Fragment key={index}>
        <br />
        <div>
          <br />
          {player.map((stats, idx) => (
            <React.Fragment key={stats.player}>
              <div className="squad-child">
                <button
                  className="player-button"
                  id={"btn" + index}
                  value={stats.player}
                  onClick={() => loadStats(stats.player)}
                >
                  {stats.player}
                </button>
                <p>Role: {stats.role.replace(" Specialist", "")}</p>
                <p>Win Rate: {stats.win_rate}</p>
                <p>Bouts Played: {stats.matches}</p>
                <p>Total Battles: {stats.total_battles} </p>
                <p>Points Earned: {stats.score}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
        <br />
      </React.Fragment>
    </>
  ));
  return (
    <>
      {loading && <div className="load"></div>}
      <div className="squad">{squadMap}</div>
    </>
  );
};

export default SquadMembers;
