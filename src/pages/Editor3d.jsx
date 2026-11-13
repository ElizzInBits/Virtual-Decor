
import { useState } from "react";
import "./Editor3D.css";

import furniture from "../data/furniture";
import Scene3D from "../components/Scene3D";

function Editor3D({
  sceneItems,
  setSceneItems,
  selectedId,
  setSelectedId,
  onAddFurniture,
}) {
  const [transformMode, setTransformMode] =
    useState("translate");

  const selectedItem = sceneItems.find(
    (item) => item.instanceId === selectedId
  );

  function updateItem(id, changes) {
    setSceneItems((current) =>
      current.map((item) =>
        item.instanceId === id
          ? { ...item, ...changes }
          : item
      )
    );
  }

  function removeSelected() {
    setSceneItems((current) =>
      current.filter(
        (item) => item.instanceId !== selectedId
      )
    );

    setSelectedId(null);
  }

  function clearRoom() {
    setSceneItems([]);
    setSelectedId(null);
  }

  function changeScale(value) {
    const scale = Number(value);

    updateItem(selectedId, {
      scale: [scale, scale, scale],
    });
  }

  return (
    <main className="editor-page container">

      {/* CABEÇALHO */}
      <div className="page-heading editor-heading">
        <span className="eyebrow">
          EDITOR DE AMBIENTES 3D
        </span>

        <h1>Monte sua sala</h1>

        <p>
          Adicione seus móveis e personalize o ambiente
          do jeito que desejar.
        </p>
      </div>

      {/* FERRAMENTAS */}
      <div className="editor-toolbar">

        <div className="editor-tools">

          <button
            className={
              transformMode === "translate"
                ? "tool-button active"
                : "tool-button"
            }
            onClick={() => setTransformMode("translate")}
            title="Mover"
          >
            ↔ Mover
          </button>

          <button
            className={
              transformMode === "rotate"
                ? "tool-button active"
                : "tool-button"
            }
            onClick={() => setTransformMode("rotate")}
            title="Rotacionar"
          >
            ↻ Girar
          </button>

          <button
            className={
              transformMode === "scale"
                ? "tool-button active"
                : "tool-button"
            }
            onClick={() => setTransformMode("scale")}
            title="Redimensionar"
          >
            ⤢ Escalar
          </button>

        </div>

        <button
          className="clear-room-button"
          onClick={clearRoom}
          disabled={sceneItems.length === 0}
        >
          Limpar sala
        </button>

      </div>

      {/* ÁREA PRINCIPAL */}
      <div className="editor-layout">

        {/* PAINEL ESQUERDO */}
        <aside className="editor-panel furniture-panel">

          <div className="panel-title">
            <h3>Adicionar móveis</h3>
            <span>{furniture.length} produtos</span>
          </div>

          <div className="editor-furniture-list">

            {furniture.map((item) => (
              <div
                className="editor-furniture-item"
                key={item.id}
              >

                <div>
                  <strong>{item.name}</strong>
                  <small>{item.category}</small>
                </div>

                <button
                  className="add-furniture-button"
                  onClick={() => onAddFurniture(item)}
                  title={`Adicionar ${item.name}`}
                >
                  +
                </button>

              </div>
            ))}

          </div>

        </aside>

        {/* CENA CENTRAL */}
        <section className="scene-panel">

          <div className="scene-top-label">
            <span>Minha sala</span>
            <span>
              {sceneItems.length} móveis adicionados
            </span>
          </div>

          <div className="scene-container">

            <Scene3D
              items={sceneItems}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              transformMode={transformMode}
              onUpdateItem={updateItem}
            />

            {sceneItems.length === 0 && (
              <div className="scene-empty-message">
                <span>＋</span>
                <strong>Sua sala está vazia</strong>
                <small>
                  Selecione um móvel no painel
                  esquerdo para começar.
                </small>
              </div>
            )}

          </div>

        </section>

        {/* PAINEL DIREITO */}
        <aside className="editor-panel properties-panel">

          <div className="panel-title">
            <h3>Propriedades</h3>
          </div>

          {selectedItem ? (
            <div className="properties-content">

              <div className="selected-product">
                <span className="property-category">
                  {selectedItem.category}
                </span>

                <h4>{selectedItem.name}</h4>

                <p>
                  Personalize o móvel selecionado.
                </p>
              </div>

              <div className="property-field">

                <label htmlFor="furniture-color">
                  Cor do móvel
                </label>

                <input
                  id="furniture-color"
                  type="color"
                  value={selectedItem.color}
                  onChange={(event) =>
                    updateItem(selectedId, {
                      color: event.target.value,
                    })
                  }
                />

              </div>

              <div className="property-field">

                <label htmlFor="furniture-scale">
                  Escala geral
                </label>

                <input
                  id="furniture-scale"
                  type="range"
                  min="0.3"
                  max="1.6"
                  step="0.05"
                  value={selectedItem.scale[0]}
                  onChange={(event) =>
                    changeScale(event.target.value)
                  }
                />

                <small>
                  {selectedItem.scale[0].toFixed(2)}x
                </small>

              </div>

              <button
                className="remove-furniture-button"
                onClick={removeSelected}
              >
                Remover móvel
              </button>

            </div>
          ) : (
            <div className="no-selection">
              <span>⌖</span>

              <strong>Nenhum móvel selecionado</strong>

              <p>
                Clique em um móvel na sala para
                visualizar suas propriedades.
              </p>
            </div>
          )}

        </aside>

      </div>

      <div className="editor-help">
        <span>✦</span>
        Selecione um móvel para utilizar os controles
        de movimentação, rotação e escala.
      </div>

    </main>
  );
}

export default Editor3D;
