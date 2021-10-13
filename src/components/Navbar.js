import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, Circle, Center } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { atom, useRecoilState } from "recoil";
import { useState } from "react";
import { Text } from "@chakra-ui/layout";
import { motion, isValidMotionProp } from "framer-motion";
import { Image } from "@chakra-ui/image";

import { factions } from "../utils/model/Factions";

export const tData = atom({
  key: "trainerData",
  default: [],
});

export const sData = atom({
  key: "squadData",
  default: [],
});
const MotionBox = motion(Circle);

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
    <>
      <HStack
        wrap="wrap"
        zIndex="sticky"
        position="fixed"
        bg="#525252"
        p="5px"
        w="100%"
      >
        <Flex w="xl" m="auto">
          <Select value={squad} onChange={handleChange} bg="#F0F8FF" pr="5px">
            <option value="default" selected disabled hidden>
              Choose a Team
            </option>
            {Object.keys(factions).map((key) => (
              <option value={key}>{factions[key]}</option>
            ))}
          </Select>
          <Button
            fontSize="sm"
            _hover={{
              background: "gold",
              color: "white",
            }}
            onClick={() => loadSquad()}
          >
            Load Team
          </Button>
        </Flex>
        <Flex w="xl" p="5px">
          <Input
            bg="#F0F8FF"
            mr="5px"
            value={player}
            id="player"
            placeholder="... or type a Trainer Name"
            onDoubleClick={(e) => (e.target.value = "")}
            onChange={(e) => setPlayer(e.target.value)}
          />
          <Button
            fontSize="sm"
            _hover={{
              background: "gold",
              color: "white",
            }}
            onClick={() => loadPeople()}
            id="pbtn"
          >
            Load Player
          </Button>
        </Flex>
        {loading && (
          <MotionBox
            size="90px"
            animate={{ x: [-75, 75, 75, -75, -75], y: [0, 0, 100, 100, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            position="fixed"
            left="44%"
            top="30%"
          >
            <Image src="/logo.png" />
          </MotionBox>
        )}
      </HStack>
      {loading && (
        <Text position="fixed" left="45%" top="70%">
          Loading
        </Text>
      )}
    </>
  );
};
export default Navbar;
