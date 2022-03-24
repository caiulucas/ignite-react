/* eslint-disable prettier/prettier */
import { Box, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';

export const Banner: React.FC = () => {
  return (
    <Center
      maxH={335}
      flex={1}
      pt={20}
      pb={70}
      bgImage="url('/images/banner-background.png')"
    >
      <Flex w={1160} justifyContent="space-between">
        <Box flex={0.8}>
          <Heading color="gray.50">
            5 Continentes, 
            infinitas possibilidades.
          </Heading>

          <Text color="gray.100" fontSize="1.25rem" mt={5}>
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </Box>

        <Image mb={-24} src="/images/airplane.svg" />
      </Flex>
    </Center>
  );
};
