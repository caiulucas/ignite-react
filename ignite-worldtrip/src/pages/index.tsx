import Head from 'next/head';
import { Center, Divider, Flex, Heading } from '@chakra-ui/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Banner } from '../components/Banner';
import { Slide } from '../components/Slide';
import { TravelTypes } from '../components/TravelTypes';

SwiperCore.use([Navigation, Pagination]);

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>WorldTrip | 5 Continentes, infinitas possibilidades.</title>
      </Head>
      <Banner />

      <Center mt={28}>
        <Flex w={1160} direction="column">
          <TravelTypes />

          <Divider
            w={90}
            mt={20}
            mb={14}
            borderColor="gray.600"
            alignSelf="center"
            borderWidth="2px"
          />

          <Center flexDirection="column">
            <Heading color="gray.600" fontWeight="medium">
              Vamos Nessa?
            </Heading>
            <Heading color="gray.600" fontWeight="medium">
              Então escolha seu continente
            </Heading>
          </Center>
        </Flex>
      </Center>

      <Swiper
        pagination
        navigation
        spaceBetween={50}
        slidesPerView={1}
        style={{ width: 1160 }}
      >
        <SwiperSlide>
          <Slide
            bgImg="/images/continents/asia.png"
            href="/asia"
            title="Ásia"
            text="O maior dos continentes."
          />
        </SwiperSlide>

        <SwiperSlide>
          <Slide
            bgImg="/images/continents/america.png"
            href="/america"
            title="América"
            text="Cheio de belezas ocultas."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            bgImg="/images/continents/africa.png"
            href="/africa"
            title="África"
            text="Onde se escondem os mistérios do mundo."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            bgImg="/images/continents/europe.png"
            href="/europe"
            title="Europa"
            text="O continente mais antigo."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            bgImg="/images/continents/oceania.png"
            href="/oceania"
            title="Oceania"
            text="Encantadoras atrações marítimas."
          />
        </SwiperSlide>
      </Swiper>
      <Flex mt={10} />
    </>
  );
};

export default Home;
