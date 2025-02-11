import { Box, VStack, Image, Heading, Link, Stack, IconButton, Spacer } from "@chakra-ui/react"
import { FaGoogle, FaLinkedinIn, FaGithub, FaOrcid } from "react-icons/fa6"

export default function Sidebar() {
  return (
    <Box
      w={{ base: "full", md: "1/4" }}
      position={{ md: "sticky" }}
      top="80px"  // Adjust top value as needed to avoid overlap with navbar
      h="fit-content" // Important so it does not take up the entire viewport height
    >
      <VStack gap="0">
        <Image
          src="https://zzz.sfo3.cdn.digitaloceanspaces.com/hyunwoopark-com/public/Profile_HP_20231115_Standing_Square_256.png"
          alt="Hyunwoo Park"
          width={48}
          rounded="full"
          mb={8}
        />
        <Heading as="h1" size="2xl" mb={4}>
          Hyunwoo Park
        </Heading>
        <Link href="https://gsds.snu.ac.kr/people-post/hyunwoo-park/" target="_blank">
          Associate Professor
        </Link>
        <Link href="https://gsds.snu.ac.kr" target="_blank">
          Graduate School of Data Science
        </Link>
        <Link href="https://snu.ac.kr" target="_blank">
          Seoul National University
        </Link>
        <Spacer minH={4} />
        <Link href="/">
          https://hyunwoopark.com
        </Link>
        <Link href="mailto:hyunwoopark@snu.ac.kr">
          hyunwoopark@snu.ac.kr
        </Link>
        <Stack mt={6} direction="row" gap={4}>
          <Link href="https://scholar.google.com/citations?user=AbopKDkAAAAJ" target="_blank">
            <IconButton variant="surface" aria-label="Google Scholar">
              <FaGoogle />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/hyunwoo-park-profile/" target="_blank">
            <IconButton variant="surface" aria-label="LinkedIn">
              <FaLinkedinIn />
            </IconButton>
          </Link>
          <Link href="https://github.com/oksure" target="_blank">
            <IconButton variant="surface" aria-label="GitHub">
              <FaGithub />
            </IconButton>
          </Link>
          <Link href="https://orcid.org/0000-0001-9818-217X" target="_blank">
            <IconButton variant="surface" aria-label="ORCID">
              <FaOrcid />
            </IconButton>
          </Link>
        </Stack>
      </VStack>
    </Box>
  )
}
