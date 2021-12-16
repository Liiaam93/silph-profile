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

export const fetchUserTournaments = async (player) => {
  const req = await fetch("https://thesilphroad.com/card/u/" + player);
  const data = await req.text();
  const $ = cheerio.load(data);

  const tournamentElements = $(
    "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament"
  ).toArray();

  const tournaments = tournamentElements.map((el) => {
    const league = $(el).find(".cupType").text();
    const bout = $(el).find(".tourneyName").text();
    const role = $(el).find(".role").text();
    const wins = parseInt($(el).find(".win h3").text());
    const losses = 3 - wins;
    const pokemon = $(el)
      .find(".pokemon")
      .toArray()
      .map((el) => {
        const name = $(el).attr("title") || "";
        const image = $(el).find("img").attr("src") || "";
        return { name, image };
      });

    const repeatedItems = {};
    pokemon.forEach((item) => {
      if (repeatedItems[item.name]) {
        repeatedItems[item.name] = {
          ...item,
          count: repeatedItems[item.name].count + 1,
        };
      } else {
        repeatedItems[item.name] = { ...item, count: 1 };
      }
    });
    const sortedArr = Object.values(repeatedItems)
      .sort((a, b) => a.count - b.count)
      .map((item) => ({ name: item.name, image: item.image }));

    console.log(sortedArr);

    return {
      league,
      bout,
      role,
      wins,
      losses,
      pokemon,
      sortedArr,
    };
  });

  return tournaments;
};
