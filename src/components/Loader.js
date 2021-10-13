import { motion, isValidMotionProp } from "framer-motion";
import { Text } from "@chakra-ui/layout";
import { Flex, HStack, Circle, Center, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const Loader = () => {
  const MotionBox = motion(Circle);

  return (
    <>
      <Box
        color="black"
        bg="lightgrey"
        w="300px"
        h="250px"
        mt="-125px"
        ml="-150px"
        position="fixed"
        top="35%"
        left="50%"
        borderRadius="md"
        zIndex="modal"
      >
        <MotionBox
          animate={{ color: ["#ffd700", "#000", "#ffd700"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Text align="center" fontSize="30px">
            Searching...
          </Text>
        </MotionBox>{" "}
      </Box>

      <MotionBox
        size="90px"
        animate={{ x: [-75, 75, 75, -75, -75], y: [0, 0, 100, 100, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        position="fixed"
        left="50%"
        top="30%"
        mt="-45px"
        ml="-45px"
        zIndex="modal"
      >
        <Image zIndex="modal" src="/logo.png" />
      </MotionBox>
    </>
  );
};
export default Loader;
