# NewHope

## Estrutura do Projeto

Este é um projeto de e-commerce de moda urbana com foco em camisas de time e streetwear.

### Páginas Disponíveis

#### Página Principal
- **Arquivo**: `public/index.html`
- **Acesso**: Página inicial do site
- **Recursos**: 
  - Hero section com vídeo
  - Carousel de categorias interativo
  - Produtos em destaque
  - Newsletter e footer

#### Página de Camisas de Time
- **Arquivo**: `public/categorias/camisas-de-time.html`
- **Acesso**: Clique na categoria "CAMISAS DE TIME" na página principal ou acesse diretamente
- **Recursos**:
  - Carousel automático com promoções específicas
  - Filtros por time/categoria (Brasil, Argentina, PSG, Real Madrid, etc.)
  - Grid de produtos com camisas de time
  - Banners promocionais dedicados
  - Mesmo padrão de design da página principal

### Como Acessar

1. **Página Principal**: Abra `public/index.html` no navegador
2. **Camisas de Time**: 
   - Na página principal, clique na categoria "CAMISAS DE TIME" no carousel
   - Ou acesse diretamente `public/categorias/camisas-de-time.html`

### Características da Página de Camisas de Time

- **Carousel Animado**: Duas imagens que alternam automaticamente a cada 5 segundos
- **Navegação**: Setas e dots para controle manual
- **Responsividade**: Totalmente responsiva para todos os dispositivos
- **Filtros Interativos**: Categorias como Brasil, Argentina, Premier League, Retrô
- **Produtos**: 12 camisas de time com preços promocionais
- **Animações**: Transições suaves e efeitos modernos
- **Espaços para Anúncios**: Seção dedicada para banners promocionais

### Tecnologias Utilizadas

- React (via CDN)
- CSS3 com animações avançadas
- HTML5 semântico
- JavaScript ES6+
- Design responsivo e acessível

### Personalização

Você pode facilmente:
- Adicionar mais produtos editando o array `camisasTimeData`
- Modificar as imagens do carousel em `carouselCamisasData`
- Ajustar cores e estilos no arquivo `css/camisas-de-time.css`
- Adicionar novos filtros em `categoriesTeamData`