import { useState } from 'react';
import { CardProps } from './interfaces';
import './card.css';

const Card: React.FC<CardProps> = ({
  index,
  loyalty,
  mana_cost,
  name,
  oracle_text,
  power,
  toughness,
  type_line,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <li
      key={index}
      className='card'
    >
      <div
        onClick={() => setIsClicked(!isClicked)}
        className='card-header'
      >
        <span>
          {mana_cost} {name}
        </span>
      </div>
      {isClicked && (
        <>
          <div className='card-body'>
            <span>{type_line}</span>
            <p>{oracle_text}</p>
          </div>
          <div className='card-footer'>
            {power && toughness && (
              <span>
                {power}/{toughness}
              </span>
            )}
            {loyalty && <span>{loyalty}</span>}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
