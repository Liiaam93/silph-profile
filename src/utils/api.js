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
    for (let i = 0; i < 6; i++) {
      sprite.push(
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/pokeball-games-video-casino-gamer-1-42381.png"
      );
    }

    //console.log(sprite)
    const cupInfo = $(
      "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament > div > div.overview"
    )
      .find("h5")
      .toArray()
      .map((element) => $(element).text());

    let boutNum = cupInfo.filter(function (el, index) {
      return index % 2 === 1;
    });

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

    const teams = []; // teams array
    let j = 0;
    for (let i = 0; i < 7; i++) {
      // loops 7 times (7 teams)
      const team = []; // team array
      for (j; j < (i + 1) * 6; j++) {
        // loops 42 times (7 teams * 6 pokemon)
        team.push({
          bout: boutNum[i],
          pokemon: pokemon[j],
          sprite: sprite[j],
        });
      }
      teams.push(team); //push each team into teams array
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
    console.log(teams[7]);
    return teams;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getSilph,
};
