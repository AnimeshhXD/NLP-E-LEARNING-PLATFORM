import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ThreeEngine } from './ThreeEngine';
import { HUD } from '../ui/HUD';
import { SAMPLE_TOKENS } from '../data/storyData';

gsap.registerPlugin(ScrollTrigger);

export class GSAPAnimations {
  private threeEngine: ThreeEngine;
  private hud: HUD;

  constructor(threeEngine: ThreeEngine, hud: HUD) {
    this.threeEngine = threeEngine;
    this.hud = hud;
    this.init();
  }

  private init(): void {
    this.setupCameraChoreography();
    this.setupSectionReveals();
    this.setupSubtleHoverLift();
    this.setupAttentionSimulator();
    this.setupTokenListInteractions();
  }

  private setupCameraChoreography(): void {
    const camera = this.threeEngine.getCamera();

    // Master Scroll Progress tracking for HUD progress line
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        this.hud.updateProgress(self.progress);
      }
    });

    // ── Camera Position Track ──────────────────────────────────
    // scrub: 2.0 = slower, more cinematic feel (was 1.2)
    const posTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#sections-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.0
      }
    });

    posTimeline
      .to(camera.position, { x: 0,    y: 0,    z: 15, duration: 1 })                       // 01 hero
      .to(camera.position, { x: 0,    y: -12,  z: 18, duration: 1, ease: 'sine.inOut' })   // 02 raw-text
      .to(camera.position, { x: 0,    y: -24,  z: 16, duration: 1, ease: 'sine.inOut' })   // 03 segmentation
      .to(camera.position, { x: 0,    y: -35,  z: 15, duration: 1, ease: 'sine.inOut' })   // 04 tokenization
      .to(camera.position, { x: 0,    y: -48,  z: 18, duration: 1, ease: 'sine.inOut' })   // 05 cleaning
      .to(camera.position, { x: 0,    y: -70,  z: 15, duration: 1, ease: 'sine.inOut' })   // 06 stemming
      .to(camera.position, { x: 0,    y: -82,  z: 16, duration: 1, ease: 'sine.inOut' })   // 07 lemmatization
      .to(camera.position, { x: 0,    y: -100, z: 18, duration: 1, ease: 'sine.inOut' })   // 08 features
      .to(camera.position, { x: 0,    y: -115, z: 13, duration: 1, ease: 'sine.inOut' })   // 09 embeddings
      .to(camera.position, { x: 2.0,  y: -138, z: 17, duration: 1, ease: 'sine.inOut' })   // 10 word2vec
      .to(camera.position, { x: 0,    y: -160, z: 15, duration: 1, ease: 'sine.inOut' })   // 11 transformers
      .to(camera.position, { x: 0,    y: -200, z: 16, duration: 1, ease: 'sine.inOut' })   // 12 modern-ai
      .to(camera.position, { x: -3.0, y: -215, z: 20, duration: 1, ease: 'sine.inOut' })   // 13 applications
      .to(camera.position, { x: 3.0,  y: -230, z: 22, duration: 1, ease: 'sine.inOut' })   // 14 research
      .to(camera.position, { x: 0,    y: -250, z: 15, duration: 1, ease: 'sine.inOut' })   // 15 sustainability
      .to(camera.position, { x: 0,    y: -250, z: 7,  duration: 1, ease: 'sine.inOut' });  // 16 ending

    // ── Camera Rotation Track ──────────────────────────────────
    const rotTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#sections-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.0
      }
    });

    rotTimeline
      .to(camera.rotation, { x: 0,     y: 0,     z: 0,    duration: 1 })
      .to(camera.rotation, { x: -0.06, y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0.06,  y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: -0.04, y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: -0.09, z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0.04,  y: 0.04,  z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0.08,  z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: -0.08, z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0,     z: 0,    duration: 1, ease: 'sine.inOut' })
      .to(camera.rotation, { x: 0,     y: 0,     z: 0.03, duration: 1, ease: 'sine.inOut' });

    // Section HUD updates
    document.querySelectorAll('.story-section').forEach((secEl) => {
      const num = secEl.getAttribute('data-section-num') || '01';
      const title = secEl.getAttribute('data-section-title') || '';

      ScrollTrigger.create({
        trigger: secEl,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => this.hud.updateSection(num, title),
        onEnterBack: () => this.hud.updateSection(num, title)
      });
    });
  }

  private setupSectionReveals(): void {
    // ── Raw Text: character reveal ─────────────────────────────
    // Reduced blur from 8px → 3px, more refined
    const chars = document.querySelectorAll('.raw-char');
    if (chars.length > 0) {
      gsap.fromTo(chars,
        { opacity: 0, y: 28, scale: 0.7, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.025,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#raw-text-card',
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // ── Segmentation: blocks floating in ──────────────────────
    gsap.from('.segment-block', {
      opacity: 0,
      y: 40,
      scale: 0.96,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#segmentation',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // ── Cleaning: stopword dissolution ────────────────────────
    // Remove glow — just opacity + scale
    ScrollTrigger.create({
      trigger: '#cleaning',
      start: 'top 65%',
      onEnter: () => {
        gsap.to('.clean-stopword', {
          opacity: 0.18,
          scale: 0.9,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out'
        });
        gsap.to('.clean-content', {
          scale: 1.06,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out'
        });
      },
      onLeaveBack: () => {
        gsap.to('.clean-stopword', { opacity: 1, scale: 1, duration: 0.4 });
        gsap.to('.clean-content', { scale: 1, duration: 0.4 });
      }
    });

    // ── Stem boxes: cascade in ────────────────────────────────
    gsap.from('.stem-box', {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#stemming',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // ── Applications: slide in from left ─────────────────────
    document.querySelectorAll('.app-panel').forEach((panel) => {
      gsap.from(panel, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // ── Research Timeline: nodes fade in ─────────────────────
    document.querySelectorAll('.timeline-node').forEach((node) => {
      gsap.from(node, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // ── Generic section content reveal ────────────────────────
    document.querySelectorAll('.section-reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // Replaces aggressive 3D card tilt with subtle Y-lift only
  private setupSubtleHoverLift(): void {
    document.querySelectorAll('.panel').forEach((card) => {
      const el = card as HTMLElement;
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { y: -3, duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { y: 0, duration: 0.4, ease: 'power2.out' });
      });
    });
  }

  private setupAttentionSimulator(): void {
    const triggerIt = document.getElementById('att-trigger-it');
    const explainBox = document.getElementById('attention-explain');

    if (!triggerIt || !explainBox) return;

    const words = document.querySelectorAll('.att-word');

    const activateAttention = () => {
      explainBox.style.display = 'block';
      gsap.fromTo(explainBox, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });

      words.forEach((w) => {
        const weightStr = w.getAttribute('data-weight') || '0.1';
        const weight = parseFloat(weightStr);

        if ((w as HTMLElement).id === 'att-trigger-it') return;

        if (weight > 0.8) {
          // High attention — warm indigo highlight
          gsap.to(w, {
            backgroundColor: 'rgba(79, 93, 149, 0.18)',
            borderColor: 'rgba(79, 93, 149, 0.6)',
            scale: 1.1,
            color: '#1B1B1B',
            duration: 0.35
          });
        } else if (weight > 0.4) {
          // Medium attention — light tint
          gsap.to(w, {
            backgroundColor: 'rgba(201, 162, 39, 0.12)',
            borderColor: 'rgba(201, 162, 39, 0.4)',
            scale: 1.03,
            color: '#1B1B1B',
            duration: 0.35
          });
        } else {
          // Low attention — fade out
          gsap.to(w, { opacity: 0.3, scale: 0.97, duration: 0.35 });
        }
      });
    };

    const resetAttention = () => {
      words.forEach((w) => {
        if ((w as HTMLElement).id === 'att-trigger-it') return;
        gsap.to(w, {
          opacity: 1,
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: '#1B1B1B',
          duration: 0.3
        });
      });
      gsap.to(explainBox, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => { explainBox.style.display = 'none'; }
      });
    };

    triggerIt.addEventListener('click', activateAttention);
    triggerIt.addEventListener('mouseenter', activateAttention);
    triggerIt.addEventListener('mouseleave', resetAttention);
  }

  private setupTokenListInteractions(): void {
    const btns = document.querySelectorAll('.token-btn');
    const inspWord  = document.getElementById('inspector-word');
    const inspTfidf = document.getElementById('inspector-tfidf');
    const inspDesc  = document.getElementById('inspector-desc');
    const inspId    = document.getElementById('inspector-id');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idStr = btn.getAttribute('data-tok-id');
        if (!idStr) return;
        const id = parseInt(idStr, 10);
        const tok = SAMPLE_TOKENS.find(t => t.id === id);
        if (!tok) return;

        if (inspWord && inspTfidf && inspDesc && inspId) {
          inspId.innerText = `Token #${tok.id} · ${tok.pos || 'CORE'}`;
          inspWord.innerText = tok.word;
          inspTfidf.innerText = tok.tfidf.toString();
          inspDesc.innerText = tok.explanation;

          // Subtle pulse — scale to 0.99 then back
          gsap.fromTo('#token-inspector', { scale: 0.99 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
        }

        // Deselect all, select current
        btns.forEach(b => {
          (b as HTMLElement).style.borderColor = '';
          (b as HTMLElement).style.color = '';
          (b as HTMLElement).style.background = '';
        });
        const el = btn as HTMLElement;
        el.style.borderColor = 'rgba(79, 93, 149, 0.6)';
        el.style.color = '#4F5D95';
        el.style.background = 'rgba(79, 93, 149, 0.06)';
      });
    });
  }
}
