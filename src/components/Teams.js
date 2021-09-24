import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "lodash";

const Teams = ({ trainerData }) => {
  const [league, setLeague] = useState("default");
  const [moves, setMoves] = useState([]);

  if (!trainerData) {
    return null;
  }
  const monArr = trainerData.slice(1).map((team) => team.pokemon.toLowerCase());

  const copyPVP = () => {
    let copyText = "";
    for (let i = 0; i < 6; i++) {
      copyText += monArr[i] + ",";
      copyText += moves[monArr[i]].Recommended_Moves[0] + ",";
      copyText += moves[monArr[i]].Recommended_Moves[1] + ",";
      copyText += moves[monArr[i]].Recommended_Moves[2] + "\n";
    }
    copyText = copyText.slice(0, copyText.length - 1);
    navigator.clipboard.writeText(copyText);
    alert("copied!");
  };

  function handleChange(e) {
    setLeague(e.target.value);
  }
  useEffect(() => {
    if (league === "default") return;
    const getMoves = async () => {
      const req = await fetch(`/api/move-data/${league}`);
      const json = await req.json();
      setMoves(json);
    };
    getMoves();
  }, [league]);

  let pokemap = trainerData.slice(1).map((team, index) => (
    <div class="child" id={index}>
      <img src={team.sprite} />
      <br />
      {team.pokemon}
      <br />
      <span style={{ fontSize: "smaller" }}>
        {get(moves, `[${team.pokemon.toLowerCase()}].Recommended_Moves[0]`)}
        <br />
        {get(moves, `[${team.pokemon.toLowerCase()}].Recommended_Moves[1]`)}
        <br />
        {get(moves, `[${team.pokemon.toLowerCase()}].Recommended_Moves[2]`)}
      </span>
    </div>
  ));
  return (
    <>
      <div className="MainDiv">
        {trainerData[0].bout}
        <br />
        {trainerData[0].role}
        <div className="container">{pokemap}</div>
        {trainerData[0].wins && "Score:"}
        <br />
        {trainerData[0].wins &&
          trainerData[0].wins + "-" + (3 - trainerData[0].wins)}
        <br />
        <select value={league} onChange={handleChange}>
          <option value="default">Select League to show moves</option>
          <option value="Great">Great</option>
          <option value="Ultra">Ultra</option>
          <option value="Master">Master</option>
          <option value="Dungeon">Dungeon</option>
          <option value="Nightfall">Nightfall</option>
        </select>
        {league !== "default" && (
          <button onClick={() => copyPVP()}>Copy PVPOKE Export</button>
        )}
        <br />
        <br />
      </div>
    </>
  );
};

export default Teams;
