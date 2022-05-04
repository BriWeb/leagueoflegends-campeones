import { setOneVol } from "./handleVolumen.js";

export default async function handleTheme(theme) {
  let $button = document.getElementById("play-pause");
  let $audio = document.getElementById("theme");
  $audio.setAttribute("src", theme);
  setOneVol($audio);
  let isPlaying = false;

  const play = async () => {
    await $audio.play();
    isPlaying = true;
    $button.setAttribute("src", "./assets/images/pause.svg");
  };
  play();

  $audio.addEventListener("pause", (e) => {
    $button.setAttribute("src", "./assets/images/play.svg");
    isPlaying = false;
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches("#play-pause")) {
      if (isPlaying) {
        $audio.pause();
      } else {
        play();
      }
    }
  });

  window.addEventListener("visibilitychange", e => {
    let visibility = document.visibilityState === "visible" ? true : false;
    if(!visibility && !$audio.paused){
      $audio.pause();
    }
    if(visibility && $audio.paused){
      play();
    }
  })
}
