import { Center, Link, Text } from '@chakra-ui/react';

interface SlideProps {
  bgImg: string;
  href: string;
  title: string;
  text: string;
}

export const Slide: React.FC<SlideProps> = ({ bgImg, href, title, text }) => {
  return (
    <Center h={450} flexDirection="column" bgImg={bgImg}>
      <Link
        href={href}
        fontSize="3rem"
        fontWeight="bold"
        _hover={{ color: 'yellow.500' }}
        color="gray.50"
      >
        {title}
      </Link>
      <Text mt={4} fontSize="1.5rem" fontWeight="bold" color="gray.100">
        {text}
      </Text>
    </Center>
  );
};
