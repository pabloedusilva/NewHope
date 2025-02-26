// Função para atualizar o contador do carrinho nos ícones
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const navCartCountElement = document.getElementById('nav-cart-count');
    const fixedCartCountElement = document.getElementById('fixed-cart-count');

    const count = cart.length;
    navCartCountElement.textContent = count > 0 ? count : '';
    fixedCartCountElement.textContent = count > 0 ? count : '';
}

// Função para carregar o carrinho
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-list');
    const checkoutContainer = document.getElementById('checkout-container');

    if (!cartContainer) {
        console.error("Elemento '.cart-list' não encontrado no DOM.");
        return;
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>O seu carrinho está vazio.</p><a href="catalogo.html" class="btn btn-primary">Ir para o Catálogo</a>';
        checkoutContainer.innerHTML = ''; // Remove o botão de "Comprar" se o carrinho estiver vazio
    } else {
        cartContainer.innerHTML = '';
        cart.forEach(productId => {
            const productCard = createProductCard(productId);
            cartContainer.appendChild(productCard);
        });

        // Adiciona o botão de "Comprar" se houver itens no carrinho
        checkoutContainer.innerHTML = `<button class="btn btn-success" onclick="checkout()">Comprar</button>`;
    }
    updateCartCount(); // Atualiza o contador do carrinho
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    updateCartCount(); // Atualiza o contador após adicionar
    loadCart(); // Atualiza a lista do carrinho
    showCustomAlert(); // Exibe alerta de item adicionado ao carrinho
}

// Função para remover do carrinho
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.indexOf(productId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateCartCount(); // Atualiza o contador após remover
    loadCart(); // Atualiza a visualização
}

// Função para criar os cartões dos produtos no carrinho
function createProductCard(productId) {
    const productData = {
        'produto1': { img: 'imagens/frente.webp', ref: 'REF: 001', size: 'Tamanho: G' },
        'produto2': { img: 'imagens/frente.webp', ref: 'REF: 002', size: 'Tamanho: G' },
        'produto3': { img: 'imagens/frente.webp', ref: 'REF: 003', size: 'Tamanho: M' },
        'produto4': { img: 'imagens/frente.webp', ref: 'REF: 004', size: 'Tamanho: P' },
        'produto5': { img: 'imagens/frente.webp', ref: 'REF: 005', size: 'Tamanho: GG' },
        'produto6': { img: 'imagens/frente.webp', ref: 'REF: 006', size: 'Tamanho: G' },
        'produto7': { img: 'imagens/frente.webp', ref: 'REF: 007', size: 'Tamanho: M' },
        'produto8': { img: 'imagens/frente.webp', ref: 'REF: 008', size: 'Tamanho: GG' },
        'produto9': { img: 'imagens/frente.webp', ref: 'REF: 009', size: 'Tamanho: P' },
        'produto10': { img: 'imagens/frente.webp', ref: 'REF: 010', size: 'Tamanho: G' },
        'produto11': { img: 'imagens/frente_blessed.webp', ref: 'REF: 011', size: 'Tamanho: M' },
        'produto12': { img: 'imagens/frente_blessed.webp', ref: 'REF: 012', size: 'Tamanho: G' },
        'produto13': { img: 'imagens/frente_blessed.webp', ref: 'REF: 013', size: 'Tamanho: M' },
        'produto14': { img: 'imagens/frente_blessed.webp', ref: 'REF: 014', size: 'Tamanho: GG' },
        'produto15': { img: 'imagens/frente_blessed.webp', ref: 'REF: 015', size: 'Tamanho: P' },
        'produto16': { img: 'imagens/frente_blessed.webp', ref: 'REF: 016', size: 'Tamanho: G' },
        'produto17': { img: 'imagens/frente_blessed.webp', ref: 'REF: 017', size: 'Tamanho: GG' },
        'produto18': { img: 'imagens/frente_blessed.webp', ref: 'REF: 018', size: 'Tamanho: P' },
        'produto19': { img: 'imagens/frente_blessed.webp', ref: 'REF: 019', size: 'Tamanho: G' },
        'produto20': { img: 'imagens/frente_blessed.webp', ref: 'REF: 020', size: 'Tamanho: GG' },
        'produto21': { img: 'imagens/frente_time_1.webp', ref: 'REF: 021', size: 'Tamanho: M' },
        'produto22': { img: 'imagens/frente_time_2.webp', ref: 'REF: 022', size: 'Tamanho: G' },
        'produto23': { img: 'imagens/frente_time_3.webp', ref: 'REF: 023', size: 'Tamanho: P' },
        'produto24': { img: 'imagens/frente_time_4.webp', ref: 'REF: 024', size: 'Tamanho: GG' },
        'produto25': { img: 'imagens/frente_time_5.webp', ref: 'REF: 025', size: 'Tamanho: M' },
        'produto26': { img: 'imagens/frente_time_6.webp', ref: 'REF: 026', size: 'Tamanho: GG' },
        'produto27': { img: 'imagens/frente_time_7.webp', ref: 'REF: 027', size: 'Tamanho: P' },
        'produto28': { img: 'imagens/frente_time_8.webp', ref: 'REF: 028', size: 'Tamanho: M' },
        'produto29': { img: 'imagens/frente_time_9.webp', ref: 'REF: 029', size: 'Tamanho: GG' },
        'produto30': { img: 'imagens/frente_time_10.webp', ref: 'REF: 030', size: 'Tamanho: P' }
    };

    const card = document.createElement('div');
    card.classList.add('card', 'my-2');
    card.innerHTML = `
        <img src="${productData[productId].img}" class="card-img-top" alt="${productId}" />
        <div class="card-body text-center">
            <h5 class="card-title">${productData[productId].ref}</h5>
            <p class="text-muted">${productData[productId].size}</p>
            <button class="btn btn-light" onclick="removeFromCart('${productId}')">Remover do Carrinho</button>
        </div>`;
    return card;
}

