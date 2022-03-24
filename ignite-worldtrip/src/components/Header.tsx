import { Flex, Image } from '@chakra-ui/react';

export const Header: React.FC = () => {
  return (
    <Flex h={100} justifyContent="center" alignItems="center">
      <Image src="images/logo.png" />
    </Flex>
  );
};
