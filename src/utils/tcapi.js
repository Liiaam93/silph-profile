import fetch from "isomorphic-fetch";
import cheerio from "cheerio";

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
      .map((element) => $(element).attr("src"));

    for (let i = 0; i < 6; i++) {
      sprite.push(
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/pokeball-games-video-casino-gamer-1-42381.png"
      );
    }

    //console.log(sprite)
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
        pokemon[i - 1] += "_Shadow";
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
      } else if (pokemon[k].includes("(therian forme)")) {
        pokemon[k] = pokemon[k].replace(" (therian forme)", "_therian");
      } else if (pokemon[k].includes("(origin forme)")) {
        pokemon[k] = pokemon[k].replace(" (origin forme)", "_origin");
      } else if (pokemon[k].includes("(altered forme)")) {
        pokemon[k] = pokemon[k].replace(" (altered forme)", "_altered");
      } else if (pokemon[k].includes("(defense forme)")) {
        pokemon[k] = pokemon[k].replace(" (defense forme)", "_defense");
      } else if (pokemon[k].includes("rainy")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(6, len);
        pokemon[k] = pokemon[k] + "_rainy";
        pokemon[k] = pokemon[k].trim();
      } else if (pokemon[k].includes("sunny")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(6, len);
        pokemon[k] = pokemon[k] + "_sunny";
        pokemon[k] = pokemon[k].trim();
      } else if (pokemon[k].includes("snowy")) {
        let len = pokemon[k].length;
        pokemon[k] = pokemon[k].slice(6, len);
        pokemon[k] = pokemon[k] + "_snowy";
        pokemon[k] = pokemon[k].trim();
      }
    }
    const numOfTeams = pokemon.length / 6;

    let points = 0;
    let maxPoints = numOfTeams * 3;

    for (let i = 0; i < numOfTeams; i++) {
      points = points + parseInt(wins[i]);
    }
    let winRate = ((points / maxPoints) * 100).toFixed(2);

    let teams = [{ winrate: winRate }];
    let j = 0;
    for (let i = 0; i < numOfTeams; i++) {
      let team = [{ bout: cupInfo[i], wins: wins[i], role: role[i] }];
      for (j; j < (i + 1) * 6; j++) {
        team.push({
          pokemon: pokemon[j],
          sprite: sprite[j],
        });
      }
      teams.push(team);
    }

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

    let common = pokemon.byCount();
    let commonS = sprite.byCount();
    var cmn = commonS.filter(function (spr) {
      return (
        spr !==
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/pokeball-games-video-casino-gamer-1-42381.png"
      );
    });

    const popular = [];
    for (let k = 0; k < 6; k++) {
      popular.push({
        bout: "Most Frequently Used Pokemon",
        pokemon: common[k],
        sprite: cmn[k],
      });
    }
    teams.push(popular);
    return teams;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getTrainerInfo,
};
