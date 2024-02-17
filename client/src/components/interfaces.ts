export interface BucketProps {
  allBuckets: BucketInfo[];
  clickedListName: string;
  indexOfBucket: number;
  name: string;
  propCards: CardProps[];
  selectedBucketName: string;
  selectionFunc: () => void;
  setAllBuckets: (param: BucketInfo[]) => void;
  setClickedListName: () => void;
}

export interface BucketInfo {
  cards: CardProps[];
  name: string;
}

export interface CardProps {
  found: boolean;
  index?: number | null;
  loyalty?: string | null;
  mana_cost?: string | null;
  name?: string | null;
  oracle_text?: string | null;
  power?: string | null;
  toughness?: string | null;
  type_line?: string | null;
}
