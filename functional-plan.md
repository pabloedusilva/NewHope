# Functional Implementation Plan - Dashboard NewHope

## Overview das Páginas

### 1. Dashboard Overview (Alta Prioridade)
**Componentes:**
- Cards de métricas (vendas, pedidos, usuários, produtos)
- Gráfico de vendas (mock Chart.js)
- Lista de pedidos recentes
- Atividade recente do sistema

**Justificativa:** Visão geral essencial para tomada de decisões rápidas.

### 2. Camisas de Time (Alta Prioridade)
**Funcionalidades:**

#### Editor de Banner Principal (Modal)
- Upload com drag & drop
- Crop 16:9 com preview em tempo real
- Alt text e CTA link editáveis
- Toggle publicar/despublicar
- Compressão client-side (max 1MB)
- **Estados:** loading upload, sucesso, erro, preview

#### Carousel de Clubes (Component)
- Lista de clubes com thumbnail
- Reorder por drag-and-drop (SortableJS)
- Ativar/desativar clube com toggle
- Adicionar novo clube (modal)
- **Estados:** empty state, loading, reordering

#### Gerenciador de Imagens por Clube (Modal)
- Upload múltiplo com preview
- Ordenar por drag-and-drop
- Definir imagem principal (star icon)
- Legenda e alt text editáveis
- Delete com confirmação
- Grid responsivo de imagens
- **Estados:** empty gallery, uploading multiple, processing

#### Ações Rápidas
- Editar produto (modal inline)
- Duplicar produto (confirmação)
- Remover produto (confirmação + undo toast)
- Publicar/despublicar (toggle visual)

**Justificativa:** Página específica já identificada no codebase, funcionalidade central do e-commerce.

### 3. Produtos Gerais (Alta Prioridade)
**Componentes:**
- Tabela avançada com filtros (categoria, status, preço)
- Busca em tempo real
- Seleção em massa para ações bulk
- Sortable headers (nome, preço, categoria, data)
- Modal de criação/edição de produto
- Galeria de imagens por produto

**Estados:** loading table, empty search, bulk selection, editing inline

**Justificativa:** Base do e-commerce, dados mock já estruturados no codebase.

### 4. Media Library (Alta Prioridade)
**Componentes:**
- Grid de imagens com filtro por tipo
- Upload múltiplo com drag & drop
- Modal de propriedades (alt, title, tags, dimensões)
- Busca por filename ou tags
- Seleção múltipla para bulk delete
- Preview em diferentes tamanhos

**Estados:** empty library, uploading batch, processing images, filtering

**Justificativa:** Muitas imagens locais identificadas, necessário para gestão de assets.

### 5. Pedidos (Média Prioridade)
**Componentes:**
- Tabela de pedidos com status visual
- Filtros por status, data, cliente
- Timeline de acompanhamento por pedido
- Modal de detalhes do pedido
- Ações: atualizar status, adicionar nota, reembolso

**Estados:** loading orders, filtering, updating status, empty orders

**Justificativa:** E-commerce necessita gestão de pedidos, mas pode usar dados mock inicialmente.

### 6. Analytics (Média Prioridade)
**Componentes:**
- Dashboard com gráficos (Chart.js)
- Métricas de performance (pageviews, conversão)
- Top produtos e categorias
- Relatórios exportáveis (JSON download)
- Filtros por período

**Estados:** loading charts, no data available, generating report

**Justificativa:** Importantes para tomada de decisão, mas dados podem ser simulados.

### 7. Usuários (Baixa Prioridade)
**Componentes:**
- Lista de clientes cadastrados
- Perfis com histórico de compras
- Filtros por segmento
- Modal de edição de dados

**Estados:** loading users, empty database, editing profile

### 8. Configurações do Site (Baixa Prioridade)
**Componentes:**
- Editor de informações gerais
- Configurações de SEO
- Integrações (pagamento, entrega)
- Backup/restore de dados

**Estados:** saving settings, connection testing, backup in progress

### 9. Perfil Admin (Baixa Prioridade)
**Componentes:**
- Dados pessoais do admin
- Alteração de senha
- Preferências da dashboard
- Log de atividades

**Estados:** updating profile, changing password, loading activities

## Estados Globais e Loading

### Estados de Loading
- **Skeleton screens** para tabelas
- **Progress bars** para uploads
- **Shimmer effects** para cards
- **Spinner** para ações rápidas

### Empty States
- **Ilustrações minimalistas** em preto e branco
- **CTAs claros** para primeira ação
- **Mensagens motivacionais** para engajamento

