import { Center, Text } from '@chakra-ui/react';

export const InfoContent: React.FC<{ count: string }> = ({
  count,
  children,
}) => {
  return (
    <Center flexDirection="column">
      <Text color="yellow.500" fontWeight="semibold" fontSize="3rem">
        {count}
      </Text>
      <Text mt={-3} fontSize="1.5rem" fontWeight="semibold">
        {children}
      </Text>
    </Center>
  );
};
