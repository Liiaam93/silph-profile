import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Flex, Center, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import Teams from "../components/Teams";
import Navbar from "../components/Navbar";
import SquadData from "../components/SquadData";
import SquadMembers from "../components/SquadMembers";
import TrainerData from "../components/trainerData";
import { tData } from "../components/Navbar";
import { sData } from "../components/Navbar";

export default function Home() {
  const [trainerData] = useRecoilState(tData);
  const [squads] = useRecoilState(sData);

  return (
    <Flex minHeight="100vh" flexDir="column" alignContent="center">
      <Navbar />
      {trainerData.avatar && <TrainerData />}
      {trainerData.teams &&
        trainerData.teams.map((team) => (
          <Teams key={team.title} trainerData={team} />
        ))}
      <SquadData squadz={squads} />
      <SquadMembers squadz={squads} />
      <Text alignSelf="center">Made by Liiiaaam93</Text>
    </Flex>
  );
}
