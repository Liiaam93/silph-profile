import React from "react";
import { Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";

const SquadData = ({ squadz }) => {
  if (!squadz.teamStats) {
    return null;
  }

  const winOver50 = parseFloat(squadz.teamStats.wl.replace("%", "")) > 50;
  return (
    <>
      <Flex
        m="3px"
        alignSelf="center"
        mt="10px"
        align="center"
        w="fit-content"
        border="1px black solid"
        bg="lightblue"
        color="black"
        p="10px"
        borderRadius="lg"
      >
        <Image
          w="100px"
          borderRadius="3xl"
          pr="5px"
          src={squadz.teamStats.logo}
        ></Image>
        <Flex flexDir="column" alignSelf="flex-start" pl="20px">
          <Text fontSize="3xl"> {squadz.teamStats.name}</Text>
          <Text>Faction Win Rate:</Text>
          <Text
            textShadow="-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000"
            fontWeight="bold"
            color={winOver50 ? "green" : "yellow"}
            fontSize="2xl"
          >
            {squadz.teamStats.wl}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default SquadData;
