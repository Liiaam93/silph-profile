import fetch from "isomorphic-fetch";
import cheerio from "cheerio";

Array.prototype.byCount = function () {
  var itm,
    a = [],
    L = this.length,
    o = {};
  for (var i = 0; i < L; i++) {
    itm = this[i];
    if (!itm) continue;
    if (o[itm] == undefined) o[itm] = 1;
    else ++o[itm];
  }
  for (var p in o) a[a.length] = p;
  return a.sort(function (a, b) {
    return o[b] - o[a];
  });
};

export const getTrainerInfo = async (player) => {
  try {
    const req = await fetch("https://thesilphroad.com/card/u/" + player);
    const data = await req.text();
    const $ = cheerio.load(data);

    let pokemon = $(
      "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament"
    )
      .find(".pokemon")
      .toArray()
      .map((element) => $(element).attr("title"));

    let sprite = $(
      "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div > div.playerDetails > div.team > div"
    )
      .find("img")
      .toArray()
      .map((element) => $(element).attr("src").replace("assets.", ""));

    let cupInfo = $(
      "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament > div > div.overview"
    )
      .find("h5 > a")
      .toArray()
      .map((element) => $(element).text().trim());

    let role = $(
      "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament > div > div.overview"
    )
      .find("p")
      .toArray()
      .map((element) => $(element).text());

    let wins = $(
      "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament > div.playerDetails > div.record.weighted > div.win"
    )
      .find("h3")
      .toArray()
      .map((element) => $(element).text());

    for (let i = 0; i < sprite.length; i++) {
      if (sprite[i] === "https://silph.gg/img/icon-shadow-purple.png") {
        pokemon[i - 1] += "_shadow";
        sprite[i] = 0;
        sprite.splice(i, 1);
      }
    }
    let k = 0;
    for (k; k < pokemon.length; k++) {
      if (pokemon[k].includes("Galarian")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(9, len);
        pokemon[k] = pokemon[k] + "_galarian";
      } else if (pokemon[k].includes("Alolan")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(7, len);
        pokemon[k] = pokemon[k] + "_alolan";
      } else if (pokemon[k].includes(" (Therian forme)")) {
        pokemon[k] = pokemon[k].replace(" (Therian forme)", "_therian");
      } else if (pokemon[k].includes("Darmanitan")) {
        pokemon[k] = pokemon[k] + "_standard";
      } else if (pokemon[k].includes(" (Origin Forme)")) {
        pokemon[k] = pokemon[k].replace(" (Origin Forme)", "_origin"); //
      } else if (pokemon[k].includes(" (Normal)")) {
        pokemon[k] = pokemon[k].replace(" (Normal)", "");
      } else if (pokemon[k].includes(" (Altered Forme)")) {
        pokemon[k] = pokemon[k].replace(" (Altered Forme)", "_altered");
      } else if (pokemon[k].includes(" (Defense Forme)")) {
        pokemon[k] = pokemon[k].replace(" (Defense Forme)", "_defense");
      } else if (pokemon[k].includes(" (Trash Cloak)")) {
        pokemon[k] = pokemon[k].replace(" (Trash Cloak)", "_trash");
      } else if (pokemon[k].includes(" (Sandy Cloak)")) {
        pokemon[k] = pokemon[k].replace(" (Sandy Cloak)", "_sandy");
      } else if (pokemon[k].includes(" (Plant Cloak)")) {
        pokemon[k] = pokemon[k].replace(" (Plant Cloak)", "_plant");
      } else if (pokemon[k].includes("Rainy")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(6, len);
        pokemon[k] = pokemon[k] + "_rainy";
        pokemon[k] = pokemon[k].trim();
      } else if (pokemon[k].includes("Sunny")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(6, len);
        pokemon[k] = pokemon[k] + "_sunny";
        pokemon[k] = pokemon[k].trim();
      } else if (pokemon[k].includes("Snowy")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(6, len);
        pokemon[k] = pokemon[k] + "_snowy";
        pokemon[k] = pokemon[k].trim();
      } else if (pokemon[k].includes("Armored")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(8, len);
        pokemon[k] = pokemon[k] + "_armored";
        pokemon[k] = pokemon[k].trim();
      }
    }
    const numOfTeams = pokemon.length / 6;

    let points = 0;
    let maxPoints = numOfTeams * 3;

    for (let i = 0; i < numOfTeams; i++) {
      points = points + parseInt(wins[i]);
    }

    let common = pokemon.byCount();
    let commonS = sprite.byCount();

    const silphAPI = `https://sil.ph/${player}.json`;
    const dat = await fetch(silphAPI);
    const json = await dat.json();
    const playerName = json.data.in_game_username;
    const avatar = json.data.avatar;
    let winRate = ((points / maxPoints) * 100).toFixed(2);

    let response = {
      winrate: winRate,
      playername: playerName,
      avatar: avatar,
      teams: [],
      roster: [],
    };

    for (let i = 0; i < common.length; i++) {
      response.roster.push([{ pokemon: common[i], sprite: commonS[i] }]);
    }
    let j = 0;
    for (let i = 0; i < numOfTeams; i++) {
      let team = [{ bout: cupInfo[i], wins: wins[i], role: role[i] }];
      for (j; j < (i + 1) * 6; j++) {
        team.push({
          pokemon: pokemon[j],
          sprite: sprite[j],
        });
      }
      response.teams.push(team);
    }

    const popular = [{ bout: "Most Frequently Used Pokemon" }];
    for (let k = 0; k < 6; k++) {
      popular.push({
        pokemon: common[k],
        sprite: commonS[k],
      });
    }

    response.teams.unshift(popular);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getTrainerInfo,
};
