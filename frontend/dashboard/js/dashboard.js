// NewHope Dashboard - React Application
const { useState, useEffect, useRef, useContext, createContext } = React;

// Dashboard Context for global state
const DashboardContext = createContext();

// Mock Data
const mockData = {
  stats: {
    totalSales: 12450.80,
    totalOrders: 156,
    totalProducts: 89,
    totalUsers: 1247
  },
  recentOrders: [
    {
      id: 'ORD-001',
      customer: { name: 'João Silva', email: 'joao@email.com' },
      product: 'Camisa Brasil Retrô 1994',
      status: 'processing',
      total: 129.90,
      date: '2024-01-15T14:22:00Z'
    },
    {
      id: 'ORD-002', 
      customer: { name: 'Maria Santos', email: 'maria@email.com' },
      product: 'Camisa Argentina 2022',
      status: 'shipped',
      total: 149.90,
      date: '2024-01-15T12:10:00Z'
    },
    {
      id: 'ORD-003',
      customer: { name: 'Pedro Costa', email: 'pedro@email.com' },
      product: 'Camisa Real Madrid',
      status: 'delivered',
      total: 199.90,
      date: '2024-01-14T16:45:00Z'
    }
  ],
  clubs: [
    { id: 'brasil', name: 'Seleção Brasileira', thumbnail: '/assets/clubs/brasil.jpg', featured: true, order: 1, status: 'active' },
    { id: 'argentina', name: 'Seleção Argentina', thumbnail: '/assets/clubs/argentina.jpg', featured: true, order: 2, status: 'active' },
    { id: 'realmadrid', name: 'Real Madrid', thumbnail: '/assets/clubs/real.jpg', featured: false, order: 3, status: 'active' },
    { id: 'barcelona', name: 'Barcelona', thumbnail: '/assets/clubs/barca.jpg', featured: true, order: 4, status: 'active' }
  ],
  products: [
    {
      id: 'p1',
      title: 'Camisa Brasil Retrô 1994',
      price: 129.90,
      oldPrice: 159.90,
      clubId: 'brasil',
      category: 'retro',
      images: ['/assets/products/brasil-1994.jpg'],
      sku: 'BRA-94-01',
      stock: 12,
      status: 'published',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'p2',
      title: 'Camisa Argentina 2022',
      price: 149.90,
      clubId: 'argentina',
      category: 'current',
      images: ['/assets/products/argentina-2022.jpg'],
      sku: 'ARG-22-01',
      stock: 8,
      status: 'published',
      createdAt: '2024-01-14T15:20:00Z'
    }
  ],
  media: [
    { id: 'm1', url: '/assets/uploads/brasil-1994.jpg', alt: 'Camisa Brasil 1994', title: 'Camisa Retrô Brasil', tags: ['brasil', 'retro', '1994'], width: 800, height: 600, fileSize: 245000 },
    { id: 'm2', url: '/assets/uploads/banner-hero.jpg', alt: 'Banner Principal', title: 'Banner Hero', tags: ['banner', 'hero'], width: 1920, height: 1080, fileSize: 580000 }
  ]
};

// Toast Component
function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      default: return 'fas fa-info-circle';
    }
  };

  return (
    <div className="toast">
      <i className={`toast-icon ${getIcon()}`}></i>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Fechar notificação">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

// Toast Container
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

// Modal Component
function Modal({ isOpen, onClose, title, children, size = 'medium' }) {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    small: 'max-width: 400px',
    medium: 'max-width: 500px',
    large: 'max-width: 800px',
    full: 'max-width: 95vw'
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div 
        className="modal" 
        style={{ maxWidth: sizeClasses[size] }}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

// Gallery Modal Component - Modal dinâmico para seleção de imagens
function GalleryModal({ isOpen, onClose, onSelectImage, title = "Selecionar Imagem" }) {
  const [mediaFiles, setMediaFiles] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      loadMediaFiles();
    }
  }, [isOpen]);

  const loadMediaFiles = () => {
    const savedMedia = localStorage.getItem('dashboard_media');
    if (savedMedia) {
      setMediaFiles(JSON.parse(savedMedia));
    } else {
      // Initialize with mock data based on your site structure
      const mockMedia = [
        {
          id: 1,
          name: 'logo.png',
          category: 'Logos',
          url: '/img/Logos/logo.png',
          type: 'image',
          size: '45KB',
          uploadedAt: '2024-01-15T10:30:00Z',
          usedIn: ['Header', 'Footer']
        },
        {
          id: 2,
          name: 'Brasil Retro.png',
          category: 'Promoções',
          url: '/img/Promoções/Brasil Retro.png',
          type: 'image',
          size: '120KB',
          uploadedAt: '2024-01-20T14:15:00Z',
          usedIn: ['Banner Principal']
        },
        {
          id: 3,
          name: 'Chronic.png',
          category: 'Promoções',
          url: '/img/Promoções/Chronic.png',
          type: 'image',
          size: '95KB',
          uploadedAt: '2024-01-20T15:30:00Z',
          usedIn: ['Seção Promoções']
        },
        {
          id: 4,
          name: 'Jesus Salva.png',
          category: 'Promoções',
          url: '/img/Promoções/Jesus Salva.png',
          type: 'image',
          size: '110KB',
          uploadedAt: '2024-01-20T16:00:00Z',
          usedIn: ['Banner Secundário']
        },
        {
          id: 5,
          name: 'Camisas de Time.png',
          category: 'Categorias',
          url: '/img/categorias/Camisas de Time.png',
          type: 'image',
          size: '85KB',
          uploadedAt: '2024-01-18T10:00:00Z',
          usedIn: ['Página Categorias']
        },
        {
          id: 6,
          name: 'Bermudas.png',
          category: 'Categorias',
          url: '/img/categorias/Bermudas.png',
          type: 'image',
          size: '75KB',
          uploadedAt: '2024-01-18T10:15:00Z',
          usedIn: ['Página Categorias']
        },
        {
          id: 7,
          name: 'Bonés.png',
          category: 'Categorias',
          url: '/img/categorias/Bonés.png',
          type: 'image',
          size: '60KB',
          uploadedAt: '2024-01-18T10:30:00Z',
          usedIn: ['Página Categorias']
        },
        {
          id: 8,
          name: 'banner1.mp4',
          category: 'Banners',
          url: '/video/banners/banner1.mp4',
          type: 'video',
          size: '2.5MB',
          uploadedAt: '2024-01-22T09:00:00Z',
          usedIn: ['Banner Principal']
        },
        {
          id: 9,
          name: 'intro1.mp4',
          category: 'Videos',
          url: '/video/intro1.mp4',
          type: 'video',
          size: '5.2MB',
          uploadedAt: '2024-01-25T11:30:00Z',
          usedIn: ['Página Inicial']
        }
      ];
      setMediaFiles(mockMedia);
      localStorage.setItem('dashboard_media', JSON.stringify(mockMedia));
    }
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || file.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(mediaFiles.map(file => file.category))];

  const handleSelectImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleConfirmSelection = () => {
    if (selectedImage && onSelectImage) {
      onSelectImage(selectedImage);
      onClose();
      setSelectedImage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="gallery-modal" onClick={onClose}>
      <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-header">
          <h3 className="gallery-title">{title}</h3>
          <button 
            className="gallery-close" 
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="gallery-filters">
          <div className="gallery-search">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="gallery-filter-select"
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="gallery-grid-container">
          <div className="gallery-grid">
            {filteredFiles.map(file => (
              <div 
                key={file.id} 
                className={`gallery-item ${selectedImage === file.url ? 'selected' : ''}`}
                onClick={() => handleSelectImage(file.url)}
              >
                {file.type === 'image' ? (
                  <img src={file.url} alt={file.name} className="gallery-item-image" />
                ) : (
                  <video src={file.url} className="gallery-item-video" />
                )}
                <div className="gallery-item-info">
                  <div className="gallery-item-name">{file.name}</div>
                  <div className="gallery-item-type">{file.category}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="gallery-empty">
              <i className="fas fa-images"></i>
              <h3>Nenhuma imagem encontrada</h3>
              <p>Tente ajustar os filtros ou adicione novas imagens à galeria.</p>
            </div>
          )}
        </div>

        <div className="gallery-footer">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleConfirmSelection}
            disabled={!selectedImage}
          >
            <i className="fas fa-check"></i> Selecionar Imagem
          </button>
        </div>
      </div>
    </div>
  );
}

// Image Input with Gallery - Componente reutilizável para inputs de imagem
function ImageInputWithGallery({ 
  label = "URL da Imagem", 
  value = "", 
  onChange, 
  placeholder = "Cole a URL da imagem ou selecione da galeria",
  showPreview = true 
}) {
  const [showGallery, setShowGallery] = React.useState(false);

  const handleGallerySelect = (imageUrl) => {
    if (onChange) {
      onChange(imageUrl);
    }
  };

  return (
    <div className="image-input-group">
      <label>{label}</label>
      <div className="image-input-wrapper">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          className="form-input"
        />
        <button
          type="button"
          className="btn btn-secondary gallery-btn"
          onClick={() => setShowGallery(true)}
          title="Selecionar da galeria"
        >
          <i className="fas fa-images"></i>
        </button>
      </div>
      
      {showPreview && value && (
        <div className="image-preview">
          {value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.mov') ? (
            <video src={value} width="150" height="100" controls />
          ) : (
            <img src={value} alt="Preview" width="150" height="100" />
          )}
        </div>
      )}

      <GalleryModal
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        onSelectImage={handleGallerySelect}
        title="Selecionar Imagem"
      />
    </div>
  );
}

// Skeleton Loader
function Skeleton({ width = '100%', height = '20px', className = '' }) {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ width, height }}
      aria-label="Carregando..."
    />
  );
}

// Stat Card Component
function StatCard({ title, value, icon, change }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-icon">
          <i className={icon}></i>
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      {change && <div className="stat-card-change">{change}</div>}
    </div>
  );
}

