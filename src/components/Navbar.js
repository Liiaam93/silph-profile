import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, Circle, Center } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { atom, useRecoilState } from "recoil";
import { useState } from "react";
import { Text } from "@chakra-ui/layout";
import { motion, isValidMotionProp } from "framer-motion";
import { Image } from "@chakra-ui/image";
import Loader from "./Loader";
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
        w="100%"
        p="5px"
      >
        <Text color="gold" m="auto">
          Silph Team Finder
        </Text>
        <Flex w="xl" pb="5px">
          <Select value={squad} onChange={handleChange} bg="#F0F8FF">
            <option value="default" selected disabled hidden>
              Choose a Team
            </option>
            {Object.keys(factions).map((key) => (
              <option value={key}>{factions[key]}</option>
            ))}
          </Select>
          <Button
            ml="5px"
            mr="5px"
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
        <Flex w="xl">
          <Input
            bg="#F0F8FF"
            value={player}
            id="player"
            placeholder="... or type a Trainer Name"
            onDoubleClick={(e) => (e.target.value = "")}
            onChange={(e) => setPlayer(e.target.value)}
          />
          <Button
            ml="5px"
            mr="5px"
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
      </HStack>
      {loading && (
        <>
          <Loader />
        </>
      )}
    </>
  );
};
export default Navbar;
