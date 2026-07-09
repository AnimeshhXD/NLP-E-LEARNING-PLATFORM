import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class ScrollEngine {
  public lenis!: Lenis;

  constructor() {
    this.init();
  }

  private init(): void {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0
    });

    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);
  }

  public scrollTo(target: string | number | HTMLElement, options?: any): void {
    this.lenis.scrollTo(target, options);
  }

  public destroy(): void {
    this.lenis.destroy();
  }
}