// Table Component
function Table({ columns, data, loading = false, onRowClick }) {
  if (loading) {
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, idx) => (
              <tr key={idx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>
                    <Skeleton height="16px" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx}>
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Sidebar Component
function Sidebar({ isCollapsed, onToggle }) {
  const { currentPage, setCurrentPage } = useContext(DashboardContext);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
    { id: 'camisas', label: 'Camisas de Time', icon: 'fas fa-tshirt' },
    { id: 'products', label: 'Produtos', icon: 'fas fa-box' },
    { id: 'orders', label: 'Pedidos', icon: 'fas fa-shopping-cart' },
    { id: 'media', label: 'Media Library', icon: 'fas fa-images' },
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-bar' },
    { id: 'users', label: 'Usuários', icon: 'fas fa-users' },
    { id: 'settings', label: 'Configurações', icon: 'fas fa-cog' }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">NH</div>
        <span className="logo-text">NewHope</span>
      </div>
      
      <nav className="nav-menu" role="navigation" aria-label="Menu principal">
        <div className="nav-section">
          <h3 className="nav-section-title">Principal</h3>
          <ul className="nav-list">
            {navItems.slice(0, 4).map(item => (
              <li key={item.id} className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.id);
                  }}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  <i className={`nav-icon ${item.icon}`}></i>
                  <span className="nav-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="nav-section">
          <h3 className="nav-section-title">Gestão</h3>
          <ul className="nav-list">
            {navItems.slice(4).map(item => (
              <li key={item.id} className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.id);
                  }}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  <i className={`nav-icon ${item.icon}`}></i>
                  <span className="nav-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

// Header Component
function Header({ onSidebarToggle, isCollapsed }) {
  const [notifications] = useState(3);

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={onSidebarToggle}
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          <i className="fas fa-bars"></i>
        </button>
        
        <div className="search-container">
          <i className="search-icon fas fa-search"></i>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar produtos, pedidos..."
            aria-label="Buscar"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button 
          className="notification-btn"
          aria-label={`Notificações (${notifications} não lidas)`}
        >
          <i className="fas fa-bell"></i>
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </button>
        
        <div className="user-avatar" title="Admin">
          A
        </div>
      </div>
    </header>
  );
}

// Overview Page
function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockData.stats);
      setRecentOrders(mockData.recentOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      processing: { label: 'Processando', color: '#fbbf24' },
      shipped: { label: 'Enviado', color: '#60a5fa' },
      delivered: { label: 'Entregue', color: '#34d399' },
      cancelled: { label: 'Cancelado', color: '#f87171' }
    };

    const statusInfo = statusMap[status] || { label: status, color: '#9ca3af' };

    return (
      <span 
        style={{
          display: 'inline-block',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: statusInfo.color + '20',
          color: statusInfo.color,
          border: `1px solid ${statusInfo.color}40`
        }}
      >
        {statusInfo.label}
      </span>
    );
  };

  const orderColumns = [
    {
      header: 'ID',
      accessor: 'id'
    },
    {
      header: 'Cliente',
      accessor: 'customer',
      render: (customer) => customer.name
    },
    {
      header: 'Produto',
      accessor: 'product'
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (status) => getStatusBadge(status)
    },
    {
      header: 'Total',
      accessor: 'total',
      render: (total) => formatCurrency(total)
    },
    {
      header: 'Data',
      accessor: 'date',
      render: (date) => formatDate(date)
    }
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Visão geral das principais métricas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 mb-xl">
        {loading ? (
          [...Array(4)].map((_, idx) => (
            <div key={idx} className="stat-card">
              <Skeleton height="60px" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              title="Vendas Totais"
              value={formatCurrency(stats.totalSales)}
              icon="fas fa-dollar-sign"
              change="+12% vs mês anterior"
            />
            <StatCard
              title="Pedidos"
              value={stats.totalOrders}
              icon="fas fa-shopping-cart"
              change="+8% vs mês anterior"
            />
            <StatCard
              title="Produtos"
              value={stats.totalProducts}
              icon="fas fa-box"
              change="5 adicionados esta semana"
            />
            <StatCard
              title="Usuários"
              value={stats.totalUsers}
              icon="fas fa-users"
              change="+23 novos usuários"
            />
          </>
        )}
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Pedidos Recentes</h2>
          <button className="btn btn-sm btn-ghost">
            Ver todos
          </button>
        </div>
        <div className="card-content p-0">
          <Table 
            columns={orderColumns}
            data={recentOrders}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

// Camisas de Time Page
function CamisasPage() {
  const { addToast } = useContext(DashboardContext);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showClubModal, setShowClubModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [bannerImage, setBannerImage] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClubs(mockData.clubs);
      setLoading(false);
    }, 800);
  }, []);

  const handleReorderClubs = (newOrder) => {
    setClubs(newOrder);
    addToast('Ordem dos clubes atualizada com sucesso!', 'success');
  };

  const toggleClubStatus = (clubId) => {
    setClubs(prev => prev.map(club => 
      club.id === clubId 
        ? { ...club, status: club.status === 'active' ? 'inactive' : 'active' }
        : club
    ));
    addToast('Status do clube atualizado!', 'success');
  };

  const toggleClubFeatured = (clubId) => {
    setClubs(prev => prev.map(club => 
      club.id === clubId 
        ? { ...club, featured: !club.featured }
        : club
    ));
    addToast('Destaque do clube atualizado!', 'success');
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="page-header">
          <Skeleton width="300px" height="32px" className="mb-sm" />
          <Skeleton width="400px" height="20px" />
        </div>
        <div className="grid grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="card">
              <Skeleton height="200px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Camisas de Time</h1>
        <p className="page-subtitle">Gerencie clubes, banners e produtos de futebol</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-md mb-xl">
        <button 
          className="btn"
          onClick={() => setShowBannerModal(true)}
        >
          <i className="fas fa-image"></i>
          Editar Banner Principal
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => setShowClubModal(true)}
        >
          <i className="fas fa-plus"></i>
          Adicionar Clube
        </button>
      </div>

      {/* Clubs Grid */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Gerenciamento de Clubes</h2>
          <span className="text-sm text-muted">{clubs.length} clubes cadastrados</span>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-3 gap-lg">
            {clubs.map(club => (
              <div key={club.id} className="card">
                <div className="card-content">
                  <div className="flex items-center justify-between mb-md">
                    <h3 className="font-semibold">{club.name}</h3>
                    <div className="flex gap-sm">
                      <button
                        className={`btn btn-sm ${club.featured ? 'btn' : 'btn-ghost'}`}
                        onClick={() => toggleClubFeatured(club.id)}
                        title={club.featured ? 'Remover destaque' : 'Destacar clube'}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => {
                          setSelectedClub(club);
                          setShowClubModal(true);
                        }}
                        title="Editar clube"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    className="mb-md"
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: 'var(--panel)',
                      borderRadius: 'var(--radius)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-muted)',
                      fontSize: 'var(--text-sm)'
                    }}
                  >
                    <i className="fas fa-image" style={{ fontSize: '24px' }}></i>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${club.status === 'active' ? 'text-success' : 'text-muted'}`}>
                      {club.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                    <button
                      className={`btn btn-sm ${club.status === 'active' ? 'btn-ghost' : 'btn'}`}
                      onClick={() => toggleClubStatus(club.id)}
                    >
                      {club.status === 'active' ? 'Desativar' : 'Ativar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Modal */}
      <Modal
        isOpen={showBannerModal}
        onClose={() => setShowBannerModal(false)}
        title="Editor de Banner Principal"
        size="large"
      >
        <div className="form-group">
          <ImageInputWithGallery 
            label="Upload de Imagem do Banner"
            value={bannerImage}
            onChange={setBannerImage}
            placeholder="Selecione uma imagem da galeria ou cole URL"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Texto Alternativo</label>
          <input type="text" className="form-input" placeholder="Descrição da imagem..." />
        </div>
        
        <div className="form-group">
          <label className="form-label">Link do CTA</label>
          <input type="url" className="form-input" placeholder="https://..." />
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={() => setShowBannerModal(false)}>
            Cancelar
          </button>
          <button className="btn">
            Salvar Banner
          </button>
        </div>
      </Modal>

      {/* Club Modal */}
      <Modal
        isOpen={showClubModal}
        onClose={() => {
          setShowClubModal(false);
          setSelectedClub(null);
        }}
        title={selectedClub ? 'Editar Clube' : 'Adicionar Clube'}
      >
        <div className="form-group">
          <label className="form-label">Nome do Clube</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Ex: Seleção Brasileira"
            defaultValue={selectedClub?.name || ''}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Logo do Clube</label>
          <div 
            style={{
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius)',
              padding: 'var(--space-lg)',
              textAlign: 'center',
              backgroundColor: 'var(--panel)'
            }}
          >
            <i className="fas fa-image" style={{ fontSize: '32px', color: 'var(--text-muted)' }}></i>
            <p className="text-sm mt-sm">Clique para adicionar logo</p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn btn-ghost" 
            onClick={() => {
              setShowClubModal(false);
              setSelectedClub(null);
            }}
          >
            Cancelar
          </button>
          <button className="btn">
            {selectedClub ? 'Atualizar' : 'Adicionar'} Clube
          </button>
        </div>
      </Modal>
    </div>
  );
}

// Products Page
function ProductsPage() {
  const [products, setProducts] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [stockFilter, setStockFilter] = React.useState('');

  React.useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('dashboard_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with mock data
      const mockProducts = [
        {
          id: 1,
          name: 'Camisa Brasil Retrô 1970',
          category: 'Camisas de Time',
          club: 'Brasil',
          price: 89.90,
          stock: 25,
          status: 'active',
          image: '/img/categorias/Brasil Retro.png',
          description: 'Camisa retrô da seleção brasileira de 1970, tricampeã mundial.',
          sizes: ['P', 'M', 'G', 'GG'],
          colors: ['Amarelo', 'Verde'],
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          name: 'Camisa Chronic Skateboard',
          category: 'Chronic',
          club: 'Chronic',
          price: 75.90,
          stock: 12,
          status: 'active',
          image: '/img/categorias/Chronic.png',
          description: 'Camisa da marca Chronic para skatistas.',
          sizes: ['P', 'M', 'G'],
          colors: ['Preto', 'Branco'],
          createdAt: '2024-01-20'
        },
        {
          id: 3,
          name: 'Camisa Jesus Salva',
          category: 'Blessed Choice',
          club: 'Blessed Choice',
          price: 65.90,
          stock: 0,
          status: 'inactive',
          image: '/img/categorias/Jesus Salva.png',
          description: 'Camisa evangelica com mensagem de fé.',
          sizes: ['P', 'M', 'G', 'GG', 'XGG'],
          colors: ['Branco', 'Azul'],
          createdAt: '2024-01-10'
        }
      ];
      setProducts(mockProducts);
      localStorage.setItem('dashboard_products', JSON.stringify(mockProducts));
    }
  };

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('dashboard_products', JSON.stringify(updatedProducts));
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
      saveProducts(updatedProducts);
    } else {
      const newProduct = {
        ...productData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      saveProducts([...products, newProduct]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      saveProducts(updatedProducts);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesStock = !stockFilter || 
                       (stockFilter === 'in_stock' && product.stock > 0) ||
                       (stockFilter === 'out_of_stock' && product.stock === 0) ||
                       (stockFilter === 'low_stock' && product.stock > 0 && product.stock <= 10);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fas fa-box"></i> Gerenciar Produtos</h1>
          <p className="page-subtitle">Administre todos os produtos da loja</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
        >
          <i className="fas fa-plus"></i> Novo Produto
        </button>
      </div>

      <div className="filters-section card">
        <div className="card-content">
          <div className="filters-row">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="">Todo o estoque</option>
              <option value="in_stock">Em estoque</option>
              <option value="low_stock">Estoque baixo</option>
              <option value="out_of_stock">Sem estoque</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{products.length}</div>
            <div className="stat-label">Total de Produtos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{products.filter(p => p.status === 'active').length}</div>
            <div className="stat-label">Produtos Ativos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{products.filter(p => p.stock <= 10 && p.stock > 0).length}</div>
            <div className="stat-label">Estoque Baixo</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{products.filter(p => p.stock === 0).length}</div>
            <div className="stat-label">Sem Estoque</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-info">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div>
                          <div className="product-name">{product.name}</div>
                          <div className="product-club">{product.club}</div>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td className="price">R$ {product.price.toFixed(2)}</td>
                    <td>
                      <span className={`stock-badge ${product.stock === 0 ? 'out-of-stock' : product.stock <= 10 ? 'low-stock' : ''}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${product.status}`}>
                        {product.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button 
                          className="btn-icon edit" 
                          onClick={() => {
                            setEditingProduct(product);
                            setShowModal(true);
                          }}
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Excluir"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Product Modal Component
function ProductModal({ product, onSave, onClose }) {
  const [formData, setFormData] = React.useState({
    name: product?.name || '',
    category: product?.category || 'Camisas de Time',
    club: product?.club || '',
    price: product?.price || '',
    stock: product?.stock || '',
    status: product?.status || 'active',
    image: product?.image || '',
    description: product?.description || '',
    sizes: product?.sizes || ['P', 'M', 'G'],
    colors: product?.colors || ['']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      sizes: formData.sizes.filter(s => s.trim()),
      colors: formData.colors.filter(c => c.trim())
    });
  };

  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, '']
    }));
  };

  const removeSize = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, '']
    }));
  };

  const removeColor = (index) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? 'Editar Produto' : 'Novo Produto'}</h2>
          <button className="btn-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nome do Produto *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Categoria *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              >
                <option value="Camisas de Time">Camisas de Time</option>
                <option value="Chronic">Chronic</option>
                <option value="Blessed Choice">Blessed Choice</option>
                <option value="Bermudas">Bermudas</option>
                <option value="Bonés">Bonés</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Clube/Marca *</label>
              <input
                type="text"
                value={formData.club}
                onChange={(e) => setFormData(prev => ({ ...prev, club: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preço (R$) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Estoque *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                required
              />
            </div>
          </div>

          <ImageInputWithGallery 
            label="URL da Imagem"
            value={formData.image}
            onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
            placeholder="/img/categorias/produto.png"
          />

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Tamanhos</label>
            <div className="dynamic-list">
              {formData.sizes.map((size, index) => (
                <div key={index} className="dynamic-item">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => {
                      const newSizes = [...formData.sizes];
                      newSizes[index] = e.target.value;
                      setFormData(prev => ({ ...prev, sizes: newSizes }));
                    }}
                    placeholder="P, M, G, etc."
                  />
                  <button type="button" onClick={() => removeSize(index)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addSize}>
                <i className="fas fa-plus"></i> Adicionar Tamanho
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Cores</label>
            <div className="dynamic-list">
              {formData.colors.map((color, index) => (
                <div key={index} className="dynamic-item">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...formData.colors];
                      newColors[index] = e.target.value;
                      setFormData(prev => ({ ...prev, colors: newColors }));
                    }}
                    placeholder="Azul, Vermelho, etc."
                  />
                  <button type="button" onClick={() => removeColor(index)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addColor}>
                <i className="fas fa-plus"></i> Adicionar Cor
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {product ? 'Salvar Alterações' : 'Criar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Orders Page
function OrdersPage() {
  const [orders, setOrders] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  React.useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = localStorage.getItem('dashboard_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Initialize with mock data
      const mockOrders = [
        {
          id: '#ORD-2024-001',
          customer: {
            name: 'João Silva',
            email: 'joao@email.com',
            phone: '(11) 99999-9999'
          },
          items: [
            { name: 'Camisa Brasil Retrô 1970', price: 89.90, quantity: 1, size: 'M' }
          ],
          total: 89.90,
          status: 'pending',
          paymentMethod: 'pix',
          shippingAddress: 'Rua das Flores, 123 - São Paulo, SP',
          createdAt: '2024-01-20T10:30:00Z',
          updatedAt: '2024-01-20T10:30:00Z'
        },
        {
          id: '#ORD-2024-002',
          customer: {
            name: 'Maria Santos',
            email: 'maria@email.com',
            phone: '(11) 88888-8888'
          },
          items: [
            { name: 'Camisa Chronic Skateboard', price: 75.90, quantity: 2, size: 'G' }
          ],
          total: 151.80,
          status: 'processing',
          paymentMethod: 'credit_card',
          shippingAddress: 'Av. Paulista, 500 - São Paulo, SP',
          createdAt: '2024-01-19T14:15:00Z',
          updatedAt: '2024-01-20T09:00:00Z'
        },
        {
          id: '#ORD-2024-003',
          customer: {
            name: 'Pedro Oliveira',
            email: 'pedro@email.com',
            phone: '(11) 77777-7777'
          },
          items: [
            { name: 'Camisa Jesus Salva', price: 65.90, quantity: 1, size: 'P' }
          ],
          total: 65.90,
          status: 'shipped',
          paymentMethod: 'pix',
          shippingAddress: 'Rua Augusta, 1000 - São Paulo, SP',
          createdAt: '2024-01-18T16:45:00Z',
          updatedAt: '2024-01-19T11:30:00Z'
        },
        {
          id: '#ORD-2024-004',
          customer: {
            name: 'Ana Costa',
            email: 'ana@email.com',
            phone: '(11) 66666-6666'
          },
          items: [
            { name: 'Camisa Brasil Retrô 1970', price: 89.90, quantity: 1, size: 'G' },
            { name: 'Camisa Chronic Skateboard', price: 75.90, quantity: 1, size: 'M' }
          ],
          total: 165.80,
          status: 'delivered',
          paymentMethod: 'credit_card',
          shippingAddress: 'Rua Oscar Freire, 200 - São Paulo, SP',
          createdAt: '2024-01-15T08:20:00Z',
          updatedAt: '2024-01-17T15:45:00Z'
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem('dashboard_orders', JSON.stringify(mockOrders));
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        status: newStatus, 
        updatedAt: new Date().toISOString() 
      } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('dashboard_orders', JSON.stringify(updatedOrders));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return statusClasses[status] || 'secondary';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'Pendente',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return statusTexts[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length
    };
  };

  const stats = getOrderStats();

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fas fa-shopping-cart"></i> Gerenciar Pedidos</h1>
          <p className="page-subtitle">Acompanhe e gerencie todos os pedidos da loja</p>
        </div>
      </div>

      <div className="filters-section card">
        <div className="card-content">
          <div className="filters-row">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Buscar por ID, cliente ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="processing">Processando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total de Pedidos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pendentes</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <i className="fas fa-cog"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.processing}</div>
            <div className="stat-label">Processando</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.delivered}</div>
            <div className="stat-label">Entregues</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID do Pedido</th>
                  <th>Cliente</th>
                  <th>Produtos</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <span className="order-id">{order.id}</span>
                    </td>
                    <td>
                      <div className="customer-info">
                        <div className="customer-name">{order.customer.name}</div>
                        <div className="customer-email">{order.customer.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            {item.quantity}x {item.name} ({item.size})
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="price">R$ {order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      <div className="actions">
                        <button 
                          className="btn-icon view" 
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                          title="Ver detalhes"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pendente</option>
                            <option value="processing">Processando</option>
                            <option value="shipped">Enviado</option>
                            <option value="delivered">Entregue</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowModal(false);
            setSelectedOrder(null);
          }}
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </div>
  );
}

// Order Details Modal Component
function OrderDetailsModal({ order, onClose, onUpdateStatus }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'Pendente',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return statusTexts[status] || status;
  };

  const getPaymentMethodText = (method) => {
    const methodTexts = {
      pix: 'PIX',
      credit_card: 'Cartão de Crédito',
      debit_card: 'Cartão de Débito',
      boleto: 'Boleto'
    };
    return methodTexts[method] || method;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalhes do Pedido {order.id}</h2>
          <button className="btn-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="order-details">
          <div className="details-grid">
            <div className="detail-section">
              <h3><i className="fas fa-user"></i> Informações do Cliente</h3>
              <div className="detail-item">
                <strong>Nome:</strong> {order.customer.name}
              </div>
              <div className="detail-item">
                <strong>Email:</strong> {order.customer.email}
              </div>
              <div className="detail-item">
                <strong>Telefone:</strong> {order.customer.phone}
              </div>
            </div>

            <div className="detail-section">
              <h3><i className="fas fa-info-circle"></i> Informações do Pedido</h3>
              <div className="detail-item">
                <strong>Status:</strong> 
                <span className={`status-badge ${order.status}`} style={{marginLeft: '8px'}}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="detail-item">
                <strong>Pagamento:</strong> {getPaymentMethodText(order.paymentMethod)}
              </div>
              <div className="detail-item">
                <strong>Criado em:</strong> {formatDate(order.createdAt)}
              </div>
              <div className="detail-item">
                <strong>Atualizado em:</strong> {formatDate(order.updatedAt)}
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><i className="fas fa-map-marker-alt"></i> Endereço de Entrega</h3>
            <div className="shipping-address">
              {order.shippingAddress}
            </div>
          </div>

          <div className="detail-section">
            <h3><i className="fas fa-box"></i> Produtos</h3>
            <div className="order-items-detail">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-detail">
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-details">Tamanho: {item.size} | Quantidade: {item.quantity}</div>
                  </div>
                  <div className="item-price">R$ {(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="order-total">
                <strong>Total: R$ {order.total.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <div className="detail-section">
              <h3><i className="fas fa-edit"></i> Atualizar Status</h3>
              <select
                value={order.status}
                onChange={(e) => {
                  onUpdateStatus(order.id, e.target.value);
                  onClose();
                }}
                className="status-update-select"
              >
                <option value="pending">Pendente</option>
                <option value="processing">Processando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregue</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// Media Page
function MediaPage() {
  const [mediaFiles, setMediaFiles] = React.useState([]);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  React.useEffect(() => {
    loadMediaFiles();
  }, []);

  const loadMediaFiles = () => {
    const savedMedia = localStorage.getItem('dashboard_media');
    if (savedMedia) {
      setMediaFiles(JSON.parse(savedMedia));
    } else {
      // Initialize with mock data based on your site structure
      const mockMedia = [
        {
          id: 1,
          name: 'logo.png',
          category: 'Logos',
          url: '/img/Logos/logo.png',
          type: 'image',
          size: '45KB',
          uploadedAt: '2024-01-15T10:30:00Z',
          usedIn: ['Header', 'Footer']
        },
        {
          id: 2,
          name: 'Brasil Retro.png',
          category: 'Promoções',
          url: '/img/Promoções/Brasil Retro.png',
          type: 'image',
          size: '120KB',
          uploadedAt: '2024-01-20T14:15:00Z',
          usedIn: ['Homepage Banner']
        },
        {
          id: 3,
          name: 'Chronic.png',
          category: 'Promoções',
          url: '/img/Promoções/Chronic.png',
          type: 'image',
          size: '98KB',
          uploadedAt: '2024-01-18T09:45:00Z',
          usedIn: ['Categoria Chronic']
        },
        {
          id: 4,
          name: 'Camisas de Time.png',
          category: 'Categorias',
          url: '/img/categorias/Camisas de Time.png',
          type: 'image',
          size: '87KB',
          uploadedAt: '2024-01-10T16:20:00Z',
          usedIn: ['Página Categorias']
        },
        {
          id: 5,
          name: 'newsletter1.png',
          category: 'Newsletter',
          url: '/img/newsletter/newsletter1.png',
          type: 'image',
          size: '156KB',
          uploadedAt: '2024-01-12T11:30:00Z',
          usedIn: ['Email Marketing']
        },
        {
          id: 6,
          name: 'banner1.mp4',
          category: 'Banners',
          url: '/video/banners/banner1.mp4',
          type: 'video',
          size: '2.3MB',
          uploadedAt: '2024-01-08T13:45:00Z',
          usedIn: ['Homepage Hero']
        },
        {
          id: 7,
          name: 'intro1.mp4',
          category: 'Videos',
          url: '/video/intro1.mp4',
          type: 'video',
          size: '4.7MB',
          uploadedAt: '2024-01-05T08:15:00Z',
          usedIn: ['Página Inicial']
        }
      ];
      setMediaFiles(mockMedia);
      localStorage.setItem('dashboard_media', JSON.stringify(mockMedia));
    }
  };

  const saveMediaFiles = (updatedMedia) => {
    setMediaFiles(updatedMedia);
    localStorage.setItem('dashboard_media', JSON.stringify(updatedMedia));
  };

  const handleDeleteFile = (id) => {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      const updatedMedia = mediaFiles.filter(file => file.id !== id);
      saveMediaFiles(updatedMedia);
      setSelectedFiles(prev => prev.filter(fileId => fileId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) return;
    if (confirm(`Tem certeza que deseja excluir ${selectedFiles.length} arquivo(s)?`)) {
      const updatedMedia = mediaFiles.filter(file => !selectedFiles.includes(file.id));
      saveMediaFiles(updatedMedia);
      setSelectedFiles([]);
    }
  };

  const handleFileUpload = (fileData) => {
    const newFile = {
      ...fileData,
      id: Date.now(),
      uploadedAt: new Date().toISOString()
    };
    saveMediaFiles([...mediaFiles, newFile]);
    setShowUploadModal(false);
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || file.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(mediaFiles.map(file => file.category))];
  const totalSize = mediaFiles.reduce((acc, file) => {
    const sizeInKB = parseFloat(file.size.replace(/[^\d.]/g, ''));
    const multiplier = file.size.includes('MB') ? 1024 : 1;
    return acc + (sizeInKB * multiplier);
  }, 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fas fa-images"></i> Media Library</h1>
          <p className="page-subtitle">Gerencie todas as imagens e vídeos da loja</p>
        </div>
        <div className="header-actions">
          {selectedFiles.length > 0 && (
            <button className="btn btn-danger" onClick={handleBulkDelete}>
              <i className="fas fa-trash"></i> Excluir ({selectedFiles.length})
            </button>
          )}
          <button 
            className="btn btn-primary" 
            onClick={() => setShowUploadModal(true)}
          >
            <i className="fas fa-upload"></i> Upload
          </button>
        </div>
      </div>

      <div className="filters-section card">
        <div className="card-content">
          <div className="filters-row">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Buscar arquivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-images"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{mediaFiles.length}</div>
            <div className="stat-label">Total de Arquivos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <i className="fas fa-photo-video"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{mediaFiles.filter(f => f.type === 'image').length}</div>
            <div className="stat-label">Imagens</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <i className="fas fa-video"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{mediaFiles.filter(f => f.type === 'video').length}</div>
            <div className="stat-label">Vídeos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <i className="fas fa-hdd"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{(totalSize / 1024).toFixed(1)}MB</div>
            <div className="stat-label">Espaço Usado</div>
          </div>
        </div>
      </div>

      <div className="media-grid">
        {filteredFiles.map(file => (
          <div key={file.id} className={`media-item ${selectedFiles.includes(file.id) ? 'selected' : ''}`}>
            <div className="media-preview">
              <input
                type="checkbox"
                className="media-checkbox"
                checked={selectedFiles.includes(file.id)}
                onChange={() => toggleFileSelection(file.id)}
              />
              {file.type === 'image' ? (
                <img src={file.url} alt={file.name} loading="lazy" />
              ) : (
                <div className="video-preview">
                  <i className="fas fa-play-circle"></i>
                  <span>VIDEO</span>
                </div>
              )}
            </div>
            <div className="media-info">
              <div className="media-name" title={file.name}>
                {file.name}
              </div>
              <div className="media-details">
                <span className="media-category">{file.category}</span>
                <span className="media-size">{file.size}</span>
              </div>
              <div className="media-meta">
                <span className="media-date">{formatDate(file.uploadedAt)}</span>
                {file.usedIn && (
                  <span className="media-usage">
                    Usado em: {file.usedIn.join(', ')}
                  </span>
                )}
              </div>
              <div className="media-actions">
                <button 
                  className="btn-icon view"
                  onClick={() => window.open(file.url, '_blank')}
                  title="Visualizar"
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button 
                  className="btn-icon edit"
                  onClick={() => navigator.clipboard.writeText(file.url)}
                  title="Copiar URL"
                >
                  <i className="fas fa-copy"></i>
                </button>
                <button 
                  className="btn-icon delete"
                  onClick={() => handleDeleteFile(file.id)}
                  title="Excluir"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <MediaUploadModal
          onUpload={handleFileUpload}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
}

// Media Upload Modal Component
function MediaUploadModal({ onUpload, onClose }) {
  const [formData, setFormData] = React.useState({
    name: '',
    category: 'Categorias',
    url: '',
    type: 'image',
    size: '',
    usedIn: ['']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload({
      ...formData,
      usedIn: formData.usedIn.filter(usage => usage.trim())
    });
  };

  const addUsage = () => {
    setFormData(prev => ({
      ...prev,
      usedIn: [...prev.usedIn, '']
    }));
  };

  const removeUsage = (index) => {
    setFormData(prev => ({
      ...prev,
      usedIn: prev.usedIn.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload de Arquivo</h2>
          <button className="btn-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nome do Arquivo *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder="exemplo.png"
              />
            </div>
            <div className="form-group">
              <label>Categoria *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              >
                <option value="Categorias">Categorias</option>
                <option value="Logos">Logos</option>
                <option value="Promoções">Promoções</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Banners">Banners</option>
                <option value="Videos">Videos</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tipo de Arquivo *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                required
              >
                <option value="image">Imagem</option>
                <option value="video">Vídeo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tamanho do Arquivo</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                placeholder="120KB ou 2.5MB"
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL do Arquivo *</label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              required
              placeholder="/img/categorias/exemplo.png"
            />
          </div>

          <div className="form-group">
            <label>Usado em</label>
            <div className="dynamic-list">
              {formData.usedIn.map((usage, index) => (
                <div key={index} className="dynamic-item">
                  <input
                    type="text"
                    value={usage}
                    onChange={(e) => {
                      const newUsedIn = [...formData.usedIn];
                      newUsedIn[index] = e.target.value;
                      setFormData(prev => ({ ...prev, usedIn: newUsedIn }));
                    }}
                    placeholder="Homepage, Banner, etc."
                  />
                  <button type="button" onClick={() => removeUsage(index)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addUsage}>
                <i className="fas fa-plus"></i> Adicionar Local de Uso
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Fazer Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Analytics Page
function AnalyticsPage() {
  const [analytics, setAnalytics] = React.useState({});
  const [dateRange, setDateRange] = React.useState('30days');
  const [selectedMetric, setSelectedMetric] = React.useState('sales');

  React.useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = () => {
    // Simulate analytics data based on your e-commerce site
    const mockAnalytics = {
      sales: {
        total: 45678.90,
        growth: 12.5,
        orders: 234,
        conversion: 3.2
      },
      traffic: {
        visitors: 8942,
        pageViews: 23567,
        bounceRate: 42.3,
        avgSession: '3:45'
      },
      products: {
        topSelling: [
          { name: 'Camisa Brasil Retrô 1970', sales: 45, revenue: 4045.50 },
          { name: 'Camisa Chronic Skateboard', sales: 32, revenue: 2428.80 },
          { name: 'Camisa Jesus Salva', sales: 28, revenue: 1845.20 },
          { name: 'Boné New Era', sales: 21, revenue: 1260.00 }
        ],
        categories: [
          { name: 'Camisas de Time', sales: 145, percentage: 45.2 },
          { name: 'Chronic', sales: 87, percentage: 27.1 },
          { name: 'Blessed Choice', sales: 56, percentage: 17.4 },
          { name: 'Bonés', sales: 33, percentage: 10.3 }
        ]
      },
      customers: {
        total: 1256,
        new: 89,
        returning: 67,
        avgOrderValue: 195.30
      },
      geography: [
        { state: 'São Paulo', orders: 89, percentage: 38.0 },
        { state: 'Rio de Janeiro', orders: 45, percentage: 19.2 },
        { state: 'Minas Gerais', orders: 32, percentage: 13.7 },
        { state: 'Paraná', orders: 28, percentage: 12.0 },
        { state: 'Outros', orders: 40, percentage: 17.1 }
      ],
      timeline: [
        { date: '01/01', sales: 1200, orders: 8 },
        { date: '02/01', sales: 1450, orders: 12 },
        { date: '03/01', sales: 980, orders: 6 },
        { date: '04/01', sales: 1800, orders: 15 },
        { date: '05/01', sales: 2100, orders: 18 },
        { date: '06/01', sales: 1600, orders: 11 },
        { date: '07/01', sales: 1950, orders: 14 }
      ]
    };
    setAnalytics(mockAnalytics);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getGrowthIcon = (growth) => {
    return growth > 0 ? 'fas fa-arrow-up' : growth < 0 ? 'fas fa-arrow-down' : 'fas fa-minus';
  };

  const getGrowthClass = (growth) => {
    return growth > 0 ? 'positive' : growth < 0 ? 'negative' : 'neutral';
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fas fa-chart-line"></i> Analytics</h1>
          <p className="page-subtitle">Métricas e relatórios detalhados da loja</p>
        </div>
        <div className="header-actions">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="date-range-select"
          >
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="90days">Últimos 90 dias</option>
            <option value="1year">Último ano</option>
          </select>
          <button className="btn btn-primary">
            <i className="fas fa-download"></i> Exportar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon success">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{formatCurrency(analytics.sales?.total || 0)}</div>
            <div className="stat-label">Receita Total</div>
            <div className={`stat-growth ${getGrowthClass(analytics.sales?.growth || 0)}`}>
              <i className={getGrowthIcon(analytics.sales?.growth || 0)}></i>
              {Math.abs(analytics.sales?.growth || 0)}%
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{analytics.sales?.orders || 0}</div>
            <div className="stat-label">Pedidos</div>
            <div className="stat-metric">Taxa conversão: {analytics.sales?.conversion || 0}%</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{formatNumber(analytics.traffic?.visitors || 0)}</div>
            <div className="stat-label">Visitantes</div>
            <div className="stat-metric">Tempo médio: {analytics.traffic?.avgSession || '0:00'}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon primary">
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{analytics.customers?.new || 0}</div>
            <div className="stat-label">Novos Clientes</div>
            <div className="stat-metric">Ticket médio: {formatCurrency(analytics.customers?.avgOrderValue || 0)}</div>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Sales Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-chart-area"></i> Vendas por Período</h3>
            <div className="chart-controls">
              <button className={selectedMetric === 'sales' ? 'active' : ''} onClick={() => setSelectedMetric('sales')}>
                Receita
              </button>
              <button className={selectedMetric === 'orders' ? 'active' : ''} onClick={() => setSelectedMetric('orders')}>
                Pedidos
              </button>
            </div>
          </div>
          <div className="chart-content">
            <div className="simple-chart">
              {analytics.timeline?.map((item, index) => (
                <div key={index} className="chart-bar">
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${(selectedMetric === 'sales' ? item.sales / 25 : item.orders * 5)}%`,
                      backgroundColor: selectedMetric === 'sales' ? 'var(--success)' : 'var(--info)'
                    }}
                  ></div>
                  <div className="bar-label">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-trophy"></i> Produtos Mais Vendidos</h3>
          </div>
          <div className="chart-content">
            <div className="top-products">
              {analytics.products?.topSelling?.map((product, index) => (
                <div key={index} className="product-rank">
                  <div className="rank-number">#{index + 1}</div>
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-stats">
                      {product.sales} vendas • {formatCurrency(product.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-chart-pie"></i> Vendas por Categoria</h3>
          </div>
          <div className="chart-content">
            <div className="category-chart">
              {analytics.products?.categories?.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{category.name}</span>
                    <span className="category-value">{category.sales} vendas</span>
                  </div>
                  <div className="category-bar">
                    <div 
                      className="category-fill" 
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                      }}
                    ></div>
                  </div>
                  <span className="category-percentage">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-map-marker-alt"></i> Vendas por Estado</h3>
          </div>
          <div className="chart-content">
            <div className="geography-chart">
              {analytics.geography?.map((location, index) => (
                <div key={index} className="location-item">
                  <div className="location-info">
                    <span className="location-name">{location.state}</span>
                    <span className="location-orders">{location.orders} pedidos</span>
                  </div>
                  <div className="location-bar">
                    <div 
                      className="location-fill" 
                      style={{ 
                        width: `${location.percentage}%`,
                        backgroundColor: 'var(--primary)'
                      }}
                    ></div>
                  </div>
                  <span className="location-percentage">{location.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Metrics */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-globe"></i> Métricas de Tráfego</h3>
          </div>
          <div className="chart-content">
            <div className="traffic-metrics">
              <div className="metric-item">
                <div className="metric-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <div className="metric-details">
                  <div className="metric-value">{formatNumber(analytics.traffic?.pageViews || 0)}</div>
                  <div className="metric-label">Page Views</div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">
                  <i className="fas fa-bounce"></i>
                </div>
                <div className="metric-details">
                  <div className="metric-value">{analytics.traffic?.bounceRate || 0}%</div>
                  <div className="metric-label">Taxa de Rejeição</div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="metric-details">
                  <div className="metric-value">{analytics.traffic?.avgSession || '0:00'}</div>
                  <div className="metric-label">Sessão Média</div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">
                  <i className="fas fa-user-friends"></i>
                </div>
                <div className="metric-details">
                  <div className="metric-value">{analytics.customers?.returning || 0}</div>
                  <div className="metric-label">Clientes Recorrentes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Users Page
function UsersPage() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [viewMode, setViewMode] = React.useState('table'); // table or cards

  React.useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const savedUsers = localStorage.getItem('dashboard_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with mock customer data
      const mockUsers = [
        {
          id: 1,
          name: 'João Silva',
          email: 'joao@email.com',
          phone: '(11) 99999-9999',
          status: 'active',
          type: 'customer',
          address: {
            street: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zip: '01234-567'
          },
          orders: 5,
          totalSpent: 587.90,
          lastOrder: '2024-01-20T10:30:00Z',
          registeredAt: '2023-08-15T14:20:00Z',
          preferences: ['Camisas de Time', 'Brasil'],
          avatar: '/img/avatars/user1.jpg'
        },
        {
          id: 2,
          name: 'Maria Santos',
          email: 'maria@email.com',
          phone: '(11) 88888-8888',
          status: 'active',
          type: 'customer',
          address: {
            street: 'Av. Paulista, 500',
            city: 'São Paulo',
            state: 'SP',
            zip: '01310-100'
          },
          orders: 12,
          totalSpent: 1245.60,
          lastOrder: '2024-01-19T14:15:00Z',
          registeredAt: '2023-06-10T09:45:00Z',
          preferences: ['Chronic', 'Skateboard'],
          avatar: '/img/avatars/user2.jpg'
        },
        {
          id: 3,
          name: 'Pedro Oliveira',
          email: 'pedro@email.com',
          phone: '(11) 77777-7777',
          status: 'inactive',
          type: 'customer',
          address: {
            street: 'Rua Augusta, 1000',
            city: 'São Paulo',
            state: 'SP',
            zip: '01305-100'
          },
          orders: 2,
          totalSpent: 167.80,
          lastOrder: '2023-12-15T16:45:00Z',
          registeredAt: '2023-11-05T11:30:00Z',
          preferences: ['Blessed Choice', 'Gospel'],
          avatar: '/img/avatars/user3.jpg'
        },
        {
          id: 4,
          name: 'Ana Costa',
          email: 'ana@email.com',
          phone: '(11) 66666-6666',
          status: 'active',
          type: 'vip',
          address: {
            street: 'Rua Oscar Freire, 200',
            city: 'São Paulo',
            state: 'SP',
            zip: '01426-000'
          },
          orders: 25,
          totalSpent: 3456.90,
          lastOrder: '2024-01-18T08:20:00Z',
          registeredAt: '2023-01-20T16:15:00Z',
          preferences: ['Camisas de Time', 'Brasil', 'Argentina', 'Premium'],
          avatar: '/img/avatars/user4.jpg'
        },
        {
          id: 5,
          name: 'Admin User',
          email: 'admin@newhope.com',
          phone: '(11) 55555-5555',
          status: 'active',
          type: 'admin',
          address: {
            street: 'Rua Comercial, 100',
            city: 'São Paulo',
            state: 'SP',
            zip: '01000-000'
          },
          orders: 0,
          totalSpent: 0,
          lastOrder: null,
          registeredAt: '2023-01-01T10:00:00Z',
          preferences: [],
          avatar: '/img/avatars/admin.jpg'
        }
      ];
      setUsers(mockUsers);
      localStorage.setItem('dashboard_users', JSON.stringify(mockUsers));
    }
  };

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('dashboard_users', JSON.stringify(updatedUsers));
  };

  const updateUserStatus = (userId, newStatus) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    saveUsers(updatedUsers);
  };

  const deleteUser = (userId) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      saveUsers(updatedUsers);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getUserTypeIcon = (type) => {
    const typeIcons = {
      customer: 'fas fa-user',
      vip: 'fas fa-crown',
      admin: 'fas fa-user-shield'
    };
    return typeIcons[type] || 'fas fa-user';
  };

  const getUserTypeLabel = (type) => {
    const typeLabels = {
      customer: 'Cliente',
      vip: 'VIP',
      admin: 'Admin'
    };
    return typeLabels[type] || type;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getUserStats = () => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      customers: users.filter(u => u.type === 'customer').length,
      vip: users.filter(u => u.type === 'vip').length,
      totalRevenue: users.reduce((sum, user) => sum + user.totalSpent, 0)
    };
  };

  const stats = getUserStats();

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fas fa-users"></i> Gerenciar Usuários</h1>
          <p className="page-subtitle">Administre clientes e usuários do sistema</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => setViewMode('table')}
            >
              <i className="fas fa-table"></i>
            </button>
            <button 
              className={viewMode === 'cards' ? 'active' : ''}
              onClick={() => setViewMode('cards')}
            >
              <i className="fas fa-th"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="filters-section card">
        <div className="card-content">
          <div className="filters-row">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total de Usuários</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.active}</div>
            <div className="stat-label">Usuários Ativos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <i className="fas fa-crown"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.vip}</div>
            <div className="stat-label">Clientes VIP</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{formatCurrency(stats.totalRevenue)}</div>
            <div className="stat-label">Receita Total</div>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="card">
          <div className="card-content">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Tipo</th>
                    <th>Contato</th>
                    <th>Pedidos</th>
                    <th>Total Gasto</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <img 
                            src={user.avatar || '/img/avatars/default.jpg'} 
                            alt={user.name} 
                            className="user-avatar"
                          />
                          <div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`user-type ${user.type}`}>
                          <i className={getUserTypeIcon(user.type)}></i>
                          {getUserTypeLabel(user.type)}
                        </span>
                      </td>
                      <td>
                        <div className="user-contact">
                          <div>{user.phone}</div>
                          <div className="user-city">{user.address.city}, {user.address.state}</div>
                        </div>
                      </td>
                      <td className="text-center">{user.orders}</td>
                      <td className="price">{formatCurrency(user.totalSpent)}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button 
                            className="btn-icon view"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal(true);
                            }}
                            title="Ver detalhes"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          {user.type !== 'admin' && (
                            <>
                              <select
                                value={user.status}
                                onChange={(e) => updateUserStatus(user.id, e.target.value)}
                                className="status-select"
                              >
                                <option value="active">Ativo</option>
                                <option value="inactive">Inativo</option>
                              </select>
                              <button 
                                className="btn-icon delete"
                                onClick={() => deleteUser(user.id)}
                                title="Excluir"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-card-header">
                <img 
                  src={user.avatar || '/img/avatars/default.jpg'} 
                  alt={user.name} 
                  className="user-avatar-large"
                />
                <span className={`user-type-badge ${user.type}`}>
                  <i className={getUserTypeIcon(user.type)}></i>
                  {getUserTypeLabel(user.type)}
                </span>
              </div>
              <div className="user-card-content">
                <h3 className="user-card-name">{user.name}</h3>
                <p className="user-card-email">{user.email}</p>
                <p className="user-card-phone">{user.phone}</p>
                
                <div className="user-card-stats">
                  <div className="stat">
                    <span className="stat-value">{user.orders}</span>
                    <span className="stat-label">Pedidos</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{formatCurrency(user.totalSpent)}</span>
                    <span className="stat-label">Total Gasto</span>
                  </div>
                </div>
                
                <div className="user-card-footer">
                  <span className={`status-badge ${user.status}`}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                  <div className="user-card-actions">
                    <button 
                      className="btn-icon view"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

// User Details Modal Component
function UserDetailsModal({ user, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalhes do Usuário</h2>
          <button className="btn-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="user-details">
          <div className="user-profile">
            <img 
              src={user.avatar || '/img/avatars/default.jpg'} 
              alt={user.name} 
              className="user-avatar-xl"
            />
            <div className="user-profile-info">
              <h2>{user.name}</h2>
              <span className={`user-type-badge ${user.type}`}>
                <i className={user.type === 'admin' ? 'fas fa-user-shield' : user.type === 'vip' ? 'fas fa-crown' : 'fas fa-user'}></i>
                {user.type === 'admin' ? 'Administrador' : user.type === 'vip' ? 'Cliente VIP' : 'Cliente'}
              </span>
              <span className={`status-badge ${user.status}`}>
                {user.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-section">
              <h3><i className="fas fa-envelope"></i> Contato</h3>
              <div className="detail-item">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="detail-item">
                <strong>Telefone:</strong> {user.phone}
              </div>
            </div>

            <div className="detail-section">
              <h3><i className="fas fa-calendar"></i> Datas</h3>
              <div className="detail-item">
                <strong>Registrado em:</strong> {formatDate(user.registeredAt)}
              </div>
              <div className="detail-item">
                <strong>Último pedido:</strong> {formatDate(user.lastOrder)}
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><i className="fas fa-map-marker-alt"></i> Endereço</h3>
            <div className="address-info">
              <p>{user.address.street}</p>
              <p>{user.address.city}, {user.address.state}</p>
              <p>CEP: {user.address.zip}</p>
            </div>
          </div>

          <div className="detail-section">
            <h3><i className="fas fa-chart-line"></i> Estatísticas</h3>
            <div className="user-stats-grid">
              <div className="user-stat">
                <div className="stat-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">{user.orders}</div>
                  <div className="stat-label">Pedidos Realizados</div>
                </div>
              </div>
              <div className="user-stat">
                <div className="stat-icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">{formatCurrency(user.totalSpent)}</div>
                  <div className="stat-label">Total Gasto</div>
                </div>
              </div>
            </div>
          </div>

          {user.preferences && user.preferences.length > 0 && (
            <div className="detail-section">
              <h3><i className="fas fa-heart"></i> Preferências</h3>
              <div className="preferences-tags">
                {user.preferences.map((pref, index) => (
                  <span key={index} className="preference-tag">{pref}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// Settings Page
function SettingsPage() {
  const [settings, setSettings] = React.useState({});
  const [activeTab, setActiveTab] = React.useState('general');
  const [showSaveNotification, setShowSaveNotification] = React.useState(false);

  React.useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('dashboard_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      // Initialize with default settings based on your site
      const defaultSettings = {
        general: {
          siteName: 'NewHope',
          siteDescription: 'Loja de camisas de time, moda urbana e lifestyle',
          contactEmail: 'contato@newhope.com',
          phoneNumber: '(11) 99999-9999',
          address: 'São Paulo, SP',
          currency: 'BRL',
          timezone: 'America/Sao_Paulo',
          language: 'pt-BR'
        },
        ecommerce: {
          enableInventoryTracking: true,
          lowStockAlert: 10,
          autoApproveOrders: false,
          enableGuestCheckout: true,
          showPricesWithTax: true,
          defaultShippingMethod: 'standard',
          enableReviews: true,
          enableWishlist: true,
          maxCartItems: 50
        },
        appearance: {
          primaryColor: '#000000',
          secondaryColor: '#ffffff',
          accentColor: '#3b82f6',
          logoUrl: '/img/Logos/logo.png',
          favicon: '/img/Logos/favicon.ico',
          showBrandWatermark: true,
          enableDarkMode: false,
          customCSS: ''
        },
        notifications: {
          emailNotifications: true,
          orderNotifications: true,
          lowStockNotifications: true,
          customerSignupNotifications: true,
          promotionalEmails: false,
          smsNotifications: false,
          pushNotifications: true
        },
        banners: [
          {
            id: 1,
            title: 'Banner Principal',
            description: 'Banner de destaque na homepage',
            imageUrl: '/video/banners/banner1.mp4',
            linkUrl: '/categorias/camisas-de-time',
            isActive: true,
            position: 'hero'
          },
          {
            id: 2,
            title: 'Promoção Brasil Retrô',
            description: 'Banner promocional camisas retrô',
            imageUrl: '/img/Promoções/Brasil Retro.png',
            linkUrl: '/produtos/brasil-retro',
            isActive: true,
            position: 'secondary'
          }
        ],
        clubs: [
          { id: 1, name: 'Brasil', category: 'Seleções', isActive: true },
          { id: 2, name: 'Argentina', category: 'Seleções', isActive: true },
          { id: 3, name: 'Corinthians', category: 'Times Brasileiros', isActive: true },
          { id: 4, name: 'Palmeiras', category: 'Times Brasileiros', isActive: true },
          { id: 5, name: 'Chronic', category: 'Marcas', isActive: true },
          { id: 6, name: 'Blessed Choice', category: 'Marcas', isActive: true }
        ]
      };
      setSettings(defaultSettings);
      localStorage.setItem('dashboard_settings', JSON.stringify(defaultSettings));
    }
  };

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('dashboard_settings', JSON.stringify(newSettings));
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const updateSetting = (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    saveSettings(newSettings);
  };

  const updateBanner = (bannerId, updates) => {
    const newBanners = settings.banners.map(banner =>
      banner.id === bannerId ? { ...banner, ...updates } : banner
    );
    saveSettings({
      ...settings,
      banners: newBanners
    });
  };

  // Função para aplicar temas
  const applyTheme = (themeId) => {
    const root = document.documentElement;
    
    // Remove classes de tema anteriores
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-black');
    
    // Aplica o novo tema
    document.body.classList.add(`theme-${themeId}`);
    
    console.log('🎨 Aplicando tema via Settings:', themeId);
    
    switch(themeId) {
      case 'dark':
        // Tema escuro (azul-cinza) - Ajustado para melhor visibilidade
        root.style.setProperty('--bg', '#0f172a');
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)');
        root.style.setProperty('--surface', '#1e293b');
        root.style.setProperty('--panel', 'linear-gradient(135deg, #334155 0%, #1e293b 100%)');
        root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #334155 0%, #1e293b 100%)');
        root.style.setProperty('--text', '#f8fafc');
        root.style.setProperty('--text-muted', '#cbd5e1');
        root.style.setProperty('--text-light', '#e2e8f0');
        root.style.setProperty('--border', '#475569');
        root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--primary', '#f8fafc');
        root.style.setProperty('--focus', '#60a5fa');
        root.style.setProperty('--success', '#34d399');
        root.style.setProperty('--success-light', 'rgba(52, 211, 153, 0.1)');
        root.style.setProperty('--warning', '#fbbf24');
        root.style.setProperty('--warning-light', 'rgba(251, 191, 36, 0.1)');
        root.style.setProperty('--error', '#f87171');
        root.style.setProperty('--error-light', 'rgba(248, 113, 113, 0.1)');
        root.style.setProperty('--info', '#60a5fa');
        root.style.setProperty('--info-light', 'rgba(96, 165, 250, 0.1)');
        break;
        
      case 'black':
        // Tema preto (preto real) - Ajustado para máximo contraste
        root.style.setProperty('--bg', '#000000');
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)');
        root.style.setProperty('--surface', '#1a1a1a');
        root.style.setProperty('--panel', 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)');
        root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)');
        root.style.setProperty('--text', '#ffffff');
        root.style.setProperty('--text-muted', '#d1d5db');
        root.style.setProperty('--text-light', '#e5e7eb');
        root.style.setProperty('--border', '#404040');
        root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--primary', '#ffffff');
        root.style.setProperty('--focus', '#9ca3af');
        root.style.setProperty('--success', '#10b981');
        root.style.setProperty('--success-light', 'rgba(16, 185, 129, 0.1)');
        root.style.setProperty('--warning', '#f59e0b');
        root.style.setProperty('--warning-light', 'rgba(245, 158, 11, 0.1)');
        root.style.setProperty('--error', '#ef4444');
        root.style.setProperty('--error-light', 'rgba(239, 68, 68, 0.1)');
        root.style.setProperty('--info', '#3b82f6');
        root.style.setProperty('--info-light', 'rgba(59, 130, 246, 0.1)');
        break;
        
      default: // light
        // Tema claro (padrão)
        root.style.setProperty('--bg', '#ffffff');
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)');
        root.style.setProperty('--surface', '#ffffff');
        root.style.setProperty('--panel', 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)');
        root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)');
        root.style.setProperty('--text', '#1e293b');
        root.style.setProperty('--text-muted', '#64748b');
        root.style.setProperty('--text-light', '#94a3b8');
        root.style.setProperty('--border', '#e2e8f0');
        root.style.setProperty('--glass', 'rgba(0, 0, 0, 0.05)');
        root.style.setProperty('--primary', '#1e293b');
        root.style.setProperty('--focus', '#3b82f6');
        root.style.setProperty('--success', '#10b981');
        root.style.setProperty('--warning', '#f59e0b');
        root.style.setProperty('--error', '#ef4444');
        root.style.setProperty('--info', '#3b82f6');
        break;
    }
    
    // Salvar tema no localStorage
    localStorage.setItem('dashboardTheme', themeId);
    console.log('💾 Tema salvo no localStorage:', themeId);
  };

  const toggleCompactMode = (isCompact) => {
    document.body.classList.toggle('compact-mode', isCompact);
  };

  const showToast = (message, type = 'info') => {
    // Implementação simples de toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="toast-icon fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span class="toast-message">${message}</span>
    `;
    
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // Aplicar tema na inicialização
  React.useEffect(() => {
    // Carregar tema do localStorage na inicialização
    const savedTheme = localStorage.getItem('dashboardTheme') || 'light';
    console.log('Carregando tema:', savedTheme);
    applyTheme(savedTheme);
    
    if (settings.appearance?.compactMode) {
      toggleCompactMode(true);
    }
  }, []);

  const addBanner = () => {
    const newBanner = {
      id: Date.now(),
      title: 'Novo Banner',
      description: '',
      imageUrl: '',
      linkUrl: '',
      isActive: false,
      position: 'secondary'
    };
    saveSettings({
      ...settings,
      banners: [...settings.banners, newBanner]
    });
  };

  const deleteBanner = (bannerId) => {
    if (confirm('Tem certeza que deseja excluir este banner?')) {
      const newBanners = settings.banners.filter(banner => banner.id !== bannerId);
      saveSettings({
        ...settings,
        banners: newBanners
      });
    }
  };

  const updateClub = (clubId, updates) => {
    const newClubs = settings.clubs.map(club =>
      club.id === clubId ? { ...club, ...updates } : club
    );
    saveSettings({
      ...settings,
      clubs: newClubs
    });
  };

  const addClub = () => {
    const newClub = {
      id: Date.now(),
      name: 'Novo Clube',
      category: 'Times Brasileiros',
      isActive: true
    };
    saveSettings({
      ...settings,
      clubs: [...settings.clubs, newClub]
    });
  };

  const deleteClub = (clubId) => {
    if (confirm('Tem certeza que deseja excluir este clube?')) {
      const newClubs = settings.clubs.filter(club => club.id !== clubId);
      saveSettings({
        ...settings,
        clubs: newClubs
      });
    }
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: 'fas fa-cog' },
    { id: 'ecommerce', label: 'E-commerce', icon: 'fas fa-shopping-cart' },
    { id: 'appearance', label: 'Aparência', icon: 'fas fa-palette' },
    { id: 'banners', label: 'Banners', icon: 'fas fa-images' },
    { id: 'clubs', label: 'Clubes', icon: 'fas fa-futbol' },
    { id: 'notifications', label: 'Notificações', icon: 'fas fa-bell' }
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fas fa-cog"></i> Configurações</h1>
          <p className="page-subtitle">Gerencie as configurações gerais do sistema</p>
        </div>
        {showSaveNotification && (
          <div className="save-notification">
            <i className="fas fa-check"></i> Configurações salvas com sucesso!
          </div>
        )}
      </div>

      <div className="settings-container">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>Configurações Gerais</h2>
              <div className="settings-grid">
                <div className="form-group">
                  <label>Nome do Site</label>
                  <input
                    type="text"
                    value={settings.general?.siteName || ''}
                    onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email de Contato</label>
                  <input
                    type="email"
                    value={settings.general?.contactEmail || ''}
                    onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input
                    type="text"
                    value={settings.general?.phoneNumber || ''}
                    onChange={(e) => updateSetting('general', 'phoneNumber', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Endereço</label>
                  <input
                    type="text"
                    value={settings.general?.address || ''}
                    onChange={(e) => updateSetting('general', 'address', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Moeda</label>
                  <select
                    value={settings.general?.currency || 'BRL'}
                    onChange={(e) => updateSetting('general', 'currency', e.target.value)}
                  >
                    <option value="BRL">Real Brasileiro (R$)</option>
                    <option value="USD">Dólar Americano ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Idioma</label>
                  <select
                    value={settings.general?.language || 'pt-BR'}
                    onChange={(e) => updateSetting('general', 'language', e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>
              <div className="form-group full-width">
                <label>Descrição do Site</label>
                <textarea
                  value={settings.general?.siteDescription || ''}
                  onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                  rows="3"
                />
              </div>
            </div>
          )}

          {activeTab === 'ecommerce' && (
            <div className="settings-section">
              <h2>Configurações de E-commerce</h2>
              <div className="settings-grid">
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.ecommerce?.enableInventoryTracking || false}
                      onChange={(e) => updateSetting('ecommerce', 'enableInventoryTracking', e.target.checked)}
                    />
                    Ativar controle de estoque
                  </label>
                </div>
                <div className="form-group">
                  <label>Alerta de estoque baixo</label>
                  <input
                    type="number"
                    value={settings.ecommerce?.lowStockAlert || 10}
                    onChange={(e) => updateSetting('ecommerce', 'lowStockAlert', parseInt(e.target.value))}
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.ecommerce?.autoApproveOrders || false}
                      onChange={(e) => updateSetting('ecommerce', 'autoApproveOrders', e.target.checked)}
                    />
                    Aprovar pedidos automaticamente
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.ecommerce?.enableGuestCheckout || true}
                      onChange={(e) => updateSetting('ecommerce', 'enableGuestCheckout', e.target.checked)}
                    />
                    Permitir checkout sem cadastro
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.ecommerce?.enableReviews || true}
                      onChange={(e) => updateSetting('ecommerce', 'enableReviews', e.target.checked)}
                    />
                    Ativar avaliações de produtos
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.ecommerce?.enableWishlist || true}
                      onChange={(e) => updateSetting('ecommerce', 'enableWishlist', e.target.checked)}
                    />
                    Ativar lista de desejos
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Configurações de Aparência</h2>
              
              {/* Seletor de Tema */}
              <div className="form-group full-width">
                <label>Tema do Dashboard</label>
                <div className="theme-selector">
                  {[
                    { 
                      id: 'light', 
                      name: 'Modo Claro', 
                      description: 'Tema claro com fundo branco e textos escuros',
                      preview: '#ffffff',
                      icon: 'fas fa-sun'
                    },
                    { 
                      id: 'dark', 
                      name: 'Modo Escuro', 
                      description: 'Tema escuro com tons de azul-cinza',
                      preview: '#1e293b',
                      icon: 'fas fa-moon'
                    },
                    { 
                      id: 'black', 
                      name: 'Modo Dark', 
                      description: 'Tema completamente preto para máximo contraste',
                      preview: '#000000',
                      icon: 'fas fa-circle'
                    }
                  ].map(theme => (
                    <div 
                      key={theme.id}
                      className={`theme-option ${(settings.appearance?.theme || localStorage.getItem('dashboardTheme') || 'light') === theme.id ? 'active' : ''}`}
                      onClick={() => {
                        console.log('Clicando no tema:', theme.id);
                        updateSetting('appearance', 'theme', theme.id);
                        applyTheme(theme.id);
                        showToast(`Tema ${theme.name} aplicado!`, 'success');
                      }}
                    >
                      <div className="theme-preview-container">
                        <div 
                          className="theme-preview" 
                          style={{ background: theme.preview }}
                        ></div>
                        <i className={`theme-icon ${theme.icon}`}></i>
                      </div>
                      <div className="theme-info">
                        <h4>{theme.name}</h4>
                        <p>{theme.description}</p>
                      </div>
                      {(settings.appearance?.theme || 'light') === theme.id && (
                        <i className="fas fa-check theme-check"></i>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Outras configurações */}
              <div className="settings-grid">
                <div className="form-group">
                  <ImageInputWithGallery 
                    label="URL do Logo"
                    value={settings.appearance?.logoUrl || ''}
                    onChange={(value) => updateSetting('appearance', 'logoUrl', value)}
                    placeholder="/img/Logos/logo.png"
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.appearance?.showBrandWatermark || true}
                      onChange={(e) => updateSetting('appearance', 'showBrandWatermark', e.target.checked)}
                    />
                    Mostrar marca d'água
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.appearance?.compactMode || false}
                      onChange={(e) => {
                        updateSetting('appearance', 'compactMode', e.target.checked);
                        toggleCompactMode(e.target.checked);
                      }}
                    />
                    Modo compacto
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    updateSetting('appearance', 'theme', 'light');
                    applyTheme('light');
                    showToast('Tema restaurado para o padrão!', 'success');
                  }}
                >
                  <i className="fas fa-undo"></i> Restaurar Padrão
                </button>
              </div>
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Gerenciar Banners</h2>
                <button className="btn btn-primary" onClick={addBanner}>
                  <i className="fas fa-plus"></i> Adicionar Banner
                </button>
              </div>
              <div className="banners-list">
                {settings.banners?.map(banner => (
                  <div key={banner.id} className="banner-item">
                    <div className="banner-preview">
                      {banner.imageUrl && (
                        banner.imageUrl.endsWith('.mp4') ? (
                          <video src={banner.imageUrl} width="100" height="60" />
                        ) : (
                          <img src={banner.imageUrl} alt={banner.title} width="100" height="60" />
                        )
                      )}
                    </div>
                    <div className="banner-details">
                      <div className="form-group">
                        <label>Título</label>
                        <input
                          type="text"
                          value={banner.title}
                          onChange={(e) => updateBanner(banner.id, { title: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <ImageInputWithGallery 
                          label="URL da Imagem/Vídeo"
                          value={banner.imageUrl}
                          onChange={(value) => updateBanner(banner.id, { imageUrl: value })}
                          placeholder="Selecione da galeria ou cole URL"
                        />
                      </div>
                      <div className="form-group">
                        <label>Link de Destino</label>
                        <input
                          type="text"
                          value={banner.linkUrl}
                          onChange={(e) => updateBanner(banner.id, { linkUrl: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Posição</label>
                        <select
                          value={banner.position}
                          onChange={(e) => updateBanner(banner.id, { position: e.target.value })}
                        >
                          <option value="hero">Principal (Hero)</option>
                          <option value="secondary">Secundário</option>
                          <option value="sidebar">Barra lateral</option>
                        </select>
                      </div>
                      <div className="banner-controls">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={banner.isActive}
                            onChange={(e) => updateBanner(banner.id, { isActive: e.target.checked })}
                          />
                          Ativo
                        </label>
                        <button 
                          className="btn-icon delete"
                          onClick={() => deleteBanner(banner.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clubs' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Gerenciar Clubes e Times</h2>
                <button className="btn btn-primary" onClick={addClub}>
                  <i className="fas fa-plus"></i> Adicionar Clube
                </button>
              </div>
              <div className="clubs-list">
                {settings.clubs?.map(club => (
                  <div key={club.id} className="club-item">
                    <div className="form-group">
                      <label>Nome do Clube</label>
                      <input
                        type="text"
                        value={club.name}
                        onChange={(e) => updateClub(club.id, { name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Categoria</label>
                      <select
                        value={club.category}
                        onChange={(e) => updateClub(club.id, { category: e.target.value })}
                      >
                        <option value="Seleções">Seleções</option>
                        <option value="Times Brasileiros">Times Brasileiros</option>
                        <option value="Times Internacionais">Times Internacionais</option>
                        <option value="Marcas">Marcas</option>
                      </select>
                    </div>
                    <div className="club-controls">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={club.isActive}
                          onChange={(e) => updateClub(club.id, { isActive: e.target.checked })}
                        />
                        Ativo
                      </label>
                      <button 
                        className="btn-icon delete"
                        onClick={() => deleteClub(club.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Configurações de Notificações</h2>
              <div className="notifications-grid">
                <div className="notification-group">
                  <h3>Email</h3>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.notifications?.emailNotifications || true}
                        onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                      />
                      Notificações por email
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.notifications?.orderNotifications || true}
                        onChange={(e) => updateSetting('notifications', 'orderNotifications', e.target.checked)}
                      />
                      Notificar novos pedidos
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.notifications?.lowStockNotifications || true}
                        onChange={(e) => updateSetting('notifications', 'lowStockNotifications', e.target.checked)}
                      />
                      Alertas de estoque baixo
                    </label>
                  </div>
                </div>
                
                <div className="notification-group">
                  <h3>Outros</h3>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.notifications?.smsNotifications || false}
                        onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
                      />
                      Notificações SMS
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.notifications?.pushNotifications || true}
                        onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                      />
                      Notificações push
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.notifications?.promotionalEmails || false}
                        onChange={(e) => updateSetting('notifications', 'promotionalEmails', e.target.checked)}
                      />
                      Emails promocionais
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Dashboard App
function DashboardApp() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Carregar tema automaticamente na inicialização
  useEffect(() => {
    const loadSavedTheme = () => {
      const savedTheme = localStorage.getItem('dashboardTheme');
      console.log('🎨 Carregando tema salvo:', savedTheme);
      
      if (savedTheme) {
        applyThemeDirectly(savedTheme);
      } else {
        // Se não há tema salvo, usa o tema claro por padrão
        applyThemeDirectly('light');
      }
    };

    loadSavedTheme();
  }, []);

  // Função para aplicar tema diretamente (sem depender de state)
  const applyThemeDirectly = (themeId) => {
    const root = document.documentElement;
    
    // Remove classes de tema anteriores
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-black');
    
    // Aplica o novo tema
    document.body.classList.add(`theme-${themeId}`);
    
    console.log('🎨 Aplicando tema:', themeId);
    
    switch(themeId) {
      case 'dark':
        // Tema escuro (azul-cinza) - Ajustado para melhor visibilidade
        root.style.setProperty('--bg', '#0f172a');
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)');
        root.style.setProperty('--surface', '#1e293b');
        root.style.setProperty('--panel', 'linear-gradient(135deg, #334155 0%, #1e293b 100%)');
        root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #334155 0%, #1e293b 100%)');
        root.style.setProperty('--text', '#f8fafc');
        root.style.setProperty('--text-muted', '#cbd5e1');
        root.style.setProperty('--text-light', '#e2e8f0');
        root.style.setProperty('--border', '#475569');
        root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--primary', '#f8fafc');
        root.style.setProperty('--focus', '#60a5fa');
        root.style.setProperty('--success', '#34d399');
        root.style.setProperty('--success-light', 'rgba(52, 211, 153, 0.1)');
        root.style.setProperty('--warning', '#fbbf24');
        root.style.setProperty('--warning-light', 'rgba(251, 191, 36, 0.1)');
        root.style.setProperty('--error', '#f87171');
        root.style.setProperty('--error-light', 'rgba(248, 113, 113, 0.1)');
        root.style.setProperty('--info', '#60a5fa');
        root.style.setProperty('--info-light', 'rgba(96, 165, 250, 0.1)');
        break;
        
      case 'black':
        // Tema preto (preto real) - Ajustado para máximo contraste
        root.style.setProperty('--bg', '#000000');
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)');
        root.style.setProperty('--surface', '#1a1a1a');
        root.style.setProperty('--panel', 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)');
        root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)');
        root.style.setProperty('--text', '#ffffff');
        root.style.setProperty('--text-muted', '#d1d5db');
        root.style.setProperty('--text-light', '#e5e7eb');
        root.style.setProperty('--border', '#404040');
        root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--primary', '#ffffff');
        root.style.setProperty('--focus', '#9ca3af');
        root.style.setProperty('--success', '#10b981');
        root.style.setProperty('--success-light', 'rgba(16, 185, 129, 0.1)');
        root.style.setProperty('--warning', '#f59e0b');
        root.style.setProperty('--warning-light', 'rgba(245, 158, 11, 0.1)');
        root.style.setProperty('--error', '#ef4444');
        root.style.setProperty('--error-light', 'rgba(239, 68, 68, 0.1)');
        root.style.setProperty('--info', '#3b82f6');
        root.style.setProperty('--info-light', 'rgba(59, 130, 246, 0.1)');
        break;
        root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--primary', '#ffffff');
        root.style.setProperty('--focus', '#666666');
        root.style.setProperty('--success', '#22c55e');
        root.style.setProperty('--warning', '#f59e0b');
        root.style.setProperty('--error', '#ef4444');
        root.style.setProperty('--info', '#3b82f6');
        break;
        
      default: // light
        // Tema claro (padrão)
        root.style.setProperty('--bg', '#ffffff');
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)');
        root.style.setProperty('--surface', '#ffffff');
        root.style.setProperty('--panel', 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)');
        root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)');
        root.style.setProperty('--text', '#1e293b');
        root.style.setProperty('--text-muted', '#64748b');
        root.style.setProperty('--text-light', '#94a3b8');
        root.style.setProperty('--border', '#e2e8f0');
        root.style.setProperty('--glass', 'rgba(0, 0, 0, 0.05)');
        root.style.setProperty('--primary', '#1e293b');
        root.style.setProperty('--focus', '#3b82f6');
        root.style.setProperty('--success', '#10b981');
        root.style.setProperty('--warning', '#f59e0b');
        root.style.setProperty('--error', '#ef4444');
        root.style.setProperty('--info', '#3b82f6');
        break;
    }
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const contextValue = {
    currentPage,
    setCurrentPage,
    addToast
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview': return <OverviewPage />;
      case 'camisas': return <CamisasPage />;
      case 'products': return <ProductsPage />;
      case 'orders': return <OrdersPage />;
      case 'media': return <MediaPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'users': return <UsersPage />;
      case 'settings': return <SettingsPage />;
      default: return <OverviewPage />;
    }
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="dashboard-layout">
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="main-content">
          <Header 
            onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            isCollapsed={sidebarCollapsed}
          />
          {renderCurrentPage()}
        </main>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </DashboardContext.Provider>
  );
}

// Render App
ReactDOM.render(<DashboardApp />, document.getElementById('root'));
