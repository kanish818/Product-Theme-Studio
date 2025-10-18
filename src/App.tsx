import React from 'react';
import { ConfigProvider } from './context/ConfigContext';
import EditorPanel from './components/EditorPanel';
import ProductCustomizer from './components/ProductCustomizer';
import { Gallery } from './components/Gallery';

const App: React.FC = () => {
  // Main app wrapper - left side is controls, right side shows live preview
  return (
    <ConfigProvider>
      <div className="app-shell">
        <header className="app-header">
          <span className="logo">🎨</span>
          <span>Product Theme Studio</span>
          <span className="beta-tag">BETA</span>
        </header>
        <main className="app-main">
          <aside className="editor"><EditorPanel /></aside>
          <section className="preview">
            <div className="demo-surface">
              <Gallery />
              <div className="product-stage"><div className="product" /></div>
              <ProductCustomizer />
            </div>
          </section>
        </main>
      </div>
    </ConfigProvider>
  );
};

export default App;
