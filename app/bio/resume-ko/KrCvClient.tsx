"use client";

import {
  Box,
  Container,
  Link,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaFilePdf } from "react-icons/fa6";
import { Tooltip } from "../../../components/ui/tooltip";

export default function KrCvClient() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} align="stretch">
        <HStack justify="space-between" align="center">
          <Link href="/bio/" display="flex" alignItems="center" gap={2}>
            <FaArrowLeft /> Back to Bio
          </Link>
          <Tooltip content="PDF 다운로드">
            <Link href="/assets/cv_kr.pdf" target="_blank" rel="noopener noreferrer">
              <IconButton variant="surface" aria-label="Download PDF">
                <FaFilePdf />
              </IconButton>
            </Link>
          </Tooltip>
        </HStack>

        <Box textAlign="center" mb={2}>
          <Heading as="h1" size="2xl">
            이력서
          </Heading>
          <Text mt={2} color="gray.600" _dark={{ color: "gray.400" }}>
            박현우, 서울대학교 데이터사이언스대학원 교수
          </Text>
          <Link
            href="/assets/cv_kr.pdf"
            target="_blank"
            rel="noopener noreferrer"
            fontSize="sm"
            color="blue.600"
            _dark={{ color: "blue.300" }}
            mt={2}
            display="inline-block"
          >
            PDF 다운로드 (A4 1페이지)
          </Link>
        </Box>

        <Box
          maxW="900px"
          mx="auto"
          w="100%"
          border="1px solid"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
          rounded="lg"
          overflow="hidden"
          bg="white"
          color="#1B2129"
          p={{ base: 4, md: 8 }}
          fontSize={{ base: "sm", md: "md" }}
          lang="ko"
          style={{
            "--prussian": "#173A5C",
            "--steel": "#6A7480",
            "--hairline": "#D9DEE4",
            "--wash": "#EFF3F8",
          } as React.CSSProperties}
        >
          {/* Masthead */}
          <Box display="flex" justifyContent="space-between" alignItems={{ base: "flex-start", md: "flex-end" }} flexDirection={{ base: "column", md: "row" }} gap={4}>
            <Box>
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="900" color="var(--prussian)" letterSpacing="0.22em">
                박현우
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} letterSpacing="0.14em" color="var(--prussian)" fontWeight="600" mt={1} fontVariant="small-caps">
                Hyunwoo Park
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} fontWeight="700" mt={1}>
                서울대학교 데이터사이언스대학원 교수
              </Text>
            </Box>
            <Box textAlign={{ base: "left", md: "right" }} fontSize="xs" color="var(--steel)" lineHeight="1.55">
              <Link href="mailto:hyunwoopark@snu.ac.kr" textDecoration="underline" color="#1B2129">hyunwoopark@snu.ac.kr</Link><br />
              서울대학교 43동 505호<br />
              <Link href="https://hyunwoopark.com" textDecoration="underline" color="#1B2129">https://hyunwoopark.com</Link>
            </Box>
          </Box>

          <Box borderTop="2px solid var(--prussian)" mt={3} mb={3} />

          {/* Expertise */}
          <Box bg="var(--wash)" borderLeft="2.5px solid var(--prussian)" p={3} mb={4} fontSize="sm" color="var(--prussian)" fontWeight="500">
            <Text fontSize="2xs" letterSpacing="0.2em" color="var(--steel)" textTransform="uppercase" mb={1}>Expertise</Text>
            AI 기반 의사결정 보조 시스템 개발, 공급망 네트워크 및 경제 안보 분석, 기술 발전 및 혁신 정책, 데이터 시각화, AI 활용 및 산업 AX
          </Box>

          {/* Two-column grid */}
          <Box display={{ base: "block", md: "grid" }} gridTemplateColumns={{ md: "1fr 260px" }} gap={6}>
            {/* Main column */}
            <Box>
              <CvSection eyebrow="Appointments" title="경력">
                <CvList items={[
                  { text: "서울대학교 데이터사이언스대학원 교수", year: "2026–" },
                  { text: "서울대학교 데이터사이언스대학원 부교수", year: "2021–2026" },
                  { text: "서울대학교 데이터사이언스대학원 교무부원장", year: "2023–2025" },
                  { text: "오하이오주립대학교 경영대학 생산관리분과 조교수", year: "2017–2021" },
                  { text: "조지아공과대학교 컴퓨터공학 박사후연구원", year: "2015–2017" },
                ]} />
              </CvSection>

              {/* Y-KAST hero */}
              <Box bg="var(--wash)" borderLeft="2.5px solid var(--prussian)" p={3} mb={4}>
                <Text fontSize="2xs" letterSpacing="0.24em" textTransform="uppercase" color="var(--steel)" mb={1}>Y-KAST / 2024 – 현재</Text>
                <Text fontSize="md" fontWeight="500" color="var(--prussian)">한국과학기술한림원 정책학부 차세대회원</Text>
              </Box>

              <CvSection eyebrow="Education" title="학력">
                <CvList items={[
                  { text: "조지아공과대학교(Georgia Tech) 산업공학 박사", year: "2015" },
                  { text: "UC 버클리(UC Berkeley) 정보관리시스템 석사", year: "2010" },
                  { text: "서울대학교 전기공학부 학사", year: "2008" },
                ]} />
              </CvSection>

              <CvSection eyebrow="Research Portfolio" title="주요 연구과제">
                <CvCluster cap="AI 정책과 사회적 영향." items="인간 전문성과 알고리즘을 잇는 협력적 의사결정 정책 연구 (교육부 SSK, 2025–2028), 경제안보 지수개발과 리스크 분석 (서울대 국가미래전략원, 2022–2026), AI 공존 사회 연구와 행정안전부 조직관리 개선 연구 (2026)" />
                <CvCluster cap="AI 핵심 역량." items="초거대 AI 모델 및 플랫폼 최적화 센터 (과기정통부 선도연구센터 ERC, 2023–2026), 그래프 신경망 기반 창업생태계와 공급사슬망 구조분석 (과기정통부 우수신진연구, 2022–2027)" />
                <CvCluster cap="AI 인재양성." items="LLM 기반 생성 AI 인재양성 (과기정통부 IITP, 2024–2027), 의료 인공지능 특화 융합인재 양성 (보건복지부, 2025–2026), 군 작전 AI 의사결정 지원 체계 (과기정통부 IITP, 2026)" />
                <CvCluster cap="제조와 산업 AX." items="삼성전자 반도체 FAB 공급망 및 공정 품질 AI 시스템 개발 (2023–2026), 해양 산업 데이터 이상탐지 연구 시리즈 (해양수산부, 선박해양플랜트연구소, 2021–2026), 해외송금 이상거래 탐지(FDS) (서울시, 2021–2026)" />
                <CvCluster cap="의약품 제조 품질과 규제 AI." items="미국 FDA 의약품 제조 품질 연구 과제 (미국 FDA, 2018–2021), 멀티오믹스 AI 의약품 효능과 부작용 예측 (식약처, 2026)" />
              </CvSection>
            </Box>

            {/* Rail column */}
            <Box borderLeft={{ base: "none", md: "1px solid var(--hairline)" }} pl={{ base: 0, md: 5 }} mt={{ base: 4, md: 0 }}>
              <CvSection eyebrow="Public & Advisory" title="정부, 공공, 자문">
                <CvList items={[
                  { text: "외교부 외교 AI 외부 전문가 자문단 위원", year: "2025–" },
                  { text: "Physical AI 국가연구소(NRL 2.0) 인간가치 분과(TC4) 공동리더", year: "2026–" },
                  { text: "SK하이닉스 VPP 자문교수", year: "2026" },
                  { text: "Y-KAST 정책연구: 차세대리포트, 정책소위원회, 한림원의 창 좌담", year: "2025–2026" },
                ]} />
              </CvSection>

              <CvSection eyebrow="Publications" title="대표 연구성과">
                <Box mb={2}>
                  <StatRow num="39편" label="국제 학술지 게재 논문" />
                  <StatRow num="9편" label="경영학 국제 탑저널 UTD24/FT50" />
                  <StatRow num="22편" label="유럽 경영학 탑저널 ABS 등재지" />
                  <StatRow num="12편" label="CS 탑컨퍼런스 (풀페이퍼+워크숍)" />
                  <StatRow num="1,800+" label="피인용 횟수 (h-지수 23)" />
                </Box>
                <Text fontSize="xs" lineHeight="1.5">
                  경영학 탑저널(M&SOM, POM, JOM, AMR, RP)과 CS 탑컨퍼런스(CHI, NeurIPS, ICML, KDD, AAAI, EMNLP, UIST)에 동시 게재하는 융합 연구자
                </Text>
              </CvSection>

              <CvSection eyebrow="Academic Leadership" title="학회 리더십">
                <CvList items={[
                  { text: "미국경영과학회(INFORMS) 기술혁신경영 분과(TIMES) 임원 5년, 회장(2024)", year: "2021–2025" },
                  { text: "한국경영과학회 이사", year: "2025–" },
                  { text: "한국기술경영경제학회 이사", year: "2025–" },
                  { text: "한국데이터마이닝학회 감사", year: "2025–" },
                ]} />
              </CvSection>
            </Box>
          </Box>

          {/* Awards band */}
          <Box bg="var(--wash)" borderLeft="2.5px solid var(--prussian)" p={3} mt={4} fontSize="sm" lineHeight="1.5">
            <Text fontWeight="700" color="var(--prussian)" mb={1}>수상</Text>
            <Text>미국경영학회(AOM): OCIS Best Paper (2017), TIM Best Student Paper (2015), OSCM Best Paper Finalist (2020)</Text>
            <Text mt={1}>미국경영과학회(INFORMS): TIMES Best Dissertation Runner-up (2017), TIMES Distinguished Service Award (2025), IJOC Meritorious Reviewer (2025)</Text>
            <Text mt={1}>SNU 그랜드퀘스트 공모전 수상 (2026), 21세기를 이끌 우수인재상 (2002), 국제화학올림피아드 금메달 (2001)</Text>
            <Text mt={2}><Text as="span" fontWeight="700" color="var(--prussian)">장학.</Text> 한국고등교육재단 학부 및 박사 해외유학 장학생 (2002–2015), 삼성장학회 해외유학 장학생 (2008–2010)</Text>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
}

function CvSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <Box mb={4}>
      <Text fontSize="2xs" letterSpacing="0.24em" textTransform="uppercase" color="var(--steel)">{eyebrow}</Text>
      <Heading as="h2" size="md" fontWeight="700" color="var(--prussian)" mt={0.5} mb={2} pb={1} borderBottom="1px solid var(--hairline)">
        {title}
      </Heading>
      {children}
    </Box>
  );
}

function CvList({ items }: { items: { text: string; year: string }[] }) {
  return (
    <Box as="ul" listStyleType="none">
      {items.map((item, i) => (
        <Box as="li" key={i} fontSize="sm" lineHeight="1.44" mb={1} display="flex" justifyContent="space-between" gap={2}>
          <Text>{item.text}</Text>
          <Text color="var(--steel)" fontSize="xs" whiteSpace="nowrap">{item.year}</Text>
        </Box>
      ))}
    </Box>
  );
}

function CvCluster({ cap, items }: { cap: string; items: string }) {
  return (
    <Text fontSize="sm" lineHeight="1.48" mb={1.5}>
      <Text as="span" fontWeight="700" color="var(--prussian)">{cap}</Text> {items}
    </Text>
  );
}

function StatRow({ num, label }: { num: string; label: string }) {
  return (
    <Box fontSize="sm" lineHeight="1.5" mb={0.5}>
      <Text as="span" fontWeight="700" fontSize="lg" color="var(--prussian)" mr={1}>{num}</Text>
      <Text as="span">{label}</Text>
    </Box>
  );
}
