// ============ HEADER SCROLL EFFECT ============
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============ BURGER MENU ============
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============ ACTIVE LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ============ FADE-UP ANIMATION OBSERVER ============
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ============ COUNTER ANIMATION ============
const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.innerText);
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.innerText = target;
            }
        };
        updateNumber();
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ============ МОДАЛЬНОЕ ОКНО ============
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const modalContactBtn = document.getElementById('modalContactBtn');

const modalData = {
    'frame': {
        title: 'Каркасный дом',
        content: `
            <p><strong>Каркасный дом</strong> — это тип здания, где несущую основу (скелет) составляет жесткий каркас из деревянных брусьев, досок или металлопрофиля.</p>
            <ul>
                <li>Площадь: от 80 до 150 м²</li>
                <li>Количество спален: 2-4</li>
                <li>Материал: профилированный брус</li>
                <li>Фундамент: свайно-винтовой или ленточный</li>
                <li>Срок строительства: от 30 дней</li>
                <li>от 65 000 ₽/м²</li>
            </ul>
           
        `
    },
    'barnhouse': {
        title: 'Барнхаус',
        content: `
            <p><strong>Барнхаус</strong> — стильный дом в индустриальном стиле с просторными помещениями и функциональной планировкой.</p>
            <ul>
                <li>Площадь: от 100 до 200 м²</li>
                <li>Количество спален: 3-5</li>
                <li>Материал: клееный брус</li>
                <li>Фундамент: монолитная плита</li>
                <li>Срок строительства: от 45 дней</li>
                <li>от 65 000 ₽/м²</li>
            </ul>
         
        `
    },
    'banya': {
        title: 'Каркасная баня',
        content: `
            <p><strong>Каркасная баня</strong> — классическая русская баня с парной, комнатой отдыха и зоной барбекю.</p>
            <ul>
                <li>Площадь: от 20 до 60 м²</li>
                <li>Парная: от 6 до 10 м²</li>
                <li>Материал: профилированный брус</li>
                <li>Комплектация: печь, полки, лавки</li>
                <li>Срок строительства: от 14 дней</li>
                <li>от 85 000 ₽/м²</li>
            </ul>
        
        `
    },
    'canopy': {
        title: 'Навес',
        content: `
            <p><strong>Навес</strong> — Защита от града, солнца и листвы. Проще гаража, надёжнее тента.</p>
            <ul>
                <li>Площадь: от 10 м²</li>
                <li>Материал: профилированный брус, металличский каркас</li>
                <li>Срок строительства: от 14 дней</li>
                <li>от 4 000 ₽/м²</li>
            </ul>
            
        `
    },
    'grill': {
        title: 'Мангальная зона',
        content: `
            <p><strong>Мангальная зона</strong> — Мы проектируем не просто навес, а полноценное уличное пространство для готовки на огне.</p>
            <ul>
                <li>Площадь: от 10 м²</li>
                <li>Материал: профилированный брус, металличский каркас</li>
                <li>Срок строительства: от 14 дней</li>
                <li>от 4 000 ₽/м²</li>
            </ul>
            
        `
    },
    'custom': {
        title: 'Индивидуальный проект',
        content: `
            <p><strong>Индивидуальное проектирование</strong> — создадим уникальный проект специально для вас.</p>
            <ul>
                <li>Любая планировка по вашему желанию</li>
                <li>Авторский дизайн фасада и интерьеров</li>
                <li>Полное сопровождение на всех этапах</li>
                <li>Использование любых материалов</li>
                <li>Срок разработки: от 7 дней</li>
            </ul>
            <p>Стоимость рассчитывается индивидуально после консультации.</p>
        `
    }
};

function openModal(type) {
    const data = modalData[type];
    if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

if (modalContactBtn) {
    modalContactBtn.addEventListener('click', () => {
        window.open('https://vk.com/construction_company_svoidom', '_blank');
    });
}

// Обработчики для кнопок проектов
document.querySelectorAll('.project-btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = btn.getAttribute('data-type');
        openModal(type);
    });
});

document.querySelectorAll('.project-btn-calc').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal('custom');
    });
});

document.querySelectorAll('.custom-btn-details, .custom-btn-calc').forEach(btn => {
    btn.addEventListener('click', () => {
        openModal('custom');
    });
});

// ============ ANIMATIONS FOR CARDS ============
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

const advantageCards = document.querySelectorAll('.advantage-card');
const advantageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            advantageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

advantageCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    advantageObserver.observe(card);
});

// ============ INITIAL CHECK ============
setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}, 100);
