
import { useEffect, useRef, useState } from "react";

import furniture from "../data/furniture";

import "./ARMode.css";

function ARMode({ onNavigate, initialItemId }) {
  const viewerRef = useRef(null);

  // Inicia vazio quando nenhum item vem do catálogo.
  // Se o usuário escolheu "ambiente físico" no catálogo,
  // esse item já aparece na visualização.
  const [selectedId, setSelectedId] = useState(
    initialItemId ?? null
  );

  // Categoria ativa no seletor de itens.
  const [productCategory, setProductCategory] = useState("Todos");

  const [arMessage, setArMessage] = useState("");

  const [viewerLoaded, setViewerLoaded] = useState(false);

  const productCategories = [
    "Todos",
    "Sala",
    "Quarto",
    "Iluminação",
  ];

  const productList =
    productCategory === "Todos"
      ? furniture
      : furniture.filter(
          (item) => item.category === productCategory
        );

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
        "Não foi possível carregar o modelo. O Bastos vai resolver"
      );
    };

    const handleARStatus = (event) => {
      const status = event.detail?.status;

      if (status === "session-started") {
        setArMessage("Procure uma superfície para posicionar o móvel.");
      }

      if (status === "object-placed") {
        setArMessage("Móvel posicionado");
      }

      if (status === "failed") {
        setArMessage(
          "Não foi possível iniciar. Verifique a compatibilidade do dispositivo."
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

  // Esta chamada tme que acontecer diretamente no clique que o usuário fezer
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
            "Não foi possível abrir a câmera. Confira as permissões."
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
          como ele ficaria dentro do seu ambiente.
        </p>
      </header>

      <div className="ar-layout">

        {/* VISUALIZADOR 3D E AR */}

        <section className="ar-viewer-card">

          <div className="ar-viewer-header">
            <div>
              <strong>
                {selectedFurniture
                  ? selectedFurniture.name
                  : "Nenhum item selecionado"}
              </strong>

              <span>
                Visualização tridimensional do item
              </span>
            </div>

          </div>

          {selectedFurniture ? (
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
          ) : (
            <div className="ar-empty">
              <span className="ar-empty-icon">＋</span>
              <strong>Nenhum item selecionado</strong>
              <small>
                Escolha um item no painel ao lado para
                visualizá-lo aqui em 3D.
              </small>
            </div>
          )}

          <div className="ar-viewer-footer">
            <span>Arraste para girar</span>
            <span>Scroll para aproximar</span>
          </div>

          {/* OPÇÃO DE AR */}

          {selectedFurniture && (
          <div className="ar-test-area">

            <div className="ar-test-description">

              <div>
                <strong>Gostou do modelo?</strong>

              </div>
            </div>

            <button
              className="ar-launch-button"
              onClick={testInMyEnvironment}
              disabled={!viewerLoaded}
            >
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
          )}

        </section>

        {/* SELETOR DE ITENS */}

        <aside className="ar-products-card">

          <div className="ar-products-heading">
            <h3>Adicionar itens</h3>

            <span>
              {productList.length} itens
            </span>
          </div>

          <div className="ar-category-filters">

            {productCategories.map((item) => (
              <button
                key={item}
                className={
                  productCategory === item
                    ? "ar-filter-button selected"
                    : "ar-filter-button"
                }
                onClick={() => setProductCategory(item)}
              >
                {item}
              </button>
            ))}

          </div>

          <div className="ar-product-list">

            {productList.map((item) => (

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

        <div>
          <strong>Como utilizar?</strong>

          <p>
            Escolha um móvel, clique em testar no meu ambiente,
            aponte a câmera para uma superficie e siga as instruções
            exibidas pelo dispositivo para posicioná-lo.
          </p>
        </div>

      </section>

    </main>
  );
}

export default ARMode;

