const buttonMenuMobile = document.getElementById("menu-btn");
const menuNavContainer = document.getElementById("menu-container");
const menuNavLinks = document.querySelectorAll("#header ul li");
const buttonCloseMenuMobile = document.getElementById("menu-close");
const headerContainer = document.getElementById("header");
const sections = document.querySelectorAll("main section[id]");

buttonMenuMobile.addEventListener("click", toggleMenu);

window.addEventListener("scroll", function () {
  addBoxShadow();
  activateMenuAtCurrentSection();
});

menuNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu();
  });
});

function addBoxShadow() {
  window.scrollY > 100
    ? headerContainer.classList.add("shadow-lg")
    : headerContainer.classList.remove("shadow-lg");
}

function toggleMenu() {
  menuNavContainer.classList.toggle("show-menu");
}

function activateMenuAtCurrentSection() {
  const checkpoint = window.scrollY + (window.innerHeight / 10) * 4; // Calcula o "checkpoint", que é a posição vertical atual da janela mais 40% da altura da janela.

  for (const section of sections) {
    const sectionTop = section.offsetTop; // Obtém a posição vertical superior da seção em relação ao topo do documento.

    const sectionHeight = section.offsetHeight; // Obtém a altura da seção.

    const sectionId = section.getAttribute("id"); // Obtém o ID da seção.

    const navLink = document.querySelector(
      'nav ul li a[href="#' + sectionId + '"]'
    ); // Encontra o link de navegação correspondente à seção atual com base no ID da seção.

    const checkpointStart = checkpoint >= sectionTop;
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

    checkpointStart && checkpointEnd
      ? navLink.classList.add("active")
      : navLink.classList.remove("active");
  }
}

// Swiper JS
const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    10: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 60,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

const textParts = [
  { text: "Harmonia e Estilo Moldando a Sua Melhor ", isTag: false },
  { text: '<span class="text-brown-primary">Versão!</span>', isTag: true },
];

let index = 0;
let partIndex = 0;
let typingInProgress = true;

function typeEffect() {
  const element = document.getElementById("text-output");
  const currentPart = textParts[partIndex];

  if (partIndex < textParts.length) {
    if (!currentPart.isTag) {
      element.innerHTML += currentPart.text.charAt(index);
      index++;
      if (index >= currentPart.text.length) {
        index = 0;
        partIndex++;
        typingInProgress = false; // Finaliza a digitação
        setTimeout(typeEffect, 1000); // Pausa antes de passar para a próxima parte
      }
    } else {
      element.innerHTML += currentPart.text;
      partIndex++;
      typingInProgress = false;
      setTimeout(typeEffect, 1000);
    }

    if (typingInProgress) {
      setTimeout(typeEffect, 100); // Continua a digitação
    }
  }
}

function blinkCursor() {
  const cursor = document.getElementById("cursor");
  cursor.style.visibility =
    cursor.style.visibility === "hidden" ? "visible" : "hidden";
  setTimeout(blinkCursor, 500); // Tempo do efeito de piscar (500ms)
}

typeEffect();
blinkCursor(); // Inicia o piscar do cursor

let count = 1;
const maxCount = 200;
let counterStarted = false;

function animateCounter() {
  const counterElement = document.getElementById("counter");
  if (count <= maxCount) {
    counterElement.textContent = count;
    count++;
    setTimeout(animateCounter, 20);
  }
}

function startCounterWhenVisible() {
  const targetSection = document.querySelector("#testimonials");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Quando a section entra em vista e o contador não começou ainda
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          count = 1; // Reinicia o contador
          animateCounter();
        }
        // Quando a section sai da vista, reseta o contador
        else if (!entry.isIntersecting && counterStarted) {
          counterStarted = false;
          count = 1; // Reinicia o contador para a próxima vez
        }
      });
    },
    { threshold: 0.5 } // Inicia quando 50% da seção está visível
  );

  observer.observe(targetSection);
}

startCounterWhenVisible();

document.addEventListener("DOMContentLoaded", () => {
  const text = "Dossiê de Identidade Visual.";
  const typingText = document.getElementById("typing-text");
  let index = 0;

  function typeText() {
    if (index < text.length) {
      typingText.innerHTML += text[index++];
      setTimeout(typeText, 100);
    }
  }

  typeText();
});
