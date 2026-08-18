/**
 * 1. CAMADA DE DADOS (Arquitetura Inteligente)
 * Renderizamos o HTML diretamente via JavaScript usando array de objetos,
 * eliminando repetição e facilitando a manutenção futura.
 */

const accordionData = [
    {
        id: "acc-1",
        title: "Adequação Arquitetônica",
        content: "Rampas com inclinação correta, pisos táteis e adaptação de banheiros, garantindo autonomia física e segurança em todo o espaço escolar."
    },
    {
        id: "acc-2",
        title: "Tecnologia Assistiva",
        content: "Integração de softwares leitores de tela, teclados adaptados e mouses oculares nos laboratórios, conectando alunos com deficiência ao mundo digital."
    },
    {
        id: "acc-3",
        title: "Capacitação Docente",
        content: "Treinamentos focados em Práticas Pedagógicas Inclusivas, Libras e atendimento educacional especializado, preparando o professor para a diversidade."
    }
];

const testimonialData = [
    {
        text: "Após a implementação das diretrizes de acessibilidade, reduzimos a evasão escolar e vimos alunos com deficiência ganharem autonomia total no recreio.",
        author: "Diretora Marina S.",
        role: "Colégio Estadual Inclusão"
    },
    {
        text: "O treinamento docente mudou nossa visão. Hoje não adaptamos a prova para o aluno, nós desenhamos a aula pensando em todos desde o início.",
        author: "Prof. Roberto A.",
        role: "Ensino Fundamental II"
    },
    {
        text: "A arquitetura acessível beneficiou não apenas cadeirantes, mas todos os alunos e funcionários. O ambiente ficou mais humano e acolhedor.",
        author: "Ana Beatriz",
        role: "Coordenadora Pedagógica"
    }
];

/**
 * 2. RENDERIZAÇÃO DOS COMPONENTES
 */

// Renderizar Acordeão
const accordionContainer = document.getElementById('accordion-container');
if (accordionContainer) {
    accordionData.forEach(item => {
        const div = document.createElement('article');
        div.className = 'accordion-item';
        div.setAttribute('aria-expanded', 'false');
        div.innerHTML = `
            <div class="accordion-header" role="button" aria-controls="${item.id}">
                <h3>${item.title}</h3>
                <span class="icon">+</span>
            </div>
            <div class="accordion-content" id="${item.id}">
                <p>${item.content}</p>
            </div>
        `;
        
        div.addEventListener('click', () => {
            const isActive = div.classList.contains('active');
            
            // Fecha todos (Opcional: remover para deixar múltiplos abertos)
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.setAttribute('aria-expanded', 'false');
                el.querySelector('.icon').textContent = '+';
            });
            
            // Alterna o estado do atual
            if (!isActive) {
                div.classList.add('active');
                div.setAttribute('aria-expanded', 'true');
                div.querySelector('.icon').textContent = '-';
            }
        });
        
        accordionContainer.appendChild(div);
    });
}

// Renderizar Carrossel
const carouselContainer = document.getElementById('carousel-container');
let currentSlide = 0;

if (carouselContainer) {
    testimonialData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.innerHTML = `
            <blockquote>"${item.text}"</blockquote>
            <p><strong>${item.author}</strong> - ${item.role}</p>
        `;
        carouselContainer.appendChild(slide);
    });

    const updateCarousel = () => {
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            slide.setAttribute('aria-hidden', index === currentSlide ? 'false' : 'true');
        });
    };

    document.getElementById('next-slide')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialData.length;
        updateCarousel();
    });

    document.getElementById('prev-slide')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialData.length) % testimonialData.length;
        updateCarousel();
    });
}

/**
 * 3. FERRAMENTAS DE ACESSIBILIDADE E UX (Conforme regras estritas)
 */

// Acessibilidade: Tamanho da Fonte (Limite rigoroso: 12px a 24px)
let currentFontSize = 16;
const htmlElement = document.documentElement;

const changeFontSize = (amount) => {
    let novaFonte = currentFontSize + amount;
    if (novaFonte >= 12 && novaFonte <= 24) {
        currentFontSize = novaFonte;
        htmlElement.style.fontSize = `${currentFontSize}px`;
    }
};

document.getElementById('btn-increase-font')?.addEventListener('click', () => changeFontSize(2));
document.getElementById('btn-decrease-font')?.addEventListener('click', () => changeFontSize(-2));

// Acessibilidade: Alto Contraste (Alternador de estado)
const btnContrast = document.getElementById('btn-contrast');
if (btnContrast) {
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isActive = document.body.classList.contains('high-contrast');
        btnContrast.setAttribute('aria-pressed', isActive);
    });
}

// Animação de entrada suave (Scroll Reveal)
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));