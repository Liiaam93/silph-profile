import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { tData } from "./Navbar";
import { useRecoilState } from "recoil";
import { useDisclosure } from "@chakra-ui/hooks";

const Roster = ({ roster }) => {
  const [trainerData] = useRecoilState(tData);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button bg="gold" m="auto" mt="10px" maxW="50%" onClick={onOpen}>
        See Player's Full Roster
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader align="center">
            {trainerData.playername}'s Roster
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex wrap="wrap" dir="row">
              {roster.map((mon) => (
                <>
                  <VStack w="25%">
                    <Image src={mon[0].sprite} />{" "}
                    <Text>
                      {mon[0].pokemon
                        .replace("alolan", "a")
                        .replace("defense", "d")
                        .replace("_standard", "")
                        .replace("galarian", "g")
                        .replace("altered", "a")
                        .replace("armored", "a")
                        .replace("shadow", "s")}
                    </Text>
                  </VStack>
                </>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Roster;
