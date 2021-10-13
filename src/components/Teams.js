import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Center, Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
import { Select } from "@chakra-ui/select";

const Teams = ({ trainerData }) => {
  const [league, setLeague] = useState("default");
  const [moves, setMoves] = useState([]);

  if (!trainerData) {
    return null;
  }
  const monArr = trainerData.slice(1).map((team) => team.pokemon.toLowerCase());

  const copyPVP = async () => {
    let copyText = "";
    for (let i = 0; i < 6; i++) {
      copyText += monArr[i] + ",";
      copyText += moves[monArr[i]].Recommended_Moves[0] + ",";
      copyText += moves[monArr[i]].Recommended_Moves[1] + ",";
      copyText += moves[monArr[i]].Recommended_Moves[2] + "\n";
    }
    copyText = copyText.slice(0, copyText.length - 1);
    await navigator.clipboard.writeText(copyText);
    alert("copied!");
  };

  function handleChange(e) {
    setLeague(e.target.value);
  }
  useEffect(() => {
    if (league === "default") return;
    const getMoves = async () => {
      const req = await fetch(`/api/move-data/${league}`);
      const json = await req.json();
      setMoves(json);
    };
    getMoves();
  }, [league]);

  // --------------------H-e-l-p-----M-e-----R-o-r-y----P-------------------8=========>---------

  let pokemap = trainerData.slice(1).map((team, index) => (
    <>
      <Flex
        m="5px"
        bg="cadetblue"
        border="1px solid black"
        borderRadius="lg"
        flexDir="column"
        textAlign="center"
        alignItems="center"
        minW="150px"
      >
        <Image
          border="1px"
          borderRadius="lg"
          w="max"
          mt="5px"
          bg="darksalmon"
          pl="15px"
          pr="15px"
          src={team.sprite}
        />
        <Text fontSize="md">{team.pokemon}</Text>
        {get(
          moves,
          `[${team.pokemon.toLowerCase()}].Recommended_Moves`,
          []
        ).map((name) => (
          <Text color="darkslategrey" fontSize="sm">
            {name}
          </Text>
        ))}
      </Flex>
    </>
  ));
  return (
    <>
      <Box
        w="80%"
        m="auto"
        pt="5px"
        mt="10px"
        color="black"
        borderWidth="1px"
        bg="darkgrey"
        borderRadius="lg"
      >
        <Box w="fit-content" m="auto" textAlign="center">
          <Text fontSize="lg">{trainerData[0].bout}</Text>
          <Text fontSize="md"> {trainerData[0].role}</Text>
        </Box>
        <Flex wrap="wrap" w="auto" m="auto" justify="center">
          {pokemap}
        </Flex>
        <Center>
          {trainerData[0].wins && "Score: "}
          {trainerData[0].wins &&
            trainerData[0].wins + "-" + (3 - trainerData[0].wins)}
        </Center>
        <Center>
          <Select w="md" bg="slategrey" value={league} onChange={handleChange}>
            <option value="default">Select League to show moves</option>
            <option value="Great">Great</option>
            <option value="Ultra">Ultra</option>
            <option value="Master">Master</option>
            <option value="Dungeon">Dungeon</option>
            <option value="Nightfall">Nightfall</option>
          </Select>
        </Center>
        <Center pt="5px" pb="5px">
          {league !== "default" && (
            <Button onClick={() => copyPVP()}>Copy PVPOKE Export</Button>
          )}
        </Center>
      </Box>
    </>
  );
};

export default Teams;
