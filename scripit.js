/**
 * ==========================================================================
 * CAMADA DE INTELIGÊNCIA E RENDERIZAÇÃO DINÂMICA
 * Portal Escola Inclusiva: Acessibilidade na Escola
 * ==========================================================================
 */

// 1. GESTÃO DE ESTADO E ACESSIBILIDADE DE FONTE
const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;
let currentFontSize = DEFAULT_FONT_SIZE;

function applyFontSize() {
  document.documentElement.style.fontSize = `${currentFontSize}px`;
}

function increaseFont() {
  if (currentFontSize + 2 <= MAX_FONT_SIZE) {
    currentFontSize += 2;
    applyFontSize();
  }
}

function decreaseFont() {
  if (currentFontSize - 2 >= MIN_FONT_SIZE) {
    currentFontSize -= 2;
    applyFontSize();
  }
}

function toggleContrast() {
  document.body.classList.toggle('high-contrast');
}

// 2. DADOS DINÂMICOS (PILARES E ACORDEÃO)
const pilaresData = [
  {
    numero: '01',
    titulo: 'Acessibilidade Arquitetônica',
    descricao: 'Eliminação de barreiras físicas com rampas de acesso, elevadores adaptados, piso tátil, portas amplas e banheiros acessíveis.'
  },
  {
    numero: '02',
    titulo: 'Acessibilidade Atitudinal',
    descricao: 'Eliminação de preconceitos e estereótipos por meio da conscientização, formação de professores e promoção da empatia escolar.'
  },
  {
    numero: '03',
    titulo: 'Acessibilidade Pedagógica',
    descricao: 'Adaptação de materiais didáticos, uso de Tecnologias Assistivas, comunicação alternativa e planos de ensino individualizados.'
  }
];

const diretrizesData = [
  {
    titulo: 'Desenho Universal para a Aprendizagem (DUA)',
    conteudo: 'Proporcionar múltiplos meios de engajamento, representação e expressão para garantir que todos os alunos aprendam juntos.'
  },
  {
    titulo: 'Tecnologias Assistivas na Sala de Aula',
    conteudo: 'Uso de leitores de tela, lupas eletrônicas, teclados adaptados e pranchas de comunicação para autonomia dos estudantes.'
  },
  {
    titulo: 'Atendimento Educacional Especializado (AEE)',
    conteudo: 'Salas de Recursos Multifuncionais organizadas para complementar ou suplementar a escolarização no turno inverso.'
  }
];

const carouselItems = [
  {
    src: './img/escola_inclusiva.png',
    alt: 'Sala de aula inclusiva adaptada com tecnologia assistiva',
    title: 'Ambientes Adaptados e Acolhedores',
    description: 'Salas de aula com espaço fluido, mobiliário ajustável e recursos tecnológicos garantem plena participação de todos.'
  },
  {
    src: './img/campo.png',
    alt: 'Rampa de acesso e piso tátil na entrada da escola',
    title: 'Infraestrutura Sem Barreiras',
    description: 'A acessibilidade física permite autonomia no acesso às salas, bibliotecas, pátios e quadras esportivas.'
  },
  {
    src: './img/cidade.png',
    alt: 'Estudantes interagindo com recursos de comunicação alternativa',
    title: 'Convivência e Aprendizado Colaborativo',
    description: 'A convivência com a diversidade desenvolve o respeito, a empatia e fortalece toda a comunidade escolar.'
  }
];

const facts = [
  'A Lei Brasileira de Inclusão (LBI) garante que todas as escolas devem oferecer atendimento especial sem custos adicionais.',
  'O piso tátil e a sinalização em Braille auxiliam estudantes com deficiência visual na localização autônoma no espaço escolar.',
  'Acessibilidade atitudinal consiste na eliminação de preconceitos, estigmas e discriminações entre alunos e professores.',
  'A inclusão beneficia todos os estudantes, pois promove um ambiente mais empático, criativo e diversificado.'
];

// 3. RENDERIZAÇÃO DINÂMICA
function renderPilares() {
  const container = document.getElementById('pilares-grid');
  if (!container) return;

  container.innerHTML = pilaresData.map(pilar => `
    <article class="process-card">
      <div class="process-number">${pilar.numero}</div>
      <h3>${pilar.titulo}</h3>
      <p>${pilar.descricao}</p>
    </article>
  `).join('');
}

function renderDiretrizes() {
  const container = document.getElementById('accordion-grid');
  if (!container) return;

  container.innerHTML = diretrizesData.map(item => `
    <article class="info-card expandable-card">
      <button class="card-toggle" type="button" aria-expanded="false">
        <span>${item.titulo}</span>
        <span class="card-icon">+</span>
      </button>
      <div class="card-content">
        <p>${item.conteudo}</p>
      </div>
    </article>
  `).join('');

  // Atribuir eventos ao acordeão renderizado
  container.querySelectorAll('.card-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const card = toggle.closest('.expandable-card');
      const isOpen = card.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.querySelector('.card-icon').textContent = isOpen ? '−' : '+';
    });
  });
}

