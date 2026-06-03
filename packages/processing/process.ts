import { Duration } from "./duration";

export type Quality = "default" | "silver" | "gold" | "iridium"
export type Process = "keg" | "aging" | "preserving"

export type ProcessRecipe = {
    processId           : Process;
    duration            : Duration;
    outPutName          : (inputName?: string) => string;
    calculateOutputPrice: (inputPrice?: number) => number;
    quality             : Quality;
};

type ProcessSuccess = {
    process : Process;
    quality : Quality;
    name    : string;
    price   : number;
}

type ProcessFailure = {
    process : Process;
    error   : string;
}

type ProcessResult = 
    | { ok: true,  result: ProcessSuccess }
    | { ok: false, result: ProcessFailure }

let process = (recipe: ProcessRecipe, inputName?: string, basePrice?: number) : ProcessResult => {
    const fail = (error: string) : ProcessResult => ({ ok: false, result: { process: recipe.processId, error: error }})
    
    var process = recipe.processId;
    var quality = recipe.quality;
    var name = recipe.outPutName(inputName)
    var price = recipe.calculateOutputPrice(basePrice)

    if (!quality) return fail("quality")
    if (!name) return fail("output")
    if (basePrice = 0) fail("base price must be larger 0!")
    if (!price) fail("base price must be larger than 0!")

    return {ok: true, result: {process, quality, name, price : Math.floor(price)}}
}

export { process, Duration }