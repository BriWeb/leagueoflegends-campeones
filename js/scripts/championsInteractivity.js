import { CHAMPION } from "./endpoints.js";
import { enabled, setOneVol } from "./handleVolumen.js";
import { domain } from "../config.js";
let { SOUNDS } = CHAMPION;

export default async function championsInteractivity() {
  let champions;

  try {
    let res = await fetch(domain + "assets/soundtracks.json");
    champions = await res.json();
  } catch (error) {
    console.log(error);
  }

  document.addEventListener("mouseover", async (e) => {
    if (e.target.matches(".champion *") && enabled) {
      document.getElementById("over").play();
    }
  });

  const animationSelect = ($championSelected) => {
    const champions = document.querySelectorAll(".champion");
    const lanes = document.querySelector(".form__filters");

    lanes.classList.add("form__filters--finished");

    champions.forEach((champion) => {
      if (champion.id != $championSelected.id) {
        champion.classList.add("champion--no-selected");
      } else {
        champion.classList.add("champion--selected");
      }
    });
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches(".champion *")) {
      let $parent = e.target.parentElement;
      animationSelect($parent);
      if (enabled) {
        document.getElementById("select").play();
        let $voice;
        if ($parent.querySelector("audio")) {
          $voice = $parent.querySelector("audio");
        } else {
          $voice = document.createElement("audio");
          let { select } = champions[$parent.id];
          $voice.setAttribute("src", `${SOUNDS}${select}`);
          $parent.append($voice);
        }
        setOneVol($voice);
        $voice.play();
        $voice.addEventListener("ended", (e) => {
          window.location.href = `campeon.html?c=${$parent.id}`;
        });
      } else {
        window.location.href = `campeon.html?c=${$parent.id}`;
      }
    }
  });
}
