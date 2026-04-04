import { useState } from 'react';
import './CaseStudyTabs.css';

interface CaseStudy {
  title: string;
  company: string;
  slug: string;
  pitch: string;
  problem?: string;
  hypothesis?: string;
  results: string;
  status: string;
  beforeImage?: string;
  afterImage?: string;
  tags: string[];
  order: number;
}

interface Props {
  studies: CaseStudy[];
}

const statusLabels: Record<string, { label: string; className: string }> = {
  winner: { label: 'Winner', className: 'cs-status--winner' },
  shipped: { label: 'Shipped', className: 'cs-status--shipped' },
  variant: { label: 'Variant', className: 'cs-status--variant' },
  control: { label: 'Control', className: 'cs-status--control' },
  pending: { label: 'Pending', className: 'cs-status--pending' },
};

export default function CaseStudyTabs({ studies }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = studies[activeIndex];
  const statusInfo = statusLabels[active.status] || statusLabels.pending;

  return (
    <div className="cs-tabs">
      {/* Tab bar */}
      <div className="cs-tab-bar">
        {studies.map((study, i) => (
          <button
            key={study.slug}
            className={`cs-tab ${i === activeIndex ? 'cs-tab--active' : ''}`}
            onClick={() => setActiveIndex(i)}
          >
            {study.title}
            {study.status === 'winner' && (
              <span className="cs-tab-winner">★</span>
            )}
          </button>
        ))}
      </div>

      {/* Active study content */}
      <div className="cs-content">
        <div className="cs-content-header">
          <div className="cs-content-meta">
            <span className={`cs-status ${statusInfo.className}`}>
              {statusInfo.label}
            </span>
            <div className="cs-tags">
              {active.tags.map((tag) => (
                <span key={tag} className="cs-tag">{tag}</span>
              ))}
            </div>
          </div>
          <h2 className="cs-content-title">{active.title}</h2>
        </div>

        {/* Pitch */}
        <div className="cs-section">
          <h3 className="cs-section-label">The Pitch</h3>
          <p className="cs-section-text">{active.pitch}</p>
        </div>

        {/* Problem */}
        {active.problem && (
          <div className="cs-section">
            <h3 className="cs-section-label">The Problem</h3>
            <p className="cs-section-text">{active.problem}</p>
          </div>
        )}

        {/* Hypothesis */}
        {active.hypothesis && (
          <div className="cs-section">
            <h3 className="cs-section-label">The Hypothesis</h3>
            <p className="cs-section-text">{active.hypothesis}</p>
          </div>
        )}

        {/* Before / After */}
        <div className="cs-section">
          <h3 className="cs-section-label">Before &amp; After</h3>
          <div className="cs-comparison">
            <div className="cs-comparison-slot">
              <span className="cs-comparison-label">Before</span>
              {active.beforeImage ? (
                <img src={active.beforeImage} alt={`${active.title} before`} />
              ) : (
                <div className="cs-comparison-placeholder">
                  <span className="material-symbols-outlined">image</span>
                  <span>Screenshot coming soon</span>
                </div>
              )}
            </div>
            <div className="cs-comparison-slot">
              <span className="cs-comparison-label">After</span>
              {active.afterImage ? (
                <img src={active.afterImage} alt={`${active.title} after`} />
              ) : (
                <div className="cs-comparison-placeholder">
                  <span className="material-symbols-outlined">image</span>
                  <span>Screenshot coming soon</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="cs-section">
          <h3 className="cs-section-label">Results</h3>
          <p className="cs-section-text">{active.results}</p>
        </div>
      </div>
    </div>
  );
}
