const SOUNDS = "https://drive.google.com/uc?export=download&id=";
const DDRAGON = "https://ddragon.leagueoflegends.com/cdn";

// https://ddragon.leagueoflegends.com/cdn/12.6.1/data/es_AR/champion/Lissandra.json
// `${DATA}/Lissandra.json`
const DATA = `${DDRAGON}/12.8.1/data/es_AR/champion`;

// https://ddragon.leagueoflegends.com/cdn/12.7.1/img/passive/Lissandra_Passive.png
// `${PASSIVE_IMG}/${Lissandra.passive.image.full}`
const PASSIVE_IMG = `${DDRAGON}/12.8.1/img/passive`;

// http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/LissandraQ.png
// `${ABILITY_IMG}/${Lissandra.spells[0].image.full}`
const ABILITY_IMG = `${DDRAGON}/12.8.1/img/spell`;

// https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0127/ability_0127_Q1.webm
//`${VIDEO}/0${Lissandra.key}/ability_0${Lissandra.key}_${Letter}1.webm`
const VIDEO = "https://d28xe8vt774jo5.cloudfront.net/champion-abilities";

// https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lissandra_0.jpg
// `${SPLASH}/${champion.name}.jpg`
// `${SPLASH}/Lissandra_${Lissandra.skins[0].num}.jpg`
const SPLASH = `${DDRAGON}/img/champion/splash`;

// https://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/Lissandra.png
// `${AVATAR}/${Lissandra.image.full}`
const AVATAR = `${DDRAGON}/12.8.1/img/champion`;

const CHAMPION = {
  SOUNDS,
  DATA,
  PASSIVE_IMG,
  ABILITY_IMG,
  VIDEO,
  SPLASH,
  AVATAR,
};
const CHAMPIONS = `${DDRAGON}/12.8.1/data/es_AR/champion.json`;
export { CHAMPION, CHAMPIONS };
