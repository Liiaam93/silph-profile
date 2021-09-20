import React from "react";
import { useState } from "react";

const Teams = ({ teams }) => {

  const getMoves = async () => {
    const req = await fetch(`/api/move-data/${league}`);
    const json = await req.json();
    setMoves(json);
  }

  const [league, setLeague] = useState('default');
  const [moves, setMoves] = useState([]);

  function handleChange(e) {
    setLeague(e.target.value);
  }

  let pokemap = teams.slice(1).map((team, index) => (
    <React.Fragment key={index}>
      <div className="MainDiv">
        {" "}
        <div>{team[0].bout}</div>{" "}
        <div class="container">
          <br />
          {Array.isArray(team) &&
            team.slice(1).map((pokemon) => (
              <React.Fragment key={pokemon.pokemon}>
                <div class="child">
                  <img src={pokemon.sprite} />
                  <p>{pokemon.pokemon}</p>
                  {moves && moves.pokemon.pokemon.toLowerCase().Recommended_Moves[0]}
                </div>
              </React.Fragment>
            ))}
        </div>
        <div>
          {team[0].wins && "Score: "} <br />{" "}
          {team[0].wins && team[0].wins + "-"}
          {team[0].wins && 3 - team[0].wins}
        </div>
        <select value={league} onChange={handleChange}>
          <option value='Great'></option>
          <option value='Ultra'></option>
          <option value='Master'></option>
          <option value='Field'></option>
        </select>
      </div>
    </React.Fragment>
  ));
  if (!teams[0]) {
    return null;
  }
  return (
    <>
      <div className="bold">Win Rate: {teams[0].winrate}%</div>
      <div>{pokemap}</div>{" "}
    </>
  );
};

export default Teams;
