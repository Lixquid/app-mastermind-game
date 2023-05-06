import { GameState } from "./data";

/** Calculate a guess object from the given guess number array and game answer */
export function calculateGuess(
    guess: number[],
    answer: number[]
): GameState["guesses"][number] {
    // Keep track of used slots
    const usedSlots = new Set<number>();

    // Calculate the number of correct slots
    const correct = guess.reduce((acc, cur, i) => {
        if (cur === answer[i]) {
            usedSlots.add(i);
            return acc + 1;
        }
        return acc;
    }, 0);

    // Calculate the number of misplaced slots
    const misplaced = guess.reduce((acc, cur, i) => {
        for (let j = 0; j < answer.length; j++) {
            if (usedSlots.has(j)) continue;
            if (cur === answer[j]) {
                usedSlots.add(j);
                return acc + 1;
            }
        }
        return acc;
    }, 0);

    return { guess, correct, misplaced };
}
