import { Flex, Container, Text, Link, Stack, Spacer, Image } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";

const Footer = () => {
  return (
    <Flex as="footer" fontSize="sm" bg="bg.muted" py={8} color="fg" direction="column">
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", md: "row" }} alignItems="top">
          <Stack direction="column" gap={4} width={48}>
            <Link href="https://favicon.io/favicon-generator/" target="_blank">
            <Image
              src={useColorModeValue("/apple-touch-icon.png", "/apple-touch-icon-invert.png")}
              alt="Hyunwoo Park"
              width={12}
              rounded="full"
            />
            </Link>
            <Text>
              &copy; {new Date().getFullYear()} Hyunwoo Park
            </Text>
            <Text>
              Built with <Link href="https://nextjs.org/" target="_blank">Next.js</Link>, <Link href="https://chakra-ui.com/" target="_blank">chakra-ui</Link>, <Link href="https://react-icons.github.io/react-icons/" target="_blank">react-icons</Link>, and <Link href="https://vercel.com/" target="_blank">Vercel</Link>.
            </Text>
          </Stack>
          <Spacer minH={6} />
          <Stack direction="row" gap={12}>
            {/* <Stack direction="column" gap={4} minW={48}>
              <For each={["bio", "photos", "places", "personal", "contacts", "maps"]}>
                {(stub) => (
                  <Link href={"/"+stub}>{toCamelCase(stub)}</Link>
                )}
              </For>
            </Stack> */}
            <Stack direction="column" gap={4} width={48}>
              <Link href="https://y-kast.or.kr/kr/person/member_search_view.php?idx=242" target="_blank">Y-KAST &#8599;</Link>
              <Link href="https://connect.informs.org/times/home" target="_blank">INFORMS TIMES &#8599;</Link>
              <Link href="https://www.linkedin.com/company/informs-times/" target="_blank">INFORMS TIMES LinkedIn &#8599;</Link>
              <Link href="https://www.jom-hub.com/editorial-team" target="_blank">Journal of Operations Management Editorial Review Board &#8599;</Link>
              <Link href="https://onlinelibrary.wiley.com/page/journal/15405915/homepage/editorialboard.html" target="_blank">Decision Sciences Editorial Review Board &#8599;</Link>
            </Stack>
            <Stack direction="column" gap={4} width={48}>
              <Link href="https://snu.ac.kr" target="_blank">Seoul National University &#8599;</Link>
              <Link href="https://gsds.snu.ac.kr" target="_blank">SNU Graduate School of Data Science (GSDS) &#8599;</Link>
              <Link href="https://dial.snu.ac.kr" target="_blank">Data Intelligence and Analytics Lab (DIAL) &#8599;</Link>
            </Stack>
          </Stack>
        </Flex>
      </Container>
      <Spacer minH={4} />
    </Flex>
  );
};

export default Footer;