import {
  Center,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Prismic from '@prismicio/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { CityCard } from '../components/CityCard';
import { InfoContent } from '../components/InfoContent';
import { getPrismicClient } from '../services/prismic';

type City = {
  country_flag: {
    url: string;
    alt: string;
  };
  city_banner: {
    url: string;
    alt: string;
  };
  city_name: string;
  city_country: string;
};

type Continent = {
  data: {
    banner: {
      url: string;
    };
    name: string;
    description: string;
    countries_count: string;
    languages_count: string;
    cities_count: string;
    cities: City[];
  };
};

interface ContinentPageProps {
  continent: Continent;
}

const ContinentPage: React.FC<ContinentPageProps> = ({ continent }) => {
  return (
    <>
      <Head>
        <title>{continent.data.name} | WorldTrip</title>
      </Head>

      <Center h={500} flex={1} bgImg={continent.data.banner.url}>
        <Flex w={1160}>
          <Heading color="gray.50" mt={370}>
            {continent.data.name}
          </Heading>
        </Flex>
      </Center>

      <Center>
        <Flex w={1160} justifyContent="space-between" direction="column">
          <Flex my={20}>
            <Text textAlign="justify" fontSize="1.5rem" flex={1}>
              {continent.data.description}
            </Text>

            <HStack ml={70} flex={1} justifyContent="space-between">
              <InfoContent count={continent.data.countries_count}>
                países
              </InfoContent>
              <InfoContent count={continent.data.languages_count}>
                línguas
              </InfoContent>
              <InfoContent count={continent.data.cities_count}>
                cidades
              </InfoContent>
            </HStack>
          </Flex>

          <Flex direction="column" mb={8}>
            <Heading fontWeight="medium" mb={8}>
              Cidades {continent.data.cities_count}
            </Heading>
            <SimpleGrid columns={4} spacing={45}>
              {continent.data.cities.map(city => (
                <CityCard
                  image={city.city_banner}
                  city={city.city_name}
                  country={city.city_country}
                  flagImage={city.country_flag}
                />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.query(
    Prismic.predicates.at('document.type', 'continent_page')
  );

  const paths = results.map(({ uid }) => ({ params: { slug: uid } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  // eslint-disable-next-line testing-library/no-await-sync-query
  const response: Continent = await prismic.getByUID(
    'continent_page',
    String(slug),
    {}
  );

  return {
    props: {
      continent: response,
    },
  };
};

export default ContinentPage;
