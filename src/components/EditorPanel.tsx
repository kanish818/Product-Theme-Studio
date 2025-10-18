import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { EditorConfig, FontFamily, FontWeight, LayoutKey } from '../types';
import { downloadJSON, downloadText } from '../utils';

const fonts: FontFamily[] = ['Inter', 'Roboto', 'Poppins'];
const weights: FontWeight[] = [300, 400, 500, 600, 700, 800];

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="stack">
      <div className="label">{label}</div>
      <div className="row">
        <input className="input" type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="#000000 or rgb()" />
        <input type="color" value={value.startsWith('#') ? value : '#000000'} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}

export default function EditorPanel() {
  const { config, set, replace, reset } = useConfig();

  // Helper to merge updates into config
  const update = (patch: Partial<EditorConfig>) => set(patch);

  const handleImport = () => {
    try {
      const input = prompt('Paste your exported JSON configuration:', '');
      if (input) {
        const parsed = JSON.parse(input);
        replace(parsed);
      }
    } catch (err) {
      alert('Invalid JSON - please check your input!');
    }
  };

  // Some opinionated presets to demonstrate flexibility
  const presets: Array<{ name: string; apply: () => void }> = [
    {
      name: 'Minimal Blue',
      apply: () =>
        replace({
          ...config,
          typography: { family: 'Inter', weight: 500, size: 16 },
          button: { radius: 6, shadow: 'sm', align: 'center', bgColor: '#58a6ff', textColor: '#ffffff' },
          gallery: { align: 'grid-center', spacing: 12, radius: 8 },
          layout: { cardRadius: 12, padding: 16, sectionBg: '#0f1420' },
          stroke: { color: '#30363d', weight: 1 },
          activeLayout: 'layout-a',
        }),
    },
    {
      name: 'Warm Sunset',
      apply: () =>
        replace({
          ...config,
          typography: { family: 'Poppins', weight: 600, size: 18 },
          button: { radius: 12, shadow: 'lg', align: 'right', bgColor: '#f97316', textColor: '#111827' },
          gallery: { align: 'grid-right', spacing: 10, radius: 12 },
          layout: { cardRadius: 16, padding: 22, sectionBg: '#1a1410' },
          stroke: { color: '#7c2d12', weight: 1 },
          activeLayout: 'layout-b',
        }),
    },
    {
      name: 'Mono Minimal',
      apply: () =>
        replace({
          ...config,
          typography: { family: 'Roboto', weight: 400, size: 15 },
          button: { radius: 4, shadow: 'none', align: 'left', bgColor: '#ffffff', textColor: '#111827' },
          gallery: { align: 'grid-left', spacing: 8, radius: 6 },
          layout: { cardRadius: 10, padding: 16, sectionBg: '#0f1113' },
          stroke: { color: '#374151', weight: 1 },
          activeLayout: 'layout-a',
        }),
    },
  ];

  // Export CSS variables based on current theme for easy integration elsewhere
  const exportAsCSS = () => {
    const css = `:root{\n  --font:${config.typography.family};\n  --button-radius:${config.button.radius}px;\n  --button-bg:${config.button.bgColor};\n  --button-text:${config.button.textColor};\n  --card-radius:${config.layout.cardRadius}px;\n  --section-bg:${config.layout.sectionBg};\n  --stroke-color:${config.stroke.color};\n  --stroke-weight:${config.stroke.weight}px;\n}`;
    downloadText('theme.css', css);
  };

  return (
    <div className="stack">
  <div className="section-title">✍️ Typography</div>
      <div className="card grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <label className="stack">
          <span className="label">Font family</span>
          <select className="input" value={config.typography.family} onChange={(e) => update({ typography: { ...config.typography, family: e.target.value as FontFamily } })}>
            {fonts.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="stack">
          <span className="label">Font weight</span>
          <select className="input" value={config.typography.weight} onChange={(e) => update({ typography: { ...config.typography, weight: Number(e.target.value) as any } })}>
            {weights.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </label>
        <label className="stack" style={{ gridColumn: '1 / -1' }}>
          <span className="label">Font size: {config.typography.size}px</span>
          <input className="range" type="range" min={10} max={60} value={config.typography.size} onChange={(e) => update({ typography: { ...config.typography, size: Number(e.target.value) } })} />
        </label>
      </div>

  <div className="section-title">🎯 Button Styles</div>
      <div className="card grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <label className="stack">
          <span className="label">Border radius: {config.button.radius}px</span>
          <input className="range" type="range" min={0} max={24} value={config.button.radius} onChange={(e) => update({ button: { ...config.button, radius: Number(e.target.value) } })} />
        </label>
        <label className="stack">
          <span className="label">Shadow</span>
          <select className="input" value={config.button.shadow} onChange={(e) => update({ button: { ...config.button, shadow: e.target.value as any } })}>
            <option value="none">None</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
        <label className="stack">
          <span className="label">Alignment</span>
          <select className="input" value={config.button.align} onChange={(e) => update({ button: { ...config.button, align: e.target.value as any } })}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
        <ColorInput label="Background color" value={config.button.bgColor} onChange={(v) => update({ button: { ...config.button, bgColor: v } })} />
        <ColorInput label="Text color" value={config.button.textColor} onChange={(v) => update({ button: { ...config.button, textColor: v } })} />
      </div>

  <div className="section-title">🖼️ Image Gallery</div>
      <div className="card grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <label className="stack">
          <span className="label">Gallery alignment</span>
          <select className="input" value={config.gallery.align} onChange={(e) => update({ gallery: { ...config.gallery, align: e.target.value as any } })}>
            <option value="grid-left">Grid left</option>
            <option value="grid-center">Grid center</option>
            <option value="grid-right">Grid right</option>
          </select>
        </label>
        <label className="stack">
          <span className="label">Spacing: {config.gallery.spacing}px</span>
          <input className="range" type="range" min={0} max={24} value={config.gallery.spacing} onChange={(e) => update({ gallery: { ...config.gallery, spacing: Number(e.target.value) } })} />
        </label>
        <label className="stack" style={{ gridColumn: '1 / -1' }}>
          <span className="label">Image radius: {config.gallery.radius}px</span>
          <input className="range" type="range" min={0} max={24} value={config.gallery.radius} onChange={(e) => update({ gallery: { ...config.gallery, radius: Number(e.target.value) } })} />
        </label>
      </div>

  <div className="section-title">⚙️ Layout Settings</div>
      <div className="card grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <label className="stack">
          <span className="label">Card radius: {config.layout.cardRadius}px</span>
          <input className="range" type="range" min={0} max={24} value={config.layout.cardRadius} onChange={(e) => update({ layout: { ...config.layout, cardRadius: Number(e.target.value) } })} />
        </label>
        <label className="stack">
          <span className="label">Container padding: {config.layout.padding}px</span>
          <input className="range" type="range" min={0} max={48} value={config.layout.padding} onChange={(e) => update({ layout: { ...config.layout, padding: Number(e.target.value) } })} />
        </label>
        <ColorInput label="Section background" value={config.layout.sectionBg} onChange={(v) => update({ layout: { ...config.layout, sectionBg: v } })} />
      </div>

  <div className="section-title">📐 Borders</div>
      <div className="card grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <ColorInput label="Stroke color" value={config.stroke.color} onChange={(v) => update({ stroke: { ...config.stroke, color: v } })} />
        <label className="stack">
          <span className="label">Stroke weight: {config.stroke.weight}px</span>
          <input className="range" type="range" min={0} max={4} value={config.stroke.weight} onChange={(e) => update({ stroke: { ...config.stroke, weight: Number(e.target.value) } })} />
        </label>
      </div>

      <div className="section-title">🔄 Switch Layout</div>
      <div className="card row" style={{ justifyContent: 'space-between' }}>
        <div className="row" role="group" aria-label="Layout switch">
          {(['layout-a', 'layout-b'] as LayoutKey[]).map((key) => (
            <button key={key} className={`btn ${config.activeLayout === key ? 'primary' : ''}`} onClick={() => update({ activeLayout: key })}>
              {key === 'layout-a' ? 'Vertical' : 'Horizontal'}
            </button>
          ))}
        </div>
        <div className="row" style={{ gap: 8 }}>
          <select className="input" aria-label="Apply preset" onChange={(e) => { const p = presets.find(x => x.name === e.target.value); if (p) p.apply(); }}>
            <option value="">Presets…</option>
            {presets.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          <button className="btn" onClick={() => downloadJSON('theme-config.json', config)}>💾 Export JSON</button>
          <button className="btn" onClick={exportAsCSS}>🎨 Export CSS</button>
          <button className="btn" onClick={handleImport}>📥 Import</button>
          <button className="btn" onClick={reset}>🔄 Reset</button>
        </div>
      </div>
    </div>
  );
}
