import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

type Image = {
  url: string;
  alt: string;
};

interface CityCardProps {
  image: Image;
  city: string;
  country: string;
  flagImage: Image;
}

export const CityCard: React.FC<CityCardProps> = ({
  image,
  city,
  country,
  flagImage,
}) => {
  return (
    <Box bgColor="white">
      <Image src={image.url} alt={image.alt} />
      <Flex
        py={7}
        px={6}
        borderColor="yellow.500"
        borderWidth={1}
        borderBottomRadius="base"
        borderTop="none"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Heading as="h3" fontSize="xl" fontWeight="semibold">
            {city}
          </Heading>
          <Text mt={3} color="gray.500" fontWeight="medium">
            {country}
          </Text>
        </Box>

        <Image h={30} src={flagImage.url} alt={flagImage.alt} />
      </Flex>
    </Box>
  );
};
