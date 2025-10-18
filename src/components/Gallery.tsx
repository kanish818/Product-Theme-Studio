import React from 'react';
import { useConfig } from '../context/ConfigContext';

export const Gallery: React.FC = () => {
  const { config } = useConfig();
  const justify =
    config.gallery.align === 'grid-left' ? 'start' : config.gallery.align === 'grid-right' ? 'end' : 'center';
  return (
    <div className="thumbs" style={{ gap: config.gallery.spacing, justifyItems: justify as any }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="thumb" style={{ borderRadius: config.gallery.radius }} />
      ))}
    </div>
  );
};