// Função para carregar o carrinho na página ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Atualiza o contador ao carregar a página
    loadCart(); // Carrega o carrinho

    // Inicializa o carrossel
    startCarousel();
});

// ALERTA DE ADICIONADO AO CARRINHO
function showCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    const overlay = document.getElementById('dark-overlay');

    if (alertBox && overlay) {
        alertBox.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        console.error("Elementos do alerta não encontrados no DOM.");
    }
}

// Ocultar o alerta
function hideCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    const overlay = document.getElementById('dark-overlay');

    if (alertBox && overlay) {
        alertBox.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        console.error("Elementos do alerta não encontrados no DOM.");
    }
}

// Continuar comprando
function continueShopping() {
    hideCustomAlert();
}

// Função para verificar a página atual e mostrar/ocultar o ícone do carrinho
function checkCartIconVisibility() {
    const cartIcon = document.getElementById('cart-icon');
    const currentPage = window.location.pathname.split('/').pop(); // Pega o nome do arquivo atual
    if (currentPage === 'index.html' || currentPage === 'catalogo.html') {
        cartIcon.style.display = 'block'; // Mostra o ícone
    } else {
        cartIcon.style.display = 'none'; // Esconde o ícone
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    checkCartIconVisibility(); // Verifica a visibilidade do ícone do carrinho
    updateCartCount(); // Atualiza o contador ao carregar a página
    loadCart(); // Carrega o carrinho
});

