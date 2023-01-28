/**
 * Generates a random element out of an array with weights specified
 * @param {[{id: any, weight: integer}]} choices Array of choices objects
 * @returns {object} Chosen element from the pool of choices
 */
function selectChoice(choices) {
    if (!Array.isArray(choices)) return TypeError("Not an array of choices")

    let totalWeight = 0;

    for (choice of choices) {
        if(!choice.id) {
            return ReferenceError(`Choice does not have id`)
        }

        if(!choice.weight) {
            choice.weight = 1
        }

        if(choice.weight % 1 != 0) {
            return TypeError(`${choice.id} weight is not integer (weight is proportional, just multiply all values by 10 or 100, they don't have to add to 100)`)
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






