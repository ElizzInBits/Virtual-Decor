
function Home({ onNavigate }) {
  return (
    <main className="home-page">

      <section className="hero container">
        <div className="hero-content">

          <span className="eyebrow">
            DESIGN DE INTERIORES INTERATIVO
          </span>

          <h1>
            Suas ideias,
            <span> suas possibilidades.</span>
          </h1>

          <p>
            Experimente móveis e itens de decoração, e
            descubra como seu ambiente pode ficar antes mesmo
            de comprar qualquer produto.
          </p>
        </div>

        <div className="hero-visual">
          <div className="room-preview">
            <div className="room-window" />
            <div className="room-picture">✦</div>
            <div className="room-plant">🌿</div>

            <div className="sofa">
              <div className="sofa-back" />
              <div className="sofa-seat" />
              <div className="sofa-arm left" />
              <div className="sofa-arm right" />
            </div>

            <div className="coffee-table" />
            <div className="room-rug" />
          </div>
        </div>
      </section>

      <section className="features-section container">
        <div className="section-heading">
          <span className="eyebrow">EXPLORE</span>
          <h2>Decore de diferentes maneiras</h2>
          <p>
            Escolha como deseja experimentar seus ambientes.
          </p>
        </div>

        <div className="feature-grid">

          <article className="feature-card">
            <div className="feature-icon">🛋️</div>
            <h3>Catálogo de itens</h3>
            <p>
              Explore diferentes móveis e opções de decoração.
            </p>
            <button
              className="text-button"
              onClick={() => onNavigate("catalog")}
            >
              Ver catálogo 
            </button>
          </article>

          <article className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>Ambiente virtual 3D</h3>
            <p>
              Monte sua sala virtual e personalize os móveis.
            </p>
            <button
              className="text-button"
              onClick={() => onNavigate("editor")}
            >
              Criar ambiente 
            </button>
          </article>

          <article className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Realidade aumentada</h3>
            <p>
              Visualize os móveis dentro do suw próprio ambiente.
            </p>
            <button
              className="text-button"
              onClick={() => onNavigate("ar")}
            >
              Experimentar  
            </button>
          </article>

          <article className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Panorama 360°</h3>
            <p>
              Salve e revisite seus projetos em uma experiência
              panorâmica imersiva.
            </p>
            <button
              className="text-button"
              onClick={() => onNavigate("saved")}
            >
              Meus projetos 
            </button>
          </article>

        </div>
      </section>

      <footer className="footer">
        <p>VirtualDecor · Transforme suas ideias de forma virtual.</p>
      </footer>

    </main>
  );
}

export default Home;
