"use client";

import {
  Box,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Link,
  Separator,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCopy } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "../../components/ui/tooltip";

export default function BioPage() {
  const [copyStatus, setCopyStatus] = useState<{ id: string; ok: boolean } | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bios = [
    {
      id: "en-short",
      language: "English",
      lang: "en",
      length: "Short bio",
      text: `Hyunwoo Park is an Associate Professor at the Graduate School of Data Science, Seoul National University. He studies how AI and data reshape human judgment, organizational work, and the design of products and services. His work also spans visual analytics, supply chain networks, and technology and innovation management.`,
    },
    {
      id: "en-standard",
      language: "English",
      lang: "en",
      length: "Standard bio",
      text: `Hyunwoo Park is an Associate Professor at the Graduate School of Data Science, Seoul National University. He studies how AI and data reshape human judgment, organizational work, and the design of products and services, alongside research on visual analytics and supply chain networks. He previously served as Associate Dean for Academic Affairs at SNU's Graduate School of Data Science. Before joining SNU, he was an Assistant Professor at the Fisher College of Business, The Ohio State University, and a postdoctoral fellow at Georgia Tech. His research has appeared in Academy of Management Review, Journal of Operations Management, Production and Operations Management, Research Policy, and IEEE Transactions on Visualization and Computer Graphics. He was elected to the Young Korean Academy of Science and Technology in 2024 and served as President of INFORMS TIMES in 2024. He holds degrees from Seoul National University, UC Berkeley, and Georgia Tech.`,
    },
    {
      id: "ko-short",
      language: "한국어",
      lang: "ko",
      length: "짧은 약력",
      text: `박현우는 서울대학교 데이터사이언스대학원 부교수다. AI와 데이터가 인간의 판단, 조직의 일, 제품과 서비스의 설계를 어떻게 바꾸는지 연구한다. 데이터 시각화, 공급망 네트워크, 기술혁신경영도 주요 연구 분야다.`,
    },
    {
      id: "ko-standard",
      language: "한국어",
      lang: "ko",
      length: "표준 약력",
      text: `박현우는 서울대학교 데이터사이언스대학원 부교수다. AI와 데이터가 인간의 판단, 조직의 일, 제품과 서비스의 설계를 어떻게 바꾸는지 연구하며, 데이터 시각화와 공급망 네트워크도 다룬다. 서울대학교 데이터사이언스대학원 교무부원장을 지냈고, 서울대 부임 전에는 오하이오주립대학교 피셔경영대학 교수와 조지아공과대학 박사후연구원으로 근무했다. 연구 성과는 Academy of Management Review, Journal of Operations Management, Production and Operations Management, Research Policy, IEEE Transactions on Visualization and Computer Graphics 등에 게재됐다. 2024년 한국차세대과학기술한림원 회원으로 선출됐으며 같은 해 INFORMS TIMES 회장을 맡았다. 서울대학교 전기공학사, UC버클리 정보관리시스템 석사, 조지아공과대학 산업공학 박사 학위를 받았다.`,
    },
  ];

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const showCopyStatus = (id: string, ok: boolean) => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopyStatus({ id, ok });
    copyTimer.current = setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      showCopyStatus(id, false);
      return;
    }

    showCopyStatus(id, true);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <Link href="/" alignSelf="flex-start" display="flex" alignItems="center" gap={2}>
          <FaArrowLeft /> Back to Home
        </Link>

        <Box textAlign="center">
          <Heading as="h1" size="3xl">
            Speaker and Media Kit
          </Heading>
          <Text mt={3} color="gray.600" _dark={{ color: "gray.400" }}>
            Hyunwoo Park, Associate Professor, Graduate School of Data Science, Seoul National University
          </Text>
        </Box>

        <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={8}>
          {/* Bio Section - 2/3 width on desktop */}
          <Box flex={{ base: "1", md: "2" }}>
            <VStack gap={8} align="stretch">
              {bios.map((bio, index) => (
                <Box key={bio.id} lang={bio.lang}>
                  {index > 0 && <Separator mb={8} />}
                  <HStack justify="space-between" mb={4} align="center">
                    <Box>
                      <Heading as="h2" size="lg">
                        {bio.length}
                      </Heading>
                      <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={1}>
                        {bio.language}
                      </Text>
                    </Box>
                    <HStack gap={2} minW="120px" justify="flex-end">
                      <Text
                        role="status"
                        aria-live="polite"
                        fontSize="sm"
                        minW="72px"
                        textAlign="right"
                        color={copyStatus?.id === bio.id && !copyStatus.ok ? "red.700" : "green.700"}
                        _dark={{ color: copyStatus?.id === bio.id && !copyStatus.ok ? "red.300" : "green.300" }}
                      >
                        {copyStatus?.id === bio.id
                          ? copyStatus.ok
                            ? bio.lang === "ko" ? "복사됨" : "Copied"
                            : bio.lang === "ko" ? "복사 실패" : "Copy failed"
                          : ""}
                      </Text>
                      <Tooltip content={bio.lang === "ko" ? "클립보드에 복사" : "Copy to clipboard"}>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          aria-label={`Copy ${bio.language} ${bio.length}`}
                          onClick={() => handleCopy(bio.text, bio.id)}
                        >
                          <FaCopy />
                        </IconButton>
                      </Tooltip>
                    </HStack>
                  </HStack>
                  <Text fontSize="lg" lineHeight="tall">
                    {bio.text}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Photo Section - 1/3 width on desktop */}
          <Box flex={{ base: "1", md: "1" }} position={{ md: "sticky" }} top="100px" h="fit-content">
            <VStack gap={6}>
              <Heading as="h2" size="lg" mb={2}>
                Press Photos
              </Heading>
              <Box w="100%">
                <Image
                  src="https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Cropped_sm.png"
                  alt="Hyunwoo Park - Portrait"
                  width="100%"
                  maxW={{ base: "300px", md: "200px" }}
                  mx="auto"
                  rounded="lg"
                  shadow="md"
                />
                <Text mt={3} textAlign="center" fontWeight="semibold">
                  Portrait
                </Text>
                <Link
                  href="https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Cropped.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  display="block"
                  mt={1}
                  textAlign="center"
                  fontSize="sm"
                  color="blue.600"
                  _hover={{ textDecoration: "underline" }}
                >
                  Open high resolution (1926 x 3424)
                </Link>
              </Box>
              <Box w="100%">
                <Image
                  src="https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Square_sm.png"
                  alt="Hyunwoo Park - Square"
                  width="100%"
                  maxW={{ base: "300px", md: "200px" }}
                  mx="auto"
                  rounded="lg"
                  shadow="md"
                />
                <Text mt={3} textAlign="center" fontWeight="semibold">
                  Square
                </Text>
                <Link
                  href="https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Square.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  display="block"
                  mt={1}
                  textAlign="center"
                  fontSize="sm"
                  color="blue.600"
                  _hover={{ textDecoration: "underline" }}
                >
                  Open high resolution (1926 x 1926)
                </Link>
              </Box>
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} textAlign="center">
                Photo credit: Hyunwoo Park
              </Text>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
}
