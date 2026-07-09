import './index.css';
import { ThreeEngine } from './engine/ThreeEngine';
import { ScrollEngine } from './engine/ScrollEngine';
import { HUD } from './ui/HUD';
import { Sections } from './ui/Sections';
import { SandboxModal } from './ui/SandboxModal';
import { GSAPAnimations } from './engine/GSAPAnimations';

function initApp() {
  const root = document.getElementById('root')!;
  root.innerHTML = '';
  
  // 1. Three.js Background Layer (Z-0)
  const threeContainer = document.createElement('div');
  threeContainer.id = 'three-canvas-container';
  threeContainer.className = 'fixed inset-0 z-0 pointer-events-auto';
  threeContainer.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:auto;';
  root.appendChild(threeContainer);

  // 2. Scrolling Sections Layer (Z-10)
  const sectionsContainer = document.createElement('main');
  sectionsContainer.id = 'sections-container';
  sectionsContainer.style.cssText = 'position:relative;z-index:10;width:100%;pointer-events:none;';
  root.appendChild(sectionsContainer);

  // 3. Fixed HUD & Navigation Layer (Z-40)
  const hudContainer = document.createElement('div');
  hudContainer.id = 'hud-container';
  hudContainer.style.cssText = 'position:fixed;inset:0;z-index:40;pointer-events:none;';
  root.appendChild(hudContainer);

  // 4. Modal Layer (Z-50)
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modal-container';
  modalContainer.style.cssText = 'position:fixed;inset:0;z-index:50;pointer-events:none;';
  root.appendChild(modalContainer);

  // Initialize Engines & UI
  const scrollEngine = new ScrollEngine();
  const threeEngine = new ThreeEngine('three-canvas-container');
  new Sections(sectionsContainer);
  
  // Re-enable pointer events for interactive elements inside the scrolling sections
  document.querySelectorAll(
    '#sections-container button, #sections-container a, #sections-container input, ' +
    '#sections-container .panel, #sections-container .att-word, ' +
    '#sections-container .word-kept, #sections-container .token-btn'
  ).forEach(el => {
    (el as HTMLElement).style.pointerEvents = 'auto';
  });

  const sandboxModal = new SandboxModal(modalContainer);

  const hud = new HUD(
    hudContainer,
    () => sandboxModal.open(),
    (sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) scrollEngine.scrollTo(el, { duration: 1.8 });
    }
  );

  new GSAPAnimations(threeEngine, hud);

  // Connect Three.js 3D token click events
  threeEngine.onTokenClickCallback = (tokenData) => {
    sandboxModal.open(`Explain why the word "${tokenData.word}" has TF-IDF weight ${tokenData.tfidf} and vector embedding.`);
  };

  // Connect Ending Section buttons
  setTimeout(() => {
    const endSandboxBtn = document.getElementById('end-sandbox-btn');
    if (endSandboxBtn) {
      endSandboxBtn.addEventListener('click', () => {
        sandboxModal.open();
      });
    }

    const exploreAgainBtn = document.getElementById('explore-again-btn');
    if (exploreAgainBtn) {
      exploreAgainBtn.addEventListener('click', () => {
        scrollEngine.scrollTo(0, { duration: 2.5 });
      });
    }
  }, 300);

  console.log('NLP Odyssey — Immersive Storytelling Engine loaded. Pure Vanilla TS / Three.js / GSAP / Lenis');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
