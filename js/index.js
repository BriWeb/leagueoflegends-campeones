import findChampions from "./scripts/findChampions.js";
import championsInteractivity from "./scripts/championsInteractivity.js";
import svgChampions from "./scripts/svgChampions.js";

document.addEventListener("DOMContentLoaded", (e) => {
  svgChampions();
  findChampions();
  championsInteractivity();
});
