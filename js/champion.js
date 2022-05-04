import findChampion from "./scripts/findChampion.js";
import svgChampion from "./scripts/svgChampion.js";

let video = document.querySelector(".abilities__video");
let image = document.querySelector(".abilities__img--selected");

window.onload = async (e) => {
  await findChampion();
  video.oncanplaythrough = (e) => {
    if(document.selected.src){
      svgChampion()
    }
  };
  image.onload = e => {
    if(video.readyState == 4 ){
      svgChampion()
    }
  };
}


