import fetch from "isomorphic-fetch";
import cheerio from "cheerio";

const getMoveData = async (league) => {
  let url = "";
  let ver = "";

  if (league == "Great") {
    url = "all/overall/rankings-1500";
  } else if (league == "Dungeon") {
    url = "factions/overall/rankings-1500";
  } else if (league == "Nightfall") {
    url = "nightfall/overall/rankings-1500";
  } else if (league == "Ultra") {
    url = "all/overall/rankings-2500";
  } else if (league == "Master") {
    url = "all/overall/rankings-10000";
  } else if (league === "Comet") {
    url = "factions/overall/rankings-1500";
    ver = "v=1.24.4.1";
  } else if (league === "Twilight") {
    url = "twilightfactions/overall/rankings-1500";
    ver = "v=1.24.4.1";
  }
  try {
    const req = await fetch(
      `https://pvpoke.com/data/rankings/${url}.json?${ver}`,
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "sec-ch-ua":
            '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          "sec-ch-ua-mobile": "?0",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://pvpoke.com/rankings/all/1500/overall/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
      }
    );

    const data = await req.json();

    let pLen = data.length;

    const pokeMap = {};
    for (let j = 0; j < pLen; j++) {
      const { speciesId, speciesName, moveset, score, counters, matchups } =
        data[j];
      const { fastMoves, chargedMoves } = data[j].moves;
      if (!pokeMap[speciesId]) {
        pokeMap[speciesId] = {
          Name: speciesName,
          counters: counters,
          matchups: matchups,
          Recommended_Moves: moveset,
          Fast_Moves: fastMoves,
          Charged_Moves: chargedMoves,
          PVPOKE_score: score,
        };
      }
    }
    return pokeMap;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getMoveData,
};
