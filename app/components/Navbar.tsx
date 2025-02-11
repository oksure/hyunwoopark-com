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
  Heading
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
import { toCamelCase } from "../../src/utils/utils";

const Navbar = () => {

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
            <ButtonGroup gap="0">
              <Link href="/"><IconButton aria-label="Home" variant="ghost"><RiHome3Line /></IconButton></Link>
              <ClientOnly><ColorModeToggle /></ClientOnly>
            </ButtonGroup>
          </Box>

          <Spacer />

          <ButtonGroup gap="4">
            {/* <Link href="/research">Research</Link>
            <Link href="/teaching">Teaching</Link>
            <Link href="/contact">Contact</Link> */}
            <Button asChild><Link href="https://zzz.sfo3.cdn.digitaloceanspaces.com/hyunwoopark-com/public/CV%20Hyunwoo%20Park.pdf" target="_blank">CV<GrDocumentPdf /></Link></Button>
            {/* <Button variant="ghost"><RiMenuFill /></Button> */}

            {/* <DrawerRoot size="md">
              <DrawerBackdrop />
              <DrawerTrigger asChild>
                  <IconButton aria-label="Menu" variant="ghost"><RiMenuFill /></IconButton>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    <Heading as="h2">Menu</Heading>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <VStack gap="6">
                    <For each={["bio", "photos", "places", "personal", "contacts", "maps"]}>
                      {(stub) => (
                      <Heading as="h3"><Link href={"/"+stub}>{toCamelCase(stub)}</Link></Heading>
                      )}
                    </For>
                  </VStack>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerActionTrigger>
                  <Button>Save</Button>
                </DrawerFooter>
                <DrawerCloseTrigger />
              </DrawerContent>
            </DrawerRoot> */}

          </ButtonGroup>

        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;