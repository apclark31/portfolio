import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openCaseStudy } from '../../stores/caseStudy';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  dateRange: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  side: 'left' | 'right';
  isCurrent: boolean;
  image: string;
  caseStudy?: boolean;
}

interface Props {
  entries: TimelineEntry[];
  /** When true, renders a compact preview (no center line, no GSAP) */
  preview?: boolean;
}

export default function Timeline({ entries, preview = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preview || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Center line draws on scroll
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 0.5,
              },
            }
          );
        }

        // Entries animate from their side
        const entryEls = containerRef.current!.querySelectorAll('.tl-entry');
        entryEls.forEach((el) => {
          const side = el.getAttribute('data-side');
          const contentEl = el.querySelector('.tl-entry-content');
          const imageEl = el.querySelector('.tl-entry-image-wrap');
          const markerEl = el.querySelector('.tl-marker');

          const xOffset = side === 'right' ? -60 : 60;

          if (contentEl) {
            gsap.fromTo(
              contentEl,
              { opacity: 0, x: -xOffset },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 75%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }

          if (imageEl) {
            gsap.fromTo(
              imageEl,
              { opacity: 0, x: xOffset },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 75%',
                  toggleActions: 'play none none none',
                },
              }
            );

            // Parallax on the image inside
            const img = imageEl.querySelector('.tl-entry-image img');
            if (img) {
              gsap.fromTo(
                img,
                { yPercent: -8 },
                {
                  yPercent: 8,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5,
                  },
                }
              );
            }
          }

          // Milestone dot scales from 0
          if (markerEl) {
            gsap.fromTo(
              markerEl,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 70%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        });
      });

      // Mobile: simpler vertical reveals
      mm.add('(max-width: 767px)', () => {
        const entryEls = containerRef.current!.querySelectorAll('.tl-entry');
        entryEls.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });
    }, containerRef);

    // Refresh ScrollTrigger after images load
    const images = containerRef.current.querySelectorAll('img');
    let loaded = 0;
    const total = images.length;

    const onLoad = () => {
      loaded++;
      if (loaded >= total) {
        ScrollTrigger.refresh();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onLoad);
      }
    });

    if (loaded >= total) {
      ScrollTrigger.refresh();
    }

    return () => {
      ctx.revert();
      images.forEach((img) => {
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onLoad);
      });
    };
  }, [preview, entries]);

  return (
    <div className="tl-entries" ref={containerRef}>
      {!preview && <div className="tl-line" ref={lineRef} />}

      {entries.map((entry, i) => (
        <div
          key={i}
          className={`tl-entry tl-entry--${entry.side}`}
          data-side={entry.side}
        >
          <div className="tl-entry-content">
            <div
              className={`tl-date-badge ${entry.isCurrent ? 'tl-date-badge--current' : ''}`}
            >
              {entry.dateRange}
            </div>
            <h3 className="tl-entry-role font-headline">{entry.role}</h3>
            <p className="tl-entry-company">{entry.company}</p>
            <p className="tl-entry-desc font-body">{entry.description}</p>
            <div className="tl-entry-tags">
              {entry.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
            {entry.caseStudy && (
              <button
                className="tl-case-study-link"
                onClick={() =>
                  openCaseStudy({
                    slug: entry.company.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    company: entry.company,
                    role: entry.role,
                    dateRange: entry.dateRange,
                    image: entry.image,
                    description: entry.description,
                  })
                }
              >
                View Case Study{' '}
                <span className="material-symbols-outlined">arrow_outward</span>
              </button>
            )}
          </div>

          <div className="tl-entry-image-wrap">
            <div className="tl-entry-image-glow" />
            <div className="tl-entry-image">
              <img
                src={entry.image}
                alt={`${entry.company} work sample`}
                loading="lazy"
              />
            </div>
            {!preview && (
              <div className="tl-marker">
                <div
                  className={`tl-marker-dot ${entry.isCurrent ? 'tl-marker-dot--pulse' : ''}`}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
