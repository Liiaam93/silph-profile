import Head from "next/head";
import React, { useState } from "react";
import Teams from "../components/Teams";
import styles from "../../styles/Home.module.css";
import SquadMembers from "../components/SquadMembers";
import SquadData from "../components/SquadData";
import { atom, useRecoilState } from "recoil";

export const teamz = atom({
  key: "teamz",
  default: [],
});

export default function Home() {
  const [teams, setTeams] = useRecoilState(teamz);
  const [squads, setSquads] = useState([]);
  const [player, setPlayer] = useState("... or type a Trainer Name");
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
      <main className={styles.main}>
        <h1>Silph Team Finder</h1>
        <br />
        <div>
          <select value={squad} onChange={handleChange}>
            <option value="default" selected disabled hidden>
              Choose a Team
            </option>
            <option value="9a4b1b632b">AFRICAN SCATTERLINGS</option>
            <option value="0118d41b9d">ALTERED MINDS.</option>
            <option value="4c84e64b2a">AMARETTO RIOJA</option>
            <option value="2e10ca28ec">ANA N ASES</option>
            <option value="62efda8491">ARCEUS FACTION</option>
            <option value="0cab5e1009">ATS US NI</option>
            <option value="4a82abe75b">BADGERS</option>
            <option value="69c8c1c86b">BIZKAIA FACTIONS</option>
            <option value="1d9d793727">BOJOVÉ FRETKY</option>
            <option value="67030e25b5">BOYS ARBOK IN TOWN</option>
            <option value="fe0edeeaab">CRO MUDBOI PROJECT</option>
            <option value="76e5c6e984">DARK KNIGHTS &amp; DAMES</option>
            <option value="72c69acac2">DUBLIN DECIDUEYES</option>
            <option value="168b3318c2">ECLATAXS</option>
            <option value="5447662054">ECOMOSTRI</option>
            <option value="aa203842ce">EPL ORIGINS</option>
            <option value="f9d98b611e">ETTORE'S CRYING</option>
            <option value="41cbf9a5e1">EU EMPERORS</option>
            <option value="14705e87ea">FANI KUSHIEGO</option>
            <option value="6a4d354cc0">FIGHTCLUB</option>
            <option value="d00df6aff6">FIGHT CLUB FIRENZE</option>
            <option value="cd8794781b">FOXDEVILSWILD</option>
            <option value="807ab5b3ef">G.J.S.H.F.</option>
            <option value="bc83424483">GLI EMARGINATI</option>
            <option value="0791891ee1">GOBACHUS</option>
            <option value="e90f83e45d">GOBATTLERZ</option>
            <option value="ffac5922ca">GUERILLA GARBODORS</option>
            <option value="3cb1c77ca5">HAKKAPELIPPERS 2</option>
            <option value="19cb13fdca">HELTER BELTERS</option>
            <option value="4e490ac6ef">HIDDEN POWERS</option>
            <option value="f13a174138">HOLY WORMS OF SBT</option>
            <option value="db0e5b001a">HUELVAPROS</option>
            <option value="5db4f50189">INTING FOR STARDUST</option>
            <option value="fa27916b11">INTINGOLO LEAGUE</option>
            <option value="4ff9344748">KENT KROOKODILES</option>
            <option value="c128b2cb86">LEAGUE OF GENTLEMAN</option>
            <option value="d866abcd34">LEFRENCHCAILLOU</option>
            <option value="c582176f0a">LESFRENCHEVALIERS</option>
            <option value="223f5c64ea">LEVANTE 2.0</option>
            <option value="7661f8eb75">LEVANTE 2.0 AMARETTO</option>
            <option value="0da623179b">LF - LONDON'S FINEST</option>
            <option value="70c8153195">LILLE PVP</option>
            <option value="9939ca0f13">LUSITÂNIA BLUE</option>
            <option value="d3e1e96849">LUSITÂNIA WHITE</option>
            <option value="a66a541ac1">LUSITÂNIA YELLOW</option>
            <option value="f5a3c4cf1e">LYCANROCS</option>
            <option value="cafdff19c9">MENTAL KNOTS</option>
            <option value="18a46df16a">MORTAL BELTERS</option>
            <option value="0b508822e4">ONFIRE</option>
            <option value="b06e30287d">ONIXPECTED WINS</option>
            <option value="60c1dd06f4">ONLYFANS-JYM</option>
            <option value="0ed20065ad">ORDER OF KING HOWARD</option>
            <option value="796679a2d0">OSLO PVP TOUGH CROWD</option>
            <option value="be89e882b0">PRATOXICROAKS</option>
            <option value="6c0f28f6c4">POGONEWSITA</option>
            <option value="ce6fb5b550">POKELEAGUE REVERSED</option>
            <option value="3fbc1f7892">POKELEAGUE UNITED</option>
            <option value="e7393524f1">POLENTEAM</option>
            <option value="fcd42ba81e">POWER OF BORSCH</option>
            <option value="a9a4f28928">POWERPUFF BOYS</option>
            <option value="3ceb7dca06">RABBIT HUNTERS</option>
            <option value="9857bcaa8c">RAGING RAYQUAZAS</option>
            <option value="30ab7c9095">RED ARMY</option>
            <option value="038488ff81">RED RIGHT HAND</option>
            <option value="2d4570328e">REINCARNATION</option>
            <option value="0d858f701a">SALMOREJOTEAM</option>
            <option value="f616f673d7">SALTY LAG SIMPS</option>
            <option value="22525002c8">SAMUROTT 8</option>
            <option value="0f7b7924a2">SKY DRAGONS GAMING</option>
            <option value="279b301c24">SNOVERTAPPERS</option>
            <option value="f58cff365d">SOUTH SIDE SLOWBROS</option>
            <option value="9a7059e278">STOKED</option>
            <option value="1fa534fb67">ST PETER SQUAD</option>
            <option value="939b3dbc47">SWÉMONS</option>
            <option value="0218fdc33d">TEA &amp; PIZZA</option>
            <option value="80c47f113b">TEAM GROOKEY</option>
            <option value="376474a21a">TEAM INSOLOURDO</option>
            <option value="bc9d9cd89d">TEAM MAJADA</option>
            <option value="90a143c899">TEAM UTRECHT</option>
            <option value="a3ad1b3359">TECHNICAL MACHINES</option>
            <option value="2324a555db">THE BATTLE KITTENZ</option>
            <option value="1f234babd9">THE BATTLE RANGERS</option>
            <option value="9d946964b0">THE BELGIAN SMURFS</option>
            <option value="16f26c58d5">THE GOLD DIGGERSBIES</option>
            <option value="53eb97a6af">THE JYM DIVISION</option>
            <option value="cbb4fa1726">THE SAINTS</option>
            <option value="41aad34d9b">THE TEMPLAR KNIGHTS</option>
            <option value="cb7f54e4b9">TINKERTROTTERS</option>
            <option value="341ff4235f">TRIBUTE</option>
            <option value="06dd573f24">TRIESTE GO</option>
            <option value="26f0d0f8bd">UNITED FACTION TEAM</option>
            <option value="8fd9aa8138">UNTAMED TSARI</option>
            <option value="2310adcb96">WASTED POTENTIAL</option>
            <option value="233e9d658e">WESTSIDE GIJON</option>
            <option value="92271049a3">YORKSHIRE TRYHARDS</option>
          </select>
          <button onClick={() => loadSquad()}>Load</button>
          <input
            value={player}
            id="player"
            onDoubleClick={(e) => (e.target.value = "")}
            onChange={(e) => setPlayer(e.target.value)}
          />
          <button onClick={() => loadPeople()} id="pbtn">
            Load
          </button>
          {loading && <div className={styles.load}>LOADING</div>}
        </div>
        <div className={styles.teams}>
          <Teams teams={teams} />

          <SquadData squadz={squads} />
          <SquadMembers squadz={squads} />
        </div>
      </main>
    </div>
  );
}
