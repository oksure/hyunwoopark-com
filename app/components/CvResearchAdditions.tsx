"use client";

import { Box, Heading, Link, Text, Stack } from "@chakra-ui/react";
import working from "../../src/data/working-papers.json";
import resources from "../../src/data/resources.json";
import research from "../../src/data/research.json";
import patents from "../../src/data/patents.json";

export default function CvResearchAdditions({ mode }: { mode: "working" | "resources" }) {
  return <Box py={8} fontSize={{ base: "sm", md: "md" }} lineHeight={1.6}>
    <Heading as="h2" size="xl" fontWeight="bold" ml={{ base: 0, md: 4 }} mb={4}>{mode === "working" ? "Working Papers and Research in Progress" : resources.title}</Heading>
    <Stack gap={4} ml={{ base: 0, md: 4 }}>
      {mode === "working" ? <>
        {working.items.map(p => <Box key={p.id}><Text fontWeight="semibold">{p.title}</Text><Text>{p.authors} · {p.status}, {p.year}</Text>{p.cvNote && <Text fontSize="sm">{p.cvNote}</Text>}</Box>)}
        <Heading as="h3" size="md" mt={4}>Selected Research in Progress</Heading>
        {research.ongoing.filter(p => p.cvSelected).map(p => <Box key={p.title}><Text fontWeight="semibold">{p.title}</Text><Text>{p.description}</Text></Box>)}
      </> : <>
        {resources.items.map(r => <Box key={r.id}><Link href={r.link} target="_blank" rel="noreferrer" fontWeight="semibold">{r.name}</Link><Text>{r.description}</Text><Text fontSize="sm">{r.kind} · {r.year}</Text></Box>)}
        <Heading as="h3" size="md" mt={4}>{patents.title}</Heading>
        {patents.items.map(p => <Text key={p.id}>{p.description} {p.year}. {p.status}.</Text>)}
      </>}
    </Stack>
  </Box>;
}
