// Acesso aos dados globais
const { productsData, categoriesData, carouselData, CartContext } = window.AppData;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { cartCount } = React.useContext(CartContext);
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container header-container">
        <a href="#" className="logo">
          <img src="./img/Logos/logo.png" alt="Logo" className="logo-img" />
        </a>
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item"><a href="#" className="nav-link">Início</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Novidades</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Categorias</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Promoções</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Sobre</a></li>
        </ul>
        <div className="header-icons">
          <div className="icon-item cart-icon-wrapper" id="main-cart-icon">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-badge" key={cartCount}>{cartCount}</span>}
          </div>
          <div className="icon-item"><i className="fas fa-user"></i></div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-media-wrapper">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="./img/newsletter/newsletter1.png"
        >
          <source src="https://cdn.coverr.co/videos/coverr-a-man-walking-in-a-subway-station-2747/1080p.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-a-man-walking-in-a-subway-station-2747/1080p.webm" type="video/webm" />
          Seu navegador não suporta vídeo em HTML5.
        </video>
        <div className="hero-overlay" aria-hidden="true"></div>
      </div>
      <div className="container hero-content animate-slide-up">
        <p className="hero-subtitle">Nova Coleção 2023</p>
        <h1 className="hero-title">ESTILO URBANO <span>QUE IMPACTA</span></h1>
        <p className="hero-description">Descubra as peças mais exclusivas da cultura streetwear que combinam conforto, estilo e atitude.</p>
        <a href="#" className="btn">Comprar Agora</a>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Categorias</h2>
        <div className="categories-grid">
          {categoriesData.map((category, index) => (
            <div key={category.id} className={`category-card animate-fade-in delay-${index}`}>
              <img src={category.image} alt={category.name} className="category-img" />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, animationClass, onAdd }) {
  return (
    <div className={`product-card ${animationClass}`}>
      <div className="product-img-container">
        <img src={product.image} alt={product.name} className="product-img" />
        <div className="product-overlay">
          <div className="product-actions">
            <div className="product-action"><i className="fas fa-heart"></i></div>
            <div className="product-action"><i className="fas fa-eye"></i></div>
          </div>
        </div>
      </div>
      <div className="product-info">
        <div className="product-content-wrapper">
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-price">
              R$ {product.price.toFixed(2)}
              {product.oldPrice && <span className="product-old-price">R$ {product.oldPrice.toFixed(2)}</span>}
            </div>
          </div>
          <button className="add-to-cart-btn" onClick={(e) => onAdd(e, product)} data-product-id={product.id}>
            <span className="label-default">
              <i className="fas fa-shopping-cart"></i>
              Adicionar ao Carrinho
            </span>
            <span className="label-added">
              <span className="status-icon"><i className="fas fa-check"></i></span>
              Adicionado!
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [filter, setFilter] = React.useState('todos');
  const { addToCart } = React.useContext(CartContext);
  const filteredProducts = filter === 'todos' ? productsData : productsData.filter(p => p.category === filter);
  return (
    <section className="section" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="container">
        <h2 className="section-title">Destaques</h2>
        <div className="filter-container">
          <div className="filter-tabs">
            {[
              ['todos','fa-th-large','Todos'],
              ['camisetas','fa-tshirt','Camisetas'],
              ['calcas','fa-user-tie','Calças'],
              ['tenis','fa-running','Tênis'],
              ['acessorios','fa-glasses','Acessórios']
            ].map(([key, icon, label]) => (
              <button key={key} className={`filter-tab ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
                <i className={`fas ${icon}`}></i>{label}
              </button>
            ))}
          </div>
        </div>
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} animationClass={`animate-slide-left delay-${index % 4}`} onAdd={addToCart} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a href="#" className="btn btn-outline">Ver Todos os Produtos</a>
        </div>
      </div>
    </section>
  );
}

function Carousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(prev => (prev + 1) % carouselData.length), 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="promo-section">
      <div className="container">
        <h2 className="section-title">Promoções</h2>
        <div className="carousel">
          <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {carouselData.map(item => (
              <div key={item.id} className="carousel-item">
                <img src={item.image} alt="Promoção" className="carousel-img" />
                <div className="carousel-content">
                  <h3 className="carousel-title">{item.title}</h3>
                  <p className="carousel-description">{item.description}</p>
                  <a href="#" className="btn">{item.buttonText}</a>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-controls">
            {carouselData.map((_, index) => (
              <div key={index} className={`carousel-control ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = React.useState('');
  const handleSubmit = (e) => { e.preventDefault(); alert(`Obrigado por se inscrever com o email: ${email}`); setEmail(''); };
  return (
    <section className="newsletter">
      <div className="container">
        <h3 className="newsletter-title">Fique por dentro</h3>
        <p className="newsletter-description">Cadastre-se para receber em primeira mão nossas novidades, lançamentos exclusivos e promoções especiais.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input type="email" className="newsletter-input" placeholder="Seu melhor e-mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit" className="newsletter-btn">Inscrever</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src="./img/Logos/logo.png" alt="Logo" className="logo-img" />
            </a>
            <p className="footer-description">A mais nova loja de streetwear do Brasil, trazendo as melhores marcas e tendências para você se expressar através da moda.</p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-tiktok"></i></a>
              <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h4 className="footer-title">Links Rápidos</h4>
            <ul>
              <li><a href="#" className="footer-link">Sobre Nós</a></li>
              <li><a href="#" className="footer-link">Nossas Lojas</a></li>
              <li><a href="#" className="footer-link">Trocas e Devoluções</a></li>
              <li><a href="#" className="footer-link">Perguntas Frequentes</a></li>
              <li><a href="#" className="footer-link">Trabalhe Conosco</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4 className="footer-title">Categorias</h4>
            <ul>
              <li><a href="#" className="footer-link">Camisetas</a></li>
              <li><a href="#" className="footer-link">Moletons</a></li>
              <li><a href="#" className="footer-link">Calças</a></li>
              <li><a href="#" className="footer-link">Acessórios</a></li>
              <li><a href="#" className="footer-link">Tênis</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4 className="footer-title">Contato</h4>
            <ul className="contact-info">
              <li><i className="fas fa-map-marker-alt"></i> Rua das Tendências, 123 - São Paulo, SP</li>
              <li><i className="fas fa-phone"></i> (11) 9999-9999</li>
              <li><i className="fas fa-envelope"></i> contato@urbanstreet.com.br</li>
              <li><i className="fas fa-clock"></i> Seg a Sex: 9h às 18h | Sáb: 10h às 16h</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 URBAN STREET - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}

// Expor para outros scripts se necessário
window.AppComponents = { Header, Hero, Categories, Products, Carousel, Newsletter, Footer };
