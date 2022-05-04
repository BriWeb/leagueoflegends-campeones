import animatedText from "./animatedText.js";
import handleTheme from "./handleTheme.js";

export default function championInteractivity(dates) {
  let { abilitiesImgs, abilitiesVds, champion, passiveImg, skins, theme, imagesPosition, imagesRols } =
    dates;

  let infoAbilities = [
    {
      image: passiveImg,
      name: champion.passive.name,
      description: champion.passive.description,
      video: abilitiesVds[0],
    },
    {
      image: abilitiesImgs[0],
      name: champion.spells[0].name,
      description: champion.spells[0].description,
      video: abilitiesVds[1],
    },
    {
      image: abilitiesImgs[1],
      name: champion.spells[1].name,
      description: champion.spells[1].description,
      video: abilitiesVds[2],
    },
    {
      image: abilitiesImgs[2],
      name: champion.spells[2].name,
      description: champion.spells[2].description,
      video: abilitiesVds[3],
    },
    {
      image: abilitiesImgs[3],
      name: champion.spells[3].name,
      description: champion.spells[3].description,
      video: abilitiesVds[4],
    },
  ];

  const locateAbility = () => {
    let index = document
      .querySelector(".abilities__img--selected")
      .getAttribute("data-spell");
    document.querySelector(".abilities__name").innerHTML =
      infoAbilities[index].name;
    document.querySelector(".abilities__description").innerHTML =
      infoAbilities[index].description;
    document
      .querySelector(".abilities__video")
      .setAttribute("src", infoAbilities[index].video);
  };

  const moveCarousel = (selected) => {
    let carouselSkins = [];
    let left, right;

    if(skins.length >= 5){
      left = 2;
      right = 2;
    }
    if(skins.length == 4){
      left = 1;
      right = 2;
    }
    if(skins.length == 3){
      left = 1;
      right = 1;
    }
    if(skins.length == 2){
      left = 0;
      right = 1;
    }

    carouselSkins.push(selected);

    for(let b = 0; b < left ; b++){
      let first = carouselSkins[0];
      let before = skins[first - 1] ? first - 1 : skins.length - 1;
      carouselSkins.unshift(before)
    }

    for(let a = 0; a < right ; a++){
      let last = carouselSkins[carouselSkins.length - 1];
      let after =  skins[last + 1] ? last + 1 : 0;
      carouselSkins.push(after)
    }

    return carouselSkins;
  }

  const printChampion = () => {
    handleTheme(theme);

    document.querySelector(".presentation__splash").src = skins[0].url;
    document.querySelector(".presentation__splash").alt = champion.name;
    animatedText(champion.name, ".presentation__name");
    document.querySelector(".presentation__title").textContent = champion.title;

    let $positions = document.querySelector(".data__positions");
    let $fragmentPos = document.createDocumentFragment();
    imagesPosition.forEach(position => {
      let $image = document.createElement("img");
      $image.setAttribute("src", position);
      $fragmentPos.append($image);
    })
    $positions.append($fragmentPos);

    let $rols = document.querySelector(".data__rols");
    let $fragmentRol = document.createDocumentFragment();
    imagesRols.forEach(rol => {
      let $image = document.createElement("img");
      $image.setAttribute("src", rol);
      $fragmentRol.append($image);
    })
    $rols.append($fragmentRol);

    document.querySelector(".data__lore").innerHTML = champion.lore;

    infoAbilities.forEach((ability, index) => {
      let $spell = document.querySelector(
        `.abilities__img[data-spell='${index}']`
      );
      $spell.setAttribute("src", ability.image);
      $spell.setAttribute("alt", ability.name);
    });

    locateAbility();

    let carouselSkins = moveCarousel(0);

    let expanded = document.querySelector(".skins__expanded");
    expanded.setAttribute("src", skins[0].url);
    let abilityName = document.querySelector(".skins__name");
    abilityName.textContent = skins[0].name;
    let $fragment = document.createDocumentFragment();
    carouselSkins.forEach(skinToPrint => {
      let $img = document.createElement("img");
      $img.setAttribute("src", skins[skinToPrint].url);
      $img.setAttribute("alt", `Skin N°${skinToPrint}`);
      $img.classList.add("skins__miniature");
      $img.setAttribute("data-skin", `${skinToPrint}`)
      if(skinToPrint == 0){
        $img.classList.add("skins__miniature--selected");
        $img.setAttribute("id", "skin-selected");
      }
      $fragment.append($img);
    })

    document.querySelector(".skins__carousel").append($fragment);

  };
  printChampion();

  function playSkinAudio () {
    let $audio = document.querySelector(".skins__audio");
    $audio.currentTime= 0;
    $audio.play();
  }

  document.addEventListener("click", (e) => {
    if (e.target.matches(".abilities__img")) {
      let $abilities = document.querySelectorAll(".abilities__img");

      $abilities.forEach((ability) =>
        ability.classList.remove("abilities__img--selected")
      );
      e.target.classList.add("abilities__img--selected");

      locateAbility();
    }
    if(e.target.matches(".skins__miniature")){
      let selected = e.target.getAttribute("data-skin");
      let carouselSkins = moveCarousel(parseInt(selected));

      let $skinsPreview = document.querySelectorAll(".skins__miniature");
      $skinsPreview.forEach(($preview, index )=> {
        $preview.setAttribute("src", skins[carouselSkins[index]].url);
        $preview.setAttribute("data-skin", carouselSkins[index])
      })

      document.querySelector(".skins__expanded").setAttribute("src", skins[selected].url)
      document.querySelector(".skins__name").textContent = skins[selected].name;
      playSkinAudio()
    }
    if(e.target.matches(".skins__right")){

      let selected = document.getElementById("skin-selected");
      let data = parseInt(selected.getAttribute("data-skin"))
      let position = data + 1 < skins.length ? data + 1 : 0;
      let carouselSkins = moveCarousel(position);

      let $skinsPreview = document.querySelectorAll(".skins__miniature");
      $skinsPreview.forEach(($preview, index )=> {
        $preview.setAttribute("src", skins[carouselSkins[index]].url);
        $preview.setAttribute("data-skin", carouselSkins[index])
      })

      document.querySelector(".skins__expanded").setAttribute("src", skins[position].url)
      document.querySelector(".skins__name").textContent = skins[position].name;
      playSkinAudio()
    }
    if(e.target.matches(".skins__left")){
      let selected = document.getElementById("skin-selected");
      let data = parseInt(selected.getAttribute("data-skin"));
      let position = data - 1 > 0 ? data - 1 : skins.length - 1;
      let carouselSkins = moveCarousel(position);

      let $skinsPreview = document.querySelectorAll(".skins__miniature");
      $skinsPreview.forEach(($preview, index )=> {
        $preview.setAttribute("src", skins[carouselSkins[index]].url);
        $preview.setAttribute("data-skin", carouselSkins[index])
      })

      document.querySelector(".skins__expanded").setAttribute("src", skins[position].url)
      document.querySelector(".skins__name").textContent = skins[position].name;
      playSkinAudio()
    }
  });

  let $infoAnimation = document.querySelector(".info__data");
  let $videoAnimation = document.querySelector(".abilities__video");
  let $imagesAnimation = document.querySelector(".abilities__images");

  let $smartAnimation = [$infoAnimation, $videoAnimation, $imagesAnimation]

  const scrollAnimation = () => {
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let el = entry.target;
          if(el == $infoAnimation){
            el.style.animation = "infoToTop 1.5s ease-in-out forwards";
          }else if(el == $videoAnimation){
            el.style.animation = "videoAnimation 1.5s ease-in-out forwards";
          }else if(el == $imagesAnimation){
            el.style.animation = "imagesAnimation 3s ease-in-out forwards";
          }
        }
      })
    };
  
    const observer = new IntersectionObserver(cb, { threshold: .2 });
    $smartAnimation.forEach( el => observer.observe(el))
  }
  scrollAnimation()
}
