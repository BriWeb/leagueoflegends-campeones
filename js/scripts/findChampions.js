import { CHAMPIONS } from "./endpoints.js";
import form from "./form.js";
import { domain } from "../config.js";

export default async function findChampions() {
  try {
    let res = await fetch(CHAMPIONS);
    if (res.ok) {
      const { data } = await res.json();

      let champsImages = await fetch(domain + "assets/images.json");
      let champsPositions = await fetch(domain + "assets/positions.json");
      let images = await champsImages.json();
      let positions = await champsPositions.json();

      printChampions(data, images, positions);
      form();
    } else {
      throw res;
    }
  } catch (error) {
    failure(error);
  }
}

const printChampions = (championsEN, images, positions) => {
  let championsES = {};
  for (let championId in championsEN) {
    championsES = {
      ...championsES,
      [championsEN[championId].name]: { ...championsEN[championId] },
    };
  }

  let fragment = document.createDocumentFragment();
  let $template = document.getElementById("champ-template").content;

  let names = Object.keys(championsES);
  names.sort();

  names.forEach((name) => {
    let $container = $template.querySelector(".champion");
    let $img = $template.querySelector(".champion__splash");
    let $paragraph = $template.querySelector(".champion__name");

    $container.setAttribute("id", championsES[name].id);
    $container.setAttribute("data-positions", positions[name]);

    $img.setAttribute("src", images[name]);
    $img.setAttribute("alt", name);
    $img.setAttribute("loading", "lazy");

    $paragraph.textContent = name;

    let $clone = document.importNode($template, true);

    fragment.append($clone);
  });

  document.querySelector("main").append(fragment);
};

const failure = (error) => {};
