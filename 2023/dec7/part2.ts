import { getKeysByValue, input, range } from './utils';

const cards = 'J23456789TQKA';

const HAND_STRENGTH = [
    () => true,
    fq => fq[2].length === 1,
    fq => fq[2].length === 2,
    fq => fq[3].length === 1,
    fq => fq[3].length > 0 && fq[2].length > 0,
    fq => fq[4].length > 0,
    fq => fq[5].length > 0,
] as Array<(fq: Record<number, string[]>) => boolean>;

function getCardFrequency(hand: string): Record<number, string[]> {
    const cardEntries = Array.from(cards).map(card => [card, 0]);

    const frequencyMap = Object.fromEntries(cardEntries);

    Array.from(hand).forEach(char => frequencyMap[char]++);

    const pivotedFreqMapEntries = range(1, hand.length)
        .map(count => [count, getKeysByValue(frequencyMap, count)]) as [number, string[]][];

    // if we have 5 Jokers, no need for any special logic
    if (hand.includes('J') && frequencyMap['J'] !== 5) {

        /**
         * Finds the highest number of appearances for cards other than jokers
         * Example: 825JJ
         * Frequency = 2 will only have "J" as a value, so `bestCard` variable would end up as "J"
         * This means that the recursive call would be invoked with the same "825JJ", resulting an infinite loop
         */
        const [, maxFreqCards] = pivotedFreqMapEntries.findLast(([, frequencyCards]) => {
            const isOnlyJoker = frequencyCards.length === 1 && frequencyCards[0] === 'J';

            return frequencyCards.length > 0 && !isOnlyJoker;
        });

        const bestCard = cards.charAt(Math.max(...maxFreqCards.map(card => cards.indexOf(card))));

        return getCardFrequency(hand.replace('J', bestCard));
    }

    return Object.fromEntries(pivotedFreqMapEntries);
}

async function part2(lines: string[]) {
    const handBids = lines.reduce((map, line) => {
        const [hand, bid] = line.split(' ');

        map[hand] = Number(bid);

        return map;
    }, {} as Record<string, number>);

    const handFreq = Object.keys(handBids).reduce((freq, hand) => {
        console.log(hand);
        freq[hand] = getCardFrequency(hand);

        return freq;
    }, {} as Record<string, Record<number, string[]>>);

    const sortedHands = Object.keys(handBids).toSorted((handA, handB) => {
        const handStrengthA = HAND_STRENGTH.findLastIndex(fn => fn(handFreq[handA]));
        const handStrengthB = HAND_STRENGTH.findLastIndex(fn => fn(handFreq[handB]));

        if (handStrengthA !== handStrengthB) return handStrengthA - handStrengthB;

        let i = 0;

        while (handA[i] === handB[i]) i++;

        return cards.indexOf(handA[i]) - cards.indexOf(handB[i]);
    });

    return sortedHands.reduce((sum, hand, currentIndex) => {
        return sum + (currentIndex + 1) * handBids[hand];
    }, 0);
}

input(true)
    .then(part2)
    .then(console.log);
