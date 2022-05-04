export default function svgChampions() {
  let $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  $svg.id = "lines";
  document.querySelector("body").prepend($svg);

  let $form = document.querySelector(".form");
  let $span = document.querySelector("h1 span");
  let form = {};
  let span = {};
  let $path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let $path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let $path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let $path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let d1, d2, d3, d4;

  const setPath = (path, d) => {
    path.setAttribute("d", d);
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
  };

  const createMeasures = () => {
    form = {
      top: $form.offsetTop,
      height: $form.offsetHeight,
      width: $form.offsetWidth,
      left: $form.offsetLeft,
    };
    span = {
      top: $span.offsetTop,
      height: $span.offsetHeight,
      width: $span.offsetWidth,
      left: $span.offsetLeft,
    };
    $svg.style.height = form.top + form.height;

    d1 = `M${span.left} ${span.top + span.height * 0.5} V${
      span.top + span.height
    } H${span.left + span.width} V${span.top + span.height * 0.5}`;
    setPath($path1, d1);

    d2 = `M${span.left + span.width} ${span.top + span.height * 0.5} V${
      span.top
    } H${span.left} V${span.top + span.height * 0.5}`;
    setPath($path2, d2);

    d3 = `M${span.left + span.width * 0.5} ${span.top + span.height} V${
      form.top
    }`;
    setPath($path3, d3);

    d4 = `M${form.left + form.width * 0.5} ${form.top} H${form.left} V${
      form.top + form.height
    } H${form.left + form.width - 1} V${form.top} H${
      form.left + form.width * 0.5
    }`;
    setPath($path4, d4);
  };
  $svg.append($path1);
  $svg.append($path2);
  $svg.append($path3);
  $svg.append($path4);
  createMeasures();

  window.addEventListener("resize", (e) => {
    createMeasures();
  });
}
