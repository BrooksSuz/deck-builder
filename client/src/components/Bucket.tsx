import { useEffect, useRef, useState } from 'react';
import { BucketProps, CardProps } from './interfaces';
import './bucket.css';

const Bucket: React.FC<BucketProps> = ({
  allBuckets,
  clickedListName,
  indexOfBucket,
  name,
  propCards,
  selectedBucketName,
  selectionFunc,
  setAllBuckets,
  setClickedListName,
}) => {
  const [allCards, setAllCards] = useState<CardProps[]>([]);
  const ulBucket = useRef<HTMLUListElement>(null);
  const h2Bucket = useRef<HTMLHeadingElement>(null);
  const ulCards = useRef<HTMLUListElement | null>(null);

  const handleAddCard = () => {
    const copyAllCards: CardProps[] = [...allCards];
    const copyAllBuckets = [...allBuckets];

    if (copyAllCards.some((card) => card.name === clickedListName)) {
      if (ulCards.current !== undefined && ulCards.current !== null) {
        const ulCardsCopy = [...ulCards.current!.children];

        ulCardsCopy.forEach((card) => {
          if (card.textContent === clickedListName) {
            card.textContent = `${card.textContent} (x2)`;
          }
        });
      }

      return;
    }

    copyAllCards.push({ found: true, name: clickedListName });
    copyAllBuckets.splice(indexOfBucket, 1, {
      name: allBuckets[indexOfBucket].name,
      cards: copyAllCards,
    });

    setAllBuckets(copyAllBuckets);
  };

  const handleRemoveBucket = (index: number) => {
    const copyAllBuckets = [...allBuckets];
    const updatedBuckets = copyAllBuckets.filter((_, i) => i !== index);

    setAllBuckets(updatedBuckets);
  };

  const handleRemoveCard = (index: number) => {
    const copyAllCards: CardProps[] = [...allCards];
    const updatedCards = copyAllCards.filter((_, i) => i !== index);

    setAllCards(updatedCards);
  };

  // Populate or update allCards
  useEffect(() => {
    setAllCards(propCards);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [propCards]);

  // When a user clicks a searched list element, add it to the bucket
  useEffect(() => {
    if (clickedListName !== '') {
      if (selectedBucketName === name) handleAddCard();
      setClickedListName();
    }
  }, [clickedListName]);

  return (
    <ul
      ref={ulBucket}
      className={
        selectedBucketName === name
          ? name + ' bucket' + ' selected'
          : name + ' bucket'
      }
      onClick={() => {
        selectionFunc();
      }}
    >
      <h2
        ref={h2Bucket}
        onClick={() => {
          handleRemoveBucket(indexOfBucket);
        }}
        className='bucket-name'
      >
        {name}
      </h2>
      <ul
        ref={ulCards}
        className='bucket'
      >
        {allCards.map((card, index) => (
          <li key={index}>
            <span
              className='bucket-item'
              onClick={() => {
                handleRemoveCard(index);
              }}
            >
              {card.name}
            </span>
          </li>
        ))}
      </ul>
    </ul>
  );
};

export default Bucket;
