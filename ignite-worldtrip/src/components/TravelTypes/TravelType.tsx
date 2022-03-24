import { Center, Image, Text } from '@chakra-ui/react';

export const TravelType: React.FC<{ src: string }> = ({ src, children }) => {
  return (
    <Center flexDirection="column">
      <Image src={src} />

      <Text mt={6} fontWeight="semibold">
        {children}
      </Text>
    </Center>
  );
};
