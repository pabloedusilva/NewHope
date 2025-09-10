// Dados específicos das camisas de time - atualizados para corresponder aos novos filtros
const camisasTimeData = [
  { id: 1, name: 'Camisa Flamengo 2024 Titular', price: 199.90, oldPrice: 249.90, image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'flamengo', league: 'brasileirao', type: 'titular' },
  { id: 2, name: 'Camisa Palmeiras 2024 Away', price: 189.90, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'palmeiras', league: 'brasileirao', type: 'away' },
  { id: 3, name: 'Camisa PSG 2023 Home', price: 299.90, oldPrice: 349.90, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'psg', league: 'europeus', type: 'titular' },
  { id: 4, name: 'Camisa Real Madrid 2023', price: 279.90, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'real-madrid', league: 'europeus', type: 'titular' },
  { id: 5, name: 'Camisa Barcelona 2023 Away', price: 269.90, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'barcelona', league: 'europeus', type: 'away' },
  { id: 6, name: 'Camisa Corinthians 2024', price: 259.90, oldPrice: 299.90, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'corinthians', league: 'brasileirao', type: 'titular' },
  { id: 7, name: 'Camisa Liverpool 2023', price: 249.90, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'liverpool', league: 'europeus', type: 'titular' },
  { id: 8, name: 'Camisa Santos Retrô 2002', price: 229.90, oldPrice: 279.90, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'santos', league: 'brasileirao', type: 'retro' },
  { id: 9, name: 'Camisa Chelsea 2023 Third', price: 239.90, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'chelsea', league: 'europeus', type: 'third' },
  { id: 10, name: 'Camisa São Paulo 2024', price: 289.90, image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'sao-paulo', league: 'brasileirao', type: 'titular' },
  { id: 11, name: 'Camisa Milan Retrô 1990', price: 219.90, oldPrice: 259.90, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'milan', league: 'europeus', type: 'retro' },
  { id: 12, name: 'Camisa Inter Miami Messi', price: 349.90, image: 'https://logodownload.org/wp-content/uploads/2020/11/Inter-miami-cf-logo.png', team: 'inter-miami', league: 'europeus', type: 'titular' },
  { id: 13, name: 'Camisa Vasco 2024', price: 179.90, image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'vasco', league: 'brasileirao', type: 'titular' },
  { id: 14, name: 'Camisa Grêmio 2024', price: 189.90, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'gremio', league: 'brasileirao', type: 'titular' },
  { id: 15, name: 'Camisa Bayern Munich', price: 299.90, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'bayern', league: 'europeus', type: 'titular' },
  { id: 16, name: 'Camisa Fluminense Retrô', price: 199.90, oldPrice: 229.90, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fit=crop&crop=center', team: 'fluminense', league: 'brasileirao', type: 'retro' }
];

// Dados do carousel de promoções específico para camisas de time
const carouselCamisasData = [
  {
    id: 1,
    title: 'BRASIL RETRÔ 2002',
    description: 'Reviva a conquista do pentacampeonato com a camisa retrô mais icônica do futebol brasileiro.',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80',
    buttonText: 'Comprar Agora',
    showContent: true,
    discount: '25% OFF'
  },
  {
    id: 2,
    title: 'CAMISAS EUROPEIAS',
    description: 'As melhores camisas dos grandes clubes europeus com entrega rápida.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80',
    buttonText: 'Ver Coleção',
    showContent: true,
    discount: 'FRETE GRÁTIS'
  }
];

// Dados dos clubes para o carousel
const clubesBrasileirao = [
  { id: 'fluminense', name: 'Fluminense', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Fluminense.png?v=1752853501' },
  { id: 'corinthians', name: 'Corinthians', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Corinthians.png?v=1752853501' },
  { id: 'internacional', name: 'Internacional', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Internacional.png?v=1752853501' },
  { id: 'flamengo', name: 'Flamengo', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Flamengo.png?v=1752853501' },
  { id: 'palmeiras', name: 'Palmeiras', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Palmeiras.png?v=1752853502' },
  { id: 'botafogo', name: 'Botafogo', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Botafogo.png?v=1752853501' },
  { id: 'cruzeiro', name: 'Cruzeiro', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Cruzeiro.png?v=1752853501' },
  { id: 'atletico-mineiro', name: 'Atlético Mineiro', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Atletico_Mineiro.png?v=1752853501' },
  { id: 'sao-paulo', name: 'São Paulo', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Sao_Paulo.png?v=1752853501' },
  { id: 'santos', name: 'Santos', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Santos.png?v=1752853501' },
  { id: 'gremio', name: 'Grêmio', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Gremio.png?v=1752853501' },
  { id: 'vasco', name: 'Vasco', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Vasco.png?v=1752853501' },
  { id: 'bahia', name: 'Bahia', image: 'https://cdn.shopify.com/s/files/1/0759/9915/0331/files/Bahia.png?v=1752853501' }
];

const clubesEuropeus = [
  { id: 'real-madrid', name: 'Real Madrid', image: 'https://upload.wikimedia.org/wikipedia/sco/thumb/5/56/Real_Madrid_CF.svg/1464px-Real_Madrid_CF.svg.png' },
  { id: 'barcelona', name: 'Barcelona', image: 'https://logoeps.com/wp-content/uploads/2013/03/barcelona-vector-logo.png' },
  { id: 'manchester-united', name: 'Manchester United', image: 'https://logoeps.com/wp-content/uploads/2013/03/manchester-united-vector-logo.png' },
  { id: 'liverpool', name: 'Liverpool', image: 'https://logoeps.com/wp-content/uploads/2013/03/liverpool-vector-logo.png' },
  { id: 'chelsea', name: 'Chelsea', image: 'https://logoeps.com/wp-content/uploads/2013/03/chelsea-vector-logo.png' },
  { id: 'psg', name: 'PSG', image: 'https://logoeps.com/wp-content/uploads/2013/03/paris-saint-germain-vector-logo.png' },
  { id: 'bayern', name: 'Bayern Munich', image: 'https://logoeps.com/wp-content/uploads/2013/03/bayern-munich-vector-logo.png' },
  { id: 'juventus', name: 'Juventus', image: 'https://logoeps.com/wp-content/uploads/2013/03/juventus-vector-logo.png' },
  { id: 'milan', name: 'AC Milan', image: 'https://logoeps.com/wp-content/uploads/2013/03/ac-milan-vector-logo.png' },
  { id: 'inter-miami', name: 'Inter Miami', image: 'https://logoeps.com/wp-content/uploads/2020/02/inter-miami-cf-vector-logo.png' }
];

// Dados das categorias/filtros atualizados
const categoriesTeamData = [
  { id: 'todos', name: 'Todos', icon: 'fa-th-large' },
  { id: 'brasileirao', name: 'Brasileirão', icon: 'fa-flag' },
  { id: 'europeus', name: 'Europeus', icon: 'fa-globe-europe' },
  { id: 'retro', name: 'Retrô', icon: 'fa-clock-rotate-left' }
];

// Componente Header (reutilizando da página principal)
function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerClasses = `${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`.trim();
  
  return (
    <header className={headerClasses}>
      <div className="container header-container">
        <a href="../index.html" className="logo">
          <img src="../img/Logos/logo.png" alt="Logo NewHope" className="logo-img" />
        </a>
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item"><a href="../index.html" className="nav-link">Início</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Novidades</a></li>
          <li className="nav-item"><a href="#" className="nav-link active">Camisas de Time</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Promoções</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Sobre</a></li>
        </ul>
        <div className="header-icons">
          <div className="icon-item"><i className="fas fa-user"></i></div>
          <div className="icon-item favorites-icon" role="button" aria-label="Favoritos">
            <i className="fas fa-heart"></i>
          </div>
          <div className="icon-item cart-icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

// Carousel de Promoções específico para camisas de time
function CarouselCamisas() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isTransitioning, currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % carouselCamisasData.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="hero-carousel-section">
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div 
            className="carousel-track" 
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {carouselCamisasData.map((item, index) => (
              <div key={item.id} className="carousel-slide">
                <div className="carousel-image-container">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="carousel-image"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dots Indicator */}
        <div className="carousel-dots">
          {carouselCamisasData.map((_, index) => (
            <button 
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Carousel de Clubes
function CarouselClubes({ onClubSelect, currentLeague, onLeagueChange }) {
  const itemsPerPage = 4; // 4 itens visíveis como no layout
  const [currentIndex, setCurrentIndex] = React.useState(itemsPerPage); // iniciar após clones iniciais
  const [isAnimating, setIsAnimating] = React.useState(true);
  const [selectedClub, setSelectedClub] = React.useState('todos');
  // Swipe state
  const [dragging, setDragging] = React.useState(false);
  const [dragDX, setDragDX] = React.useState(0);
  const contentRef = React.useRef(null);
  const startXRef = React.useRef(0);
  const widthRef = React.useRef(0);
  
  const clubes = currentLeague === 'brasileirao' ? clubesBrasileirao : clubesEuropeus;
  // Base de itens: "Todos" + clubes
  const baseItems = React.useMemo(() => [{ id: 'todos', name: 'Todos', isAll: true }, ...clubes], [clubes]);
  const totalItems = baseItems.length;
  // Clonar as extremidades para loop infinito
  const augmentedItems = React.useMemo(() => {
    const head = baseItems.slice(0, itemsPerPage);
    const tail = baseItems.slice(-itemsPerPage);
    return [...tail, ...baseItems, ...head];
  }, [baseItems]);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleClubClick = (clubId) => {
    setSelectedClub(clubId);
    onClubSelect(clubId);
  };

  const handleLeagueToggle = (league) => {
    onLeagueChange(league);
  setIsAnimating(false);
  setCurrentIndex(itemsPerPage);
    setSelectedClub('todos');
    onClubSelect('todos');
  };

  // Swipe handlers (touch + mouse)
  const beginDrag = (x) => {
    setIsAnimating(false);
    setDragging(true);
    startXRef.current = x;
    widthRef.current = contentRef.current ? contentRef.current.offsetWidth : window.innerWidth;
    setDragDX(0);
  };
  const moveDrag = (x) => {
    if (!dragging) return;
    setDragDX(x - startXRef.current);
  };
  const endDrag = () => {
    if (!dragging) return;
    const dx = dragDX;
    const threshold = Math.min(80, widthRef.current * 0.12); // 12% ou 80px
    setDragging(false);
    setIsAnimating(true);
    setDragDX(0);
    if (Math.abs(dx) > threshold) {
      if (dx > 0) prevSlide(); else nextSlide();
    }
  };

  return (
    <div className="section-carrousel-clubs">
      <div className="page-width">
        <h2 className="carousel-title">ESCOLHA POR TIME</h2>
        
        {/* Toggle entre Brasileirão e Europeus */}
        <div className="league-toggle">
          <button 
            className={`league-btn ${currentLeague === 'brasileirao' ? 'active' : ''}`}
            onClick={() => handleLeagueToggle('brasileirao')}
          >
            <i className="fas fa-flag"></i>
            Brasileirão
          </button>
          <button 
            className={`league-btn ${currentLeague === 'europeus' ? 'active' : ''}`}
            onClick={() => handleLeagueToggle('europeus')}
          >
            <i className="fas fa-globe-europe"></i>
            Europeus
          </button>
        </div>

        <div className="clubs-carousel-wrapper">
          <button 
            className="clubs-carousel-arrow prev" 
            onClick={prevSlide}
          >
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </button>

          <div 
            className="clubs-carousel-content"
            ref={contentRef}
            onTouchStart={(e) => beginDrag(e.touches[0].clientX)}
            onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
            onTouchEnd={endDrag}
            onMouseDown={(e) => beginDrag(e.clientX)}
            onMouseMove={(e) => moveDrag(e.clientX)}
            onMouseLeave={endDrag}
            onMouseUp={endDrag}
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          >
            <div 
              className="clubs-carousel-track"
              style={{
                transform: `translateX(${(-currentIndex * 25) + (dragging && widthRef.current ? (dragDX / widthRef.current) * 100 : 0)}%)`, // 25% = 100% / 4 itens
                transition: isAnimating ? 'transform 0.3s ease-in-out' : 'none'
              }}
              onTransitionEnd={() => {
                // Se passou dos limites (clones), reposiciona sem animação
                if (currentIndex >= totalItems + itemsPerPage) {
                  setIsAnimating(false);
                  setCurrentIndex(prev => prev - totalItems);
                } else if (currentIndex < itemsPerPage) {
                  setIsAnimating(false);
                  setCurrentIndex(prev => prev + totalItems);
                }
              }}
            >
              {/* Itens com clones para loop infinito */}
              {augmentedItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="clubs-carousel-item">
                  {item.isAll ? (
                    <button 
                      className={`clubs-carousel-link ${selectedClub === 'todos' ? 'active' : ''}`}
                      onClick={(e) => { if (dragging) return; handleClubClick('todos'); }}
                    >
                      <div className="all-teams-icon">
                        <i className="fas fa-th-large"></i>
                        <span>Todos</span>
                      </div>
                    </button>
                  ) : (
                    <button 
                      className={`clubs-carousel-link ${selectedClub === item.id ? 'active' : ''}`}
                      onClick={(e) => { if (dragging) return; handleClubClick(item.id); }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="clubs-carousel-image" 
                        loading="lazy"
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button 
            className="clubs-carousel-arrow next" 
            onClick={nextSlide}
          >
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente ProductCard reutilizado
function ProductCard({ product, animationClass }) {
  const [liked, setLiked] = React.useState(false);
  const discount = product.oldPrice ? Math.round((1 - (product.price / product.oldPrice)) * 100) : null;

  return (
    <div className={`product-card product-card-v2 ${animationClass}`}>
      <div className="product-card-glow" aria-hidden="true"></div>
      <div className="product-card-inner">
        <div className="product-media">
          {discount && <span className="badge badge-sale">-{discount}%</span>}
          {!discount && <span className="badge badge-new">NEW</span>}
          <img src={product.image} alt={product.name} className="product-media-img" loading="lazy" decoding="async" />
          <div className="floating-actions">
            <button
              type="button"
              className={`icon-btn wishlist ${liked ? 'active' : ''}`}
              aria-pressed={liked}
              onClick={() => setLiked(v => !v)}
            >
              <i className={liked ? 'fas fa-heart' : 'far fa-heart'}></i>
            </button>
          </div>
          <div className="media-gradient" aria-hidden="true"></div>
        </div>
        <div className="product-meta">
          <div className="meta-top">
            <h3 className="product-title" title={product.name}>{product.name}</h3>
          </div>
          <div className="price-row">
            <span className="price-current">R$ {product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="price-old">R$ {product.oldPrice.toFixed(2)}</span>}
          </div>
          <div className="cart-row">
            <button className="btn-view-more" onClick={() => console.log('Ver mais:', product.name)}>
              <span className="btn-view-more-content">
                <i className="fas fa-eye"></i>
                <span>Ver mais</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Seção de produtos (camisas de time)
function CamisasTimeProducts() {
  const [filter, setFilter] = React.useState('todos');
  const [currentLeague, setCurrentLeague] = React.useState('brasileirao');
  const [selectedClub, setSelectedClub] = React.useState('todos');
  
  const filteredProducts = React.useMemo(() => {
    let products = camisasTimeData;
    
    // Filtro por liga primeiro
    if (filter === 'brasileirao') {
      products = products.filter(p => p.league === 'brasileirao');
    } else if (filter === 'europeus') {
      products = products.filter(p => p.league === 'europeus');
    } else if (filter === 'retro') {
      products = products.filter(p => p.type === 'retro');
    }
    
    // Depois filtro por clube específico
    if (selectedClub !== 'todos') {
      products = products.filter(p => p.team === selectedClub);
    }
    
    return products;
  }, [filter, selectedClub]);

  const handleClubSelect = (clubId) => {
    setSelectedClub(clubId);
    // Se selecionou um clube específico, ajustar o filtro para mostrar todos os produtos desse clube
    if (clubId !== 'todos') {
      const clubProduct = camisasTimeData.find(p => p.team === clubId);
      if (clubProduct) {
        setFilter(clubProduct.league);
      }
    }
  };

  const handleLeagueChange = (league) => {
    setCurrentLeague(league);
    setFilter(league);
    setSelectedClub('todos');
  };

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="container">
        {/* Carousel de clubes substituindo os filtros antigos */}
        <CarouselClubes 
          onClubSelect={handleClubSelect}
          currentLeague={currentLeague}
          onLeagueChange={handleLeagueChange}
        />

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              animationClass={`animate-slide-left delay-${index % 4}`} 
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <i className="fas fa-search" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
            <p>Nenhuma camisa encontrada para este filtro.</p>
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a href="#" className="btn btn-outline">Ver Todas as Camisas</a>
        </div>
      </div>
    </section>
  );
}

// Banner promocional de anúncios
function PromoBanner() {
  return (
    <section className="promo-banner-section">
      <div className="container">
        <div className="promo-banners-grid">
          <div className="promo-banner-item">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75" 
              alt="Promoção Camisas Europeias" 
              className="promo-banner-img"
            />
            <div className="promo-banner-content">
              <h3>CAMISAS EUROPEIAS</h3>
              <p>30% OFF em clubes selecionados</p>
              <button className="promo-banner-btn">Ver Ofertas</button>
            </div>
          </div>
          <div className="promo-banner-item">
            <img 
              src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75" 
              alt="Promoção Seleções" 
              className="promo-banner-img"
            />
            <div className="promo-banner-content">
              <h3>SELEÇÕES 2024</h3>
              <p>Novas camisas disponíveis</p>
              <button className="promo-banner-btn">Conferir</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Banner de frete grátis (REMOVIDO)

// Newsletter (reutilizado)
function Newsletter() {
  const [email, setEmail] = React.useState('');
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    alert(`Obrigado por se inscrever com o email: ${email}`); 
    setEmail(''); 
  };
  
  return (
    <section className="newsletter">
      <div className="container">
        <h3 className="newsletter-title">Fique por dentro das novidades</h3>
        <p className="newsletter-description">Receba em primeira mão os lançamentos de camisas de time, promoções exclusivas e ofertas especiais.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            className="newsletter-input" 
            placeholder="Seu melhor e-mail" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <button type="submit" className="newsletter-btn">Inscrever</button>
        </form>
      </div>
    </section>
  );
}

// Footer (reutilizado)
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="../index.html" className="logo">
              <img src="../img/Logos/logo.png" alt="Logo" className="logo-img" />
            </a>
            <p className="footer-description">A NewHope é especializada em camisas de time oficiais, trazendo os melhores produtos para os verdadeiros apaixonados por futebol.</p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-tiktok"></i></a>
              <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h4 className="footer-title">Categorias</h4>
            <ul>
              <li><a href="#" className="footer-link">Seleções</a></li>
              <li><a href="#" className="footer-link">Clubes Brasileiros</a></li>
              <li><a href="#" className="footer-link">Clubes Europeus</a></li>
              <li><a href="#" className="footer-link">Camisas Retrô</a></li>
              <li><a href="#" className="footer-link">Lançamentos</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4 className="footer-title">Atendimento</h4>
            <ul>
              <li><a href="#" className="footer-link">Tabela de Tamanhos</a></li>
              <li><a href="#" className="footer-link">Trocas e Devoluções</a></li>
              <li><a href="#" className="footer-link">Autenticidade</a></li>
              <li><a href="#" className="footer-link">Perguntas Frequentes</a></li>
              <li><a href="#" className="footer-link">Fale Conosco</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4 className="footer-title">Contato</h4>
            <ul className="contact-info">
              <li><i className="fas fa-map-marker-alt"></i> Rua das Tendências, 123 - São Paulo, SP</li>
              <li><i className="fas fa-phone"></i> (11) 9999-9999</li>
              <li><i className="fas fa-envelope"></i> camisas@newhopestreet.com</li>
              <li><i className="fas fa-clock"></i> Seg a Sex: 9h às 18h | Sáb: 10h às 16h</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 NEWHOPE - Todos os direitos reservados | Camisas Oficiais de Time</p>
        </div>
      </div>
    </footer>
  );
}

// WhatsApp Button (reutilizado)
function WhatsAppButton() {
  const whatsappNumber = "5511999999999";
  const message = "Olá! Gostaria de saber mais sobre as camisas de time da NewHope.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleWhatsAppClick}>
      <i className="fab fa-whatsapp"></i>
    </div>
  );
}

// Componente principal da página
function CamisasTimeApp() {
  React.useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right');
      elements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
          el.style.opacity = 1;
          el.style.transform = 'translate(0, 0)';
        }
      });
    };
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="App">
      <Header />
      <CarouselCamisas />
      <CamisasTimeProducts />
      <PromoBanner />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CamisasTimeApp />);
