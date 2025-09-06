// Arquivo único consolidado: dados, componentes e app

// Dados dos produtos
const productsData = [
  { id: 1, name: 'Camiseta Oversized Graphic', price: 129.90, oldPrice: 159.90, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75', category: 'camisetas' },
  { id: 2, name: 'Moletom Com Capuz', price: 249.90, image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75', category: 'moletons' },
  { id: 3, name: 'Calça Cargo Street', price: 189.90, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75', category: 'calcas' },
  { id: 4, name: 'Tênis Limited Edition', price: 399.90, oldPrice: 499.90, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75', category: 'tenis' },
  { id: 5, name: 'Boné Streetwear', price: 89.90, image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75', category: 'acessorios' },
  { id: 6, name: 'Jaqueta Jeans Destroyed', price: 299.90, oldPrice: 349.90, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75', category: 'jaquetas' },
  { id: 7, name: 'Regata Graphic', price: 79.90, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75', category: 'camisetas' },
  { id: 8, name: 'Short Cargo', price: 139.90, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75', category: 'shorts' }
];

// Dados das categorias para o carousel (novas categorias locais)
const categoriesData = [
  { id: 1, name: 'CHRONIC', image: './img/categorias/Chronic.png' },
  { id: 2, name: 'BONÉS', image: './img/categorias/Bon%C3%A9s.png' },
  { id: 3, name: 'BERMUDAS', image: './img/categorias/Bermudas.png' },
  { id: 4, name: 'CAMISAS DE TIME', image: './img/categorias/Camisas%20de%20Time.png' },
  { id: 5, name: 'BLESSED CHOICE', image: './img/categorias/Blessed%20Choice.png' }
];

// Dados do carrossel
const carouselData = [
  { id: 1, title: 'BLACK FRIDAY ATÉ 70% OFF', description: 'Aproveite os melhores descontos em peças selecionadas. Edição limitada!', image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75', buttonText: 'Conferir Ofertas' },
  { id: 2, title: 'COLEÇÃO VERÃO 2023', description: 'As peças mais frescas e estilosas para o verão já estão disponíveis!', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75', buttonText: 'Ver Coleção' },
  { id: 3, title: 'FRETE GRÁTIS EM TODAS AS COMPRAS', description: 'Aproveite o frete grátis em todos os produtos durante o mês de lançamento!', image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75', buttonText: 'Comprar Agora' }
];

// Componentes
function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHero, setIsHero] = React.useState(true);
  React.useEffect(() => {
    const headerEl = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    const onScroll = () => {
      if (!heroSection) {
        setIsScrolled(window.scrollY > 100);
        setIsHero(false);
        return;
      }
      const rect = heroSection.getBoundingClientRect();
      const threshold = headerEl ? headerEl.offsetHeight : 0;
      const inHero = rect.bottom - threshold > 0; // ainda dentro da hero enquanto o fundo da hero não passou o topo do header
      setIsHero(inHero);
      setIsScrolled(!inHero);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const headerClasses = `${isScrolled ? 'scrolled' : isHero ? 'hero-navbar' : ''} ${isMenuOpen ? 'menu-open' : ''}`.trim();
  return (
    <header className={headerClasses}>
      <div className="container header-container">
        <a href="#" className="logo">
          <img src="./img/Logos/logo.png" alt="Logo NewHope" className="logo-img" />
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
          <div className="icon-item"><i className="fas fa-user"></i></div>
          <div className="icon-item cart-icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
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
          preload="metadata"
          poster="./img/newsletter/newsletter1.png"
        >
          <source src="./video/intro1.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>
        <div className="hero-overlay" aria-hidden="true"></div>
      </div>
      <div className="container hero-content animate-slide-up">
        <p className="hero-subtitle">Nova Coleção 2023</p>
        <h1 className="hero-title">ESTILO <span>QUE IMPACTA</span></h1>
        <p className="hero-description">Onde fé, estilo e esperança se encontram!</p>
        <a href="#" className="btn">Comprar Agora</a>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="benefits-bar">
          <div className="benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-tags"></i>
            </div>
            <div className="benefit-text">
              <span className="benefit-code">PRIMEIRACOMPRA</span>
              <span className="benefit-desc">cupom 10% OFF</span>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <i className="far fa-credit-card"></i>
            </div>
            <div className="benefit-text">
              <span className="benefit-code">Parcele sua compra</span>
              <span className="benefit-desc">em até 3x juros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [currentX, setCurrentX] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [dragStartTime, setDragStartTime] = React.useState(0);
  const [hasMoved, setHasMoved] = React.useState(false);
  const [preloadedImages, setPreloadedImages] = React.useState(new Set());
  const containerRef = React.useRef(null);

  // Criar loop infinito: categorias originais + primeira categoria clonada no final
  const infiniteCategories = [...categoriesData, categoriesData[0]];

  // Preload das primeiras 3 imagens para carregamento instantâneo
  React.useEffect(() => {
    const preloadImages = async () => {
      const firstImages = categoriesData.slice(0, 3);
      const promises = firstImages.map(category => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, category.id]));
            resolve();
          };
          img.onerror = resolve; // Continue mesmo se falhar
          img.src = category.image;
        });
      });
      await Promise.all(promises);
    };
    preloadImages();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && !isTransitioning) {
        nextSlide();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isDragging, isTransitioning, currentIndex]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    
    // Se chegou na última (que é clone da primeira), reset instantâneo para a primeira real
    if (newIndex === categoriesData.length) {
      setTimeout(() => {
        setCurrentIndex(0);
        setIsTransitioning(false);
      }, 600); // Após a transição completa
    } else {
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    if (currentIndex === 0) {
      // Se está na primeira, vai instantaneamente para a última (clone) e depois mostra a penúltima
      setCurrentIndex(categoriesData.length);
      setTimeout(() => {
        setCurrentIndex(categoriesData.length - 1);
        setIsTransitioning(false);
      }, 50);
    } else {
      setCurrentIndex(currentIndex - 1);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  // Touch/Mouse events para swipe
  const handleStart = (clientX) => {
    setStartX(clientX);
    setCurrentX(clientX);
    setDragStartTime(Date.now());
    setHasMoved(false);
    setDragOffset(0);
    
    // Em dispositivos maiores, só inicia drag após um pequeno delay e movimento
    if (window.innerWidth > 768) {
      setTimeout(() => {
        if (Math.abs(currentX - startX) > 5) { // Só inicia se moveu pelo menos 5px
          setIsDragging(true);
        }
      }, 100); // Delay de 100ms
    } else {
      setIsDragging(true); // Em mobile, inicia imediatamente
    }
  };

  const handleMove = (clientX) => {
    setCurrentX(clientX);
    const moveDistance = Math.abs(clientX - startX);
    
    // Em dispositivos maiores, só considera movimento após threshold
    if (window.innerWidth > 768) {
      if (moveDistance > 10 && Date.now() - dragStartTime > 100) {
        setIsDragging(true);
        setHasMoved(true);
      }
    } else {
      setHasMoved(true);
    }
    
    if (isDragging) {
      setDragOffset(clientX - startX);
    }
  };

  const handleEnd = () => {
    if (!isDragging || !hasMoved) {
      setIsDragging(false);
      setDragOffset(0);
      setHasMoved(false);
      return;
    }
    
    setIsDragging(false);
    
    // Threshold maior para dispositivos maiores
    const threshold = window.innerWidth > 768 ? 80 : 50;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setDragOffset(0);
    setStartX(0);
    setCurrentX(0);
    setHasMoved(false);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };
  
  const handleMouseMove = (e) => {
    if (startX !== 0) { // Só processa se o mouse foi pressionado
      handleMove(e.clientX);
    }
  };
  
  const handleMouseUp = () => {
    if (startX !== 0) {
      handleEnd();
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // Configurar event listeners não-passivos para touch events
  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Criar versões estáveis das funções de handler
      const touchStartHandler = (e) => {
        const touch = e.touches[0];
        setStartX(touch.clientX);
        setCurrentX(touch.clientX);
        setDragStartTime(Date.now());
        setHasMoved(false);
        setDragOffset(0);
        
        // Em dispositivos maiores, só inicia drag após um pequeno delay e movimento
        if (window.innerWidth > 768) {
          setTimeout(() => {
            if (Math.abs(touch.clientX - touch.clientX) > 5) {
              setIsDragging(true);
            }
          }, 100);
        } else {
          setIsDragging(true);
        }
      };

      const touchMoveHandler = (e) => {
        e.preventDefault(); // Previne scroll no mobile durante drag
        
        const touch = e.touches[0];
        setCurrentX(touch.clientX);
        
        setStartX(prevStartX => {
          if (prevStartX !== 0) {
            const moveDistance = Math.abs(touch.clientX - prevStartX);
            
            // Em dispositivos maiores, só considera movimento após threshold
            if (window.innerWidth > 768) {
              if (moveDistance > 10 && Date.now() - dragStartTime > 100) {
                setIsDragging(true);
                setHasMoved(true);
              }
            } else {
              setHasMoved(true);
            }
            
            setIsDragging(prevIsDragging => {
              if (prevIsDragging) {
                setDragOffset(touch.clientX - prevStartX);
              }
              return prevIsDragging;
            });
          }
          return prevStartX;
        });
      };

      const touchEndHandler = () => {
        setIsDragging(prevIsDragging => {
          setHasMoved(prevHasMoved => {
            if (!prevIsDragging || !prevHasMoved) {
              setDragOffset(0);
              setHasMoved(false);
              setStartX(0);
              setCurrentX(0);
              return false;
            }
            
            // Threshold maior para dispositivos maiores
            const threshold = window.innerWidth > 768 ? 80 : 50;
            
            setDragOffset(prevDragOffset => {
              if (Math.abs(prevDragOffset) > threshold) {
                if (prevDragOffset > 0) {
                  // prevSlide logic
                  setIsTransitioning(prevIsTransitioning => {
                    if (!prevIsTransitioning) {
                      setIsTransitioning(true);
                      setCurrentIndex(prevCurrentIndex => {
                        if (prevCurrentIndex === 0) {
                          setCurrentIndex(categoriesData.length);
                          setTimeout(() => {
                            setCurrentIndex(categoriesData.length - 1);
                            setIsTransitioning(false);
                          }, 50);
                          return categoriesData.length;
                        } else {
                          const newIndex = prevCurrentIndex - 1;
                          setTimeout(() => setIsTransitioning(false), 600);
                          return newIndex;
                        }
                      });
                    }
                    return prevIsTransitioning;
                  });
                } else {
                  // nextSlide logic
                  setIsTransitioning(prevIsTransitioning => {
                    if (!prevIsTransitioning) {
                      setIsTransitioning(true);
                      setCurrentIndex(prevCurrentIndex => {
                        const newIndex = prevCurrentIndex + 1;
                        if (newIndex === categoriesData.length) {
                          setTimeout(() => {
                            setCurrentIndex(0);
                            setIsTransitioning(false);
                          }, 600);
                        } else {
                          setTimeout(() => setIsTransitioning(false), 600);
                        }
                        return newIndex;
                      });
                    }
                    return prevIsTransitioning;
                  });
                }
              }
              
              setDragOffset(0);
              setStartX(0);
              setCurrentX(0);
              setHasMoved(false);
              return 0;
            });
            
            return false;
          });
          return false;
        });
      };
      
      container.addEventListener('touchstart', touchStartHandler, { passive: false });
      container.addEventListener('touchmove', touchMoveHandler, { passive: false });
      container.addEventListener('touchend', touchEndHandler, { passive: false });
      
      return () => {
        container.removeEventListener('touchstart', touchStartHandler);
        container.removeEventListener('touchmove', touchMoveHandler);
        container.removeEventListener('touchend', touchEndHandler);
      };
    }
  }, []); // Sem dependências para evitar recriação

  const getTransformStyle = () => {
    const slideWidth = window.innerWidth <= 768 ? 100 : (window.innerWidth <= 1024 ? 50 : 33.333);
    const baseTransform = -(currentIndex * slideWidth);
    const dragTransform = isDragging && hasMoved ? (dragOffset / window.innerWidth) * slideWidth : 0;
    return `translateX(${baseTransform + dragTransform}%)`;
  };

  return (
    <section className="category-swiper-section">
      <div 
        ref={containerRef}
        className="category-swiper-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="swiper-wrapper"
          style={{
            transform: getTransformStyle(),
            transition: isDragging ? 'none' : (isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none')
          }}
        >
          {infiniteCategories.map((category, index) => {
            // Determinar se a imagem deve ser carregada imediatamente
            const isVisible = Math.abs(index - currentIndex) <= 2; // Carrega atual +/- 2 posições
            const shouldPreload = index <= 2 || preloadedImages.has(category.id); // Primeiras 3 ou já precarregadas
            const shouldLoad = isVisible || shouldPreload;
            
            return (
              <div 
                key={index === categoriesData.length ? `${category.id}-clone` : category.id}
                className="swiper-slide"
              >
                <a href="#" className="category-card">
                  {shouldLoad ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="category-card-image"
                      loading={index <= 2 ? "eager" : "lazy"}
                      draggable="false"
                      decoding="async"
                    />
                  ) : (
                    <div 
                      className="category-card-image category-placeholder"
                      style={{
                        background: 'linear-gradient(45deg, #e5e7eb, #f3f4f6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className="fas fa-image" style={{color: '#9ca3af', fontSize: '2rem'}}></i>
                    </div>
                  )}
                  <div className="category-card-overlay">
                    <span className="category-card-name">{category.name}</span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FreteGratisBanner() {
  return (
    <section className="frete-gratis-banner">
      <div className="frete-gratis-content">
        <div className="frete-gratis-track">
          <div className="frete-gratis-item">
            <i className="fas fa-shipping-fast"></i>
            <span>FRETE GRÁTIS ACIMA DE R$ 200</span>
          </div>
          <div className="frete-gratis-item">
            <i className="fas fa-medal"></i>
            <span>ENTREGA GARANTIDA</span>
          </div>
          <div className="frete-gratis-item">
            <i className="fas fa-truck"></i>
            <span>ENVIO RÁPIDO E SEGURO</span>
          </div>
          <div className="frete-gratis-item">
            <i className="fas fa-shipping-fast"></i>
            <span>FRETE GRÁTIS ACIMA DE R$ 200</span>
          </div>
          <div className="frete-gratis-item">
            <i className="fas fa-medal"></i>
            <span>ENTREGA GARANTIDA</span>
          </div>
          <div className="frete-gratis-item">
            <i className="fas fa-truck"></i>
            <span>ENVIO RÁPIDO E SEGURO</span>
          </div>
          <div className="frete-gratis-item">
            <i className="fas fa-shipping-fast"></i>
            <span>FRETE GRÁTIS ACIMA DE R$ 200</span>
          </div>
          <div className="frete-gratis-item">
            <i className="fas fa-medal"></i>
            <span>ENTREGA GARANTIDA</span>
          </div>
          <div className="frete-gratis-item">
            <i className="fas fa-truck"></i>
            <span>ENVIO RÁPIDO E SEGURO</span>
          </div>
        </div>
      </div>
    </section>
  );
}

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

function Products() {
  const [filter, setFilter] = React.useState('todos');
  const filteredProducts = filter === 'todos' ? productsData : productsData.filter(p => p.category === filter);
  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-section)' }}>
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
            <ProductCard key={product.id} product={product} animationClass={`animate-slide-left delay-${index % 4}`} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a href="#" className="btn btn-outline">Ver Todos os Produtos</a>
        </div>
      </div>
    </section>
  );
}

function MidBanner() {
  // Banner em vídeo (loop infinito) entre Produtos e Instagram
  return (
    <section className="mid-banner" aria-label="Banner em vídeo">
      <video
        className="mid-banner-video"
        src="./video/banners/banner1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        Seu navegador não suporta vídeo em HTML5.
      </video>
    </section>
  );
}

function Instagram() {
  return (
    <section className="instagram-section">
      <div className="container">
        <div className="instagram-content">
          <a 
            href="https://www.instagram.com/newhope_streetwear/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-link"
            aria-label="Instagram NewHope Streetwear"
          >
            <svg className="instagram-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
            </svg>
            <span className="instagram-text">
              <div className="instagram-follow">Siga-nos no Instagram</div>
              <h2 className="instagram-handle">@newhope_streetwear</h2>
            </span>
          </a>
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
                <img src={item.image} alt="Promoção" className="carousel-img" loading="lazy" decoding="async" />
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
            <p className="footer-description">A NewHope é uma loja de moda urbana que traz as melhores marcas e tendências para você se expressar através do estilo.</p>
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
              <li><i className="fas fa-envelope"></i> atendimento.newhopestreet@gmail.com</li>
              <li><i className="fas fa-clock"></i> Seg a Sex: 9h às 18h | Sáb: 10h às 16h</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 NEWHOPE - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  const whatsappNumber = "5511999999999"; // Substitua pelo número real da loja
  const message = "Olá! Gostaria de saber mais sobre os produtos da NewHope.";
  
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

function App() {
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
      <Hero />
      <Benefits />
      <Categories />
      <FreteGratisBanner />
      <Products />
  <MidBanner />
      <Instagram />
      <Carousel />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
