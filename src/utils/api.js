import fetch from "isomorphic-fetch";
import cheerio from "cheerio";

export const getSilph = async (player) => {
  try {
    const req = await fetch("https://thesilphroad.com/card/u/" + player);
    const data = await req.text();
    const $ = cheerio.load(data);

    const pokemon = $(
      "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament"
    )
      .find(".pokemon")
      .toArray()
      .map((element) => $(element).attr("title"));

    const sprite = $(
      "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div > div.playerDetails > div.team > div"
    )
      .find("img")
      .toArray()
      .map((element) => $(element).attr("src"));
    //console.log(sprite)

    function removeShadow() {
      for (let i = sprite.length - 1; i >= 0; i--) {
        if (sprite[i] === 0) {
          sprite.splice(i, 1);
        }
      }
    }

    for (let i = 0; i < sprite.length; i++) {
      if (sprite[i] === "https://silph.gg/img/icon-shadow-purple.png") {
        pokemon[i - 1] += " Shadow";
        sprite[i] = 0;
        removeShadow();
      }
    }
    for (let i = 0; i < pokemon.length; i++) {
      if (pokemon[i].includes("Shadow")) {
        sprite[i] = sprite[i].replace("silph", "SILPH");
        //console.log(sprite)
      }
    }
    for (let i = 0; i < sprite.length; i++) {
      if (sprite[i].includes("assets.")) {
        sprite[i] = sprite[i].replace("assets.the", "the");
        //console.log(sprite)
      }
    }

    const teams = [];
    let j = 0;
    for (let i = 0; i < 6; i++) {
      const team = [];
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

    const popular = [{ bout: "Most Frequently Used Pokemon" }];
    for (let k = 0; k < 6; k++) {
      popular.push({
        pokemon: common[k],
        sprite: commonS[k],
      });
    }
    teams.push(popular);
    console.log(teams[6]);
    return teams;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getSilph,
};
