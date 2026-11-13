const navigation = [
  { id: "home", label: "Início" },
  { id: "catalog", label: "Móveis" },
  { id: "editor", label: "Ambiente 3D" },
  { id: "ar", label: "Realidade Aumentada" },
  { id: "saved", label: "Meus projetos" },
];

function Header({ page, onNavigate }) {
  return (
   
    <header className="topbar">

      <button
        className="brand"
        onClick={() => onNavigate("home")}
      >
        <span className="brand-mark">VD</span>

        <span>virtual<span className="brand-highlight">Decor</span></span>
      </button>

      <nav className="navigation">
       
        {navigation.map((item) => (
          <button
           
            key={item.id}

            className={`nav-link ${
              page === item.id ? "active" : ""
            }`}

      
            onClick={() => onNavigate(item.id)}
          >
          
            {item.label}
          </button>
        ))}
      </nav>

      <button
        className="button button-primary header-button"
        onClick={() => onNavigate("editor")}
      >
        Começar a decorar
      </button>
    </header>
  );
}

export default Header;