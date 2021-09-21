import { useState } from "react";

const Moves = ({ monz }) => {
  const [moves, setMoves] = useState([]);
  const [league, setLeague] = useState("default");

  const getMoves = async () => {
    const req = await fetch(`/api/move-data/${league}`);
    const json = await req.json();
    setMoves(json);
  };

  function handleChange(e) {
    setLeague(e.target.value);
  }

  return (
    <>
      <select value={league} onChange={handleChange}>
        <option value="default" selected disabled hidden>
          Pick a league
        </option>
        <option value="Great">Great</option>
        <option value="Ultra">Ultra</option>
        <option value="Master">Master</option>
        <option value="Field">Field</option>
      </select>
      <button onClick={getMoves}>Click</button>
      <p>{moves.length < 5 && moves[monz[0].Fast_Moves]}</p>
    </>
  );
};
export default Moves;
