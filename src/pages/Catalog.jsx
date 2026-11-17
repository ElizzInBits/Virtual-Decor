
import { useState } from "react";

import furniture from "../data/furniture";

import ModelPreview from "../components/ModelPreview";

function Catalog({ onAddFurniture, onTestInAR }) {
  const [category, setCategory] = useState("Todos");

  // Item de teste quando escolhido, abre a caixa
  // perguntando onde o usuário deseja testar o item.
  const [pendingItem, setPendingItem] = useState(null);

  const categories = [
    "Todos",
    "Sala",
    "Quarto",
    "Iluminação",
  ];

  const filteredFurniture =
    category === "Todos"
      ? furniture
      : furniture.filter(
          (item) => item.category === category
        );

  return (
    <main className="page-container container">

      <div className="page-heading">

        <span className="eyebrow">
          NOSSO CATÁLOGO
        </span>

        <h1>Encontre seus móveis</h1>

        <p>
          Explore os produtos em 3D e escolha os móveis
          que deseja adicionar à sua decoração.
        </p>

      </div>

      <div className="category-filters">

        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item
                ? "filter-button selected"
                : "filter-button"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}

      </div>

      <div className="furniture-grid">

        {filteredFurniture.map((item) => (
          <article
            className="furniture-card"
            key={item.id}
          >

            <div className="model-stage">
              <ModelPreview src={item.model} />
            </div>

            <div className="furniture-info">

              <span className="category-label">
                {item.category}
              </span>

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <button
                className="button button-primary full-button"
                onClick={() => setPendingItem(item)}
              >
                Testar
              </button>

            </div>

          </article>
        ))}

      </div>

      {/* CAIXA "ONDE TESTAR" */}

      {pendingItem && (
        <div
          className="test-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="test-modal-title"
        >

          <div className="test-modal">

            <div className="test-modal-heading">
              <span className="eyebrow">TESTAR ITEM</span>

              <h2 id="test-modal-title">
                Onde deseja testar {pendingItem.name.trim()}?
              </h2>

              <p>
                Escolha como prefere visualizar o item
                antes de decidir.
              </p>
            </div>

            <div className="test-modal-options">

              <button
                className="test-option"
                onClick={() => {
                  const item = pendingItem;
                  setPendingItem(null);
                  onAddFurniture(item);
                }}
              >
                <span className="test-option-icon">🏠</span>

                <span className="test-option-text">
                  <strong>Sala 3D virtual</strong>
                  <small>
                    Monte e personalize em um ambiente
                    virtual.
                  </small>
                </span>
              </button>

              <button
                className="test-option"
                onClick={() => {
                  const item = pendingItem;
                  setPendingItem(null);
                  onTestInAR(item);
                }}
              >
                <span className="test-option-icon">📱</span>

                <span className="test-option-text">
                  <strong>Ambiente físico</strong>
                  <small>
                    Veja o item no seu próprio espaço
                    usando a câmera.
                  </small>
                </span>
              </button>

            </div>

            <button
              className="test-modal-cancel"
              onClick={() => setPendingItem(null)}
            >
              Cancelar
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

export default Catalog;