// CARROSEL
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel .slide');
    const carousel = document.querySelector('.carousel');
    if (!slides.length) return;
    const totalSlides = slides.length;

    // Ajusta o índice para o ciclo
    currentSlide = (index + totalSlides) % totalSlides;

    // Move o carrossel usando transform
    const offset = -currentSlide * 100; // Assume que cada slide ocupa 100% da largura
    carousel.style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        moveSlide(1); // Avança para o próximo slide
    }, 3000); // Altere 3000 para o intervalo desejado (em milissegundos)
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Inicializa o carrossel
function startCarousel() {
    const slides = document.querySelectorAll('.carousel .slide');
    const carouselContainer = document.querySelector('.carousel-container');

    if (slides.length) {
        showSlide(currentSlide);
        startAutoSlide();

        // Para a transição automática ao passar o mouse
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// FUNÇÃO PARA CRIAR MENSAGEM E ABRIR WHATSAPP
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productData = {
        'produto1': { ref: 'REF: #001', size: 'Tamanho: G' },
        'produto2': { ref: 'REF: #002', size: 'Tamanho: G' },
        'produto3': { ref: 'REF: #003', size: 'Tamanho: M' },
        'produto4': { ref: 'REF: #004', size: 'Tamanho: P' },
        'produto5': { ref: 'REF: #005', size: 'Tamanho: GG' },
        'produto6': { ref: 'REF: #006', size: 'Tamanho: G' },
        'produto7': { ref: 'REF: #007', size: 'Tamanho: M' },
        'produto8': { ref: 'REF: #008', size: 'Tamanho: GG' },
        'produto9': { ref: 'REF: #009', size: 'Tamanho: P' },
        'produto10': { ref: 'REF: #010', size: 'Tamanho: G' },
        'produto11': { ref: 'REF: #011', size: 'Tamanho: P' },
        'produto12': { ref: 'REF: #012', size: 'Tamanho: G' },
        'produto13': { ref: 'REF: #013', size: 'Tamanho: M' },
        'produto14': { ref: 'REF: #014', size: 'Tamanho: GG' },
        'produto15': { ref: 'REF: #015', size: 'Tamanho: P' },
        'produto16': { ref: 'REF: #016', size: 'Tamanho: G' },
        'produto17': { ref: 'REF: #017', size: 'Tamanho: GG' },
        'produto18': { ref: 'REF: #018', size: 'Tamanho: P' },
        'produto19': { ref: 'REF: #019', size: 'Tamanho: G' },
        'produto20': { ref: 'REF: #020', size: 'Tamanho: GG' }
    };

    let message = 'Olá, gostaria de comprar os seguintes itens:\n';
    cart.forEach(productId => {
        const product = productData[productId];
        message += `📦 ${product.ref}\n📏 ${product.size}\n`;
    });

    const whatsappLink = `https://wa.me/5531985079718?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// FILTROS DE MARCAS
function scrollToSection(id) { 
    // Rola até a seção da marca
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

    // Fecha a barra de marcas automaticamente
    const brandSelector = document.querySelector('.brand-selector');
    const toggleIcon = document.querySelector('#toggle-icon');
    const toggleBtn = document.querySelector('.toggle-btn');

    // Fecha a barra de marcas
    brandSelector.style.left = '-200px';
    toggleIcon.setAttribute('d', 'M9 18l6-6-6-6'); // Seta para a direita
    toggleBtn.style.left = '0'; // Ajusta a posição da seta para fora da gaveta
}

function toggleBrandSelector() {
    const brandSelector = document.querySelector('.brand-selector');
    const toggleIcon = document.querySelector('#toggle-icon');
    const toggleBtn = document.querySelector('.toggle-btn');

    // Alterna entre abrir e fechar a barra com um único clique
    if (brandSelector.style.left === '-200px') {
        // Barra abre
        brandSelector.style.left = '0';
        toggleIcon.setAttribute('d', 'M15 19l-7-7 7-7'); // Seta para a esquerda
        toggleBtn.style.left = '200px'; // Ajusta a posição da seta para dentro da gaveta
    } else {
        // Barra fecha
        brandSelector.style.left = '-200px';
        toggleIcon.setAttribute('d', 'M9 18l6-6-6-6'); // Seta para a direita
        toggleBtn.style.left = '0'; // Ajusta a posição da seta para fora da gaveta
    }
}

// Exibir a barra automaticamente após o carregamento inicial
window.onload = function() {
    const brandSelector = document.querySelector('.brand-selector');
    const toggleBtn = document.querySelector('.toggle-btn');

    brandSelector.style.left = '-200px'; // Barra começa fechada
    const toggleIcon = document.querySelector('#toggle-icon');
    toggleIcon.setAttribute('d', 'M9 18l6-6-6-6'); // Seta para a direita
    toggleBtn.style.left = '0'; // Ajusta a posição da seta para fora da gaveta
}
