// --- DADOS DOS COMPONENTES (ARRAY DE OBJETOS) ---

const faqData = [
  {
    question: "Como funciona o diagnóstico de acessibilidade na escola?",
    answer: "Nossa equipe realiza uma auditoria presencial e técnica avaliando a infraestrutura física, os recursos pedagógicos atuais e o nível de preparação da equipe docente, emitindo um laudo com o plano de adequação."
  },
  {
    question: "A escola é obrigada por lei a se adequar?",
    answer: "Sim. A Lei Brasileira de Inclusão (LBI - Lei 13.146/2015) e a LDB exigem que instituições públicas e privadas garantam acessibilidade, PDI e atendimento educacional especializado sem cobrança de taxas extras na mensalidade."
  },
  {
    question: "Quanto tempo leva a implementação completa das soluções?",
    answer: "O cronograma varia de acordo com o porte da escola, mas as formações pedagógicas e adequações prioritárias costumam ser concluídas entre 30 e 90 dias."
  },
  {
    question: "Como funciona a capacitação dos professores?",
    answer: "Oferecemos oficinas práticas presenciais e online focadas no desenvolvimento do Plano de Ensino Individualizado (PEI), uso de tecnologias assistivas e estratégias de manejo em sala de aula."
  }
];

const testimonialData = [
  {
    quote: "A consultoria transformou nossa equipe. Hoje temos segurança jurídica e, acima de tudo, um ambiente onde todos os estudantes aprendem juntos de verdade.",
    author: "Dra. Maria Helena Santos",
    role: "Diretora Pedagógica - Colégio Horizonte"
  },
  {
    quote: "Conseguimos implementar as salas de recursos multifuncionais e capacitar 100% dos nossos professores em tempo recorde. O retorno das famílias foi fantástico.",
    author: "Prof. Carlos Eduardo Rocha",
    role: "Mantenedor - Instituto Educacional Inovar"
  },
  {
    quote: "O suporte na adequação do PEI eliminou os gargalos que tínhamos com a inclusão de alunos neurodivergentes. Recomendo a todos os gestores.",
    author: "Ana Paula Silveira",
    role: "Coordenadora Inclusiva - Escola Arco-Íris"
  }
];

// --- ESTADO E LÓGICA DE FONTE E CONTRASTE ---

let currentFontSize = 16;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

function updateFontSize(change) {
  const newSize = currentFontSize + change;
  if (newSize >= MIN_FONT_SIZE && newSize <= MAX_FONT_SIZE) {
    currentFontSize = newSize;
    document.documentElement.style.fontSize = `${(currentFontSize / 16) * 100}%`;
  }
}

// --- RENDERIZAÇÃO DOS COMPONENTES ---

function renderAccordion() {
  const container = document.getElementById("accordion-container");
  if (!container) return;

  container.innerHTML = faqData.map((item, index) => `
    <div class="accordion-item ${index === 0 ? 'active' : ''}">
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <span>${item.question}</span>
        <span class="icon">▼</span>
      </button>
      <div class="accordion-body">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');
}

function toggleAccordion(button) {
  const item = button.parentElement;
  const isActive = item.classList.contains("active");
  
  document.querySelectorAll(".accordion-item").forEach(el => el.classList.remove("active"));
  
  if (!isActive) {
    item.classList.add("active");
  }
}

let currentTestimonial = 0;

function renderCarousel() {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  const item = testimonialData[currentTestimonial];
  track.innerHTML = `
    <div class="carousel-card">
      <p class="carousel-text">"${item.quote}"</p>
      <div>
        <p class="carousel-author">${item.author}</p>
        <p class="carousel-role">${item.role}</p>
      </div>
    </div>
  `;
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialData.length;
  renderCarousel();
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonialData.length) % testimonialData.length;
  renderCarousel();
}

// --- INICIALIZAÇÃO DE EVENTOS ---

document.addEventListener("DOMContentLoaded", () => {
  // Eventos de Acessibilidade
  document.getElementById("btn-increase-font")?.addEventListener("click", () => updateFontSize(2));
  document.getElementById("btn-decrease-font")?.addEventListener("click", () => updateFontSize(-2));
  document.getElementById("btn-toggle-contrast")?.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
  });

  // Eventos de Carrossel
  document.getElementById("carousel-next")?.addEventListener("click", nextTestimonial);
  document.getElementById("carousel-prev")?.addEventListener("click", prevTestimonial);

  // Renderizar Telas
  renderAccordion();
  renderCarousel();
});