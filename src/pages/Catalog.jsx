
import { useState } from "react";

import furniture from "../data/furniture";

import ModelPreview from "../components/ModelPreview";

function Catalog({ onNavigate, onAddFurniture }) {
  const [category, setCategory] = useState("Todos");

  const categories = [
    "Todos",
    "Sala",
    "Jantar",
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
                onClick={() => onAddFurniture(item)}
              >
                Adicionar ao ambiente
              </button>

            </div>

          </article>
        ))}

      </div>

    </main>
  );
}

export default Catalog;
