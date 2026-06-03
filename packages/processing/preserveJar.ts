import { ProcessRecipe } from "./process"

let preserve = (
	duration: number,
	outPutName: (inputName?: string) => string, 
	calculateOutputPrice: (inputPrice?: number) => number
) : ProcessRecipe => {
	return {
		processId : "preserving",
		duration : {value: duration, unit: "minutes"},
		outPutName : outPutName,
		calculateOutputPrice: calculateOutputPrice,
		quality: "default"
	}
}

export const pickle: ProcessRecipe =
	preserve(4000, inputName => `pickled_${inputName}`, inputPrice => 2 * inputPrice! + 50)

export const jelly: ProcessRecipe =
	preserve(4000, inputName => `${inputName}_jelly`, inputPrice => 2 * inputPrice! + 50)

export const caviar: ProcessRecipe =
	preserve(6000, _ => `caviar`, _ => 500)

export const agedRoe: ProcessRecipe =
	preserve(4000, inputName => `aged_${inputName}_roe`, inputPrice => 2 * inputPrice!)

export { preserve }