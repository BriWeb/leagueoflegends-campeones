
export default function svgChampion() {
  let $svg = document.querySelector(".abilities__svg");
  let d0, d1,d2,d3,d4,d5,d6;

  const QUERIE = matchMedia("(min-width: 48em)");
  QUERIE.addEventListener("change", changeSvg);
  window.addEventListener("resize", () => changeSvg(QUERIE));

  let $video = document.querySelector(".abilities__video");

  setTimeout(() => {
    changeSvg(QUERIE);
  }, 1000);

  function changeSvg(mql) {
    if (mql.matches) {
      videoDesktop();
      imageDesktop()
    } else {
      videoMobile();
      imageMobile();
    }
  }

  function getElementPosition($element) {
    return {
      top: $element.offsetTop,
      height: $element.offsetHeight,
      width: $element.offsetWidth,
      left: $element.offsetLeft,
    };
  }

  function setPath(path, d) {
    path.setAttribute("d", d);
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
  }

  function videoMobile() {
    let videoPosition = getElementPosition($video);

    d0 = `M${videoPosition.left + videoPosition.width * 0.5} ${videoPosition.top} 
    H${videoPosition.left} 
    V${videoPosition.top + videoPosition.height} 
    H${videoPosition.left + videoPosition.width * 0.5}`;
    setPath($svg.children[0], d0);

    d1 = `M${videoPosition.left + videoPosition.width * 0.5} ${videoPosition.top} 
    H${videoPosition.left + videoPosition.width} 
    V${videoPosition.top + videoPosition.height} 
    H${videoPosition.left + videoPosition.width * 0.5}`;
    setPath($svg.children[1], d1);

    d2 = `M${videoPosition.left + videoPosition.width*0.5} ${videoPosition.top + videoPosition.height}
    V${videoPosition.top + videoPosition.height + 30}`;
    setPath($svg.children[2], d2);

    d3 = `M${videoPosition.left + videoPosition.width*0.5} ${videoPosition.top + videoPosition.height +35} 
    m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0`;

    $svg.children[3].style.transform = "rotate(90deg)";
    $svg.children[3].style.transformOrigin = 
     `${videoPosition.left + videoPosition.width*0.5}px 
      ${videoPosition.top + videoPosition.height +35}px`;
    setPath($svg.children[3], d3);
  }

  function imageMobile() {
    let videoPosition = getElementPosition($video);
    let imagePosition = getElementPosition(document.querySelector(".abilities__img--selected"));

    d4 = `M${videoPosition.left + videoPosition.width*0.5} ${videoPosition.top + videoPosition.height +40} L${imagePosition.left + imagePosition.width*0.5} ${imagePosition.top - imagePosition.height*0.3}`

    setPath($svg.children[4], d4);

    d5 = `M${imagePosition.left + imagePosition.width*0.5} ${imagePosition.top - imagePosition.height*0.3}
      H${imagePosition.left}
      V${imagePosition.top + imagePosition.height*0.7}
      H${imagePosition.left + imagePosition.width*0.5}`
    
    setPath($svg.children[5], d5);

    d6 = `M${imagePosition.left + imagePosition.width*0.5} ${imagePosition.top - imagePosition.height*0.3}
      H${imagePosition.left + imagePosition.width}
      V${imagePosition.top + imagePosition.height*0.7}
      H${imagePosition.left + imagePosition.width*0.5}`

    setPath($svg.children[6], d6);
  }
  function videoDesktop() {
    let videoPosition = getElementPosition($video);

    d0 = `M${videoPosition.left} ${videoPosition.top + videoPosition.height * 0.5} 
    V${videoPosition.top} 
    H${videoPosition.left + videoPosition.width} 
    V${videoPosition.top + videoPosition.height * 0.5}`;
    setPath($svg.children[0], d0);

    d1 = `M${videoPosition.left} ${videoPosition.top + videoPosition.height * 0.5} 
    V${videoPosition.top + videoPosition.height} 
    H${videoPosition.left + videoPosition.width} 
    V${videoPosition.top + videoPosition.height * 0.5}`;
    setPath($svg.children[1], d1);

    d2 = `M${videoPosition.left + videoPosition.width} ${videoPosition.top + videoPosition.height*0.5}
    H${videoPosition.left + videoPosition.width + 30}`;
    setPath($svg.children[2], d2);

    d3 = `M${videoPosition.left + videoPosition.width + 35} ${videoPosition.top + videoPosition.height * 0.5} 
    m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0`;
    $svg.children[3].style.transform = "none"
    setPath($svg.children[3], d3);
  }  

  function imageDesktop() {
    let videoPosition = getElementPosition($video);
    let imagePosition = getElementPosition(document.querySelector(".abilities__img--selected"));

    d4 = `M${videoPosition.left + videoPosition.width + 40} ${videoPosition.top + videoPosition.height*0.5} L${imagePosition.left - imagePosition.width*0.3} ${imagePosition.top + imagePosition.height*0.5}`

    setPath($svg.children[4], d4)


    d5 = `M${imagePosition.left - imagePosition.width*0.3} ${imagePosition.top + imagePosition.height*0.5}
    V${imagePosition.top}
    H${imagePosition.left + imagePosition.width*0.7}
    V${imagePosition.top + imagePosition.height*0.5}`
    
    setPath($svg.children[5], d5);


    d6 = `M${imagePosition.left - imagePosition.width*0.3} ${imagePosition.top + imagePosition.height*0.5}
    V${imagePosition.top + imagePosition.height}
    H${imagePosition.left + imagePosition.width*0.7}
    V${imagePosition.top + imagePosition.height*0.5}`
    
    setPath($svg.children[6], d6);
  }
  
  const scrollAnimation = () => {
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $svg.children[0].style.animation = "pathAppear 1.8s ease-in-out forwards";
          $svg.children[1].style.animation = "pathAppear 1.8s ease-in-out forwards";
        }
      });
    };
  
    const observer = new IntersectionObserver(cb, { threshold: 1 });
    observer.observe($video);
  }
  scrollAnimation();

  function animatedImageSvg(){
    $svg.children[4].style.animation ="pathAppear .4s ease-in-out forwards";
    setTimeout(() => {
      $svg.children[5].style.animation ="pathAppear .4s ease-in-out forwards"
      $svg.children[6].style.animation ="pathAppear .4s ease-in-out forwards"
    }, 350);
  }

  document.addEventListener("animationend", (e) => {
    if (e.target.matches("path")) {
      let next = e.target.nextElementSibling;
      if (next) {
        if(e.target != $svg.children[0] && !next.classList.contains("image-path")){
          next.style.animation ="pathAppear .2s ease-in-out forwards";
        } else if(next == $svg.children[4]){
          animatedImageSvg();
        }
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".abilities__img")) {
      let images = document.querySelectorAll(".image-path");
      images.forEach(image => image.style.animation = "none");
      setTimeout(() => {
        if (QUERIE.matches) {
          imageDesktop()
        } else {
          imageMobile();
        }
        animatedImageSvg()
      }, 150);
    }
  });
}