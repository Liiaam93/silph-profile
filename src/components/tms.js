import React from "react";
import { useState } from "react";
import { get } from "lodash";

const Teams = ({ teams }) => {
  if (!teams) {
    return null;
  }
  const [moves, setMoves] = useState([]);
  const [movez, setMovez] = useState(false);
  const [league, setLeague] = useState("default");

  function handleChange(e) {
    setMoves([]);
    setLeague(e.target.value);
  }

  const getMoves = async () => {
    const req = await fetch(`/api/move-data/${league}`);
    const json = await req.json();
    setMoves(json);
    setMovez(true);
  };

  let pokemap = teams.slice(1).map((team, index) => (
    <React.Fragment key={index}>
      <div className="MainDiv">
        {" "}
        <div>{team[0].bout}</div>{" "}
        <div class="container" id={index + 1}>
          <br />
          {Array.isArray(team) &&
            team.slice(1).map((pokemon) => (
              <React.Fragment key={pokemon.pokemon}>
                <div class="child">
                  <img src={pokemon.sprite} />
                  <p>{pokemon.pokemon}</p>{" "}
                  <div>
                    {movez &&
                      moves[pokemon.pokemon.toLowerCase()].Recommended_Moves[0]}
                    {/*
                    {moves &&
                      moves[pokemon.pokemon.toLowerCase()].Recommended_Moves[0]}
                  </div>  
                  <div>
                    {moves &&
                      moves[pokemon.pokemon.toLowerCase()].Recommended_Moves[1]}
                    <div>
                      {moves &&
                        moves[pokemon.pokemon.toLowerCase()]
                      .Recommended_Moves[2]} 
                      
                    </div> */}
                  </div>
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
          <option value="default" selected disabled hidden>
            Pick a league
          </option>
          <option value="Great">Great</option>
          <option value="Ultra">Ultra</option>
          <option value="Master">Master</option>
          <option value="Field">Field</option>
        </select>
        <button onClick={getMoves}>Generate Moves</button>
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
