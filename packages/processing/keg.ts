import { ProcessRecipe, Quality } from "./process"

let keg = (
	duration: number,
	outPutName: (inputName?: string) => string,
	calculateOutputPrice: (inputPrice?: number) => number,
) : ProcessRecipe => {
	return {
		processId : "keg",
		duration : {value: duration, unit: "minutes"},
		outPutName,
		calculateOutputPrice,
		quality : "default"
	}
}

export const beer: ProcessRecipe =
  keg(1750, () => "beer", () => 200);

export const vinegar: ProcessRecipe =
  keg(600, () => "vinegar", () => 100);

export const coffee: ProcessRecipe =
  keg(120, () => "coffee", () => 150);

export const greenTea: ProcessRecipe =
  keg(180, () => "green_tea", () => 100);

export const mead: ProcessRecipe =
  keg(600, () => "mead", () => 300);

export const paleAle: ProcessRecipe =
  keg(2250, () => "pale_ale", () => 300);

export const juice: ProcessRecipe =
  keg(6000, inputName => `${inputName}_juice`, inputPrice => inputPrice! * 2.25);

export const wine: ProcessRecipe =
  keg(10000, inputName => `${inputName}_wine`, inputPrice => inputPrice! * 3);