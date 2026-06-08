import type { Duration } from "../processing/duration";
import type { Quality } from "../processing/process";

export type SeasonType = "Spring" | "Summer" | "Fall" | "Winter" | "Special";

type CropCategory = 
  | "vegetable"
  | "fruit"
  | "flower"
  | "grain"
  | "forage"
  | "special"

type Vendors = {
  pierre?       : number;
  jojaMart?     : number;
  oasis?        : number;
  eggFestival?  : number;
  travelingCart?: number;
}

export type Plantable = {
  seedName      : string;
  cropName      : string;
  category      : CropCategory;
  seasons       : SeasonType[];
  qualityPrices : Record<Quality, number>
  vendors?      : Vendors
  regrow?       : Duration;
  firstHarvest  : Duration;
  maxHarvest?   : number;
}

const getSeasonalCrops = (season : SeasonType) : Plantable[] => plantables.filter( crop => crop.seasons.includes(season) )


export { getSeasonalCrops }

export const plantables: Plantable[] = [
  {
    seedName: "Jazz Seeds",
    cropName: "Blue Jazz",
    category: "flower",
    seasons: ["Spring"],
    qualityPrices: { default: 50, silver: 62, gold: 75, iridium: 100 },
    vendors: { pierre: 30, jojaMart: 37 },
    firstHarvest: { value: 7, unit: "days" },
  },
  {
    seedName: "Carrot Seeds",
    cropName: "Carrot",
    category: "vegetable",
    seasons: ["Spring"],
    qualityPrices: { default: 35, silver: 43, gold: 52, iridium: 70 },
    firstHarvest: { value: 3, unit: "days" },
  },
  {
    seedName: "Cauliflower Seeds",
    cropName: "Cauliflower",
    category: "vegetable",
    seasons: ["Spring"],
    qualityPrices: { default: 175, silver: 218, gold: 262, iridium: 350 },
    vendors: { pierre: 80, jojaMart: 100 },
    firstHarvest: { value: 12, unit: "days" },
  },
  {
    seedName: "Coffee Bean",
    cropName: "Coffee Bean",
    category: "special",
    seasons: ["Spring", "Summer"],
    qualityPrices: { default: 15, silver: 18, gold: 22, iridium: 30 },
    vendors: { travelingCart: 2500 },
    firstHarvest: { value: 10, unit: "days" },
    regrow: { value: 2, unit: "days" },
  },
  {
    seedName: "Garlic Seeds",
    cropName: "Garlic",
    category: "vegetable",
    seasons: ["Spring"],
    qualityPrices: { default: 60, silver: 75, gold: 90, iridium: 120 },
    vendors: { pierre: 40 },
    firstHarvest: { value: 4, unit: "days" },
  },
  {
    seedName: "Bean Starter",
    cropName: "Green Bean",
    category: "vegetable",
    seasons: ["Spring"],
    qualityPrices: { default: 40, silver: 50, gold: 60, iridium: 80 },
    vendors: { pierre: 60, jojaMart: 75 },
    firstHarvest: { value: 10, unit: "days" },
    regrow: { value: 3, unit: "days" },
  },
  {
    seedName: "Kale Seeds",
    cropName: "Kale",
    category: "vegetable",
    seasons: ["Spring"],
    qualityPrices: { default: 110, silver: 137, gold: 165, iridium: 220 },
    vendors: { pierre: 70, jojaMart: 87 },
    firstHarvest: { value: 6, unit: "days" },
  },
  {
    seedName: "Parsnip Seeds",
    cropName: "Parsnip",
    category: "vegetable",
    seasons: ["Spring"],
    qualityPrices: { default: 35, silver: 43, gold: 52, iridium: 70 },
    vendors: { pierre: 20, jojaMart: 25 },
    firstHarvest: { value: 4, unit: "days" },
  },
  {
    seedName: "Potato Seeds",
    cropName: "Potato",
    category: "vegetable",
    seasons: ["Spring"],
    qualityPrices: { default: 80, silver: 100, gold: 120, iridium: 160 },
    vendors: { pierre: 50, jojaMart: 62 },
    firstHarvest: { value: 6, unit: "days" },
  },
  {
    seedName: "Rhubarb Seeds",
    cropName: "Rhubarb",
    category: "fruit",
    seasons: ["Spring"],
    qualityPrices: { default: 220, silver: 275, gold: 330, iridium: 440 },
    vendors: { oasis: 100 },
    firstHarvest: { value: 13, unit: "days" },
  },
  {
    seedName: "Strawberry Seeds",
    cropName: "Strawberry",
    category: "fruit",
    seasons: ["Spring"],
    qualityPrices: { default: 120, silver: 150, gold: 180, iridium: 240 },
    vendors: { eggFestival: 100 },
    firstHarvest: { value: 8, unit: "days" },
    regrow: { value: 4, unit: "days" },
  },
  {
    seedName: "Tulip Bulb",
    cropName: "Tulip",
    category: "flower",
    seasons: ["Spring"],
    qualityPrices: { default: 30, silver: 37, gold: 45, iridium: 60 },
    vendors: { pierre: 20, jojaMart: 25 },
    firstHarvest: { value: 6, unit: "days" },
  },
  {
    seedName: "Rice Shoot",
    cropName: "Unmilled Rice",
    category: "grain",
    seasons: ["Spring"],
    qualityPrices: { default: 30, silver: 37, gold: 45, iridium: 60 },
    vendors: { pierre: 40 },
    firstHarvest: { value: 8, unit: "days" },
  },

  // SUMMER
  {
    seedName: "Blueberry Seeds",
    cropName: "Blueberry",
    category: "fruit",
    seasons: ["Summer"],
    qualityPrices: { default: 50, silver: 62, gold: 75, iridium: 100 },
    vendors: { pierre: 80 },
    firstHarvest: { value: 13, unit: "days" },
    regrow: { value: 4, unit: "days" },
    maxHarvest: 3,
  },
  {
    seedName: "Corn Seeds",
    cropName: "Corn",
    category: "vegetable",
    seasons: ["Summer", "Fall"],
    qualityPrices: { default: 50, silver: 62, gold: 75, iridium: 100 },
    vendors: { pierre: 150, jojaMart: 187 },
    firstHarvest: { value: 14, unit: "days" },
    regrow: { value: 4, unit: "days" },
  },
  {
    seedName: "Hops Starter",
    cropName: "Hops",
    category: "vegetable",
    seasons: ["Summer"],
    qualityPrices: { default: 25, silver: 31, gold: 37, iridium: 50 },
    vendors: { pierre: 60, jojaMart: 75 },
    firstHarvest: { value: 11, unit: "days" },
    regrow: { value: 1, unit: "days" },
  },
  {
    seedName: "Pepper Seeds",
    cropName: "Hot Pepper",
    category: "fruit",
    seasons: ["Summer"],
    qualityPrices: { default: 40, silver: 50, gold: 60, iridium: 80 },
    vendors: { pierre: 40, jojaMart: 50 },
    firstHarvest: { value: 5, unit: "days" },
    regrow: { value: 3, unit: "days" },
  },
  {
    seedName: "Melon Seeds",
    cropName: "Melon",
    category: "fruit",
    seasons: ["Summer"],
    qualityPrices: { default: 250, silver: 312, gold: 375, iridium: 500 },
    vendors: { pierre: 80, jojaMart: 100 },
    firstHarvest: { value: 12, unit: "days" },
  },
  {
    seedName: "Poppy Seeds",
    cropName: "Poppy",
    category: "flower",
    seasons: ["Summer"],
    qualityPrices: { default: 140, silver: 175, gold: 210, iridium: 280 },
    vendors: { pierre: 100, jojaMart: 125 },
    firstHarvest: { value: 7, unit: "days" },
  },
  {
    seedName: "Radish Seeds",
    cropName: "Radish",
    category: "vegetable",
    seasons: ["Summer"],
    qualityPrices: { default: 90, silver: 112, gold: 135, iridium: 180 },
    vendors: { pierre: 40, jojaMart: 50 },
    firstHarvest: { value: 6, unit: "days" },
  },
  {
    seedName: "Red Cabbage Seeds",
    cropName: "Red Cabbage",
    category: "vegetable",
    seasons: ["Summer"],
    qualityPrices: { default: 260, silver: 325, gold: 390, iridium: 520 },
    vendors: { pierre: 100 },
    firstHarvest: { value: 9, unit: "days" },
  },
  {
    seedName: "Starfruit Seeds",
    cropName: "Starfruit",
    category: "fruit",
    seasons: ["Summer"],
    qualityPrices: { default: 750, silver: 937, gold: 1125, iridium: 1500 },
    vendors: { oasis: 400 },
    firstHarvest: { value: 13, unit: "days" },
  },
  {
    seedName: "Spangle Seeds",
    cropName: "Summer Spangle",
    category: "flower",
    seasons: ["Summer"],
    qualityPrices: { default: 90, silver: 112, gold: 135, iridium: 180 },
    vendors: { pierre: 50, jojaMart: 62 },
    firstHarvest: { value: 8, unit: "days" },
  },
  {
    seedName: "Summer Squash Seeds",
    cropName: "Summer Squash",
    category: "vegetable",
    seasons: ["Summer"],
    qualityPrices: { default: 45, silver: 56, gold: 67, iridium: 90 },
    firstHarvest: { value: 6, unit: "days" },
    regrow: { value: 3, unit: "days" },
  },
  {
    seedName: "Sunflower Seeds",
    cropName: "Sunflower",
    category: "flower",
    seasons: ["Summer", "Fall"],
    qualityPrices: { default: 80, silver: 100, gold: 120, iridium: 160 },
    vendors: { pierre: 200, jojaMart: 125 },
    firstHarvest: { value: 8, unit: "days" },
  },
  {
    seedName: "Tomato Seeds",
    cropName: "Tomato",
    category: "vegetable",
    seasons: ["Summer"],
    qualityPrices: { default: 60, silver: 75, gold: 90, iridium: 120 },
    vendors: { pierre: 50, jojaMart: 62 },
    firstHarvest: { value: 11, unit: "days" },
    regrow: { value: 4, unit: "days" },
  },
  {
    seedName: "Wheat Seeds",
    cropName: "Wheat",
    category: "grain",
    seasons: ["Summer", "Fall"],
    qualityPrices: { default: 25, silver: 31, gold: 37, iridium: 50 },
    vendors: { pierre: 10, jojaMart: 12 },
    firstHarvest: { value: 4, unit: "days" },
  },

  // FALL
  {
    seedName: "Amaranth Seeds",
    cropName: "Amaranth",
    category: "grain",
    seasons: ["Fall"],
    qualityPrices: { default: 150, silver: 187, gold: 225, iridium: 300 },
    vendors: { pierre: 70, jojaMart: 87 },
    firstHarvest: { value: 7, unit: "days" },
  },
  {
    seedName: "Artichoke Seeds",
    cropName: "Artichoke",
    category: "vegetable",
    seasons: ["Fall"],
    qualityPrices: { default: 160, silver: 200, gold: 240, iridium: 320 },
    vendors: { pierre: 30 },
    firstHarvest: { value: 8, unit: "days" },
  },
  {
    seedName: "Beet Seeds",
    cropName: "Beet",
    category: "vegetable",
    seasons: ["Fall"],
    qualityPrices: { default: 100, silver: 125, gold: 150, iridium: 200 },
    vendors: { oasis: 20 },
    firstHarvest: { value: 6, unit: "days" },
  },
  {
    seedName: "Bok Choy Seeds",
    cropName: "Bok Choy",
    category: "vegetable",
    seasons: ["Fall"],
    qualityPrices: { default: 80, silver: 100, gold: 120, iridium: 160 },
    vendors: { pierre: 50, jojaMart: 62 },
    firstHarvest: { value: 4, unit: "days" },
  },
  {
    seedName: "Broccoli Seeds",
    cropName: "Broccoli",
    category: "vegetable",
    seasons: ["Fall"],
    qualityPrices: { default: 70, silver: 87, gold: 105, iridium: 140 },
    firstHarvest: { value: 8, unit: "days" },
    regrow: { value: 4, unit: "days" },
  },
  {
    seedName: "Cranberry Seeds",
    cropName: "Cranberries",
    category: "fruit",
    seasons: ["Fall"],
    qualityPrices: { default: 75, silver: 93, gold: 112, iridium: 150 },
    vendors: { pierre: 240, jojaMart: 300 },
    firstHarvest: { value: 7, unit: "days" },
    regrow: { value: 5, unit: "days" },
    maxHarvest: 2,
  },
  {
    seedName: "Eggplant Seeds",
    cropName: "Eggplant",
    category: "vegetable",
    seasons: ["Fall"],
    qualityPrices: { default: 60, silver: 75, gold: 90, iridium: 120 },
    vendors: { pierre: 20, jojaMart: 25 },
    firstHarvest: { value: 5, unit: "days" },
    regrow: { value: 5, unit: "days" },
  },
  {
    seedName: "Fairy Seeds",
    cropName: "Fairy Rose",
    category: "flower",
    seasons: ["Fall"],
    qualityPrices: { default: 290, silver: 362, gold: 435, iridium: 580 },
    vendors: { pierre: 200, jojaMart: 250 },
    firstHarvest: { value: 12, unit: "days" },
  },
  {
    seedName: "Grape Starter",
    cropName: "Grape",
    category: "fruit",
    seasons: ["Fall"],
    qualityPrices: { default: 80, silver: 100, gold: 120, iridium: 160 },
    vendors: { pierre: 60, jojaMart: 75 },
    firstHarvest: { value: 10, unit: "days" },
    regrow: { value: 3, unit: "days" },
  },
  {
    seedName: "Pumpkin Seeds",
    cropName: "Pumpkin",
    category: "vegetable",
    seasons: ["Fall"],
    qualityPrices: { default: 320, silver: 400, gold: 480, iridium: 640 },
    vendors: { pierre: 100, jojaMart: 125 },
    firstHarvest: { value: 13, unit: "days" },
  },
  {
    seedName: "Yam Seeds",
    cropName: "Yam",
    category: "vegetable",
    seasons: ["Fall"],
    qualityPrices: { default: 160, silver: 200, gold: 240, iridium: 320 },
    vendors: { pierre: 60, jojaMart: 75 },
    firstHarvest: { value: 10, unit: "days" },
  },

  // WINTER
  {
    seedName: "Powdermelon Seeds",
    cropName: "Powdermelon",
    category: "fruit",
    seasons: ["Winter"],
    qualityPrices: { default: 60, silver: 75, gold: 90, iridium: 120 },
    firstHarvest: { value: 7, unit: "days" },
  },

  // SPECIAL
  {
    seedName: "Ancient Seeds",
    cropName: "Ancient Fruit",
    category: "fruit",
    seasons: ["Spring", "Summer", "Fall"],
    qualityPrices: { default: 550, silver: 687, gold: 825, iridium: 1100 },
    firstHarvest: { value: 28, unit: "days" },
    regrow: { value: 7, unit: "days" },
  },
  {
    seedName: "Cactus Seeds",
    cropName: "Cactus Fruit",
    category: "fruit",
    seasons: ["Special"],
    qualityPrices: { default: 75, silver: 93, gold: 112, iridium: 150 },
    vendors: { oasis: 150 },
    firstHarvest: { value: 12, unit: "days" },
    regrow: { value: 3, unit: "days" },
  },
  {
    seedName: "Pineapple Seeds",
    cropName: "Pineapple",
    category: "fruit",
    seasons: ["Special"],
    qualityPrices: { default: 300, silver: 375, gold: 450, iridium: 600 },
    firstHarvest: { value: 14, unit: "days" },
    regrow: { value: 7, unit: "days" },
  },
  {
    seedName: "Taro Tuber",
    cropName: "Taro Root",
    category: "vegetable",
    seasons: ["Special"],
    qualityPrices: { default: 100, silver: 125, gold: 150, iridium: 200 },
    firstHarvest: { value: 10, unit: "days" },
  },
  {
    seedName: "Rare Seed",
    cropName: "Sweet Gem Berry",
    category: "fruit",
    seasons: ["Fall"],
    qualityPrices: { default: 3000, silver: 3750, gold: 4500, iridium: 6000 },
    vendors: { travelingCart: 1000 },
    firstHarvest: { value: 24, unit: "days" },
  },
  {
    seedName: "Tea Sapling",
    cropName: "Tea Leaves",
    category: "special",
    seasons: ["Spring", "Summer", "Fall"],
    qualityPrices: { default: 50, silver: 50, gold: 50, iridium: 50 },
    firstHarvest: { value: 20, unit: "days" },
    regrow: { value: 1, unit: "days" },
  },
];