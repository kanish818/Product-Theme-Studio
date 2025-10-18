import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { sampleProduct } from '../config/defaultConfig';
import { cx } from '../utils';

function ButtonDemo() {
  const { config } = useConfig();
  
  // Apply shadow based on user selection
  const shadow =
    config.button.shadow === 'sm'
      ? '0 2px 4px rgba(0,0,0,.2)'
      : config.button.shadow === 'md'
      ? '0 4px 12px rgba(0,0,0,.3)'
      : config.button.shadow === 'lg'
      ? '0 8px 24px rgba(0,0,0,.4)'
      : 'none';
  
  const wrapper = { display: 'flex', justifyContent: config.button.align as any } as React.CSSProperties;
  
  return (
    <div style={wrapper}>
      <button
        className="btn"
        style={{
          borderRadius: config.button.radius,
          background: config.button.bgColor,
          color: config.button.textColor,
          boxShadow: shadow,
          borderColor: '#0000',
          fontWeight: 600,
          padding: '10px 24px',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default function ProductCustomizer() {
  const { config } = useConfig();
  const font = {
    fontFamily: config.typography.family,
    fontWeight: config.typography.weight,
    fontSize: config.typography.size,
  } as React.CSSProperties;

  const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="card" style={{ borderRadius: config.layout.cardRadius, borderWidth: config.stroke.weight, borderColor: config.stroke.color }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={font}>{title}</div>
        <div className="label" style={{ fontSize: 11, opacity: 0.6 }}>🔍 VIEW IN AR</div>
      </div>
      <div className="row" style={{ height: 4, background: '#ffffff15', borderRadius: 99, margin: '10px 0' }} />
      <div className="label" style={{ marginBottom: 10, fontSize: 12 }}>Select Color & Material</div>
      {children}
    </div>
  );

  const Swatches = () => (
    <div className="grid" role="list" aria-label="Color swatches" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
      {sampleProduct.swatches.map((c, i) => (
        <button
          key={i}
          role="listitem"
          aria-label={`Select color ${c}`}
          className="btn"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: c,
            border: '2px solid #30363d',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            padding: 0,
            minWidth: 32,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      ))}
    </div>
  );

  if (config.activeLayout === 'layout-a') {
    // Vertical layout - material sections stacked
    return (
      <div className="controls-stack" style={{ background: config.layout.sectionBg, padding: config.layout.padding, borderRadius: 12, border: `1px solid ${config.stroke.color}` }}>
        <Card title={sampleProduct.name}>
          <div className="stack">
            <div className="label" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.5px' }}>MATTE FINISH</div>
            <Swatches />
            <div className="label" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', marginTop: 8 }}>GLOSSY FINISH</div>
            <Swatches />
          </div>
          <div className="row" style={{ justifyContent: 'space-between', marginTop: 16, alignItems: 'center' }}>
            <div>
              <div style={font}>
                ${sampleProduct.price} 
                <span className="label" style={{ textDecoration: 'line-through', marginLeft: 8, fontSize: 13 }}>
                  ${sampleProduct.wasPrice}
                </span>
              </div>
            </div>
          </div>
          <ButtonDemo />
        </Card>
      </div>
    );
  }

  // Horizontal layout - tabs for material selection
  return (
    <div className="controls-stack" style={{ background: config.layout.sectionBg, padding: config.layout.padding, borderRadius: 12, border: `1px solid ${config.stroke.color}` }}>
      <Card title={sampleProduct.name}>
        <div className={cx('row')} style={{ gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          {['Matte', 'Glossy', 'Metallic', 'Wood', 'Fabric', 'Leather'].map((t, idx) => (
            <div 
              key={t} 
              className="label" 
              style={{ 
                padding: '6px 12px', 
                borderRadius: 6, 
                border: `1px solid ${idx === 0 ? config.stroke.color : '#30363d'}`,
                background: idx === 0 ? '#58a6ff15' : 'transparent',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 500
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <Swatches />
        <div style={{ marginTop: 16 }}>
          <div style={font}>
            ${sampleProduct.price} 
            <span className="label" style={{ textDecoration: 'line-through', marginLeft: 8, fontSize: 13 }}>
              ${sampleProduct.wasPrice}
            </span>
          </div>
        </div>
        <ButtonDemo />
      </Card>
    </div>
  );
}
