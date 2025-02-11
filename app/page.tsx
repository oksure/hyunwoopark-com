import { For, Badge, Box, Container, Flex, Image, IconButton, Heading, Text, Link, Separator, Stack, HStack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import expsData from "../src/data/exps.json";
import edusData from "../src/data/edus.json";
import pubsData from "../src/data/pubs.json";
import procsData from "../src/data/procs.json";
import booksData from "../src/data/books.json";

export default function Page() {
  return (
  <Container maxW="container.xl" py={8}>
    <Flex direction={{ base: "column", md: "row" }} gap={8}>
      <Sidebar />

      <Box w={{ base: "full", md: "3/4" }}>
        {/* Main Content */}
        <For each={["exps", "edus", "pubs", "procs", "books"]}>
          {(stub) => {
            const data = (() => {
              switch (stub) {
                case "exps":
                  return expsData;
                case "edus":
                  return edusData;
                case "pubs":
                  return pubsData;
                case "procs":
                  return procsData;
                case "books":
                  return booksData;
                default:
                  return [];
              }
            })();
            if (data) {
              return <Section data={data} stub={stub} />;
            } else {
              return <></>;
            }
          }}
        </For>
      </Box>
    </Flex>
  </Container>
  );
}

// Reusable Section Component
const Section = ({ data, stub }: { data: any; stub: string }) => {
  const baseMx = 4;
  const badgeColor = { utd24: "blue", ft50: "red", "abs": "orange", "abs4*": "orange", "abs4": "orange", "abs3": "orange", "top cs": "green" };
  const badgeSrc = { utd24: "https://jsom.utdallas.edu/the-utd-top-100-business-school-research-rankings/", ft50: "https://www.ft.com/content/3405a512-5cbb-11e1-8f1f-00144feabdc0", abs: "https://charteredabs.org/academic-journal-guide" };
  return (
    <Box py={8} fontSize={{ base: "sm", md: "md" }} lineHeight={1.2}>
      <Heading
        as="h3"
        size="xl"
        fontWeight="bold"
        ml={{ base: 0, md: baseMx }}
        display="flex"
        alignItems="center"
        gap={2}
      >
        {data.title}
        {(stub === "pubs") && (
          <HStack gap={2}>
            {["utd24", "ft50", "abs"].map((topItem) => (
              <Badge
                size="sm"
                variant="subtle"
                colorPalette={badgeColor[topItem]}
              >
                <Link href={badgeSrc[topItem]} target="_blank">{topItem.toUpperCase()} &#8599;</Link>
              </Badge>
            ))}
          </HStack>
        )}
      </Heading>
      <Separator mb={4} mt={2} />
      {(stub === "pubs" || stub === "procs" || stub === "books") ? (
        <Box as="ul" listStyleType="none" pl={{ base: 0 * baseMx, md: 1 * baseMx }}>
          <For each={data.items}>
            {(item: any, idx: number) => (
              <Flex
                as="li"
                key={idx}
                mb={4}
                alignItems="start"
              >
                <Box minW="2em" textAlign="right" mr={2} ml={{ base: 0, md: 0.5 * baseMx }}>
                  [{data.items.length - idx}]
                </Box>
                <Box>
                  <Box>
                    <Link href={item.link} target="_blank">
                      {item.title}
                    </Link>
                  </Box>
                  <Text mt={1}>
                    {(() => {
                      const authors = item.authors || "";
                      if (!authors.includes("Park H")) {
                        return authors;
                      }
                      const segments = authors.split("Park H");
                      return segments.map((segment: string, i: number) => (
                        <span key={i}>
                          {segment}
                          {i < segments.length - 1 && <strong>Park H</strong>}
                        </span>
                      ));
                    })()}{" "}
                    ({item.year}).{" "}
                    <em style={{ fontStyle: "italic" }}>{item.journal}</em>
                    <em style={{ fontStyle: "italic" }}>{item.proceedings}</em>
                    <em style={{ fontStyle: "italic" }}>{item.notes}</em>
                    {item.volume ? `, ${item.volume}` : ""}
                    {item.number ? `(${item.number})` : ""}
                    {item.pages ? `: ${item.pages}` : ""}
                    .
                  </Text>
                  {item.top && (
                    <Box mt={1}>
                      {item.top.map((topItem: string, topIdx: number) => (
                        <Badge
                          key={topIdx}
                          size="sm"
                          variant="subtle"
                          colorPalette={badgeColor[topItem]}
                          mr={1}
                        >
                          {topItem.toUpperCase()}
                        </Badge>
                      ))}
                    </Box>
                  )}
                </Box>
              </Flex>
            )}
          </For>
        </Box>
      ) : (
        <For each={data.items}>
          {(item: any, idx: number) => (
            <Box key={idx} mb={{ base: 4, md: baseMx }}>
              <Heading as="h4" size="lg" mb={1} ml={{ base: 0, md: 2 * baseMx }}>
                <Box display={{ base: "inline", md: "none" }}>
                  {item.instshort ? item.instshort : item.institution}
                </Box>
                <Box display={{ base: "none", md: "inline" }}>
                  {item.institution}
                </Box>
              </Heading>
              <For each={item.details}>
                {(detail: any, i: number) => (
                  <Text key={i} mb={1} ml={{ base: baseMx, md: 3 * baseMx }}>
                    {detail}
                  </Text>
                )}
              </For>
            </Box>
          )}
        </For>
      )}
    </Box>
  );
};