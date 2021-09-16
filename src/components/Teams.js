import React from "react";

const Teams = ({ teams }) => {
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
                </div>
              </React.Fragment>
            ))}
        </div>
        <div>
          {team[0].wins && "Score: "} <br />{" "}
          {team[0].wins && team[0].wins + "-"}
          {team[0].wins && 3 - team[0].wins}
        </div>
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
