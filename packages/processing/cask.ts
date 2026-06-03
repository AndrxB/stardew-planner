import { ProcessRecipe, Quality } from "./process"

let age = (
    duration: number,
    outPutName: (inputName?: string) => string,
    calculateOutputPrice: (inputPrice?: number) => number,
    quality: Quality
) : ProcessRecipe => {
    return {
        processId : "aging",
		duration : {value: duration, unit: "days"},
		outPutName,
		calculateOutputPrice: inputPrice => calculateOutputPrice(inputPrice) * qualityModifier[quality],
        quality
	}
}

const qualityModifier: Record<Quality, number> = {
    default : 1,
    silver : 1.25,
    gold : 1.5,
    iridium : 2,
}

type AgingRecipeGroup = Record<Quality, ProcessRecipe>;
type QualityDuration = Record<Quality, number>;

function printGroup(group : AgingRecipeGroup) {
    for(const quality of ["default", "silver", "gold", "iridium"] as const) {
        console.log(group[quality].calculateOutputPrice?.())
    }
}

const groupAgeBy = (
    duration: QualityDuration,
    outPutName: (inputName?: string) => string,
    calculateOutputPrice: (inputPrice?: number) => number,
) : AgingRecipeGroup => {
    return {
        default: age(duration.default, outPutName, calculateOutputPrice, "default"),
        silver: age(duration.silver, outPutName, calculateOutputPrice, "silver"),
        gold: age(duration.gold, outPutName, calculateOutputPrice, "gold"),
        iridium: age(duration.iridium, outPutName, calculateOutputPrice, "iridium"),
    }
}

export const wineGroup : AgingRecipeGroup = groupAgeBy(
    { default: 0, silver: 14, gold: 14, iridium: 28 }, 
    inputName => `${inputName}_wine`, 
    inputPrice => inputPrice! * 3,
)

export const paleAleGroup : AgingRecipeGroup = groupAgeBy(
    { default: 0, silver: 9, gold: 8, iridium: 17 },
    () => "pale_ale", 
    () => 300,
)

export const beerGroup : AgingRecipeGroup = groupAgeBy(
    { default: 0, silver: 7, gold: 7, iridium: 14 },
    () => "beer", 
    () => 200,
)

export const meadGroup : AgingRecipeGroup = groupAgeBy(
    { default: 0, silver: 7, gold: 7, iridium: 7 },
    () => "mead", 
    () => 300,
)

export const cheeseGroup : AgingRecipeGroup = groupAgeBy(
    { default: 0, silver: 3, gold: 4, iridium: 7 },
    () => "cheese", 
    () => 230,
)

export const goatCheeseGroup : AgingRecipeGroup = groupAgeBy(
    { default: 0, silver: 3, gold: 4, iridium: 7 },
    () => "goat_cheese", 
    () => 400,
)

export { age, groupAgeBy, printGroup }
export { AgingRecipeGroup, QualityDuration }