import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { atom, useRecoilState } from "recoil";
import { useState } from "react";
import { Text } from "@chakra-ui/layout";

import { factions } from "../utils/model/Factions";

export const tData = atom({
  key: "trainerData",
  default: [],
});

export const sData = atom({
  key: "squadData",
  default: [],
});

const Navbar = () => {
  const [trainerData, setTeams] = useRecoilState(tData);
  const [squad, setSquad] = useState("default");
  const [player, setPlayer] = useState("");
  const [squads, setSquads] = useRecoilState(sData);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setSquad(e.target.value);
  }

  const loadPeople = async () => {
    setLoading(true);
    const req = await fetch(`/api/player/${player}`);
    const json = await req.json();
    setTeams(json);
    setLoading(false);
  };

  const loadSquad = async () => {
    setLoading(true);
    const req = await fetch(`/api/squad/${squad}`);
    const json = await req.json();
    setSquads(json);
    setLoading(false);
    setTeams([]);
  };

  return (
    <HStack
      position="fixed"
      bg="slategrey"
      p="5px"
      w="100%"
      alignContent="center"
    >
      <Flex w="50%">
        <Select value={squad} onChange={handleChange} mr="10px">
          <option value="default" selected disabled hidden>
            Choose a Team
          </option>
          {Object.keys(factions).map((key) => (
            <option value={key}>{factions[key]}</option>
          ))}
        </Select>
        <Button onClick={() => loadSquad()}>Load Team</Button>
      </Flex>
      <Flex w="50%" p="2px">
        <Input
          mr="5px"
          value={player}
          id="player"
          placeholder="... or type a Trainer Name"
          onDoubleClick={(e) => (e.target.value = "")}
          onChange={(e) => setPlayer(e.target.value)}
        />
        <Button onClick={() => loadPeople()} id="pbtn">
          Load Player
        </Button>
      </Flex>
      {loading && <Text>LOADING</Text>}
    </HStack>
  );
};
export default Navbar;
