import { For, Box, Container, Flex, Image, IconButton, Heading, Text, Link, Separator, Stack, HStack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import expsData from "../src/data/exps.json";
import edusData from "../src/data/edus.json";

export default function Page() {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Sidebar />

        <Box w={{ base: "full", md: "3/4" }}>
          {/* Main Content */}
          <For each={["exps", "edus"]}>
            {(stub) => {
              const data = stub === "exps" ? expsData : edusData;
              return <><Section data={data} /></>;
            }}
          </For>
        </Box>
      </Flex>
    </Container>
  );
}


// Reusable Section Component
const Section = ({ data }: { data: any }) => {
  const baseMx = 4;
  return (
    <Box py={8} fontSize="sm" lineHeight={1.2}>
      <Heading as="h3" size="xl" fontWeight="bold" ml={baseMx}>
        {data.title}
      </Heading>
        <Separator mb={4} mt={2} width={64} />
      <For each={data.items}>
        {(item: any, idx: number) => (
          <Box key={idx} mb={4}>
            <Heading as="h4" size="lg" mb={1} ml={2*baseMx}>
              {item.institution}
            </Heading>
            <For each={item.details}>
              {(detail: any, i: number) => (
                <Text key={i} mb={1} ml={3*baseMx}>
                  {detail}
                </Text>
              )}
            </For>
          </Box>
        )}
      </For>
    </Box>
  );
};