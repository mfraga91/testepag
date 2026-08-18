/**
 * GERENCIADOR DE ESTADO E COMPONENTES
 * Lida com Dados Dinâmicos, Acessibilidade e Animações.
 */

// 1. DADOS DOS COMPONENTES (Evitando repetição no HTML)
const benefitsData = [
    {
        title: "Adequação à LBI",
        description: "Garantimos que sua escola cumpra 100% as normas da Lei Brasileira de Inclusão, evitando sanções e multas governamentais."
    },
    {
        title: "Tecnologia Assistiva",
        description: "Implementamos hardwares e softwares educativos que democratizam a informação para alunos com deficiências sensoriais ou motoras."
    },
    {
        title: "Capacitação Docente",
        description: "Treinamentos práticos para coordenadores e professores adotarem metodologias inclusivas em sala de aula de forma natural."
    },
    {
        title: "Arquitetura Inclusiva",
        description: "Mapeamento e reestruturação de espaços físicos: rampas, pisos táteis, banheiros adaptados e sinalização universal."
    }
];

const testimonialsData = [
    {
        quote: "Antes, não sabíamos como adaptar nossas provas. Hoje, temos orgulho de ver alunos com TEA acompanhando a turma com excelência.",
        author: "Marcia V., Diretora Pedagógica"
    },
    {
        quote: "O diagnóstico de infraestrutura revelou barreiras que não enxergávamos. A reforma transformou a dinâmica do pátio escolar.",
        author: "Roberto S., Mantenedor Escolar"
    },
    {
        quote: "Uma consultoria assertiva e direta ao ponto. Nossas matrículas de inclusão cresceram 40% graças à nova reputação da escola.",
        author: "Helena G., Coordenadora de Inclusão"
    }
];

const faqData = [
    {
        question: "Como funciona o diagnóstico inicial gratuito?",
        answer: "Agendamos uma reunião online ou presencial para mapear os principais desafios arquitetônicos e pedagógicos da sua escola, entregando um panorama das urgências sem custo."
    },
    {
        question: "Vocês realizam as obras arquitetônicas?",
        answer: "Nós entregamos o projeto arquitetônico acessível assinado por engenheiros especializados, e podemos acompanhar a execução junto à sua empreiteira de confiança."
    },
    {
        question: "O treinamento docente abrange o espectro autista?",
        answer: "Sim. Nossos módulos de capacitação cobrem TDAH, TEA, deficiências físicas, visuais e auditivas, com estratégias práticas de didática inclusiva."
    }
];

// 2. FUNÇÕES DE RENDERIZAÇÃO DOM
function renderBenefits() {
    const container = document.getElementById('benefits-container');
    if (!container) return;
    
    container.innerHTML = benefitsData.map(item => `
        <article class="benefit-card">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </article>
    `).join('');
}

function renderCarousel() {
    const container = document.getElementById('carousel-container');
    if (!container) return;
    
    container.innerHTML = testimonialsData.map(item => `
        <article class="carousel-item">
            <blockquote>"${item.quote}"</blockquote>
            <p class="carousel-author">${item.author}</p>
        </article>
    `).join('');
}

function renderAccordion() {
    const container = document.getElementById('accordion-container');
    if (!container) return;
    
    container.innerHTML = faqData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-content-${index}">
                ${item.question}
                <span class="icon" aria-hidden="true">+</span>
            </button>
            <div id="faq-content-${index}" class="accordion-content">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');

    // Lógica do Acordeão
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = header.getAttribute('aria-expanded') === 'true';
            
            // Fecha todos
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                h.querySelector('.icon').textContent = '+';
            });

            // Abre o atual se não estava aberto
            if (!isOpen) {
                header.setAttribute('aria-expanded', 'true');
                header.querySelector('.icon').textContent = '-';
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// 3. CONTROLES DE ACESSIBILIDADE E UX
function initAccessibility() {
    const btnContrast = document.getElementById('btn-contrast');
    const btnIncrease = document.getElementById('btn-increase-font');
    const btnDecrease = document.getElementById('btn-decrease-font');
    
    let fontSizePx = 16; // Estado base
    const htmlElement = document.documentElement;

    // Toggle Contraste
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // Controle de Fonte Restrito
    const updateFontSize = (newSize) => {
        if (newSize >= 12 && newSize <= 24) {
            fontSizePx = newSize;
            htmlElement.style.fontSize = `${fontSizePx}px`;
        }
    };

    btnIncrease.addEventListener('click', () => updateFontSize(fontSizePx + 2));
    btnDecrease.addEventListener('click', () => updateFontSize(fontSizePx - 2));
}

// 4. ANIMAÇÕES SCROLL REVEAL
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => observer.observe(reveal));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderBenefits();
    renderCarousel();
    renderAccordion();
    initAccessibility();
    initScrollReveal();
});