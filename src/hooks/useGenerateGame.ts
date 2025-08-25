import { useState, useEffect, useRef } from "react";
import { getSkinData } from "../lib/selectedSkin";

export const useGenerateGame = (size: number) => {
  const generateMatrix = () => {
    const total = size * size;
    const pairCount = total / 2;
    const skinData = getSkinData();
    const icons = skinData?.icons || [];

    const matrix: string[][] = Array.from({ length: size }, () =>
      Array(size).fill("")
    );

    for (let i = 0; i < pairCount; i++) {
      const iconPath = icons[i % icons.length] || "?";
      const positions: { row: number; col: number }[] = [];

      while (positions.length < 2) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (matrix[row][col] === "") {
          matrix[row][col] = iconPath;
          positions.push({ row, col });
        }
      }
    }

    return matrix;
  };

  const [matrix, setMatrix] = useState<string[][]>(() => generateMatrix());
  const [hiddenMatrix, setHiddenMatrix] = useState<boolean[][]>(() =>
    Array.from({ length: size }, () => Array(size).fill(false))
  );
  const [flippedCards, setFlippedCards] = useState<
    { row: number; col: number }[]
  >([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [isLocked, setIsLocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [hintedIcon, setHintedIcon] = useState<number[][] | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const regenerateGame = () => {
    setMatrix(generateMatrix());
    setHiddenMatrix(
      Array.from({ length: size }, () => Array(size).fill(false))
    );
    setFlippedCards([]);
    setMatchedPairs(new Set());
    setAttempts(0);
    setCorrectMatches(0);
    setIsLocked(false);
  };

  useEffect(() => {
    setMatrix(generateMatrix());
    setHiddenMatrix(
      Array.from({ length: size }, () => Array(size).fill(false))
    );
    setFlippedCards([]);
    setMatchedPairs(new Set());
    setIsLocked(false);
  }, [size]);

  const flipCard = (row: number, col: number) => {
    if (
      isLocked ||
      hiddenMatrix[row][col] ||
      matchedPairs.has(matrix[row][col])
    ) {
      return;
    }

    const newHiddenMatrix = [...hiddenMatrix];
    newHiddenMatrix[row][col] = true;
    setHiddenMatrix(newHiddenMatrix);

    const newFlippedCards = [...flippedCards, { row, col }];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      setAttempts(prev => prev + 1);
      const [first, second] = newFlippedCards;
      const firstIcon = matrix[first.row][first.col];
      const secondIcon = matrix[second.row][second.col];

      if (firstIcon === secondIcon) {
        setCorrectMatches(prev => prev + 1);
        setMatchedPairs((prev) => new Set([...prev, firstIcon]));
        setFlippedCards([]);
        setIsLocked(false);
      } else {
        timeoutRef.current = setTimeout(() => {
          const resetMatrix = [...newHiddenMatrix];
          resetMatrix[first.row][first.col] = false;
          resetMatrix[second.row][second.col] = false;
          setHiddenMatrix(resetMatrix);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };
  const showHint = () => {
    if (flippedCards.length === 1) {
      const flippedCard = flippedCards[0];
      const flippedIcon = matrix[flippedCard.row][flippedCard.col];
      
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (
            !hiddenMatrix[i][j] && 
            !matchedPairs.has(matrix[i][j]) &&
            matrix[i][j] === flippedIcon &&
            (i !== flippedCard.row || j !== flippedCard.col)
          ) {
            const newMatrix = [...hiddenMatrix];
            newMatrix[i][j] = true;
            setHiddenMatrix(newMatrix);
            setHintedIcon([[i, j]]);

            setTimeout(() => {
              const resetMatrix = [...newMatrix];
              resetMatrix[i][j] = false;
              setHiddenMatrix(resetMatrix);
              setHintedIcon(null);
            }, 2000);
            return;
          }
        }
      }
    }
  };

  // Check if hint should be enabled (when exactly one card is flipped)
  const isHintEnabled = flippedCards.length === 1;

  return {
    matrix,
    hiddenMatrix,
    flipCard,
    hintedIcon,
    showHint,
    isHintEnabled,
    flippedCards,
    matchedPairs,
    isLocked,
    attempts,
    correctMatches,
    regenerateGame
  };
};