// 4. CONTROLE DO CARROSSEL
let currentIndex = 0;
let autoSlide;

function updateCarousel() {
  const img = document.getElementById('carousel-image');
  const title = document.getElementById('carousel-title');
  const description = document.getElementById('carousel-description');
  const dotsContainer = document.getElementById('carousel-dots');

  if (!img || !title || !description || !dotsContainer) return;

  const item = carouselItems[currentIndex];
  img.src = item.src;
  img.alt = item.alt;
  title.textContent = item.title;
  description.textContent = item.description;

  // Atualizar Indicadores (Dots)
  dotsContainer.innerHTML = carouselItems.map((_, idx) => `
    <button type="button" class="dot ${idx === currentIndex ? 'active' : ''}" data-index="${idx}" aria-label="Ir para imagem ${idx + 1}"></button>
  `).join('');

  dotsContainer.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = Number(dot.dataset.index);
      updateCarousel();
      resetAutoSlide();
    });
  });
}

function changeSlide(direction) {
  currentIndex = (currentIndex + direction + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// 5. INICIALIZAÇÃO DE EVENTOS E INTERATIVIDADE
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar componentes
  renderPilares();
  renderDiretrizes();
  updateCarousel();
  startAutoSlide();

  // Botoes do Carrossel
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { changeSlide(-1); resetAutoSlide(); });
    nextBtn.addEventListener('click', () => { changeSlide(1); resetAutoSlide(); });
  }

  // Menu Hamburguer Mobile
  const hamburger = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Menu Explorar (Nav More)
  const navMore = document.querySelector('.nav-more');
  const navMoreBtn = document.getElementById('nav-more-btn');
  if (navMore && navMoreBtn) {
    navMoreBtn.addEventListener('click', () => {
      const isOpen = navMore.classList.toggle('open');
      navMoreBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!navMore.contains(event.target)) {
        navMore.classList.remove('open');
        navMoreBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Botoes de Acessibilidade
  const accessBtn = document.getElementById('accessibility-btn');
  const accessMenu = document.getElementById('accessibility-menu');
  if (accessBtn && accessMenu) {
    accessBtn.addEventListener('click', () => {
      const isHidden = accessMenu.classList.toggle('hidden');
      accessBtn.setAttribute('aria-expanded', String(!isHidden));
    });
  }

  document.getElementById('btn-increase-font')?.addEventListener('click', increaseFont);
  document.getElementById('btn-decrease-font')?.addEventListener('click', decreaseFont);
  document.getElementById('btn-toggle-contrast')?.addEventListener('click', toggleContrast);

  // Fatos e Curiosidades
  const factText = document.getElementById('fact-text');
  const factBtn = document.getElementById('fact-btn');
  let currentFactIndex = 0;

  if (factBtn && factText) {
    factBtn.addEventListener('click', () => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * facts.length);
      } while (nextIndex === currentFactIndex && facts.length > 1);

      currentFactIndex = nextIndex;
      factText.textContent = facts[currentFactIndex];
    });
  }

  // Submissão do Quiz
  const quizForm = document.getElementById('quiz-form');
  const quizResult = document.getElementById('quiz-result');

  if (quizForm && quizResult) {
    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
      let score = 0;
      let allAnswered = true;

      questions.forEach((q) => {
        const selected = quizForm.querySelector(`input[name="${q}"]:checked`);
        if (!selected) {
          allAnswered = false;
        } else if (selected.value === 'certo') {
          score++;
        }
      });

      if (!allAnswered) {
        quizResult.textContent = 'Por favor, responda a todas as perguntas para ver seu resultado.';
        quizResult.classList.add('show');
        return;
      }

      const feedbacks = {
        5: 'Excelente! Você domina todos os conceitos fundamentais de acessibilidade e inclusão escolar.',
        4: 'Ótimo resultado! Você demonstra grande conhecimento sobre práticas educacionais inclusivas.',
        3: 'Bom trabalho! Você compreende bem a base da acessibilidade na escola.',
        2: 'Resultado regular. Vale a pena revisar o conteúdo do portal para reforçar os conceitos.',
        1: 'Você acertou 1 pergunta. Continue explorando as seções do portal e tente novamente.',
        0: 'Que tal rever os conteúdos sobre acessibilidade e realizar o quiz mais uma vez?'
      };

      quizResult.textContent = `Resultado: ${score}/5. ${feedbacks[score]}`;
      quizResult.classList.add('show');
    });
  }

  // Scroll Reveal
  const revealElements = document.querySelectorAll('.reveal');
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});