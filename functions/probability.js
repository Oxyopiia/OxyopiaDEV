/**
 * Generates a random element out of an array with weights specified
 * @param {[{id: any, weight: integer}]} choices Array of choices objects
 * @returns {object} Chosen element from the pool of choices
 */
function selectChoice(choices) {
    if (!Array.isArray(choices)) return TypeError("Not an Array of Choices")

    let totalWeight = 0;

    for (choice of choices) {
        if(!choice.weight) {
            choice.weight = 1
        }

        if(choice.weight % 1 != 0) {
            choice.weight = Math.floor(choice.weight)
            console.log(`\n\x1b[33mWARN > Weight must be integer (id: ${choice.id})\n\x1b[31mYour total weight can actually go over 100, it is purely proportional! So for decimal-like equivalents, consider multiplying your weights by 10 or 100 for expected effects.\n\x1b[0m`)
        }

        totalWeight += choice.weight
    }

    let rand = 1 + Math.floor(Math.random() * totalWeight);
    let counted = 0;

    for(choice of choices) {
        let min = counted + 1
        let max = choice.weight + min - 1

        if (rand >= min && rand <= max) {
            return {...choice, roll: {
                probability: choice.weight / totalWeight ,
                totalWeight: totalWeight,
                seed: rand,
                range: max - min + 1
            }};
        } 

        counted += choice.weight
    }
}