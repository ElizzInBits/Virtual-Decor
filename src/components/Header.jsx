const navigation = [
  { id: "home", label: "Início" },
  { id: "catalog", label: "Itens" },
  { id: "editor", label: "Ambiente 3D" },
  { id: "ar", label: "Testar no Ambiente" },
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
    </header>
  );
}

export default Header;