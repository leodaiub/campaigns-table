import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MdCampaign } from "react-icons/md";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box role="nav" bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <MdCampaign size={32} />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button role="colorMode" onClick={toggleColorMode}>
                {colorMode === "light" ? (
                  <MoonIcon role="moon" />
                ) : (
                  <SunIcon role="sun" />
                )}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
