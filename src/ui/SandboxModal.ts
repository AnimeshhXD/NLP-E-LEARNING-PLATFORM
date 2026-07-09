import confetti from 'canvas-confetti';

export class SandboxModal {
  private container: HTMLElement;
  private modalEl!: HTMLElement;
  private isOpen: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.attachEvents();
  }

  private render(): void {
    const el = document.createElement('div');
    el.id = 'ai-sandbox-modal';
    el.style.cssText = `
      position:fixed;inset:0;z-index:55;
      background:rgba(247,245,242,0.97);
      backdrop-filter:blur(24px);
      -webkit-backdrop-filter:blur(24px);
      display:flex;align-items:center;justify-content:center;
      padding:1.5rem;
      opacity:0;pointer-events:none;
      transition:opacity 0.25s ease;
    `;

    el.innerHTML = `
      <div style="
        max-width:960px;width:100%;
        max-height:92vh;
        background:#FFFFFF;
        border:1px solid #DDD8CE;
        border-radius:16px;
        box-shadow:0 24px 64px rgba(0,0,0,0.10),0 8px 24px rgba(0,0,0,0.05);
        display:flex;flex-direction:column;
        overflow:hidden;
      ">
        <!-- Header -->
        <div style="
          display:flex;align-items:center;justify-content:space-between;
          padding:1.5rem 2rem;
          border-bottom:1px solid #ECE8E1;
          flex-shrink:0;
        ">
          <div>
            <h2 style="
              font-family:var(--font-serif);
              font-size:1.5rem;font-weight:400;
              color:#1B1B1B;margin-bottom:2px;
            ">Semantic Sandbox</h2>
            <p style="
              font-family:var(--font-mono);font-size:0.7rem;color:#888880;
            ">Type any sentence to compute tokens, stems, vectors &amp; semantic analysis</p>
          </div>
          <button id="close-sandbox-btn" style="
            width:34px;height:34px;border-radius:50%;
            border:1px solid #DDD8CE;background:#F7F5F2;
            color:#555555;font-size:1rem;cursor:pointer;
            display:flex;align-items:center;justify-content:center;
            transition:all 0.2s ease;flex-shrink:0;
          " onmouseover="this.style.background='#ECE8E1';this.style.borderColor='#C8C0B2';"
             onmouseout="this.style.background='#F7F5F2';this.style.borderColor='#DDD8CE';">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div style="flex:1;overflow-y:auto;padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1.5rem;" class="custom-scrollbar">

          <!-- Input Area -->
          <div style="display:flex;flex-direction:column;gap:10px;">
            <label style="
              font-family:var(--font-mono);font-size:0.65rem;
              letter-spacing:0.1em;text-transform:uppercase;color:#888880;
            ">Input text stream</label>

            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <input
                id="sandbox-input"
                type="text"
                value="I love learning Natural Language Processing!"
                placeholder="Type a sentence to analyze..."
                style="
                  flex:1;min-width:200px;
                  padding:10px 16px;border-radius:8px;
                  border:1px solid #DDD8CE;
                  background:#FAFAF8;
                  font-family:var(--font-sans);font-size:0.9rem;
                  color:#1B1B1B;
                  outline:none;
                  transition:border-color 0.2s ease;
                "
                onfocus="this.style.borderColor='#C65D3B';"
                onblur="this.style.borderColor='#DDD8CE';"
              />
              <button id="run-analyze-btn" style="
                padding:10px 24px;border-radius:8px;
                border:none;background:#C65D3B;color:#FFFFFF;
                font-family:var(--font-sans);font-size:0.875rem;font-weight:500;
                cursor:pointer;white-space:nowrap;
                transition:all 0.2s ease;
                box-shadow:0 2px 8px rgba(198,93,59,0.25);
              " onmouseover="this.style.background='#E8856A';this.style.transform='translateY(-1px)';"
                 onmouseout="this.style.background='#C65D3B';this.style.transform='none';">
                Analyze →
              </button>
            </div>

            <!-- Presets -->
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;">
              <span style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;letter-spacing:0.08em;">Try:</span>
              ${[
                { label:'Why is the sky blue?', text:'Why is the sky blue and how do birds fly?' },
                { label:'Apple ambiguity', text:'Apple iPhone vs Apple Fruit in vector coordinates.' },
                { label:'Attention paper', text:'Attention is all you need for self-improving artificial intelligence.' }
              ].map(p => `
                <button class="preset-btn" data-text="${p.text}" style="
                  padding:4px 12px;border-radius:100px;
                  border:1px solid #DDD8CE;background:#F7F5F2;
                  font-family:var(--font-mono);font-size:0.65rem;
                  color:#555555;cursor:pointer;
                  transition:all 0.2s ease;
                " onmouseover="this.style.borderColor='#C65D3B';this.style.color='#C65D3B';"
                   onmouseout="this.style.borderColor='#DDD8CE';this.style.color='#555555';">
                  ${p.label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Loading State -->
          <div id="sandbox-loading" style="display:none;flex-direction:column;align-items:center;justify-content:center;padding:3rem;text-align:center;">
            <div style="
              width:32px;height:32px;border-radius:50%;
              border:2px solid #ECE8E1;border-top-color:#C65D3B;
              animation:spin 0.8s linear infinite;margin-bottom:1rem;
            "></div>
            <div style="font-family:var(--font-mono);font-size:0.7rem;color:#888880;">
              Computing vector embeddings…
            </div>
          </div>

          <!-- Results -->
          <div id="sandbox-results" style="display:flex;flex-direction:column;gap:1.25rem;transition:opacity 0.2s ease;">

            <!-- Token Breakdown -->
            <div>
              <div style="font-family:var(--font-mono);font-size:0.65rem;color:#4F5D95;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.75rem;">
                Tokenization &amp; Stopword Filtering
              </div>
              <div id="res-tokens" style="
                display:flex;flex-wrap:wrap;gap:8px;
                padding:1rem 1.25rem;border-radius:10px;
                border:1px solid #ECE8E1;background:#FAFAF8;
                min-height:60px;align-items:center;
              "></div>
            </div>

            <!-- Two columns: morphology + semantic -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;">

              <!-- Morphology & Vectors -->
              <div style="
                padding:1.25rem;border-radius:10px;
                border:1px solid #ECE8E1;background:#FAFAF8;
              ">
                <div style="font-family:var(--font-mono);font-size:0.65rem;color:#C9A227;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.75rem;">
                  Morphology &amp; Vector Weights
                </div>
                <div id="res-morphology" style="display:flex;flex-direction:column;gap:6px;max-height:200px;overflow-y:auto;" class="custom-scrollbar"></div>
                <div style="
                  margin-top:1rem;padding-top:0.75rem;border-top:1px solid #ECE8E1;
                  display:flex;justify-content:space-between;
                  font-family:var(--font-mono);font-size:0.65rem;color:#888880;
                ">
                  <span>Dimensions: 4-axis projection</span>
                  <span style="color:#C9A227;">cosine ready</span>
                </div>
              </div>

              <!-- Cognitive Semantic Analysis -->
              <div style="
                padding:1.25rem;border-radius:10px;
                border:1px solid rgba(79,93,149,0.2);
                background:rgba(79,93,149,0.04);
              ">
                <div style="
                  display:flex;align-items:center;justify-content:space-between;
                  margin-bottom:0.75rem;
                ">
                  <span style="font-family:var(--font-mono);font-size:0.65rem;color:#4F5D95;letter-spacing:0.1em;text-transform:uppercase;">
                    Semantic Analysis
                  </span>
                  <span style="
                    font-family:var(--font-mono);font-size:0.6rem;
                    padding:2px 8px;border-radius:3px;
                    background:rgba(79,93,149,0.08);border:1px solid rgba(79,93,149,0.2);
                    color:#4F5D95;
                  ">API</span>
                </div>
                <div id="res-semantic-content" style="display:flex;flex-direction:column;gap:10px;"></div>
                <div style="
                  margin-top:1rem;padding-top:0.75rem;border-top:1px solid rgba(79,93,149,0.12);
                  display:flex;align-items:center;gap:6px;
                  font-family:var(--font-mono);font-size:0.65rem;color:#3A7D44;
                ">
                  <span style="width:6px;height:6px;border-radius:50%;background:#3A7D44;display:inline-block;"></span>
                  Transformer attention weights synchronized
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
    `;

    this.container.appendChild(el);
    this.modalEl = el;
  }

  private attachEvents(): void {
    const closeBtn = document.getElementById('close-sandbox-btn')!;
    closeBtn.addEventListener('click', () => this.close());

    // Close on backdrop click
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    const runBtn = document.getElementById('run-analyze-btn')!;
    const inputEl = document.getElementById('sandbox-input') as HTMLInputElement;

    runBtn.addEventListener('click', () => {
      this.analyzeText(inputEl.value);
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.analyzeText(inputEl.value);
    });

    this.modalEl.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-text');
        if (text) {
          inputEl.value = text;
          this.analyzeText(text);
        }
      });
    });

    setTimeout(() => this.analyzeText(inputEl.value), 500);
  }

  public open(presetText?: string): void {
    if (presetText) {
      const inputEl = document.getElementById('sandbox-input') as HTMLInputElement;
      if (inputEl) inputEl.value = presetText;
      this.analyzeText(presetText);
    }
    this.isOpen = true;
    this.modalEl.style.opacity = '1';
    this.modalEl.style.pointerEvents = 'auto';
  }

  public close(): void {
    this.isOpen = false;
    this.modalEl.style.opacity = '0';
    this.modalEl.style.pointerEvents = 'none';
  }

  private async analyzeText(text: string): Promise<void> {
    if (!text || !text.trim()) return;

    const loadingEl = document.getElementById('sandbox-loading')!;
    const resultsEl = document.getElementById('sandbox-results')!;
    const tokensEl  = document.getElementById('res-tokens')!;
    const morphEl   = document.getElementById('res-morphology')!;
    const semanticEl = document.getElementById('res-semantic-content')!;

    loadingEl.style.display = 'flex';
    resultsEl.style.opacity = '0.3';
    resultsEl.style.pointerEvents = 'none';

    try {
      const response = await fetch('/api/nlp/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (response.ok && data) {
        // Render Tokens
        tokensEl.innerHTML = data.tokens.map((tok: any) => `
          <span style="
            display:inline-flex;align-items:center;gap:5px;
            padding:5px 12px;border-radius:6px;
            ${tok.isStopword
              ? 'border:1px solid rgba(160,48,48,0.2);background:rgba(160,48,48,0.06);color:#A03030;text-decoration:line-through;opacity:0.55;'
              : 'border:1px solid rgba(79,93,149,0.25);background:rgba(79,93,149,0.07);color:#4F5D95;font-weight:500;'}
            font-family:var(--font-mono);font-size:0.8rem;
          ">
            ${tok.original}
            <span style="
              font-size:0.6rem;padding:1px 5px;border-radius:3px;
              background:rgba(0,0,0,0.05);color:#888880;
            ">${tok.isStopword ? 'stop' : 'core'}</span>
          </span>
        `).join('');

        // Render Morphology & Vectors
        morphEl.innerHTML = data.tokens.slice(0, 8).map((tok: any) => `
          <div style="
            display:flex;align-items:center;justify-content:space-between;
            padding:8px 10px;border-radius:6px;
            background:#FFFFFF;border:1px solid #ECE8E1;
          ">
            <div style="display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:0.75rem;">
              <span style="color:#1B1B1B;font-weight:500;">${tok.clean || tok.original}</span>
              <span style="color:#C8C0B2;">→</span>
              <span style="color:#C9A227;">${tok.stem}</span>
            </div>
            <span style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;">
              [${tok.vector ? tok.vector.join(', ') : '0.1, 0.5, -0.2'}]
            </span>
          </div>
        `).join('');

        // Render Semantic Analysis
        const ana = data.analysis || {};
        semanticEl.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span style="
              font-family:var(--font-mono);font-size:0.7rem;
              padding:3px 12px;border-radius:4px;
              ${ana.sentiment === 'Positive'
                ? 'background:rgba(58,125,68,0.08);border:1px solid rgba(58,125,68,0.25);color:#3A7D44;'
                : 'background:rgba(79,93,149,0.08);border:1px solid rgba(79,93,149,0.25);color:#4F5D95;'}
            ">Sentiment: ${ana.sentiment || 'Neutral'}</span>
            <span style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;">
              ${data.tokenCount || 0} tokens analyzed
            </span>
          </div>

          <div style="
            padding:12px 14px;border-radius:8px;
            background:#FFFFFF;border:1px solid #ECE8E1;
          ">
            <div style="font-family:var(--font-mono);font-size:0.65rem;color:#4F5D95;margin-bottom:6px;">Semantic Summary</div>
            <p style="font-size:0.875rem;color:#555555;line-height:1.65;">
              ${ana.semanticSummary || 'High-dimensional vector embedding mapped across contextual self-attention weights.'}
            </p>
          </div>

          ${(ana.namedEntities || []).length > 0 ? `
            <div>
              <div style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;margin-bottom:6px;">Named Entities</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${(ana.namedEntities || []).map((ent: string) => `
                  <span style="
                    font-family:var(--font-mono);font-size:0.7rem;
                    padding:3px 10px;border-radius:4px;
                    background:rgba(79,93,149,0.06);border:1px solid rgba(79,93,149,0.2);
                    color:#4F5D95;
                  ">${ent}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        `;

        // Subtle confetti — warm palette
        if (this.isOpen) {
          try {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.85 },
              colors: ['#C65D3B', '#4F5D95', '#C9A227', '#3A7D44']
            });
          } catch (e) {}
        }
      }
    } catch (err) {
      console.error('Sandbox error:', err);
      semanticEl.innerHTML = `
        <div style="
          padding:10px 14px;border-radius:8px;
          background:rgba(160,48,48,0.06);border:1px solid rgba(160,48,48,0.2);
          font-family:var(--font-mono);font-size:0.75rem;color:#A03030;
        ">Could not connect to analysis engine. Check network connection or API key.</div>
      `;
    } finally {
      loadingEl.style.display = 'none';
      resultsEl.style.opacity = '1';
      resultsEl.style.pointerEvents = 'auto';
    }
  }
}
