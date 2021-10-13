import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Flex, Center, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import Teams from "../components/Teams";
import Navbar from "../components/Navbar";
import SquadData from "../components/SquadData";
import SquadMembers from "../components/SquadMembers";
import TrainerData from "../components/TrainerData";
import { tData } from "../components/Navbar";
import { sData } from "../components/Navbar";

export default function Home() {
  const [trainerData] = useRecoilState(tData);
  const [squads] = useRecoilState(sData);

  return (
    <>
      <Navbar />

      <Flex
        pt="15vh"
        minHeight="100vh"
        flexDir="column"
        alignContent="center"
        bgColor="#414141"
      >
        {trainerData.avatar && <TrainerData />}
        {trainerData.teams &&
          trainerData.teams.map((team) => (
            <Teams key={team.title} trainerData={team} />
          ))}
        <SquadData squadz={squads} />
        <SquadMembers squadz={squads} />
      </Flex>
    </>
  );
}
