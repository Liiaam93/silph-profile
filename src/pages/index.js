import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Flex, Center, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import Teams from "../components/Teams";
import Navbar from "../components/Navbar";
import SquadData from "../components/SquadData";
import SquadMembers from "../components/SquadMembers";
import TrainerData from "../components/TrainerData";
import Roster from "../components/Roster";
import { tData } from "../components/Navbar";
import { sData } from "../components/Navbar";
import { Link } from "@chakra-ui/react";

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
        {!trainerData.avatar && (
          <Box
            w="fit-content"
            border="solid 3px white"
            m="auto"
            mt={["8", "0"]}
            p="10px"
          >
            <Text color="white">
              New and updated site:{" "}
              <Link color="yellow.500" href="https://silph-scope.vercel.app/">
                Silph-Scope
              </Link>
            </Text>
          </Box>
        )}
        {trainerData.avatar && <TrainerData />}
        {trainerData.avatar && <Roster roster={trainerData.roster} />}
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
