// Recuperar contextos e componentes globais
const { CartContext } = window.AppData;
const { Header, Hero, Categories, Products, Carousel, Newsletter, Footer } = window.AppComponents;

function CartProvider({ children }) {
  const [cartCount, setCartCount] = React.useState(0);
  const addToCart = (e, product) => {
    const button = e.currentTarget;
    if (button.classList.contains('adding') || button.classList.contains('added')) return;
    button.classList.add('adding');
    launchAddToCartAnimation(button, product, () => {
      button.classList.remove('adding');
      button.classList.add('added');
      setTimeout(() => button.classList.remove('added'), 1700);
    });
    setCartCount(prev => prev + 1);
  };
  return <CartContext.Provider value={{ cartCount, addToCart }}>{children}</CartContext.Provider>;
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
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Hero />
        <Categories />
        <Products />
        <Carousel />
        <Newsletter />
        <Footer />
      </div>
    </CartProvider>
  );
}

function launchAddToCartAnimation(button, product, onComplete) {
  try {
    const cartIcon = document.getElementById('main-cart-icon');
    if (!cartIcon) { onComplete && onComplete(); return; }
    cartIcon.classList.remove('cart-bump');
    void cartIcon.offsetWidth; // reflow
    cartIcon.classList.add('cart-bump');
    const ripple = document.createElement('span');
    ripple.className = 'cart-ripple';
    cartIcon.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    setTimeout(() => { onComplete && onComplete(); }, 360);
  } catch (e) {
    console.error('Animation error', e);
    onComplete && onComplete();
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
