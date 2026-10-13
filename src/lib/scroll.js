export const scrollToId = (id) => {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(id, { offset: -88, duration: 1.25 });
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
};