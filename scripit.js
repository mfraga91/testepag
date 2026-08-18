/**
 * ESTADO E DADOS GLOBAIS
 * Estrutura baseada em Array de Objetos para facilitar a manutenção técnica.
 */
const accData = [
    {
        id: "pilar-1",
        title: "Adequação Arquitetônica",
        desc: "Transformamos o espaço físico com rampas adaptadas, pisos táteis, banheiros acessíveis e sinalização em Braille, garantindo autonomia e segurança a todos."
    },
    {
        id: "pilar-2",
        title: "Tecnologia Assistiva",
        desc: "Implementação de softwares de leitura de tela, teclados colmeia, mouses adaptados e lousas digitais acessíveis nos laboratórios de informática."
    },
    {
        id: "pilar-3",
        title: "Capacitação Pedagógica",
        desc: "Treinamentos práticos para o corpo docente focado no Atendimento Educacional Especializado (AEE), adaptação de materiais e Libras básico."
    }
];

const testimonialsData = [
    {
        quote: "O diagnóstico mostrou barreiras que não enxergávamos. Hoje, nossos alunos com deficiência participam ativamente de todas as dinâmicas escolares.",
        author: "Diretora Lúcia Mendes",
        role: "Colégio Progresso Educacional"
    },
    {
        quote: "As tecnologias assistivas não apenas incluíram nossos alunos PCD, mas enriqueceram o processo de aprendizado de toda a turma.",
        author: "Prof. Marcos Andrade",
        role: "Coordenador de TI Escolar"
    },
    {
        quote: "Reduzimos a evasão escolar e aumentamos o engajamento das famílias. A escola agora reflete a diversidade do mundo real.",
        author: "Camila Ribeiro",
        role: "Mantenedora"
    }
];

/**
 * LÓGICA DE COMPONENTES
 */
// 1. Renderizar Acordeão
const accRoot = document.getElementById('accordion-root');
if (accRoot) {
    accData.forEach((item, index) => {
        const article = document.createElement('div');
        article.className = 'acc-item';
        
        article.innerHTML = `
            <button class="acc-header" aria-expanded="false" aria-controls="content-${index}">
                ${item.title}
                <span class="icon" aria-hidden="true">+</span>
            </button>
            <div id="content-${index}" class="acc-content" role="region">
                <p>${item.desc}</p>
            </div>
        `;
        
        const btn = article.querySelector('.acc-header');
        btn.addEventListener('click', () => {
            const isActive = article.classList.contains('active');
            
            // Fecha todos (comportamento exclusivo)
            document.querySelectorAll('.acc-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
                el.querySelector('.icon').textContent = '+';
            });
            
            // Abre o clicado se não estava ativo
            if (!isActive) {
                article.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                btn.querySelector('.icon').textContent = '-';
            }
        });
        
        accRoot.appendChild(article);
    });
}

// 2. Renderizar Carrossel
const carRoot = document.getElementById('carousel-root');
let currentSlide = 0;

if (carRoot) {
    testimonialsData.forEach((test, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        
        slide.innerHTML = `
            <blockquote>"${test.quote}"</blockquote>
            <p><strong>${test.author}</strong><br>${test.role}</p>
        `;
        carRoot.appendChild(slide);
    });

    const updateCarousel = () => {
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            slide.setAttribute('aria-hidden', index === currentSlide ? 'false' : 'true');
        });
    };

    document.getElementById('next-btn')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialsData.length;
        updateCarousel();
    });

    document.getElementById('prev-btn')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialsData.length) % testimonialsData.length;
        updateCarousel();
    });
}

/**
 * LÓGICA DE ACESSIBILIDADE
 */
// Tamanho de Fonte (Limites rigorosos 12px a 24px)
let currentFontSize = 16;
const htmlRoot = document.documentElement;

const adjustFont = (step) => {
    const novaFonte = currentFontSize + step;
    if (novaFonte >= 12 && novaFonte <= 24) {
        currentFontSize = novaFonte;
        htmlRoot.style.fontSize = `${currentFontSize}px`;
    }
};

document.getElementById('btn-increase')?.addEventListener('click', () => adjustFont(2));
document.getElementById('btn-decrease')?.addEventListener('click', () => adjustFont(-2));

// Alto Contraste
const btnContrast = document.getElementById('btn-contrast');
if (btnContrast) {
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
}