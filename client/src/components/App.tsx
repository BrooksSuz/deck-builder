import { useState, useRef, useEffect } from 'react';
import { BucketInfo, CardProps } from './interfaces';
import Bucket from './Bucket';
import './app.css';

const App = () => {
  // Example info
  const [dbBucketsInfo] = useState<BucketInfo[]>([
    {
      name: 'creatures',
      cards: [
        { found: true, name: 'Beast Whisperer' },
        { found: true, name: 'Arbor Elf' },
        { found: true, name: 'Llanowar Elves' },
      ],
    },
    {
      name: 'artifacts',
      cards: [
        { found: true, name: 'Arcane Signet' },
        { found: true, name: 'Skullclamp' },
        { found: true, name: 'Marble Diamond' },
      ],
    },
    {
      name: 'enchantments',
      cards: [
        { found: true, name: 'Smothering Tithe' },
        { found: true, name: 'Rhystic Study' },
        { found: true, name: 'Rancor' },
      ],
    },
  ]);
  const [allBuckets, setAllBuckets] = useState<BucketInfo[]>([]);
  const [searchCards, setSearchCards] = useState<CardProps[]>([]);
  const [selectedBucketName, setSelectedBucketName] = useState<string>('');
  const [clickedListName, setClickedListName] = useState<string>('');
  const userSearch = useRef<HTMLInputElement | null>(null);
  const userBucketName = useRef<HTMLInputElement | null>(null);
  const cardSearchResults = useRef<HTMLUListElement | null>(null);

  const createBucket = () => {
    if (
      typeof userBucketName.current?.value === 'string' &&
      userBucketName.current.value.trim() !== ''
    ) {
      setAllBuckets([
        ...allBuckets,
        {
          cards: [],
          name: userBucketName.current.value,
        },
      ]);

      setSelectedBucketName(userBucketName.current.value);
    }
  };

  const handleBucketSelection = (name: string) => {
    setSelectedBucketName(name);
    name === selectedBucketName && setSelectedBucketName('');
  };

  const displayUserSearch = () => {
    const currentSearch = userSearch.current?.value;
    const cardArray: CardProps[] = [];

    if (!currentSearch) return;

    fetch(`https://api.scryfall.com/cards/search?q=name:${currentSearch}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        return res.json();
      })
      .then((res) => {
        res.data.map((card: CardProps) => {
          const currentCard: CardProps = {
            found: true,
            mana_cost: card.mana_cost ?? null,
            name: card.name,
            oracle_text: card.oracle_text ?? null,
            type_line: card.type_line ?? null,
            power: card.power ?? null,
            toughness: card.toughness ?? null,
            loyalty: card.loyalty ?? null,
          };

          cardArray.push(currentCard);
        });

        // REMOVE THIS WHEN DONE
        res.data.map((card: unknown) => console.log(card));

        setSearchCards(cardArray);
      })
      .catch(() => {
        const nullCard: CardProps = {
          found: false,
          name: '',
        };

        cardArray.push(nullCard);
        setSearchCards(cardArray);
      });
  };

  // Temp function
  const removeDuplicates = (bucket: BucketInfo[]) =>
    Array.from(new Set(bucket));

  // Set bucket state
  useEffect(() => {
    const copyAllBuckets = [...allBuckets];

    removeDuplicates(copyAllBuckets);
    copyAllBuckets.push(...dbBucketsInfo);
    setAllBuckets(copyAllBuckets);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className='main-container'>
      <label>
        Create a bucket:
        <input
          type='text'
          placeholder='Name your bucket'
          ref={userBucketName}
        />
      </label>
      <button onClick={createBucket}>Create a Bucket</button>
      <div className='card-search-container'>
        <label className='card-search-label'>
          Card Search:
          <input
            className='card-search-input'
            type='text'
            placeholder='Search for a card'
            ref={userSearch}
          />
          <button
            className='card-search-button'
            onClick={displayUserSearch}
          >
            Search!
          </button>
        </label>
        <ul
          ref={cardSearchResults}
          className='card-search-results'
        >
          {searchCards.map((card, index) => (
            <li
              key={index}
              onClick={() => {
                if (card.name !== undefined && card.name !== null)
                  setClickedListName(card.name!);
              }}
            >
              {card.name}
            </li>
          ))}
        </ul>
      </div>
      {allBuckets.map((bucketInfo, index) => {
        return (
          <Bucket
            allBuckets={allBuckets}
            clickedListName={clickedListName}
            indexOfBucket={index}
            name={bucketInfo.name}
            key={index}
            propCards={bucketInfo.cards}
            selectedBucketName={selectedBucketName}
            selectionFunc={() => {
              handleBucketSelection(bucketInfo.name);
            }}
            setAllBuckets={(updatedBucket) => setAllBuckets(updatedBucket)}
            setClickedListName={() => setClickedListName('')}
          />
        );
      })}
    </div>
  );
};

export default App;
