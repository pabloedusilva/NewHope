# Dashboard NewHope - README

## 📋 Visão Geral

Dashboard administrativa para o e-commerce NewHope, desenvolvida com design system minimalista em preto e branco. Focada na gestão de produtos de futebol, especialmente camisas de time.

## 🚀 Como Executar

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (Live Server, Python SimpleHTTPServer, etc.)

### Instalação
```bash
# Clone o repositório
git clone [url-do-repo]

# Navegue até a pasta da dashboard
cd NewHope/frontend/dashboard

# Inicie um servidor local
# Opção 1: Live Server (VS Code)
# Opção 2: Python
python -m http.server 8000

# Opção 3: Node.js
npx serve .

# Acesse no navegador
http://localhost:8000
```

## 📁 Estrutura do Projeto

```
frontend/dashboard/
├── dashboard.html          # Página principal
├── css/
│   └── dashboard.css      # Design system completo
├── js/
│   └── dashboard.js       # Aplicação React
└── assets/               # Imagens e recursos (criar)

mock/
└── data.json            # Dados de exemplo
```

## 🎨 Design System

### Paleta de Cores
```css
--bg: #0b0b0b           /* Fundo principal */
--surface: #111111      /* Cards/painéis */
--panel: #171717        /* Painéis secundários */
--text: #ffffff         /* Texto principal */
--text-muted: #bdbdbd   /* Texto secundário */
--border: rgba(255,255,255,0.06) /* Bordas */
```

### Tipografia
- **Fonte**: Inter (fallback: system fonts)
- **Escala**: 12px → 14px → 16px → 20px → 24px → 32px → 48px

### Espaçamento
- **xs**: 4px
- **sm**: 8px  
- **md**: 16px
- **lg**: 24px
- **xl**: 40px

## 🛠️ Funcionalidades Implementadas

### ✅ Core Features
- [x] Layout responsivo (320px → 2560px)
- [x] Sidebar colapsável
- [x] Sistema de notificações (toasts)
- [x] Modais acessíveis
- [x] Busca global
- [x] Design system completo

### ✅ Páginas Principais
- [x] **Overview**: Métricas e pedidos recentes
- [x] **Camisas de Time**: Gerenciamento completo
- [x] **Produtos**: Estrutura básica
- [x] **Pedidos**: Estrutura básica
- [x] **Media Library**: Estrutura básica
- [x] **Analytics**: Estrutura básica
- [x] **Usuários**: Estrutura básica
- [x] **Configurações**: Estrutura básica

### ✅ Componentes
- [x] Sidebar navegação
- [x] Header com busca
- [x] Stat cards
- [x] Tabelas responsivas
- [x] Modais (pequeno, médio, grande)
- [x] Sistema de toast
- [x] Loading states (skeleton)
- [x] Formulários acessíveis

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Comportamentos
- **Mobile**: Sidebar em overlay, tabelas viram cards
- **Tablet**: Layout compacto, sidebar retrátil
- **Desktop**: Layout completo, hover states

## ♿ Acessibilidade

### Implementado
- [x] Navegação por teclado (Tab, Shift+Tab, Enter, ESC)
- [x] ARIA labels e roles
- [x] Focus visible
- [x] Contraste 4.5:1 mínimo
- [x] Screen reader support
- [x] Focus trap em modais

## 🔄 Estados da Aplicação

### Loading States
- **Skeleton screens**: Tabelas e cards
- **Spinners**: Ações rápidas
- **Progress bars**: Uploads (futuro)

### Empty States
- Mensagens informativas
- CTAs para primeira ação
- Ícones minimalistas

### Error States
- Toast notifications
- Inline errors em formulários
- Fallbacks para imagens

## 🔗 Integração Backend (Futuro)

### Endpoints Esperados

#### Produtos
```javascript
GET    /api/products              // Lista produtos
POST   /api/products              // Cria produto  
PUT    /api/products/:id          // Atualiza produto
DELETE /api/products/:id          // Remove produto
POST   /api/products/:id/images   // Upload imagens
```

