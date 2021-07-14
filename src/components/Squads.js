import React from "react";
const Squads = ({ squadz }) => {
  if (!squadz.teamStats) {
    return null;
  }
  let member = squadz.playerStats;
  return (
    <React.Fragment>
      <br />
      <img src={squadz.teamStats.logo} />
      <br />
      {squadz.teamStats.name}
      <br />
      {squadz.teamStats.wl}
      <br />
      <p />
      <div class="flex-container">
        <div class="flex-child magenta">
          <h2>{member[0][0].player}</h2>
          <p />
          {member[0][0].role} <p />
          Win Rate: {member[0][0].win_rate}
          <p />
          {member[0][0].matches} <p />
          Total Battles: {member[0][0].total_battles} <p />
          {member[0][0].score} <p />
        </div>

        <div class="flex-child magenta">
          <button class="name">{member[1][0].player}</button>
          <p />
          {member[1][0].role} <p />
          Win Rate: {member[1][0].win_rate}
          <p />
          {member[1][0].matches} <p />
          Total Battles: {member[1][0].total_battles} <p />
          {member[1][0].score} <p />
        </div>

        <div class="flex-child magenta">
          <button class="name">{member[2][0].player}</button>
          <p />
          {member[2][0].role} <p />
          Win Rate: {member[2][0].win_rate}
          <p />
          {member[2][0].matches} <p />
          Total Battles: {member[2][0].total_battles} <p />
          {member[2][0].score} <p />
        </div>

        <div class="flex-child magenta">
          <button class="name">{member[3][0].player}</button>
          <p />
          {member[3][0].role} <p />
          Win Rate: {member[3][0].win_rate}
          <p />
          {member[3][0].matches} <p />
          Total Battles: {member[3][0].total_battles} <p />
          {member[3][0].score} <p />
        </div>
        <div class="flex-child magenta">
          <button class="name">{member[4][0].player}</button>
          <p />
          {member[4][0].role} <p />
          Win Rate: {member[4][0].win_rate}
          <p />
          {member[4][0].matches} <p />
          Total Battles: {member[4][0].total_battles} <p />
          {member[4][0].score} <p />
        </div>
        <div class="flex-child magenta">
          <button class="name">{member[5][0].player}</button>
          <p />
          {member[5][0].role} <p />
          Win Rate: {member[5][0].win_rate}
          <p />
          {member[5][0].matches} <p />
          Total Battles: {member[5][0].total_battles} <p />
          {member[5][0].score} <p />
        </div>
        <div class="flex-child magenta">
          <button class="name">{member[6][0].player}</button>
          <p />
          {member[6][0].role} <p />
          Win Rate: {member[6][0].win_rate}
          <p />
          {member[6][0].matches} <p />
          Total Battles: {member[6][0].total_battles} <p />
          {member[6][0].score} <p />
        </div>
        <div class="flex-child magenta">
          <button class="name">{member[7][0].player}</button>
          <p />
          {member[7][0].role} <p />
          Win Rate: {member[7][0].win_rate}
          <p />
          {member[7][0].matches} <p />
          Total Battles: {member[7][0].total_battles} <p />
          {member[7][0].score} <p />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Squads;
