import Head from "next/head";
import React, { useState } from "react";
import Teams from "../components/Teams";
import styles from "../../styles/Home.module.css";
import SquadMembers from "../components/SquadMembers";
import SquadData from "../components/SquadData";
import { atom, useRecoilState } from "recoil";
import { factions } from "../utils/model/Factions";
import { size } from "lodash";

export const teamz = atom({
  key: "teamz",
  default: [],
});

export default function Home() {
  const [trainerData, setTeams] = useRecoilState(teamz);
  const [squads, setSquads] = useState([]);
  const [player, setPlayer] = useState("");
  const [squad, setSquad] = useState("default");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setSquad(e.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      loadPeople();
    }
  };
  const loadPeople = async () => {
    setLoading(true);
    const req = await fetch(`/api/player/${player}`);
    const json = await req.json();
    setTeams(json);
    setLoading(false);
  };

  const loadSquad = async () => {
    setLoading(true);
    const req = await fetch(`/api/squad/${squad}`);
    const json = await req.json();
    setSquads(json);
    setLoading(false);
    setTeams([]);
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>YEEEEET</title>
        <meta name="tool of tools" content="Made by Liiiaaam93" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Silph Team Finder</h1>
        <div>
          <select value={squad} className="input-box" onChange={handleChange}>
            <option value="default" selected disabled hidden>
              Choose a Team
            </option>
            {Object.keys(factions).map((key) => (
              <option value={key}>{factions[key]}</option>
            ))}
          </select>{" "}
          <button className="index-button" onClick={() => loadSquad()}>
            Load Team
          </button>
          <p>
            <input
              value={player}
              id="player"
              className="input-box"
              placeholder="... or type a Trainer Name"
              onDoubleClick={(e) => (e.target.value = "")}
              onChange={(e) => setPlayer(e.target.value)}
            />{" "}
            <button
              className="index-button"
              onClick={() => loadPeople()}
              id="pbtn"
            >
              Load Player
            </button>
          </p>
          {loading && <div className={styles.load}>LOADING</div>}
        </div>{" "}
        <h3>{trainerData.playername}</h3>
        {trainerData.avatar && (
          <p>
            <img
              src={trainerData.avatar}
              style={{
                width: "80px",
                height: "80px",
                background: "LightBlue",
              }}
            />
          </p>
        )}
        {trainerData.winrate && (
          <p>
            Win Rate:
            <br />
            {trainerData.winrate}%
          </p>
        )}
        <div>
          {trainerData.teams &&
            trainerData.teams.map(
              (team) => <Teams trainerData={team} />,
              trainerData.winrate
            )}

          <SquadData squadz={squads} />
          <SquadMembers squadz={squads} />
        </div>
      </main>
      <span style={{ fontSize: "small" }}>Made by Liiiaaam93</span>
    </div>
  );
}
