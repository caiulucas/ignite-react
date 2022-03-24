import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const handleViewImage = useCallback(
    imageUrl => {
      onOpen();
      setSelectedImageUrl(imageUrl);
    },
    [onOpen]
  );

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards?.map((card: Card) => (
          <Card
            key={card.id}
            data={card}
            viewImage={() => {
              handleViewImage(card.url);
            }}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedImageUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
