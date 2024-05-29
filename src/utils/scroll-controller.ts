const START_SCROLL_POSITION = 0;

export const scrollController = {
  scrollPosition: START_SCROLL_POSITION,
  disableScroll() {
    this.scrollPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${this.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
  },
  enableScroll() {
    document.body.style.cssText = '';
    window.scrollTo({ top: this.scrollPosition });
  },
};
