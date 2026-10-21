"use client";

import { Box, Container, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import LegacySections from "./components/LegacySections";
import CvResearchAdditions from "./components/CvResearchAdditions";

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Sidebar />
        <Box w={{ base: "full", md: "3/4" }} minW={0}>
          <LegacySections sections={["exps", "edus", "pubs", "procs"]} />
          <CvResearchAdditions />
          <LegacySections sections={["books", "awards", "teaching", "servs", "talks", "confs", "others", "software"]} />
        </Box>
      </Flex>
    </Container>
  );
}
