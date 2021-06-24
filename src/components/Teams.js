import React from "react"; // react dependencies

const Teams = ({ teams }) => {
  // create Teams component
  return teams.map((team, index) => (
    <React.Fragment key={index}>
      <br />{" "}
      <div class="container">
        {team.map((pokemon) => (
          <React.Fragment key={pokemon.pokemon}>
            <br /> <div class="bout">{pokemon.bout}</div>
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
