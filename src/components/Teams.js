import React from "react";

const Teams = ({ teams }) => {
  return teams.map((team, index) => (
    <React.Fragment key={index}>
      <br />{" "}
      <div class="container">
        {team.map((pokemon) => (
          <React.Fragment key={pokemon.pokemon}>
            <div class="child">
              <img src={pokemon.sprite} />
              <p>{pokemon.pokemon}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <br />
    </React.Fragment>
  ));
};

export default Teams;
