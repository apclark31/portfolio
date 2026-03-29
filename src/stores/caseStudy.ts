import { atom } from 'nanostores';

export interface CaseStudyData {
  slug: string;
  company: string;
  role: string;
  dateRange: string;
  image: string;
  description: string;
}

export const $activeCaseStudy = atom<CaseStudyData | null>(null);

export function openCaseStudy(data: CaseStudyData) {
  $activeCaseStudy.set(data);
  window.history.pushState(null, '', `#case-study/${data.slug}`);
}

export function closeCaseStudy() {
  $activeCaseStudy.set(null);
  if (window.location.hash.startsWith('#case-study/')) {
    window.history.pushState(null, '', window.location.pathname);
  }
}
