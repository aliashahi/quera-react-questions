import Card from "./Card";
import { useState } from "react";
import { cardsData } from "../cards";

function Game() {
  const [pending, setPending] = useState(false);
  const [data, setData] = useState(cardsData);
  const [lastClicked, setLastClicked] = useState(null);

  const flipCard = (d, c, flip = true) => {
    return d.map((i) => {
      if (i.id == c.id) {
        return { ...i, isFlipped: flip };
      } else return i;
    });
  };

  const onCardClicked = (card) => {
    if (card.isFlipped || pending) return;
    if (!lastClicked) {
      setLastClicked(card);
      setData(flipCard(data, card));
    } else {
      if (card.name == lastClicked.name) {
        setData(flipCard(flipCard(data, card), lastClicked));
        setLastClicked(null);
      } else {
        setPending(true);
        setData(flipCard(data, card));
        setTimeout(() => {
          setPending(false);
          setData(flipCard(flipCard(data, card, false), lastClicked, false));
          setLastClicked(null);
        }, 1500);
      }
    }
  };

  return (
    <section className="memory-game">
      {data.map((card) => {
        return (
          <Card key={card.id} card={card} onClick={() => onCardClicked(card)} />
        );
      })}
    </section>
  );
}

export default Game;
