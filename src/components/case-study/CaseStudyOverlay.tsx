import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { gsap } from 'gsap';
import { $activeCaseStudy, closeCaseStudy } from '../../stores/caseStudy';
import './CaseStudyOverlay.css';

export default function CaseStudyOverlay() {
  const caseStudy = useStore($activeCaseStudy);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  const animateOpen = useCallback(() => {
    if (!panelRef.current || !backdropRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 0 : 0.4;
    const mobile = isMobile();

    gsap.to(backdropRef.current, { opacity: 1, duration });
    gsap.fromTo(
      panelRef.current,
      mobile ? { yPercent: 100, xPercent: 0 } : { xPercent: 100, yPercent: 0 },
      mobile
        ? { yPercent: 0, duration, ease: 'power3.out' }
        : { xPercent: 0, duration, ease: 'power3.out' }
    );
  }, []);

  const animateClose = useCallback(() => {
    if (!panelRef.current || !backdropRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 0 : 0.3;
    const mobile = isMobile();

    gsap.to(backdropRef.current, { opacity: 0, duration });
    gsap.to(panelRef.current, {
      ...(mobile ? { yPercent: 100 } : { xPercent: 100 }),
      duration,
      ease: 'power3.in',
      onComplete: closeCaseStudy,
    });
  }, []);

  // Lock/unlock body scroll
  useEffect(() => {
    if (caseStudy) {
      scrollYRef.current = window.scrollY;
      document.body.classList.add('overlay-open');
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => animateOpen());
    } else {
      document.body.classList.remove('overlay-open');
      window.scrollTo(0, scrollYRef.current);
    }
  }, [caseStudy, animateOpen]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (!window.location.hash.startsWith('#case-study/')) {
        $activeCaseStudy.set(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && caseStudy) {
        animateClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caseStudy, animateClose]);

  if (!caseStudy) return null;

  return (
    <div className="cs-overlay" ref={overlayRef}>
      <div
        className="cs-backdrop"
        ref={backdropRef}
        onClick={animateClose}
      />
      <div className="cs-panel" ref={panelRef}>
        <div className="cs-panel-header">
          <button
            className="cs-close-btn"
            onClick={animateClose}
            aria-label="Close case study"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="cs-panel-content">
          {caseStudy.image && (
            <div className="cs-hero-image">
              <img src={caseStudy.image} alt={`${caseStudy.company} case study`} />
            </div>
          )}

          <div className="cs-meta">
            <span className="cs-meta-badge">{caseStudy.dateRange}</span>
            <h2 className="cs-title font-headline">{caseStudy.company}</h2>
            <p className="cs-role">{caseStudy.role}</p>
          </div>

          <div className="cs-body font-body">
            <p>{caseStudy.description}</p>
            <p className="cs-placeholder">
              Full case study content will be added here — A/B test results,
              metrics, screenshots, and detailed analysis.
            </p>
          </div>

          <button
            className="cs-back-btn"
            onClick={animateClose}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Timeline
          </button>
        </div>
      </div>
    </div>
  );
}
