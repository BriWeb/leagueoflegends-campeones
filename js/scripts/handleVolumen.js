let enabled = true;
let $speaker = document.getElementById("vol");

const setOneVol = (element) => {
  element.volume = $speaker.value * 0.01;
};

const handleVolumen = () => {
  let volDefault = $speaker.value;

  const setAllVol = (vol) => {
    let $audios = document.querySelectorAll("audio");
    $audios.forEach(($audio) => {
      $audio.volume = vol * 0.01;
    });
  };
  setAllVol(volDefault);

  const changeButton = () => {
    enabled = !enabled;
    let $img = document.querySelector(".controls__image");
    $img.setAttribute("src", `./assets/images/${enabled}.svg`);
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches(".controls__image")) {
      changeButton();
      $speaker.value = enabled ? volDefault : 0;
      setAllVol($speaker.value);
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.matches("#vol")) {
      setAllVol($speaker.value);
      if ($speaker.value == 0) {
        changeButton();
      }
      if (!enabled && $speaker.value > 0) {
        changeButton();
      }
    }
  });
};

handleVolumen();

export { enabled, setOneVol };