#### Clubes
```javascript
GET    /api/clubs                 // Lista clubes
POST   /api/clubs                 // Cria clube
PUT    /api/clubs/:id             // Atualiza clube
PUT    /api/clubs/reorder         // Reordena clubes
```

#### Media
```javascript
POST   /api/media/upload          // Upload arquivo
GET    /api/media                 // Lista arquivos
DELETE /api/media/:id             // Remove arquivo
PUT    /api/media/:id             // Atualiza metadados
```

#### Dashboard
```javascript
GET    /api/dashboard/stats       // Métricas gerais
GET    /api/dashboard/orders      // Pedidos recentes
GET    /api/dashboard/analytics   // Dados gráficos
```

### Formato de Resposta
```javascript
// Sucesso
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}

// Erro
{
  "success": false,
  "error": "Mensagem do erro",
  "code": "ERROR_CODE"
}
```

### Headers Esperados
```javascript
Content-Type: application/json
Authorization: Bearer {token}
```

## 📦 Dependências

### CDN (já incluídas)
- **React 18**: Biblioteca principal
- **React DOM 18**: Renderização
- **Babel Standalone**: Transpilação JSX
- **Font Awesome 6.4.0**: Ícones
- **Chart.js**: Gráficos (futuro)
- **SortableJS**: Drag & drop (futuro)

### Fontes
- **Inter**: Google Fonts (fallback: system fonts)

## 🧪 Testing

### Checklist Manual
- [ ] Funciona em Chrome, Firefox, Safari, Edge
- [ ] Responsivo em 320px, 768px, 1024px, 1440px
- [ ] Navegação por teclado funcional
- [ ] Modais abrem/fecham com ESC
- [ ] Toast notifications aparecem/desaparecem
- [ ] Sidebar colapsa/expande
- [ ] Busca funciona (visual)
- [ ] Loading states aparecem

### Performance
- [ ] Lighthouse Score > 80
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 4s
- [ ] Cumulative Layout Shift < 0.1

## 🔧 Customização

### Tokens CSS
Edite as variáveis em `css/dashboard.css`:

```css
:root {
  --bg: #0b0b0b;           /* Cor de fundo */
  --surface: #111111;      /* Cards */
  --text: #ffffff;         /* Texto */
  /* ... */
}
```

### Adicionando Páginas
1. Crie função no `js/dashboard.js`:
```javascript
function MinhaPage() {
  return (
    <div className="page-content">
      <h1 className="page-title">Minha Página</h1>
      {/* Conteúdo */}
    </div>
  );
}
```

2. Adicione no switch do `renderCurrentPage()`
3. Adicione item no array `navItems`

## 🐛 Troubleshooting

### Problemas Comuns

**Dashboard não carrega**
- Verifique se está rodando em servidor local
- Confirme que o React foi carregado (console)

**Estilos não aplicam**
- Verifique ordem dos arquivos CSS
- Confirme que as variáveis CSS estão definidas

**Responsive não funciona**
- Confirme viewport meta tag
- Teste em DevTools mobile

## 📈 Roadmap

### Próximas Features
1. **Upload de Imagens**: Drag & drop funcional
2. **Drag & Drop**: Reorder de clubes/produtos  
3. **Charts**: Gráficos com Chart.js
4. **Export**: Download de relatórios
5. **Theme**: Toggle dark/light (opcional)
6. **PWA**: Service worker e cache

### Melhorias
- [ ] Animações de transição
- [ ] Lazy loading de imagens
- [ ] Virtual scrolling para listas grandes
- [ ] Infinite scroll
- [ ] Undo/redo actions
- [ ] Keyboard shortcuts

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Consulte os comentários no código
3. Teste em browsers diferentes
4. Valide HTML/CSS no validator

## 📄 Licença

Projeto interno NewHope - Todos os direitos reservados.
