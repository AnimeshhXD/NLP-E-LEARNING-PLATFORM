import { SECTIONS_DATA } from '../data/storyData';

export class HUD {
  private container: HTMLElement;
  private onOpenSandbox: () => void;
  private onJumpToSection: (sectionId: string) => void;

  private sectionTitleEl!: HTMLElement;
  private sectionNumberEl!: HTMLElement;
  private progressLineEl!: HTMLElement;
  private indexModalEl!: HTMLElement;
  private isIndexOpen: boolean = false;

  constructor(
    container: HTMLElement,
    onOpenSandbox: () => void,
    onJumpToSection: (sectionId: string) => void
  ) {
    this.container = container;
    this.onOpenSandbox = onOpenSandbox;
    this.onJumpToSection = onJumpToSection;
    this.render();
    this.attachEvents();
  }

  private render(): void {
    this.container.innerHTML = `
      <!-- Scroll Progress Bar — thin terracotta line at very top -->
      <div style="position:fixed;top:0;left:0;width:100%;height:2px;z-index:60;background:transparent;pointer-events:none;">
        <div id="hud-progress-line" style="height:100%;width:0%;background:#C65D3B;transition:width 0.15s linear;"></div>
      </div>

      <!-- Top Navigation Bar -->
      <header id="hud-header" style="
        position:fixed;top:2px;left:0;width:100%;z-index:50;
        display:flex;align-items:center;justify-content:space-between;
        padding:14px clamp(1.5rem,4vw,3rem);
        background:rgba(247,245,242,0.92);
        backdrop-filter:blur(16px);
        -webkit-backdrop-filter:blur(16px);
        border-bottom:1px solid #DDD8CE;
        pointer-events:auto;
        transition:background 0.3s ease;
      ">
        <!-- Left: Wordmark -->
        <div style="display:flex;align-items:baseline;gap:10px;">
          <span style="
            font-family:var(--font-serif);
            font-size:1.125rem;
            color:#1B1B1B;
            letter-spacing:-0.01em;
          ">NLP Odyssey</span>
          <span style="
            font-family:var(--font-mono);
            font-size:0.65rem;
            color:#888880;
            letter-spacing:0.08em;
            text-transform:uppercase;
          ">Natural Language Processing</span>
        </div>

        <!-- Center: Current Chapter Indicator (hidden on mobile) -->
        <div id="hud-chapter-pill" style="
          display:flex;align-items:center;gap:10px;
          padding:6px 16px;
          border-radius:100px;
          border:1px solid #DDD8CE;
          background:#FFFFFF;
          box-shadow:0 1px 3px rgba(0,0,0,0.06);
        ">
          <span id="hud-section-num" style="
            font-family:var(--font-mono);
            font-size:0.7rem;
            font-weight:500;
            color:#C65D3B;
            letter-spacing:0.06em;
          ">01</span>
          <span style="width:1px;height:12px;background:#DDD8CE;display:inline-block;"></span>
          <span id="hud-section-title" style="
            font-family:var(--font-sans);
            font-size:0.75rem;
            color:#555555;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            max-width:260px;
          ">How does a computer understand language?</span>
        </div>

        <!-- Right: Controls -->
        <div style="display:flex;align-items:center;gap:10px;">
          <button id="hud-index-btn" style="
            padding:7px 16px;
            border-radius:6px;
            border:1px solid #DDD8CE;
            background:transparent;
            font-family:var(--font-sans);
            font-size:0.8rem;
            color:#555555;
            cursor:pointer;
            transition:all 0.2s ease;
          " onmouseover="this.style.borderColor='#C8C0B2';this.style.color='#1B1B1B';this.style.background='#ECE8E1';"
             onmouseout="this.style.borderColor='#DDD8CE';this.style.color='#555555';this.style.background='transparent';">
            Chapters
          </button>

          <button id="hud-sandbox-btn" style="
            padding:7px 20px;
            border-radius:6px;
            border:none;
            background:#C65D3B;
            color:#FFFFFF;
            font-family:var(--font-sans);
            font-size:0.8rem;
            font-weight:500;
            cursor:pointer;
            transition:all 0.2s ease;
            box-shadow:0 2px 8px rgba(198,93,59,0.25);
          " onmouseover="this.style.background='#E8856A';this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(198,93,59,0.30)';"
             onmouseout="this.style.background='#C65D3B';this.style.transform='none';this.style.boxShadow='0 2px 8px rgba(198,93,59,0.25)';">
            Try Sandbox →
          </button>
        </div>
      </header>

      <!-- Chapter Index Modal -->
      <div id="hud-index-modal" style="
        position:fixed;inset:0;z-index:55;
        background:rgba(247,245,242,0.97);
        backdrop-filter:blur(24px);
        -webkit-backdrop-filter:blur(24px);
        display:flex;align-items:center;justify-content:center;
        padding:2rem;
        opacity:0;pointer-events:none;
        transition:opacity 0.25s ease;
      ">
        <div style="
          max-width:760px;width:100%;
          max-height:85vh;
          background:#FFFFFF;
          border:1px solid #DDD8CE;
          border-radius:16px;
          box-shadow:0 24px 64px rgba(0,0,0,0.10);
          display:flex;flex-direction:column;
          overflow:hidden;
        ">
          <!-- Modal Header -->
          <div style="
            display:flex;align-items:center;justify-content:space-between;
            padding:1.5rem 2rem;
            border-bottom:1px solid #ECE8E1;
          ">
            <div>
              <h2 style="
                font-family:var(--font-serif);
                font-size:1.5rem;
                font-weight:400;
                color:#1B1B1B;
              ">Chapters</h2>
              <p style="
                font-family:var(--font-mono);
                font-size:0.7rem;
                color:#888880;
                margin-top:2px;
              ">Select any chapter to jump directly</p>
            </div>
            <button id="close-index-btn" style="
              width:32px;height:32px;
              border-radius:50%;
              border:1px solid #DDD8CE;
              background:#F7F5F2;
              color:#555555;
              font-size:1rem;
              cursor:pointer;
              display:flex;align-items:center;justify-content:center;
              transition:all 0.2s ease;
            " onmouseover="this.style.background='#ECE8E1';this.style.borderColor='#C8C0B2';"
               onmouseout="this.style.background='#F7F5F2';this.style.borderColor='#DDD8CE';">
              ✕
            </button>
          </div>

          <!-- Chapter List -->
          <div class="custom-scrollbar" style="
            overflow-y:auto;
            padding:1rem 1.25rem;
            display:grid;
            grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));
            gap:8px;
          ">
            ${SECTIONS_DATA.map(sec => `
              <div class="chapter-item" data-target="${sec.id}" style="
                display:flex;align-items:flex-start;gap:12px;
                padding:12px 16px;
                border-radius:10px;
                border:1px solid #ECE8E1;
                cursor:pointer;
                transition:all 0.2s ease;
                background:#FFFFFF;
              " onmouseover="this.style.borderColor='#DDD8CE';this.style.background='#F7F5F2';this.style.transform='translateX(4px)';"
                 onmouseout="this.style.borderColor='#ECE8E1';this.style.background='#FFFFFF';this.style.transform='none';">
                <span style="
                  font-family:var(--font-mono);
                  font-size:0.7rem;
                  color:#C65D3B;
                  background:rgba(198,93,59,0.08);
                  border:1px solid rgba(198,93,59,0.2);
                  padding:2px 8px;
                  border-radius:4px;
                  flex-shrink:0;
                  margin-top:1px;
                ">${sec.number}</span>
                <div style="min-width:0;">
                  <div style="
                    font-family:var(--font-sans);
                    font-size:0.875rem;
                    font-weight:500;
                    color:#1B1B1B;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                  ">${sec.title}</div>
                  ${sec.subtitle ? `<div style="
                    font-family:var(--font-mono);
                    font-size:0.7rem;
                    color:#888880;
                    margin-top:2px;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                  ">${sec.subtitle}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.sectionNumberEl = document.getElementById('hud-section-num')!;
    this.sectionTitleEl = document.getElementById('hud-section-title')!;
    this.progressLineEl = document.getElementById('hud-progress-line')!;
    this.indexModalEl = document.getElementById('hud-index-modal')!;
  }

  private attachEvents(): void {
    // Sandbox button
    document.getElementById('hud-sandbox-btn')!.addEventListener('click', () => {
      this.onOpenSandbox();
    });

    // Chapters Index button
    document.getElementById('hud-index-btn')!.addEventListener('click', () => {
      this.toggleIndexModal(true);
    });

    document.getElementById('close-index-btn')!.addEventListener('click', () => {
      this.toggleIndexModal(false);
    });

    // Close on backdrop click
    this.indexModalEl.addEventListener('click', (e) => {
      if (e.target === this.indexModalEl) this.toggleIndexModal(false);
    });

    // Chapter items jump click
    this.indexModalEl.querySelectorAll('.chapter-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        if (targetId) {
          this.toggleIndexModal(false);
          this.onJumpToSection(targetId);
        }
      });
    });

    // Keyboard: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isIndexOpen) this.toggleIndexModal(false);
    });
  }

  public updateSection(numberStr: string, titleStr: string): void {
    if (this.sectionNumberEl && this.sectionTitleEl) {
      if (this.sectionNumberEl.innerText !== numberStr) {
        this.sectionNumberEl.style.opacity = '0';
        this.sectionTitleEl.style.opacity = '0';
        setTimeout(() => {
          this.sectionNumberEl.innerText = numberStr;
          this.sectionTitleEl.innerText = titleStr;
          this.sectionNumberEl.style.opacity = '1';
          this.sectionTitleEl.style.opacity = '1';
        }, 150);
      }
    }
  }

  public updateProgress(progress: number): void {
    if (this.progressLineEl) {
      this.progressLineEl.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
    }
  }

  private toggleIndexModal(open: boolean): void {
    this.isIndexOpen = open;
    if (open) {
      this.indexModalEl.style.opacity = '1';
      this.indexModalEl.style.pointerEvents = 'auto';
    } else {
      this.indexModalEl.style.opacity = '0';
      this.indexModalEl.style.pointerEvents = 'none';
    }
  }
}
