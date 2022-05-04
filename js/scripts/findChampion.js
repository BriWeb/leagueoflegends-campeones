import getChampionByName from "./getChampionByName.js";
import { CHAMPION } from "./endpoints.js";
import championInteractivity from "./championInteractivity.js";
import { domain } from "../config.js";

let { SOUNDS, DATA, PASSIVE_IMG, ABILITY_IMG, VIDEO, SPLASH } = CHAMPION;

export default async function findChampion() {
  try {
    let name = getChampionByName("c");

    let { data } = await fetchData(`${DATA}/${name}.json`);
    let champion = data[name]; //CHAMPION (DATA)

    document.title = `${champion.name}, ${champion.title}`;
    // console.log(champion)
    let calls = [];
    let skins = []; //SKINS (SPLASHS ART)

    champion.skins.forEach((skin) => {
      calls.push(fetch(`${SPLASH}/${name == "Fiddlesticks" ? "FiddleSticks" : name}_${skin.num}.jpg`));
    });
    let results = await Promise.all(calls);
    results.map((skin, index) => {
      let name = champion.skins[index].name;
      skins.push({
        'name': name != 'default' ? name : champion.name,
        'url' : skin.url})
    });

    let soundtracks = await fetchData(domain + "assets/soundtracks.json");
    let { theme } = soundtracks[name];
    theme = `${SOUNDS}${theme}`; //THEME (AUDIO)

    let passiveImg = `${PASSIVE_IMG}/${champion.passive.image.full}`; //PASSIVE (IMAGE)

    let abilitiesImgs = []; //ABILITIES (IMAGES)
    champion.spells.map((spell) => {
      abilitiesImgs.push(`${ABILITY_IMG}/${spell.image.full}`);
    });

    let zeros = "0000";
    let key = `${zeros.slice(champion.key.length)}${champion.key}`;
    let abilitiesVds = []; //ABILITIES (VIDEOS)
    let letters = ["P", "Q", "W", "E", "R"];
    letters.map((letter) => {
      abilitiesVds.push(`${VIDEO}/${key}/ability_${key}_${letter}1.webm`);
    });

    let allChampionsPosition = await fetchData(domain + "assets/positions.json");
    let positions = allChampionsPosition[champion.name];
    
    let imagesPosition = [];  //POSITIONS (IMAGES)
    positions.forEach(position => {
      switch (position) {
        case "Superior":
            imagesPosition.push(`${domain}assets/images/TOP.png`)
          break;
        case "Jungla":
            imagesPosition.push(`${domain}assets/images/JUNGLE.png`)
          break;
        case "Central":
            imagesPosition.push(`${domain}assets/images/MIDDLE.png`)
          break;
        case "Soporte":
            imagesPosition.push(`${domain}assets/images/SUPPORT.png`)
          break;
        case "Inferior":
            imagesPosition.push(`${domain}assets/images/ADC.png`)
          break;
      }
    })

    let {tags} = champion;
    let imagesRols = [];  //ROLS (IMAGES)
     tags.forEach(tag => {
      switch (tag) {
        case "Fighter":
            imagesRols.push(`${domain}assets/images/rol-Fighter.svg`)
          break;
        case "Assassin":
            imagesRols.push(`${domain}assets/images/rol-Assassin.svg`)
          break;
        case "Mage":
            imagesRols.push(`${domain}assets/images/rol-Mage.svg`)
          break;
        case "Tank":
            imagesRols.push(`${domain}assets/images/rol-Tank.svg`)
          break;
        case "Support":
            imagesRols.push(`${domain}assets/images/rol-Support.svg`)
          break;
        case "Marksman":
            imagesRols.push(`${domain}assets/images/rol-Marksman.svg`)
          break;
      }
    })
    championInteractivity({
      champion,
      skins,
      theme,
      passiveImg,
      abilitiesImgs,
      abilitiesVds,
      imagesPosition,
      imagesRols
    });
  } catch (error) {
    console.log(error);
  }
}

const fetchData = async (url) => {
  try {
    let res = await fetch(url);
    if (res.ok) {
      let data = await res.json();
      return data;
    } else {
      throw res;
    }
  } catch (error) {
    console.log(error);
  }
};
