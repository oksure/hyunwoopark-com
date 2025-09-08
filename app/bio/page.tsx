"use client";

import {
  Box,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  Link,
  Separator,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCopy } from "react-icons/fa6";
import { useState } from "react";
import { Tooltip } from "../../components/ui/tooltip";

export default function BioPage() {
  const [copiedEn, setCopiedEn] = useState(false);
  const [copiedKo, setCopiedKo] = useState(false);

  const bioEnglish = `Hyunwoo Park is an Associate Professor in the Graduate School of Data Science at Seoul National University. He served as the Vice Dean for Academic Affairs in 2023-2025. Before joining SNU, he was an Assistant Professor in Management Sciences at the Fisher College of Business and a Core Faculty for the Translational Data Analytics Institute (TDAI) at The Ohio State University. Prior to OSU, he was a postdoctoral fellow at the Tennenbaum Institute at Georgia Tech. He holds a Ph.D. in Industrial Engineering from Georgia Tech, a Master of Information Management and Systems from UC Berkeley, and a B.S. in Electrical Engineering from Seoul National University.

His research interests include business and data analytics with an emphasis on visualization, supply chain management from the network perspective, and technology and innovation management in the presence of digital platforms.

His research has been published in leading journals including Academy of Management Review, Decision Sciences, Decision Support Systems, IEEE Transactions on Engineering Management (TEM), IEEE Transactions on Visualization and Computer Graphics (TVCG), Journal of Operations Management, and Research Policy.

He won the TIM (Technology and Innovation Management) Division Best Student Paper Award at the Academy of Management in 2015 and the OCIS (Organizational Communication and Information Systems) Division Best Paper Award at the Academy of Management in 2017. His paper was a finalist for the Chan Hahn Best Paper Award in the OSCM (Operations and Supply Chain Management) Division at the Academy of Management in 2020. His dissertation was awarded a Runner-up for the INFORMS TIMES (Technology, Innovation Management and Entrepreneurship Section) Best Dissertation Award in 2017. He served the INFORMS TIMES community in leadership roles in 2021-2025 and he was the President of the INFORMS TIMES in 2024.`;

  const bioKorean = `박현우 교수는 현재 서울대학교 데이터사이언스대학원의 교수로 재직 중이다. 서울대학교에 부임하기 전에는 오하이오 주립대학교 경영대학에서 교수로 근무했으며, 데이터 애널리틱스 인스티튜트 소속으로 활동했다. 전문 연구 분야로는 데이터 분석 및 시각화, AI 시대의 제품과 서비스 혁신, 기업 간 네트워크 분석, 데이터에 기반한 오퍼레이션 관리 등이 있다. 그의 연구는 공학과 경영학 분야의 최상위 저널 등에 다수 게재되었으며, 미국경영학회와 INFORMS와 같은 우수 학회에서 다수의 논문상을 수상한 경력이 있다. 2024년 미국산업공학회 혁신경영 분과장을 역임하였다. 서울대 전기공학사(2008), UC버클리 정보관리시스템 석사(2010), 조지아공과대학 산업공학 박사(2015).`;

  const handleCopy = (text: string, lang: 'en' | 'ko') => {
    navigator.clipboard.writeText(text);
    if (lang === 'en') {
      setCopiedEn(true);
      setTimeout(() => setCopiedEn(false), 2000);
    } else {
      setCopiedKo(true);
      setTimeout(() => setCopiedKo(false), 2000);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <Link href="/" alignSelf="flex-start" display="flex" alignItems="center" gap={2}>
          <FaArrowLeft /> Back to Home
        </Link>

        <Heading as="h1" size="3xl" textAlign="center">
          Bio and Photo
        </Heading>

        <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={8}>
          {/* Bio Section - 2/3 width on desktop */}
          <Box flex={{ base: "1", md: "2" }}>
            <VStack gap={8} align="stretch">
              <Box>
                <HStack justify="space-between" mb={4}>
                  <Heading as="h2" size="xl">
                    Bio (English)
                  </Heading>
                  <Tooltip content={copiedEn ? "Copied!" : "Copy to clipboard"}>
                    <IconButton 
                      variant="ghost" 
                      size="sm"
                      aria-label="Copy English bio"
                      onClick={() => handleCopy(bioEnglish, 'en')}
                    >
                      <FaCopy />
                    </IconButton>
                  </Tooltip>
                </HStack>
                <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-wrap">
                  {bioEnglish}
                </Text>
              </Box>

              <Separator />

              <Box>
                <HStack justify="space-between" mb={4}>
                  <Heading as="h2" size="xl">
                    약력 (한국어)
                  </Heading>
                  <Tooltip content={copiedKo ? "Copied!" : "Copy to clipboard"}>
                    <IconButton 
                      variant="ghost" 
                      size="sm"
                      aria-label="Copy Korean bio"
                      onClick={() => handleCopy(bioKorean, 'ko')}
                    >
                      <FaCopy />
                    </IconButton>
                  </Tooltip>
                </HStack>
                <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-wrap">
                  {bioKorean}
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Photo Section - 1/3 width on desktop */}
          <Box flex={{ base: "1", md: "1" }} position={{ md: "sticky" }} top="100px" h="fit-content">
            <VStack gap={6}>
              <Heading as="h2" size="lg" mb={2}>
                Profile Photos
              </Heading>
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
                <Link 
                  href="https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Square.png" 
                  download="Hyunwoo_Park_Square.png"
                  target="_blank"
                  display="block"
                  mt={2}
                  textAlign="center"
                  fontSize="xs"
                  color="blue.600"
                  _hover={{ textDecoration: "underline" }}
                >
                  ↓ Download hi-res square (4.2MB)
                </Link>
              </Box>
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
                <Link 
                  href="https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Cropped.png" 
                  download="Hyunwoo_Park_Portrait.png"
                  target="_blank"
                  display="block"
                  mt={2}
                  textAlign="center"
                  fontSize="xs"
                  color="blue.600"
                  _hover={{ textDecoration: "underline" }}
                >
                  ↓ Download hi-res portrait (7.2MB)
                </Link>
              </Box>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
}