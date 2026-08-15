window.addEventListener("load", () => {
  const activeNavLink = document.querySelector(
    '[data-scroll-nav] .nav-link[aria-current="page"]',
  );

  if (activeNavLink) {
    activeNavLink.scrollIntoView({ block: "nearest", inline: "center" });
  }

  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  }
});
