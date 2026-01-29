"use client";

import {
  For,
  Badge,
  Box,
  Container,
  Flex,
  Image,
  IconButton,
  Heading,
  Text,
  Link,
  Separator,
  Stack,
  HStack,
  Collapsible,
} from "@chakra-ui/react";
import { RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";
import { Radio } from "../components/ui/radio";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Checkbox } from "../components/ui/checkbox";
import expsData from "../src/data/exps.json";
import edusData from "../src/data/edus.json";
import pubsData from "../src/data/pubs.json";
import procsData from "../src/data/procs.json";
import booksData from "../src/data/books.json";
import awardsData from "../src/data/awards.json";
import teachingData from "../src/data/teaching.json";
import servsData from "../src/data/servs.json";
import talksData from "../src/data/talks.json";
import confsData from "../src/data/confs.json";
import othersData from "../src/data/others.json";
import softwareData from "../src/data/software.json";

export default function Page() {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Sidebar />

        <Box w={{ base: "full", md: "3/4" }}>
          {/* Main Content */}
          <For
            each={[
              "exps",
              "edus",
              "pubs",
              "procs",
              "books",
              "awards",
              "teaching",
              "servs",
              "talks",
              "confs",
              "others",
              "software",
            ]}
          >
            {(stub, index) => {
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
                  case "awards":
                    return awardsData;
                  case "teaching":
                    return teachingData;
                  case "servs":
                    return servsData;
                  case "talks":
                    return talksData;
                  case "confs":
                    return confsData;
                  case "others":
                    return othersData;
                  case "software":
                    return softwareData;
                  default:
                    return [];
                }
              })();
              if (data) {
                return <Section key={stub} data={data} stub={stub} />;
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
  const [showConfsDetails, setShowConfsDetails] = useState(false);
  const [showOthersDetails, setShowOthersDetails] = useState(false);
  const [pubFilter, setPubFilter] = useState("utd24ft50");
  const baseMx = 4;
  const badgeColor = {
    utd24: "blue",
    ft50: "red",
    abs: "orange",
    "abs4*": "orange",
    abs4: "orange",
    abs3: "orange",
    "top cs": "green",
  };
  const badgeSrc = {
    utd24: "https://jsom.utdallas.edu/the-utd-top-100-business-school-research-rankings/",
    ft50: "https://www.ft.com/content/3405a512-5cbb-11e1-8f1f-00144feabdc0",
    abs: "https://charteredabs.org/academic-journal-guide",
  };

  return (
    <Box py={8} fontSize={{ base: "sm", md: "md" }} lineHeight={1.2}>
      <Box>
        <Heading
          as="h3"
          size="xl"
          fontWeight="bold"
          ml={{ base: 0, md: baseMx }}
          display={{ base: stub === "pubs" ? "block" : "flex", md: "flex" }}
          alignItems="center"
          gap={2}
        >
          {data.title
            ? data.title
            : stub === "confs"
            ? "Conference Presentations"
            : stub === "others"
            ? "Others"
            : ""}
          {stub === "confs" && (
            <Checkbox
              variant="subtle"
              ml="auto"
              onChange={(e) =>
                setShowConfsDetails((e.target as HTMLInputElement).checked)
              }
            >
              <Text mr={{ base: 0, md: 1 * baseMx }}>Show Details</Text>
            </Checkbox>
          )}
          {stub === "others" && (
            <Checkbox
              variant="subtle"
              ml="auto"
              onChange={(e) =>
                setShowOthersDetails((e.target as HTMLInputElement).checked)
              }
            >
              <Text mr={{ base: 0, md: 1 * baseMx }}>Show Details</Text>
            </Checkbox>
          )}
          {stub === "pubs" && (
            <Stack 
              direction={{ base: "column", md: "row" }} 
              gap={{ base: 4, md: 6 }} 
              ml={{ base: 0, md: "auto" }}
              mr={{ base: 0, md: baseMx }}
              align={{ base: "flex-start", md: "center" }}
              display={{ base: "none", md: "flex" }}
            >
              <ChakraRadioGroup.Root
                value={pubFilter}
                onValueChange={(e) => setPubFilter(e.value)}
                display="flex"
                flexDirection="row"
                gap={1}
              >
                {["all", "utd24ft50", "abs"].map((value, index) => (
                  <ChakraRadioGroup.Item
                    key={value}
                    value={value}
                    display="flex"
                    alignItems="center"
                    mr={4}
                  >
                    <ChakraRadioGroup.ItemHiddenInput />
                    <ChakraRadioGroup.ItemIndicator />
                    <ChakraRadioGroup.ItemText ml={-1} fontSize="sm">
                      {value === "all" ? "All" : value === "utd24ft50" ? "UTD24/FT50" : value.toUpperCase()}
                    </ChakraRadioGroup.ItemText>
                  </ChakraRadioGroup.Item>
                ))}
              </ChakraRadioGroup.Root>
              <HStack gap={2}>
                {["utd24", "ft50", "abs"].map((topItem) => (
                  <Badge
                    size="sm"
                    variant="subtle"
                    colorPalette={badgeColor[topItem]}
                    key={topItem}
                  >
                    <Link href={badgeSrc[topItem]} target="_blank">
                      {topItem.toUpperCase()} &#8599;
                    </Link>
                  </Badge>
                ))}
              </HStack>
            </Stack>
          )}
        </Heading>
        {stub === "pubs" && (
          <Stack 
            direction={{ base: "column", md: "row" }} 
            gap={{ base: 4, md: 6 }} 
            mt={{ base: 4, md: 0 }}
            ml={{ base: 0, md: baseMx }}
            align={{ base: "flex-start", md: "center" }}
            display={{ base: "flex", md: "none" }}
          >
            <ChakraRadioGroup.Root
              value={pubFilter}
              onValueChange={(e) => setPubFilter(e.value)}
              display="flex"
              flexDirection="row"
              gap={1}
            >
              {["all", "utd24ft50", "abs"].map((value, index) => (
                <ChakraRadioGroup.Item
                  key={value}
                  value={value}
                  display="flex"
                  alignItems="center"
                  mr={4}
                >
                  <ChakraRadioGroup.ItemHiddenInput />
                  <ChakraRadioGroup.ItemIndicator />
                  <ChakraRadioGroup.ItemText ml={-1} fontSize="sm">
                    {value === "all" ? "All" : value === "utd24ft50" ? "UTD24/FT50" : value.toUpperCase()}
                  </ChakraRadioGroup.ItemText>
                </ChakraRadioGroup.Item>
              ))}
            </ChakraRadioGroup.Root>
            <HStack gap={2}>
              {["utd24", "ft50", "abs"].map((topItem) => (
                <Badge
                  size="sm"
                  variant="subtle"
                  colorPalette={badgeColor[topItem]}
                  key={topItem}
                >
                  <Link href={badgeSrc[topItem]} target="_blank">
                    {topItem.toUpperCase()} &#8599;
                  </Link>
                </Badge>
              ))}
            </HStack>
          </Stack>
        )}
      </Box>
      <Separator mb={4} mt={2} />

      {stub === "pubs" || stub === "procs" || stub === "books" ? (
        <Box as="ul" listStyleType="none" pl={{ base: 0 * baseMx, md: 1 * baseMx }}>
          <For each={stub === "pubs" ? data.items.filter((item: any) => {
            if (pubFilter === "all") return true;
            if (pubFilter === "utd24ft50") {
              return item.top && (item.top.includes("utd24") || item.top.includes("ft50"));
            }
            if (pubFilter === "abs") {
              return item.top && (item.top.includes("abs") || item.top.includes("abs4*") || item.top.includes("abs4") || item.top.includes("abs3"));
            }
            return item.top && item.top.includes(pubFilter);
          }) : data.items}>
            {(item: any, idx: number) => (
              <Flex as="li" key={idx} mb={4} alignItems="start">
                <Box
                  minW="2em"
                  textAlign="right"
                  mr={2}
                  ml={{ base: 0, md: 0.5 * baseMx }}
                >
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
                    })()} ({item.year}). <em style={{ fontStyle: "italic" }}>{item.journal}</em>
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
      ) : stub === "awards" ? (
        <Box>
          {["award", "fellowship", "grant"].map((sectionType) => {
            const filteredItems = data.items.filter(
              (item: any) => item.type === sectionType
            );
            if (filteredItems.length === 0) return null;

            return (
              <Box
                key={sectionType}
                mb={2 * baseMx}
                ml={{ base: baseMx, md: 2 * baseMx }}
              >
                <Heading as="h3" size="lg" mb={2}>
                  {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}s
                </Heading>
                <Box
                  as="ul"
                  listStyleType="disc"
                  ml={{ base: 1 * baseMx, md: 2 * baseMx }}
                >
                  <For each={filteredItems}>
                    {(item: any, idx: number) => (
                      <Box as="li" key={idx} mb={2}>
                        <Text>
                          {item.special ? <strong>{item.title}</strong> : item.title}
                          {`, ${item.awarder}, ${item.year}`}
                          {item.notes ? `, ${item.notes}` : ""}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : stub === "teaching" ? (
        <Box>
          <For each={data.items}>
            {(instItem: any, idx: number) => (
              <Box
                key={idx}
                mb={2 * baseMx}
                ml={{ base: baseMx, md: 2 * baseMx }}
              >
                <Heading as="h3" size="lg" mb={2} lineHeight={1.05}>
                  {instItem.institution}
                </Heading>
                <For each={instItem.courses}>
                  {(course: any, cIdx: number) => (
                    <Box key={cIdx} mb={2}>
                      <Heading as="h4" size="md" mb={1} ml={{ base: 0, md: 1 * baseMx }}>
                        {course.role}
                      </Heading>
                      {course.details && (
                        <Box
                          as="ul"
                          listStyleType="disc"
                          mb={{ base: 0.5 * baseMx, md: 0.5 * baseMx }}
                          ml={{ base: 1 * baseMx, md: 3 * baseMx }}
                        >
                          <For each={course.details}>
                            {(detail: string, dIdx: number) => (
                              <Box as="li" key={dIdx} mb={1}>
                                {detail}
                              </Box>
                            )}
                          </For>
                        </Box>
                      )}
                    </Box>
                  )}
                </For>
              </Box>
            )}
          </For>
        </Box>
      ) : stub === "servs" ? (
        <Box>
          <For each={data.items}>
            {(serviceItem: ServItem, sIdx: number) => (
              <Box
                key={sIdx}
                mb={2 * baseMx}
                ml={{ base: baseMx, md: 2 * baseMx }}
              >
                <Heading as="h3" size="lg" mb={2}>
                  {serviceItem.title}
                </Heading>
                <For each={serviceItem.details}>
                  {(detail: string | ServCategoryDetail, dIdx: number) => {
                    if (typeof detail === "string") {
                      return (
                        <Box
                          as="ul"
                          listStyleType="disc"
                          ml={{ base: baseMx, md: 2 * baseMx }}
                          key={dIdx}
                          mb={2}
                        >
                          <Box as="li">
                            <Text>{detail}</Text>
                          </Box>
                        </Box>
                      );
                    } else {
                      if (
                        serviceItem.title === "Ad-hoc Reviewer" &&
                        (detail.category === "Journals" ||
                          detail.category === "Conferences")
                      ) {
                        return (
                          <Box key={dIdx} mb={2}>
                            <Heading as="h4" size="md" mb={1} ml={{ base: 0, md: 1 * baseMx }}>
                              {detail.category}
                            </Heading>
                            <Text ml={{ base: baseMx, md: 2 * baseMx }}>
                              {detail.subdetails.join(", ")}
                            </Text>
                          </Box>
                        );
                      } else {
                        return (
                          <Box key={dIdx} mb={2}>
                            <Heading as="h4" size="md" mb={1} ml={{ base: 0, md: 1 * baseMx }}>
                              {detail.category}
                            </Heading>
                            <Box
                              as="ul"
                              listStyleType="disc"
                              ml={{ base: baseMx, md: 2 * baseMx }}
                            >
                              <For each={detail.subdetails}>
                                {(sub: string, subIdx: number) => (
                                  <Box
                                    as="li"
                                    key={subIdx}
                                    mb={1}
                                    ml={{ base: 0, md: 1 * baseMx }}
                                  >
                                    <Text>{sub}</Text>
                                  </Box>
                                )}
                              </For>
                            </Box>
                          </Box>
                        );
                      }
                    }
                  }}
                </For>
              </Box>
            )}
          </For>
        </Box>
      ) : stub === "software" ? (
        <Box>
          <Box
            as="ul"
            listStyleType="disc"
            ml={{ base: 2 * baseMx, md: 3 * baseMx }}
          >
            <For each={data.items}>
              {(item: any, idx: number) => (
                <Box as="li" key={idx} mb={2}>
                  <Text>
                    <strong>{item.name}</strong>,{" "}
                    <Link href={item.link} target="_blank">
                      {item.link}
                    </Link>
                  </Text>
                </Box>
              )}
            </For>
          </Box>
        </Box>
      ) : stub === "others" ? (
        <Box>
          <Box
            as="ul"
            listStyleType="disc"
            ml={{ base: 2 * baseMx, md: 3 * baseMx }}
          >
            <For each={data.items}>
              {(item: any, idx: number) => (
                <Box as="li" key={idx} mb={2}>
                  <Text>
                    <strong>{item.institution}</strong>, {item.location},{" "}
                    {item.period}, {item.role}
                  </Text>
                  <Collapsible.Root open={showOthersDetails}>
                    <Collapsible.Content>
                      <Box
                        as="ul"
                        listStyleType="circle"
                        mb={3}
                        ml={{ base: baseMx, md: 1.5 * baseMx }}
                      >
                        <For each={item.details}>
                          {(detail: any, i: number) => (
                            <Box as="li" key={i} mt={1}>
                              {detail}
                            </Box>
                          )}
                        </For>
                      </Box>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Box>
              )}
            </For>
          </Box>
        </Box>
      ) : stub === "talks" ? (
        <Box>
          {(() => {
            const years = [...new Set(data.items.map((item: any) => item.year))].sort(
              (a: number, b: number) => b - a
            );
            return years.map((year: number) => {
              const filteredItems = data.items.filter(
                (item: any) => item.year === year
              );
              return (
                <Box key={year} mb={baseMx} ml={{ base: baseMx, md: 2 * baseMx }}>
                  <Heading as="h4" size="md" mb={0}>
                    {year}
                  </Heading>
                  <Box
                    as="ul"
                    listStyleType="disc"
                    mb={0 * baseMx}
                    ml={{ base: 1 * baseMx, md: 2 * baseMx }}
                  >
                    <For each={filteredItems}>
                      {(item: any, idx: number) => (
                        <Box as="li" key={idx} mb={0.25 * baseMx}>
                          <Text>{item.institution}</Text>
                        </Box>
                      )}
                    </For>
                  </Box>
                </Box>
              );
            });
          })()}
        </Box>
      ) : stub === "confs" ? (
        <Box>
          {(() => {
            // Collect all distinct years from conference entries
            const years = [
              ...new Set(
                data.items.flatMap((item: any) =>
                  item.conferences.map((c: any) => c.year)
                )
              ),
            ].sort((a: number, b: number) => b - a);

            return years.map((year: number) => {
              // For each year, gather all (conference name/location) + presentation titles
              const confsForYear = data.items.flatMap((item: any) =>
                item.conferences
                  .filter((c: any) => c.year === year)
                  .map((c: any) => ({
                    name: c.name,
                    location: c.location,
                    title: item.title,
                  }))
              );

              // Group by conference name + location
              const groupMap = new Map<string, Array<{ title: string }>>();
              confsForYear.forEach(({ name, location, title }) => {
                const confKey = `${name}///${location || ""}`;
                if (!groupMap.has(confKey)) {
                  groupMap.set(confKey, []);
                }
                groupMap.get(confKey)?.push({ title });
              });

              // Sort the conferences by name in alphabetical order
              const confGroups = Array.from(groupMap.entries()).sort(
                ([aKey], [bKey]) => {
                  const [aName] = aKey.split("///");
                  const [bName] = bKey.split("///");
                  return aName.localeCompare(bName);
                }
              );

              return (
                <Box key={year} mb={baseMx} ml={{ base: baseMx, md: 2 * baseMx }}>
                  <Heading as="h4" size="md" mb={1}>
                    {year}
                  </Heading>
                  <Box
                    as="ul"
                    listStyleType="disc"
                    ml={{ base: 1 * baseMx, md: 2 * baseMx }}
                  >
                    <For each={confGroups}>
                      {([confKey, presentations], index) => {
                        const [confName, confLocation] = confKey.split("///");
                        return (
                          <Box as="li" key={index} mb={1}>
                            <Text
                              mb={1}
                              fontWeight={showConfsDetails ? "bold" : "normal"}
                            >
                              {confName}
                              {confLocation ? `, ${confLocation}` : ""}
                            </Text>
                            <Collapsible.Root open={showConfsDetails}>
                              <Collapsible.Content>
                                <Box
                                  as="ul"
                                  listStyleType="circle"
                                  ml={{ base: baseMx, md: 1.5 * baseMx }}
                                >
                                  <For each={presentations}>
                                    {(p: any, i: number) => (
                                      <Box as="li" key={i} mb={0.25 * baseMx}>
                                        <Text>{p.title}</Text>
                                      </Box>
                                    )}
                                  </For>
                                </Box>
                              </Collapsible.Content>
                            </Collapsible.Root>
                          </Box>
                        );
                      }}
                    </For>
                  </Box>
                </Box>
              );
            });
          })()}
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
