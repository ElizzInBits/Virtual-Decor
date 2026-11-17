
import { useState } from "react";

import "./App.css";

import Header from "./components/Header";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ARMode from "./pages/ARMode";
import Editor3D from "./pages/Editor3d";
import SavedProjects from "./pages/SavedProjects";

function App() {
  const [page, setPage] = useState("home");

  const [sceneItems, setSceneItems] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  // Item escolhido no catálogo para testar no ambiente físico (AR).
  // Quando null, a página AR inicia vazia, sem nenhum móvel pré-setado.
  const [arItemId, setArItemId] = useState(null);

  // Posições iniciais para evitar que todos
  // os móveis sejam adicionados no mesmo lugar.
  const positions = [
    [0, 0, 0],
    [-2, 0, 0],
    [2, 0, 0],
    [0, 0, -2],
    [0, 0, 2],
    [-2, 0, -2],
    [2, 0, 2],
  ];

  function handleAddFurniture(item) {
    const instanceId =
      `${item.id}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;

    const newItem = {
      ...item,

      instanceId,

      position: positions[
        sceneItems.length % positions.length
      ],

      rotation: [0, 0, 0],

      scale: [
        item.editorScale,
        item.editorScale,
        item.editorScale,
      ],

      color: item.defaultColor,
    };

    setSceneItems((current) => [
      ...current,
      newItem,
    ]);

    setSelectedId(instanceId);

    setPage("editor");
  }

  // Leva o usuário direto para a página de AR já com o item
  // selecionado no catálogo carregado na visualização 3D.
  function handleTestInAR(item) {
    setArItemId(item.id);
    setPage("ar");
  }

  // Navegação pela barra/header/home: ao entrar na página AR
  // por aqui, ela começa vazia (nenhum móvel pré-setado).
  // O fluxo catálogo -> "ambiente físico" usa handleTestInAR,
  // que define o item antes de navegar.
  function navigate(target) {
    if (target === "ar") {
      setArItemId(null);
    }
    setPage(target);
  }

  function renderPage() {
    switch (page) {
      case "home":
        return (
          <Home onNavigate={navigate} />
        );

      case "catalog":
        return (
          <Catalog
            onNavigate={navigate}
            onAddFurniture={handleAddFurniture}
            onTestInAR={handleTestInAR}
          />
        );

      case "ar":
        return (
          <ARMode
            onNavigate={navigate}
            initialItemId={arItemId}
          />
        );

      case "editor":
        return (
          <Editor3D
            sceneItems={sceneItems}
            setSceneItems={setSceneItems}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAddFurniture={handleAddFurniture}
          />
        );

      case "saved":
        return <SavedProjects />;

      default:
        return (
          <Home onNavigate={setPage} />
        );
    }
  }

  return (
    <div className="app-shell">

      <Header
        page={page}
        onNavigate={navigate}
      />

      {renderPage()}

    </div>
  );
}

export default App;
