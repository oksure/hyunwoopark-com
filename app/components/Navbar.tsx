// app/components/Navbar.tsx
import {
  Flex,
  For,
  Box,
  ClientOnly,
  Spacer,
  Button,
  ButtonGroup,
  Link,
  IconButton,
  Container,
  VStack,
  Heading,
  Separator
} from "@chakra-ui/react";
import {
  // DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  // DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer"
import { ColorModeToggle } from "../../components/color-mode-toggle"
import { RiHome3Line, RiMenuFill } from "react-icons/ri";
import { GrDocumentPdf } from "react-icons/gr";
import { IoPeopleCircle } from "react-icons/io5";
import { toCamelCase } from "../../src/utils/utils";

const Navbar = () => {
  // ["bio", "photos", "places", "personal", "contacts", "maps"]

  return (
    <Flex
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      bg="bg"
      // bg={colorMode === "light" ? "gray.100" : "gray.800"} // Subtle background
      borderBottomWidth={1}
      // borderBottomColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <Container px={3}>
        <Flex
          align="center"
          justify="between" // Space items evenly
          paddingY={4}
        >
          <Box>
            <ButtonGroup gap="0" size={{ base: "xs", md: "md" }}>
              <IconButton asChild aria-label="Home" variant="ghost"><Link href="/"><RiHome3Line /></Link></IconButton>
              <ClientOnly><ColorModeToggle /></ClientOnly>
            </ButtonGroup>
          </Box>

          <Spacer />

          <ButtonGroup gap={{ base: 1, md: 4 }} size={{ base: "xs", md: "md" }} alignItems="center">
            {/* <Link href="/research">Research</Link>
            <Link href="/teaching">Teaching</Link>
            <Link href="/contact">Contact</Link> */}
            <Link href="/bio" mr={{ base: 0, md: 4 }}>
              <Box display={{ base: "inline", md: "none" }}>Bio</Box>
              <Box display={{ base: "none", md: "inline" }}>Bio and Photo</Box>
            </Link>
            <Button asChild><Link href="https://zzz.sfo3.cdn.digitaloceanspaces.com/y/CV%20Hyunwoo%20Park.pdf" target="_blank">CV<GrDocumentPdf /></Link></Button>
            <Button asChild variant="outline" colorScheme="gray" px={{ base: 1, md: 4 }}>
              <Link href="https://dial.snu.ac.kr" target="_blank" rel="noreferrer" aria-label="Lab Homepage">
                <Box display="flex" alignItems="center" gap={1}>Lab Homepage<IoPeopleCircle aria-hidden="true" /></Box>
              </Link>
            </Button>

            <DrawerRoot size="md">
              <DrawerBackdrop />
              <DrawerTrigger asChild>
                  <IconButton aria-label="Menu" variant="ghost"><RiMenuFill /></IconButton>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <VStack gap={8} mt={8}>
                    <For each={["v4", "v3", "v2", "v1"]}>
                      {(stub) => (
                      <Heading key={stub} as="h3"><Link href={"/"+stub}>Past Homepage {toCamelCase(stub)}</Link></Heading>
                      )}
                    </For>
                  </VStack>
                  <Spacer py={4} />
                  <VStack gap={8} mt={8}>
                    <For each={["netview"]}>
                      {(stub) => (
                      <Heading key={stub} as="h3">
                        <Link href={"/"+stub}>
                          <VStack gap={0}>
                          <Box>NetView</Box>
                          <Box fontSize={"md"}>(Simple Network Viewer)</Box>
                          </VStack>
                        </Link>
                      </Heading>
                      )}
                    </For>
                  </VStack>
                </DrawerBody>
                {/* <DrawerFooter>
                  <DrawerActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerActionTrigger>
                  <Button>Save</Button>
                </DrawerFooter> */}
                <DrawerCloseTrigger />
              </DrawerContent>
            </DrawerRoot>

          </ButtonGroup>

        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
