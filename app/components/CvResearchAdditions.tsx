"use client";

import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import working from "../../src/data/working-papers.json";
import research from "../../src/data/research.json";

export default function CvResearchAdditions() {
  return <Box py={8} fontSize={{ base: "sm", md: "md" }} lineHeight={1.6}>
    <Heading as="h2" size="xl" fontWeight="bold" ml={{ base: 0, md: 4 }} mb={4}>Working Papers and Research in Progress</Heading>
    <Stack gap={4} ml={{ base: 0, md: 4 }}>
        {working.items.map(p => <Box key={p.id}><Text fontWeight="semibold">{p.title}</Text><Text>{p.authors} · {p.status}, {p.year}</Text>{p.cvNote && <Text fontSize="sm">{p.cvNote}</Text>}</Box>)}
        <Heading as="h3" size="md" mt={4}>Selected Research in Progress</Heading>
        {research.ongoing.filter(p => p.cvSelected).map(p => <Box key={p.title}><Text fontWeight="semibold">{p.title}</Text><Text>{p.description}</Text></Box>)}
    </Stack>
  </Box>;
}
