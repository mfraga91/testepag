/* =========================================================================
   PROJETO: LANDING PAGE ACCESSIBLENESS IN SCHOOLS
   ARQUIVO: script.js
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------------------------
       1. ARRAYS DE DADOS (GESTÃO DINÂMICA DE CONTEÚDO)
       --------------------------------------------------------------------- */

    // Dados das Soluções Educacionais (Renderização em Grid)
    const solucoesData = [
        {
            icon: 'fa-universal-access',
            title: 'Adequação Arquitetônica',
            description: 'Mapeamento e execução de rampas, sinalização tátil, sanitários acessíveis e rotas livres de barreiras conforme NBR 9050.'
        },
        {
            icon: 'fa-book-open-reader',
            title: 'Tecnologia Assistiva',
            description: 'Implementação de softwares de leitura de tela, teclados adaptados e leitores de áudio para alunos com deficiência visual ou motora.'
        },
        {
            icon: 'fa-chalkboard-user',
            title: 'Capacitação Docente',
            description: 'Treinamentos práticos para professores sobre Planejamento Educacional Individualizado (PEI) e metodologias inclusivas.'
        },
        {
            icon: 'fa-hands-asl-interpreting',
            title: 'Inclusão Comunicacional',
            description: 'Tradução de materiais pedagógicos para Libras, Braille e formatos de Leitura Fácil para deficiência intelectual.'
        },
        {
            icon: 'fa-gavel',
            title: 'Auditoria Normativa LBI',
            description: 'Diagnóstico detalhado do nível de conformidade legal da instituição para prevenção de multas e ações civis.'
        },
        {
            icon: 'fa-users-line',
            title: 'Sensibilização da Comunidade',
            description: 'Workshops e dinâmicas interativas para estudantes e pais, fortalecendo uma cultura escolar verdadeiramente acolhedora.'
        }
    ];

    // Dados do Carrossel de Depoimentos
    const depoimentosData = [
        {
            quote: "A EduInclusiva transformou nosso colégio. Além da reforma física impecável, a capacitação que deram aos nossos professores mudou totalmente a dinâmica das salas de aula.",
            author: "Dra. Renata Vasconcelos",
            role: "Diretora Pedagógica - Colégio Horizonte"
        },
        {
            quote: "Estávamos inseguros quanto às exigências da LBI. A consultoria nos entregou um plano claro e executou as obras com zero impacto na nossa rotina escolar.",
            author: "Prof. Carlos Eduardo Mendes",
            role: "Mantenedor - Instituto Educacional Alfa"
        },
        {
            quote: "A resposta das famílias foi imediata. Mostrar que nossa escola está preparada para receber todos os alunos aumentou nossas matrículas em 25%.",
            author: "Mariana Siqueira",
            role: "Gestora de Admissões - Escola Caminho do Saber"
        }
    ];

    // Dados do Acordeão (FAQ)
    const faqData = [
        {
            question: "O que é exigido pela Lei Brasileira de Inclusão (LBI) nas escolas?",
            answer: "A LBI exige que escolas públicas e privadas garantam acesso, permanência e aprendizado a estudantes com deficiência, vedando a cobrança de taxas extras em mensalidades e exigindo adequações físicas, materiais adaptados e formação docente."
        },
        {
            question: "Quanto tempo leva para realizar o diagnóstico de acessibilidade?",
            answer: "Nossa equipe realiza a visita técnica e a análise pedagógica em até 5 dias úteis, entregando um relatório executivo com prioridades e plano de ação em no máximo 15 dias."
        },
        {
            question: "Como funciona a capacitação dos professores?",
            answer: "Oferecemos módulos presenciais e online focados na elaboração do PEI (Plano de Ensino Individualizado), adaptação de avaliações e uso de tecnologias assistivas no dia a dia da sala."
        },
        {
            question: "As adaptações físicas exigem grandes obras?",
            answer: "Nem sempre. Muitas vezes soluções inteligentes de sinalização, redistribuição de mobiliário e pequenas rampas pré-moldadas resolvem a maior parte dos gargalos com baixo custo e intervenção mínima."
        }
    ];

    /* ---------------------------------------------------------------------
       2. RENDERIZAÇÃO DINÂMICA DE COMPONENTES
       --------------------------------------------------------------------- */

    // Renderizar Soluções em Grid
    const solutionsGrid = document.getElementById('solutions-grid');
    if (solutionsGrid) {
        solutionsGrid.innerHTML = solucoesData.map(item => `
            <article class="card scroll-reveal">
                <i class="fa-solid ${item.icon} card-icon" aria-hidden="true"></i>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </article>
        `).join('');
    }

    // Renderizar Carrossel de Depoimentos
    const carouselContainer = document.getElementById('carousel-container');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (carouselContainer && carouselDots) {
        carouselContainer.innerHTML = depoimentosData.map((item, index) => `
            <div class="testimonial-card ${index === 0 ? 'active' : ''}" data-index="${index}">
                <p class="testimonial-quote">"${item.quote}"</p>
                <div class="testimonial-author">${item.author}</div>
                <div class="testimonial-role">${item.role}</div>
            </div>
        `).join('');

        carouselDots.innerHTML = depoimentosData.map((_, index) => `
            <button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ir para depoimento ${index + 1}"></button>
        `).join('');
    }

    // Renderizar Acordeão (FAQ)
    const accordionContainer = document.getElementById('accordion-container');
    if (accordionContainer) {
        accordionContainer.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item scroll-reveal">
                <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-${index}">
                    <span>${item.question}</span>
                    <i class="fa-solid fa-chevron-down accordion-icon" aria-hidden="true"></i>
                </button>
                <div id="faq-ans-${index}" class="accordion-content">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');
    }

    /* ---------------------------------------------------------------------
       3. CONTROLE DE ACESSIBILIDADE (FONTE E ALTO CONTRASTE)
       --------------------------------------------------------------------- */

    let currentFontSize = 16; // Tamanho base em px

    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    const btnToggleContrast = document.getElementById('btn-toggle-contrast');

    if (btnIncreaseFont) {
        btnIncreaseFont.addEventListener('click', () => {
            if (currentFontSize < 24) { // Limite máximo
                currentFontSize += 2;
                document.documentElement.style.fontSize = `${currentFontSize}px`;
            }
        });
    }

    if (btnDecreaseFont) {
        btnDecreaseFont.addEventListener('click', () => {
            if (currentFontSize >= 12) { // Limite mínimo
                currentFontSize -= 2;
                document.documentElement.style.fontSize = `${currentFontSize}px`;
            }
        });
    }

    if (btnToggleContrast) {
        btnToggleContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }

    /* ---------------------------------------------------------------------
       4. LÓGICA DO CARROSSEL
       --------------------------------------------------------------------- */

    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    function showSlide(index) {
        if (!slides.length) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            showSlide(index);
        });
    });

    /* ---------------------------------------------------------------------
       5. LÓGICA DO ACORDEÃO
       --------------------------------------------------------------------- */

    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Fechar todos os outros itens
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.accordion-header');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            // Alternar estado do item clicado
            if (!isActive) {
                accordionItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ---------------------------------------------------------------------
       6. ANIMAÇÃO SUAVE DE ENTRADA (SCROLL REVEAL)
       --------------------------------------------------------------------- */

    const revealElements = document.querySelectorAll('.scroll-reveal, .section-header, .benefit-card');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executar uma vez ao carregar
});