// Dados e contextos globais
const CartContext = React.createContext();

const productsData = [
  { id: 1, name: 'Camiseta Oversized Graphic', price: 129.90, oldPrice: 159.90, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'camisetas' },
  { id: 2, name: 'Moletom Com Capuz', price: 249.90, image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'moletons' },
  { id: 3, name: 'Calça Cargo Street', price: 189.90, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'calcas' },
  { id: 4, name: 'Tênis Limited Edition', price: 399.90, oldPrice: 499.90, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'tenis' },
  { id: 5, name: 'Boné Streetwear', price: 89.90, image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'acessorios' },
  { id: 6, name: 'Jaqueta Jeans Destroyed', price: 299.90, oldPrice: 349.90, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'jaquetas' },
  { id: 7, name: 'Regata Graphic', price: 79.90, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'camisetas' },
  { id: 8, name: 'Short Cargo', price: 139.90, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'shorts' }
];

const categoriesData = [
  { id: 1, name: 'Camisetas', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Calças', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Acessórios', image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Tênis', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Camisas de Time', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const carouselData = [
  { id: 1, title: 'BLACK FRIDAY ATÉ 70% OFF', description: 'Aproveite os melhores descontos em peças selecionadas. Edição limitada!', image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', buttonText: 'Conferir Ofertas' },
  { id: 2, title: 'COLEÇÃO VERÃO 2023', description: 'As peças mais frescas e estilosas para o verão já estão disponíveis!', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1620&q=80', buttonText: 'Ver Coleção' },
  { id: 3, title: 'FRETE GRÁTIS EM TODAS AS COMPRAS', description: 'Aproveite o frete grátis em todos os produtos durante o mês de lançamento!', image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', buttonText: 'Comprar Agora' }
];

// Export global para uso em scripts subsequentes (sem bundler)
window.AppData = { productsData, categoriesData, carouselData, CartContext };
