import React from "react";
import { Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { tData } from "./Navbar";
import { useRecoilState } from "recoil";

const TrainerData = () => {
  const [trainerData] = useRecoilState(tData);
  return (
    <>
      <Flex
        m="auto"
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
          src={trainerData.avatar}
          bg="lightblue"
          w="100px"
          borderRadius="3xl"
          pr="5px"
        />

        <Flex flexDir="column" alignSelf="flex-start" pl="5px">
          <Text fontSize="2xl">{trainerData.playername}</Text>
          <Text> Win Rate:</Text>
          <Text> {trainerData.winrate}% </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default TrainerData;
