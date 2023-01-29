/**
 * Generates a random element out of an array with weights specified
 * @param {[{id: any, weight: integer}]} choices Array of choices objects
 * @param {boolean} returnData Wether the function should return extra data on the roll
 * @returns {object} Chosen element from the pool of choices
 */
function selectChoice(choices, returnData) {
    if (!Array.isArray(choices)) return TypeError("Not an array of choices")

    let totalWeight = 0;

    for (choice of choices) {
        if(!choice.weight) {
            choice.weight = 1
        }

        totalWeight += choice.weight
    }

    let rand = 1 + Math.floor(Math.random() * totalWeight);
    let counted = 0;

    for(choice of choices) {
        let min = counted + 1
        let max = choice.weight + min - 1
        
        if (rand >= min && rand <= max) {
            if(returnData) {
                function gcd(a, b) {
                    if (!b) return a;
                    
                    return gcd(b, a % b);
                };
                let d = gcd(choice.weight,totalWeight)


                return {...choice, roll: {
                    probability: {
                        decimal: choice.weight / totalWeight,
                        fraction: `${choice.weight / d}/${totalWeight / d}`,
                        expressed: `1 in ${totalWeight / choice.weight}`
                    },
                    totalWeight,
                    rand,
                    range: max - min + 1
                }};

            } else return choice
        } 

        counted += choice.weight
    }
}


