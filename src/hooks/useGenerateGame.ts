
import { useState, useEffect, useRef } from "react";
import { getSkinData } from "../lib/selectedSkin";

export const useGenerateGame = (size: number) => {
    const generateMatrix = () => {
        const total = size * size;
        const pairCount = total / 2;
        const skinData = getSkinData();
        const icons = skinData?.icons || [];
        
        const matrix: string[][] = Array.from({ length: size }, () => Array(size).fill(""));
        
        for (let i = 0; i < pairCount; i++) {
            const iconPath = icons[i % icons.length] || "?";
            const positions: {row: number, col: number}[] = [];
            
            while (positions.length < 2) {
                const row = Math.floor(Math.random() * size);
                const col = Math.floor(Math.random() * size);
                
                if (matrix[row][col] === "") {
                    matrix[row][col] = iconPath;
                    positions.push({row, col});
                }
            }
        }
        
        return matrix;
    };

    const [matrix, setMatrix] = useState<string[][]>(() => generateMatrix());
    const [hiddenMatrix, setHiddenMatrix] = useState<boolean[][]>(() => 
        Array.from({ length: size }, () => Array(size).fill(false))
    );
    const [flippedCards, setFlippedCards] = useState<{row: number, col: number}[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
    const [isLocked, setIsLocked] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        setMatrix(generateMatrix());
        setHiddenMatrix(Array.from({ length: size }, () => Array(size).fill(false)));
        setFlippedCards([]);
        setMatchedPairs(new Set());
        setIsLocked(false);
    }, [size]);

    const flipCard = (row: number, col: number) => {
        if (isLocked || hiddenMatrix[row][col] || matchedPairs.has(matrix[row][col])) {
            return;
        }

        const newHiddenMatrix = [...hiddenMatrix];
        newHiddenMatrix[row][col] = true;
        setHiddenMatrix(newHiddenMatrix);

        const newFlippedCards = [...flippedCards, {row, col}];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setIsLocked(true);
            const [first, second] = newFlippedCards;
            const firstIcon = matrix[first.row][first.col];
            const secondIcon = matrix[second.row][second.col];

            if (firstIcon === secondIcon) {
                setMatchedPairs(prev => new Set([...prev, firstIcon]));
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

    const hintOne = () => {
        const hiddenPositions: {row: number, col: number}[] = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (!hiddenMatrix[i][j] && !matchedPairs.has(matrix[i][j])) {
                    hiddenPositions.push({row: i, col: j});
                }
            }
        }
        
        if (hiddenPositions.length > 0) {
            const randomPos = hiddenPositions[Math.floor(Math.random() * hiddenPositions.length)];
            const newMatrix = [...hiddenMatrix];
            newMatrix[randomPos.row][randomPos.col] = true;
            setHiddenMatrix(newMatrix);
            
            setTimeout(() => {
                const resetMatrix = [...newMatrix];
                resetMatrix[randomPos.row][randomPos.col] = false;
                setHiddenMatrix(resetMatrix);
            }, 2000);
        }
    };

    return { matrix, hiddenMatrix, flipCard, hintOne, matchedPairs, isLocked };
};
	