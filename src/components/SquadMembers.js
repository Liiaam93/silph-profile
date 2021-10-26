import React, { useEffect, useState } from "react";
import Teams from "./Teams";
import { atom, useRecoilState } from "recoil";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { tData } from "./Navbar";
import Loader from "./Loader";

const SquadMembers = ({ squadz }) => {
  const [teams, setTeams] = useRecoilState(tData);
  const [loading, setLoading] = useState(false);

  const loadStats = async (player) => {
    setTeams([]);
    setLoading(true);
    const req = await fetch(`/api/player/${player}`);
    const json = await req.json();
    setTeams(json);
    setLoading(false);
    window.scrollTo(0, 0);
    return <Teams teams={teams} />;
  };

  if (!squadz.teamStats) {
    return null;
  }

  let member = squadz.playerStats;

  let squadMap = member.map((player, index) => (
    <>
      <Flex
        color="black"
        w="200px"
        mt="5px"
        pb="10px"
        flexDir="column"
        mr="5px"
        border="1px"
        borderRadius="md"
        align="center"
        bg="lightblue"
      >
        {player.map((stats, idx) => (
          <React.Fragment key={stats.player}>
            <Button
              bg="gold"
              shadow="outline"
              mt="5px"
              mb="10px"
              id={"btn" + index}
              value={stats.player}
              onClick={() => loadStats(stats.player)}
            >
              {stats.player}
            </Button>
            <Text>Role: {stats.role.replace(" Specialist", "")}</Text>
            <Text>Win Rate: {stats.win_rate}</Text>
            <Text>Bouts Played: {stats.matches}</Text>
            <Text>Total Battles: {stats.total_battles} </Text>
            <Text>Points Earned: {stats.score}</Text>
          </React.Fragment>
        ))}
      </Flex>
    </>
  ));
  return (
    <>
      {loading && (
        <>
          <Loader />
        </>
      )}
      <Flex wrap="wrap" maxW="800px" m="auto" justify="center">
        {squadMap}
      </Flex>
    </>
  );
};

export default SquadMembers;