### Error States
- **Toast notifications** para erros
- **Inline errors** em formulários
- **Retry buttons** para falhas de conexão
- **Fallback images** para assets não encontrados

## Dados Mock Structure

### Produtos
```json
{
  "id": "p1",
  "title": "Camisa Brasil Retrô 1994",
  "price": 129.90,
  "oldPrice": 159.90,
  "clubId": "brasil",
  "category": "retro",
  "images": ["/assets/brasil-1994-1.jpg"],
  "sku": "BRA-94-01",
  "stock": 12,
  "status": "published",
  "description": "Camisa retrô oficial...",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Clubes
```json
{
  "id": "brasil",
  "name": "Seleção Brasileira",
  "thumbnail": "/assets/clubs/brasil-thumb.jpg",
  "images": ["/assets/clubs/brasil-1.jpg"],
  "featured": true,
  "order": 1,
  "status": "active"
}
```

### Media
```json
{
  "id": "m1",
  "url": "/assets/uploads/brasil-1994.jpg",
  "alt": "Camisa Brasil 1994",
  "title": "Camisa Retrô Brasil",
  "tags": ["brasil", "retro", "1994"],
  "width": 800,
  "height": 600,
  "fileSize": 245000,
  "uploadedAt": "2024-01-15T10:30:00Z"
}
```

### Pedidos
```json
{
  "id": "ord-001",
  "customer": {
    "name": "João Silva",
    "email": "joao@email.com"
  },
  "items": [
    {
      "productId": "p1",
      "quantity": 2,
      "price": 129.90
    }
  ],
  "total": 259.80,
  "status": "processing",
  "createdAt": "2024-01-15T14:22:00Z",
  "timeline": [
    {
      "status": "created",
      "timestamp": "2024-01-15T14:22:00Z",
      "note": "Pedido criado"
    }
  ]
}
```

## Contratos de API (Backend Futuro)

### Produtos
- `GET /api/products` - Lista produtos com filtros
- `POST /api/products` - Cria produto
- `PUT /api/products/:id` - Atualiza produto
- `DELETE /api/products/:id` - Remove produto
- `POST /api/products/:id/images` - Upload imagens

### Media
- `POST /api/media/upload` - Upload arquivo
- `GET /api/media` - Lista arquivos
- `DELETE /api/media/:id` - Remove arquivo
- `PUT /api/media/:id` - Atualiza metadados

### Dashboard
- `GET /api/dashboard/stats` - Métricas gerais
- `GET /api/dashboard/recent-orders` - Pedidos recentes
- `GET /api/dashboard/analytics` - Dados para gráficos

### Site Settings
- `GET /api/settings/banner` - Banner principal
- `PUT /api/settings/banner` - Atualiza banner
- `GET /api/settings/clubs` - Lista clubes
- `PUT /api/settings/clubs/order` - Reordena clubes

## Critérios de Aceitação

### Funcionalidade ✓
- [ ] Todos os uploads mostram progress bar
- [ ] Drag & drop funciona em todos os browsers modernos
- [ ] Modais têm focus trap e fecham com ESC
- [ ] Tabelas são responsivas (cards em mobile)
- [ ] Reorder funciona com touch e mouse

### Performance ✓
- [ ] Imagens são comprimidas antes do upload
- [ ] Lazy loading para listas grandes
- [ ] Skeleton screens durante carregamento
- [ ] Debounce em buscas em tempo real

### Acessibilidade ✓
- [ ] Todas as ações têm labels ARIA
- [ ] Contraste mínimo 4.5:1
- [ ] Navegação por teclado funcional
- [ ] Screen readers conseguem navegar

### Responsividade ✓
- [ ] Funciona de 320px a 2560px
- [ ] Touch targets ≥ 44px
- [ ] Texto legível sem zoom
- [ ] Menus colapsam adequadamente

## Prioridade de Desenvolvimento

### Sprint 1 (Essencial)
1. Layout base da dashboard
2. Sistema de componentes
3. Overview com métricas mock
4. Media Library básica

### Sprint 2 (Core Features)
1. Camisas de Time completa
2. Produtos com CRUD
3. Upload de imagens
4. Modais e formulários

### Sprint 3 (Enhancement)
1. Pedidos e status
2. Analytics com gráficos
3. Configurações do site
4. Otimizações de UX

### Sprint 4 (Polish)
1. Usuários e perfis
2. Logs de atividade
3. Testes de usabilidade
4. Documentação final
