import { useEffect } from 'react';

/**
 * Adds `.in` to every `.rv` element once it scrolls into view.
 * A MutationObserver picks up elements rendered later (route changes, tabs, filters).
 */
export function useReveal(key: string) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.rv').forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    const watch = (root: ParentNode) => root.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el));
    watch(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => { if (n instanceof Element) { if (n.matches('.rv:not(.in)')) io.observe(n); watch(n); } });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [key]);
}
