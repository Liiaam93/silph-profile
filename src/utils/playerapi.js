const fetch = require("isomorphic-fetch");
const cheerio = require("cheerio");

const getTeam = async (team) => {
  try {
    const req = await fetch("https://silph.gg/faction/" + team);
    const data = await req.text();
    const $ = cheerio.load(data);
    let sprite = $(
      "#content > div.teamView.row-fluid.dark > div.container.text-left > div.row > .teamWrapper > .teamHeader > .emblemWrapper > img "
    ).attr("src");

    let teamName = $(
      "#content > div.teamView.row-fluid.dark > div.container.text-left > div.row > .teamWrapper > .teamHeader > .bottom > .teamDetails > h2 "
    ).html();
    let winLoss = $(
      "#content > div.teamView.row-fluid.dark > div.container.text-left > div.row > .teamWrapper > .highlights > .highlight:nth-child(3) > span"
    ).html();

    let players = $("#teamDetails > div.memberList")
      .find(".member .playerName p")
      .toArray()
      .map((element) => $(element).html());

    let score = $("#teamDetails > div.memberList")
      .find(".member .stats .battlesWon")
      .toArray()
      .map((element) => $(element).html());

    let matches = $("#teamDetails > div.memberList")
      .find(".member .stats .matchesPlayed")
      .toArray()
      .map((element) => $(element).html());

    let role = $("#teamDetails > div.memberList")
      .find(".member .specialty h6")
      .toArray()
      .map((element) => $(element).html());

    const teamStats = [
      {
        Name: teamName,
        Logo: sprite,
        WL: winLoss,
      },
    ];

    const playerStats = [];
    let j = 0;
    for (let i = 0; i < 8; i++) {
      const team = [];
      for (j; j < i + 1; j++) {
        team.push({
          Player: players[j],
          Role: role[j],
          Score: score[j],
          Matches: matches[j],
          Total_Battles: parseInt(matches[j]) * 3,
          Win_Rate:
            ((parseInt(score[j]) / (parseInt(matches[j]) * 3)) * 100).toFixed(
              2
            ) + "%",
        });
      }
      playerStats.push(team);
    }
    return { playerStats, teamStats };
  } catch (err) {}
};

module.exports = {
  getTeam,
};
