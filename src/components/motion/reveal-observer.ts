const revealCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.setAttribute("data-reveal-state", "shown");
      revealCallbacks.delete(entry.target);
      sharedObserver?.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  return sharedObserver;
}

export function observeReveal(element: Element) {
  if (typeof IntersectionObserver === "undefined") {
    element.setAttribute("data-reveal-state", "shown");
    return () => undefined;
  }

  revealCallbacks.set(element, () => {
    element.setAttribute("data-reveal-state", "shown");
  });
  getRevealObserver().observe(element);

  return () => {
    revealCallbacks.delete(element);
    sharedObserver?.unobserve(element);
  };
}
