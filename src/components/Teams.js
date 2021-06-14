import React from 'react';

const Teams = ({ teams }) => {
    return teams.map((team, index) => (
        <React.Fragment key={index}>
            <br />
            {team.map(pokemon => (
                <React.Fragment key={pokemon.pokemon}>
                    <p>{pokemon.pokemon}</p>
                    <img src={pokemon.sprite} />
                </React.Fragment>
            ))}
            <br />
        </React.Fragment>
    ))
}

export default Teams;