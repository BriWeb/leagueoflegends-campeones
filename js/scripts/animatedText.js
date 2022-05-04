export default function animatedText(text, selector) {
  let $element = document.querySelector(selector);
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < text.length; i++) {
    let li = document.createElement("li");
    li.textContent = text[i];
    if (text[i] == " ") {
      li.classList.add("presentation__space");
    }
    li.classList.add("presentation__letter");
    fragment.append(li);
  }

  $element.append(fragment);

  $element.children[0].classList.add("animationToTop");
  document.addEventListener("animationend", (e) => {
    if (e.target.matches("li")) {
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.classList.add("animationToTop");
      }
    }
  });
}
