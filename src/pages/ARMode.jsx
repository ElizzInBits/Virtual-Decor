
import { useEffect, useRef, useState } from "react";

import furniture from "../data/furniture";

import "./ARMode.css";

function ARMode({ onNavigate }) {
  const viewerRef = useRef(null);

  const [selectedId, setSelectedId] = useState(
    furniture[0]?.id ?? null
  );

  const [arMessage, setArMessage] = useState("");

  const [viewerLoaded, setViewerLoaded] = useState(false);

  const selectedFurniture = furniture.find(
    (item) => item.id === selectedId
  );

  // Observa o carregamento e os eventos da experiência AR.
  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer) return;

    const handleLoad = () => {
      setViewerLoaded(true);
      setArMessage("Modelo carregado e pronto para visualização.");
    };

    const handleError = () => {
      setViewerLoaded(false);
      setArMessage(
        "Não foi possível carregar o modelo. Confira o arquivo GLB."
      );
    };

    const handleARStatus = (event) => {
      const status = event.detail?.status;

      if (status === "session-started") {
        setArMessage("AR iniciada. Procure uma superfície para posicionar o móvel.");
      }

      if (status === "object-placed") {
        setArMessage("Móvel posicionado no ambiente!");
      }

      if (status === "failed") {
        setArMessage(
          "Não foi possível iniciar a AR. Verifique a compatibilidade do dispositivo."
        );
      }

      if (status === "not-presenting") {
        setArMessage("Visualização AR encerrada.");
      }
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);
    viewer.addEventListener("ar-status", handleARStatus);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
      viewer.removeEventListener("ar-status", handleARStatus);
    };
  }, [selectedFurniture?.model]);

  // Esta chamada precisa acontecer diretamente no clique do usuário.
  function testInMyEnvironment() {
    const viewer = viewerRef.current;

    if (!viewer || !viewerLoaded) {
      setArMessage("Aguarde o carregamento do móvel.");
      return;
    }

    if (!viewer.canActivateAR) {
      setArMessage(
        "Este dispositivo ou navegador não disponibiliza AR compatível. Experimente abrir o sistema em um celular compatível."
      );
      return;
    }

    setArMessage("Preparando a experiência de realidade aumentada...");

    try {
      const result = viewer.activateAR();

      if (result && typeof result.catch === "function") {
        result.catch(() => {
          setArMessage(
            "Não foi possível abrir a câmera. Confira as permissões e a compatibilidade."
          );
        });
      }
    } catch (error) {
      console.error("Erro ao iniciar AR:", error);

      setArMessage(
        "Ocorreu um erro ao iniciar a experiência AR."
      );
    }
  }

  return (
    <main className="ar-page container">

      <header className="page-heading ar-heading">
        <span className="eyebrow">
          REALIDADE AUMENTADA
        </span>

        <h1>Experimente antes de comprar</h1>

        <p>
          Escolha um móvel, visualize em 3D e experimente
          como ele ficaria dentro da sua casa.
        </p>
      </header>

      <div className="ar-layout">

        {/* VISUALIZADOR 3D E AR */}

        <section className="ar-viewer-card">

          <div className="ar-viewer-header">
            <div>
              <strong>
                {selectedFurniture?.name}
              </strong>

              <span>
                Visualização tridimensional do produto
              </span>
            </div>

            <span className="ar-mode-label">
              3D + AR
            </span>
          </div>

          {selectedFurniture && (
            <model-viewer
              key={selectedFurniture.id}
              ref={viewerRef}
              className="ar-model-viewer"
              src={selectedFurniture.model}
              alt={selectedFurniture.name}
              ar=""
              ar-modes="webxr scene-viewer quick-look"
              ar-placement="floor"
              ar-scale="auto"
              camera-controls=""
              auto-rotate=""
              shadow-intensity="1.2"
              exposure="1"
              environment-image="neutral"
              interaction-prompt="auto"
              loading="eager"
            />
          )}

          <div className="ar-viewer-footer">
            <span>↔ Arraste para girar</span>
            <span>Scroll para aproximar</span>
          </div>

          {/* NOVA OPÇÃO DE AR */}

          <div className="ar-test-area">

            <div className="ar-test-description">
              <span className="ar-camera-icon">⌖</span>

              <div>
                <strong>Gostou do modelo?</strong>

                <p>
                  Veja como ele ficaria na sua própria casa.
                </p>
              </div>
            </div>

            <button
              className="ar-launch-button"
              onClick={testInMyEnvironment}
              disabled={!viewerLoaded}
            >
              <span>⌖</span>
              Testar no meu ambiente
            </button>

            {arMessage && (
              <div
                className="ar-feedback"
                role="status"
                aria-live="polite"
              >
                {arMessage}
              </div>
            )}

          </div>

        </section>

        {/* SELETOR DE MÓVEIS */}

        <aside className="ar-products-card">

          <div className="ar-products-heading">
            <h3>Escolha um móvel</h3>

            <span>
              {furniture.length} produtos
            </span>
          </div>

          <div className="ar-product-list">

            {furniture.map((item) => (

              <button
                key={item.id}
                className={
                  selectedId === item.id
                    ? "ar-product-option selected"
                    : "ar-product-option"
                }
                onClick={() => {
                  setSelectedId(item.id);
                  setViewerLoaded(false);
                  setArMessage("Carregando modelo...");
                }}
              >

                <span className="ar-product-details">
                  <strong>{item.name}</strong>
                  <small>{item.category}</small>
                </span>

                <span className="ar-select-indicator">
                  {selectedId === item.id ? "✓" : "+"}
                </span>

              </button>

            ))}

          </div>

          <button
            className="button button-outline ar-back-button"
            onClick={() => onNavigate("catalog")}
          >
            Voltar ao catálogo
          </button>

        </aside>

      </div>

      {/* INSTRUÇÕES */}

      <section className="ar-instructions">

        <span>✦</span>

        <div>
          <strong>Como utilizar?</strong>

          <p>
            Escolha um móvel, clique em testar no meu ambiente,
            aponte a câmera para o chão e siga as instruções
            exibidas pelo dispositivo para posicioná-lo.
          </p>
        </div>

      </section>

    </main>
  );
}

export default ARMode;

