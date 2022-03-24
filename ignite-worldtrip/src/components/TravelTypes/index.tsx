import { HStack } from '@chakra-ui/react';
import { TravelType } from './TravelType';

export const TravelTypes: React.FC = () => {
  return (
    <HStack flex={1} justifyContent="space-between">
      <TravelType src="/images/icons/cocktail.svg">vida noturna</TravelType>
      <TravelType src="/images/icons/surf.svg">praia</TravelType>
      <TravelType src="/images/icons/building.svg">moderno</TravelType>
      <TravelType src="/images/icons/museum.svg">clássico</TravelType>
      <TravelType src="/images/icons/earth.svg">e mais...</TravelType>
    </HStack>
  );
};
