import { useEffect, useRef, useState } from 'react';
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
  beforeDesktop?: string;
  beforeMobile?: string;
  afterDesktop?: string;
  afterMobile?: string;
  tags: string[];
  order: number;
}

type Viewport = 'desktop' | 'mobile';

const isVideo = (src?: string) => !!src && /\.(mp4|webm|mov)$/i.test(src);

function DeviceChrome({ viewport }: { viewport: Viewport }) {
  return (
    <div className={`cs-device-chrome cs-device-chrome--${viewport}`} aria-hidden="true">
      {viewport === 'desktop' ? (
        <>
          <span className="cs-dot" />
          <span className="cs-dot" />
          <span className="cs-dot" />
        </>
      ) : (
        <span className="cs-notch" />
      )}
    </div>
  );
}

function DeviceFrame({
  viewport,
  src,
  title,
  side,
}: {
  viewport: Viewport;
  src?: string;
  title: string;
  side: 'before' | 'after';
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, [src]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  if (!src) {
    return (
      <div className={`cs-device cs-device--${viewport}`}>
        <DeviceChrome viewport={viewport} />
        <div className="cs-device-screen">
          <div className="cs-comparison-placeholder">
            <span className="material-symbols-outlined">image</span>
            <span>Screenshot coming soon</span>
          </div>
        </div>
      </div>
    );
  }

  const videoMode = isVideo(src);

  return (
    <div className={`cs-device cs-device--${viewport}`}>
      <DeviceChrome viewport={viewport} />
      <div className="cs-device-screen">
        {videoMode ? (
          <>
            <video
              ref={videoRef}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              aria-label={`${title} ${side} (${viewport})`}
            />
            <button
              type="button"
              className={`cs-video-toggle ${playing ? '' : 'cs-video-toggle--paused'}`}
              onClick={toggle}
              aria-label={playing ? 'Pause video' : 'Play video'}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {playing ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </>
        ) : (
          <img src={src} alt={`${title} ${side} (${viewport})`} />
        )}
      </div>
    </div>
  );
}

interface Props {
  studies: CaseStudy[];
}

type NarrativeKey = 'pitch' | 'problem' | 'hypothesis';

const narrativeLabels: Record<NarrativeKey, string> = {
  pitch: 'Pitch',
  problem: 'Problem',
  hypothesis: 'Hypothesis',
};

export default function CaseStudyTabs({ studies }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [narrative, setNarrative] = useState<NarrativeKey>('pitch');
  const active = studies[activeIndex];

  const narrativeKeys: NarrativeKey[] = ['pitch'];
  if (active.problem) narrativeKeys.push('problem');
  if (active.hypothesis) narrativeKeys.push('hypothesis');

  const currentNarrative: NarrativeKey = narrativeKeys.includes(narrative) ? narrative : 'pitch';
  const narrativeTextFor = (key: NarrativeKey): string => {
    if (key === 'pitch') return active.pitch;
    if (key === 'problem') return active.problem ?? '';
    return active.hypothesis ?? '';
  };

  const beforeSrc =
    viewport === 'desktop'
      ? active.beforeDesktop ?? active.beforeImage
      : active.beforeMobile ?? active.beforeImage;
  const afterSrc =
    viewport === 'desktop'
      ? active.afterDesktop ?? active.afterImage
      : active.afterMobile ?? active.afterImage;

  const hasDesktop = Boolean(active.beforeDesktop || active.afterDesktop);
  const hasMobile = Boolean(active.beforeMobile || active.afterMobile);
  const showToggle = hasDesktop && hasMobile;

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
          <h2 className="cs-content-title">{active.title}</h2>
        </div>

        {/* Narrative tab strip — pitch / problem / hypothesis / results */}
        <div className="cs-narrative">
          <div className="cs-narrative-bar" role="tablist" aria-label="Case study details">
            {narrativeKeys.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={currentNarrative === key}
                className={`cs-narrative-tab ${currentNarrative === key ? 'cs-narrative-tab--active' : ''}`}
                onClick={() => setNarrative(key)}
              >
                {narrativeLabels[key]}
              </button>
            ))}
          </div>
          <div className="cs-narrative-stack">
            {narrativeKeys.map((key) => (
              <p
                key={key}
                className={`cs-section-text cs-narrative-body ${currentNarrative === key ? 'cs-narrative-body--active' : ''}`}
                aria-hidden={currentNarrative !== key}
              >
                {narrativeTextFor(key)}
              </p>
            ))}
          </div>
        </div>

        {/* Before / After — surfaced to the top so the visual leads */}
        <div className="cs-section">
          <div className="cs-section-head">
            <h3 className="cs-section-label">Before &amp; After</h3>
            {showToggle && (
              <div className="cs-viewport-toggle" role="tablist" aria-label="Viewport">
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewport === 'desktop'}
                  className={`cs-viewport-btn ${viewport === 'desktop' ? 'cs-viewport-btn--active' : ''}`}
                  onClick={() => setViewport('desktop')}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewport === 'mobile'}
                  className={`cs-viewport-btn ${viewport === 'mobile' ? 'cs-viewport-btn--active' : ''}`}
                  onClick={() => setViewport('mobile')}
                >
                  Mobile
                </button>
              </div>
            )}
          </div>
          <div className={`cs-comparison cs-comparison--${viewport}`}>
            <div className="cs-comparison-slot">
              <span className="cs-comparison-label">Before</span>
              <DeviceFrame viewport={viewport} src={beforeSrc} title={active.title} side="before" />
            </div>
            <div className="cs-comparison-slot">
              <span className="cs-comparison-label">After</span>
              <DeviceFrame viewport={viewport} src={afterSrc} title={active.title} side="after" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
