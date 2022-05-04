export default function form() {
  let champions = document.querySelectorAll(".champion");

  document.addEventListener("input", e => {
    if (e.target.matches(".form__input")) {
      filterName(e.target.value);
    }
  })

  document.addEventListener("submit", e => {
    if(e.target.matches("form")){
      e.preventDefault();
    }
  })

  document.addEventListener("click", (e) => {
    if (e.target.matches(".form__lane")) {
      let lanes = document.querySelectorAll(".form__lane");
      lanes.forEach((lane) => {
        if (lane.alt != e.target.alt) {
          lane.classList.remove("form__lane--selected");
        } else {
          e.target.classList.toggle("form__lane--selected");
        }
      });
      filterPosition(e.target);
    }
  });

  const positionActivate = () => {
    let lanes = document.querySelectorAll(".form__lane");
    let position = false;
    lanes.forEach((lane) => {
      if (lane.classList.contains("form__lane--selected")) {
        position = lane.alt;
      }
    });
    return position;
  };

  const filterPosition = () => {
    //false si no hay ninguna, "Inferior" si se encuentra activo
    let position = positionActivate();
    let name = document.querySelector(".form__input").value;

    if (!position) {
      champions.forEach((champion) => {
        let championName = champion.id.toLowerCase();
        if (championName.includes(name.toLowerCase())) {
          champion.classList.remove("champion--hide");
        }
      });
      return;
    }

    champions.forEach((champion) => {
      let championName = champion.id.toLowerCase();
      let championPosition = champion.dataset.positions;
      if (!championPosition.includes(position)) {
        champion.classList.add("champion--hide");
      } else if (championName.includes(name.toLowerCase())) {
        champion.classList.remove("champion--hide");
      }
    });
  };

  const filterName = (name) => {
    let position = positionActivate();

    champions.forEach((champion) => {
      let championName = champion.id.toLowerCase();
      let value = name.toLowerCase();
      let championPosition = champion.dataset.positions;

      if (championName.includes(value)) {
        if (position) {
          if (championPosition.includes(position))
            champion.classList.remove("champion--hide");
          else champion.classList.add("champion--hide");
        } else champion.classList.remove("champion--hide");
      } else champion.classList.add("champion--hide");
    });
  };
}
