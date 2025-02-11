import { For, Flex, Container, Text, Link, Stack, Spacer } from "@chakra-ui/react";
import { toCamelCase } from "../../src/utils/utils";

const Footer = () => {
  return (
    <Flex as="footer" fontSize="sm" bg="bg.muted" py={8} color="gray.600" direction="column"> {/* Changed to column direction */}
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", md: "row" }} alignItems="top">
          <Stack direction="column" gap={4} width={48}>
            <Text>
              &copy; {new Date().getFullYear()} Hyunwoo Park
            </Text>
            <Text>Built with <Link href="https://nextjs.org/" target="_blank">Next.js</Link>, <Link href="https://chakra-ui.com/" target="_blank">chakra-ui</Link>, <Link href="https://react-icons.github.io/react-icons/" target="_blank">react-icons</Link>, and <Link href="https://vercel.com/" target="_blank">Vercel</Link>.</Text>
          </Stack>
          <Spacer minH={6} /> {/* Add Spacer to push links to the right */}
          <Stack direction="row" gap={12}>
            {/* <Stack direction="column" gap={4} minW={48}>
              <For each={["bio", "photos", "places", "personal", "contacts", "maps"]}>
                {(stub) => (
                  <Link href={"/"+stub}>{toCamelCase(stub)}</Link>
                )}
              </For>
            </Stack> */}
            <Stack direction="column" gap={4} width={48}>
              <Link href="https://snu.ac.kr" target="_blank">Seoul National University &#8599;</Link>
              <Link href="https://gsds.snu.ac.kr" target="_blank">SNU Graduate School of Data Science (GSDS) &#8599;</Link>
              <Link href="https://vibalab.org" target="_blank">Visualization and Business Analytics Lab (ViBA Lab) &#8599;</Link>
            </Stack>
          </Stack>
        </Flex>
      </Container>
      <Spacer minH={4} />
    </Flex>
  );
};

export default Footer;