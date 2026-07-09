import { SECTIONS_DATA, SAMPLE_TOKENS, APPLICATION_PANELS, RESEARCH_TIMELINE, SUSTAINABILITY_METRICS } from '../data/storyData';

export class Sections {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private render(): void {
    let html = '';

    SECTIONS_DATA.forEach((sec, idx) => {
      html += `
        <section
          id="${sec.id}"
          class="story-section"
          data-section-id="${sec.id}"
          data-section-num="${sec.number}"
          data-section-title="${sec.title}"
          style="
            min-height:100vh;width:100%;
            position:relative;
            display:flex;flex-direction:column;
            justify-content:center;align-items:center;
            padding:7rem clamp(1.5rem,5vw,5rem) 5rem;
            z-index:10;
          "
        >
          ${this.renderSectionContent(sec, idx)}
        </section>
      `;
    });

    this.container.innerHTML = html;
  }

  private sectionLabel(number: string, title: string, accentColor = '#888880'): string {
    return `
      <div class="section-label" style="color:${accentColor};margin-bottom:1.25rem;">
        ${number} — ${title}
      </div>
    `;
  }

  private renderSectionContent(sec: any, idx: number): string {
    switch (sec.id) {

      // ── 01 HERO ──────────────────────────────────────────────
      case 'hero':
        return `
          <div style="
            max-width:680px;text-align:center;
            display:flex;flex-direction:column;align-items:center;
            gap:0;
          ">
            <!-- Academic Identity -->
            <div class="academic-badge section-reveal" style="margin-bottom:2.5rem;">
              <span style="
                font-family:var(--font-mono);
                font-size:0.65rem;letter-spacing:0.14em;
                text-transform:uppercase;color:#888880;
              ">Natural Language Processing — Student Case Study</span>
              <span style="
                font-family:var(--font-serif);
                font-size:1.0rem;color:#1B1B1B;margin-top:2px;
              ">NLP Odyssey</span>
            </div>

            <!-- The core statement -->
            <h1 style="
              font-family:var(--font-serif);
              font-size:clamp(2.2rem,5vw,3.5rem);
              font-weight:400;
              color:#1B1B1B;
              line-height:1.2;
              letter-spacing:-0.02em;
              margin-bottom:1.75rem;
            " class="section-reveal">
              Every conversation begins<br>
              with words.
            </h1>

            <p style="
              font-family:var(--font-sans);
              font-size:1.0625rem;
              color:#555555;
              line-height:1.8;
              max-width:52ch;
              margin-bottom:3rem;
            " class="section-reveal">
              This experience explores how machines learn to understand them — from raw characters to meaning, from meaning to intelligence.
            </p>

            <!-- Scroll hint -->
            <div class="scroll-hint section-reveal" style="margin-top:0.5rem;">
              <span>Scroll to explore</span>
              <div class="scroll-arrow"></div>
            </div>
          </div>
        `;

      // ── 02 RAW TEXT ───────────────────────────────────────────
      case 'raw-text':
        return `
          <div style="max-width:740px;width:100%;text-align:center;">
            ${this.sectionLabel(sec.number, sec.title)}
            <h2 style="
              font-family:var(--font-serif);
              font-size:clamp(1.75rem,3.5vw,2.75rem);
              font-weight:400;color:#1B1B1B;
              margin-bottom:0.75rem;
            " class="section-reveal">${sec.subtitle}</h2>
            <p style="
              font-size:0.9375rem;color:#555555;
              max-width:54ch;margin:0 auto 2.5rem;
              line-height:1.75;
            " class="section-reveal">${sec.description}</p>

            <div id="raw-text-card" class="panel section-reveal" style="
              padding:2.5rem 3rem;
              border-radius:16px;
              text-align:left;
              border-top:3px solid #C65D3B;
            ">
              <div style="
                font-family:var(--font-mono);
                font-size:0.65rem;
                letter-spacing:0.12em;
                text-transform:uppercase;
                color:#888880;
                margin-bottom:1.25rem;
              ">// Raw string input stream</div>

              <div id="raw-text-string" style="
                font-family:var(--font-serif);
                font-size:clamp(1.25rem,3vw,2.25rem);
                color:#1B1B1B;
                letter-spacing:0.02em;
                line-height:1.5;
                word-break:break-all;
                padding:1rem 0;
              ">
                ${"I love studying Natural Language Processing.".split('').map((char, i) => `
                  <span class="raw-char" style="display:inline-block;${char === ' ' ? 'width:0.4em;' : ''}" data-idx="${i}">${char === ' ' ? '&nbsp;' : char}</span>
                `).join('')}
              </div>

              <div style="
                display:flex;justify-content:space-between;
                margin-top:1.25rem;
                padding-top:1rem;
                border-top:1px solid #ECE8E1;
                font-family:var(--font-mono);
                font-size:0.7rem;
                color:#888880;
              ">
                <span>Encoding: UTF-8</span>
                <span>Bytes: 44</span>
                <span>ASCII stream</span>
              </div>
            </div>
          </div>
        `;

      // ── 03 SEGMENTATION ───────────────────────────────────────
      case 'segmentation':
        return `
          <div style="max-width:900px;width:100%;">
            <div style="text-align:center;margin-bottom:3rem;">
              ${this.sectionLabel(sec.number, sec.title)}
              <h2 style="
                font-family:var(--font-serif);
                font-size:clamp(1.75rem,3.5vw,2.75rem);
                font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
              " class="section-reveal">${sec.subtitle}</h2>
              <p style="
                font-size:0.9375rem;color:#555555;max-width:54ch;
                margin:0 auto;line-height:1.75;
              " class="section-reveal">${sec.description}</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;">
              ${[
                { num: '01', label: 'SENTENCE', text: '"I love studying Natural Language Processing."',  tokens: 7, intent: 'Affinity',     color: '#C65D3B' },
                { num: '02', label: 'SENTENCE', text: '"Before algorithms understand meaning, they must separate thoughts."', tokens: 8, intent: 'Explanation', color: '#4F5D95' },
                { num: '03', label: 'SENTENCE', text: '"Each sentence is an independent grammatical container."', tokens: 7, intent: 'Definition',  color: '#C9A227' }
              ].map(s => `
                <div class="panel segment-block" style="
                  padding:1.5rem;
                  border-top:3px solid ${s.color};
                ">
                  <div style="
                    font-family:var(--font-mono);
                    font-size:0.65rem;letter-spacing:0.1em;
                    text-transform:uppercase;color:${s.color};margin-bottom:0.75rem;
                  ">Sentence ${s.num}</div>
                  <p style="
                    font-family:var(--font-serif);
                    font-size:1.0625rem;color:#1B1B1B;
                    line-height:1.5;margin-bottom:1rem;
                  ">${s.text}</p>
                  <div style="
                    display:flex;justify-content:space-between;
                    padding-top:0.75rem;border-top:1px solid #ECE8E1;
                    font-family:var(--font-mono);font-size:0.7rem;color:#888880;
                  ">
                    <span>Tokens: ${s.tokens}</span>
                    <span>Intent: ${s.intent}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      // ── 04 TOKENIZATION ───────────────────────────────────────
      case 'tokenization':
        return `
          <div style="max-width:800px;width:100%;text-align:center;">
            ${this.sectionLabel(sec.number, sec.title)}
            <h2 style="
              font-family:var(--font-serif);
              font-size:clamp(1.75rem,3.5vw,2.75rem);
              font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
            " class="section-reveal">${sec.subtitle}</h2>
            <p style="
              font-size:0.9375rem;color:#555555;
              max-width:54ch;margin:0 auto 2rem;line-height:1.75;
            " class="section-reveal">${sec.description}</p>

            <div class="callout callout-indigo section-reveal" style="
              text-align:left;margin-bottom:2rem;border-radius:8px;
            ">
              <strong style="font-weight:600;color:#4F5D95;">Interaction:</strong>
              Hover or click the 3D token cubes floating in the scene, or select a word below to inspect its linguistic properties.
            </div>

            <!-- Token Inspector -->
            <div id="token-inspector" class="panel section-reveal" style="
              padding:1.75rem 2rem;text-align:left;
              border-left:3px solid #4F5D95;max-width:540px;margin:0 auto 2rem;
            ">
              <div style="
                display:flex;align-items:center;justify-content:space-between;
                padding-bottom:0.75rem;margin-bottom:1rem;
                border-bottom:1px solid #ECE8E1;
              ">
                <span style="
                  font-family:var(--font-mono);font-size:0.7rem;
                  letter-spacing:0.1em;text-transform:uppercase;color:#888880;
                ">Token Inspector</span>
                <span id="inspector-id" style="
                  font-family:var(--font-mono);font-size:0.7rem;
                  padding:3px 10px;border-radius:4px;
                  background:rgba(79,93,149,0.08);
                  border:1px solid rgba(79,93,149,0.2);
                  color:#4F5D95;
                ">Select a token</span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
                <div>
                  <div style="font-family:var(--font-mono);font-size:0.7rem;color:#888880;margin-bottom:4px;">Word Token</div>
                  <div id="inspector-word" style="
                    font-family:var(--font-serif);
                    font-size:2rem;color:#1B1B1B;
                  ">love</div>
                </div>
                <div>
                  <div style="font-family:var(--font-mono);font-size:0.7rem;color:#888880;margin-bottom:4px;">TF-IDF Weight</div>
                  <div id="inspector-tfidf" style="
                    font-family:var(--font-serif);
                    font-size:2rem;color:#C65D3B;
                  ">0.82</div>
                </div>
              </div>
              <div id="inspector-desc" style="
                font-size:0.875rem;color:#555555;line-height:1.7;
              ">
                High positive affective valence. Strong semantic link to affinity, emotion, and appreciation.
              </div>
            </div>

            <!-- Token buttons -->
            <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;" class="section-reveal">
              ${SAMPLE_TOKENS.map(t => `
                <button class="token-btn" data-tok-id="${t.id}" style="pointer-events:auto;">
                  ${t.word}
                </button>
              `).join('')}
            </div>
          </div>
        `;

      // ── 05 CLEANING ───────────────────────────────────────────
      case 'cleaning':
        return `
          <div style="max-width:740px;width:100%;text-align:center;">
            ${this.sectionLabel(sec.number, sec.title, '#A03030')}
            <h2 style="
              font-family:var(--font-serif);
              font-size:clamp(1.75rem,3.5vw,2.75rem);
              font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
            " class="section-reveal">${sec.subtitle}</h2>
            <p style="
              font-size:0.9375rem;color:#555555;
              max-width:54ch;margin:0 auto 2.5rem;line-height:1.75;
            " class="section-reveal">${sec.description}</p>

            <div class="panel section-reveal" style="padding:2.5rem 2rem;">
              <div style="
                font-family:var(--font-mono);font-size:0.65rem;
                letter-spacing:0.1em;text-transform:uppercase;
                color:#888880;margin-bottom:1.75rem;
              ">Noise reduction — stopwords dissolve</div>

              <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;align-items:center;">
                <span class="clean-stopword word-removed">The</span>
                <span class="clean-content word-kept">computer</span>
                <span class="clean-stopword word-removed">is</span>
                <span class="clean-stopword word-removed">really</span>
                <span class="clean-content word-kept">processing</span>
                <span class="clean-stopword word-removed">at</span>
                <span class="clean-content word-kept">high</span>
                <span class="clean-content word-kept">speed</span>
              </div>

              <div style="
                display:flex;justify-content:center;gap:2rem;
                margin-top:1.75rem;padding-top:1.25rem;
                border-top:1px solid #ECE8E1;
                font-family:var(--font-mono);font-size:0.7rem;
              ">
                <span style="display:flex;align-items:center;gap:6px;color:#A03030;">
                  <span style="width:10px;height:10px;border-radius:2px;background:rgba(160,48,48,0.2);display:inline-block;"></span>
                  Stopwords removed
                </span>
                <span style="display:flex;align-items:center;gap:6px;color:#3A7D44;">
                  <span style="width:10px;height:10px;border-radius:2px;background:rgba(58,125,68,0.2);display:inline-block;border:1px solid rgba(58,125,68,0.4);"></span>
                  Semantic content kept
                </span>
              </div>
            </div>
          </div>
        `;

      // ── 06 STEMMING ───────────────────────────────────────────
      case 'stemming':
        return `
          <div style="max-width:740px;width:100%;text-align:center;">
            ${this.sectionLabel(sec.number, sec.title, '#C9A227')}
            <h2 style="
              font-family:var(--font-serif);
              font-size:clamp(1.75rem,3.5vw,2.75rem);
              font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
            " class="section-reveal">${sec.subtitle}</h2>
            <p style="
              font-size:0.9375rem;color:#555555;
              max-width:54ch;margin:0 auto 2.5rem;line-height:1.75;
            " class="section-reveal">${sec.description}</p>

            <div style="
              display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
              gap:1rem;max-width:560px;margin:0 auto 2rem;
            ">
              ${[
                { word: 'Running', strip: '–ing' },
                { word: 'Runner',  strip: '–ner' },
                { word: 'Runs',    strip: '–s'   }
              ].map(s => `
                <div class="panel stem-box" style="padding:1.5rem;text-align:center;">
                  <div style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;margin-bottom:8px;">Original token</div>
                  <div style="font-family:var(--font-serif);font-size:1.75rem;color:#1B1B1B;margin-bottom:10px;">${s.word}</div>
                  <div style="
                    font-family:var(--font-mono);font-size:0.7rem;
                    color:#A03030;
                    padding:3px 10px;border-radius:4px;
                    background:rgba(160,48,48,0.07);
                    display:inline-block;
                  ">Strip suffix ${s.strip}</div>
                </div>
              `).join('')}
            </div>

            <div style="display:flex;align-items:center;justify-content:center;gap:1rem;margin-bottom:1.5rem;" class="section-reveal">
              <div style="flex:1;max-width:120px;height:1px;background:#DDD8CE;"></div>
              <span style="
                font-family:var(--font-mono);font-size:0.7rem;
                color:#888880;letter-spacing:0.08em;
              ">↓  all collapse to</span>
              <div style="flex:1;max-width:120px;height:1px;background:#DDD8CE;"></div>
            </div>

            <div class="panel section-reveal" style="
              display:inline-block;padding:1.5rem 3rem;
              border-top:3px solid #C9A227;
            ">
              <div style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;margin-bottom:6px;">Porter Stemmer output</div>
              <div style="font-family:var(--font-serif);font-size:3rem;color:#1B1B1B;letter-spacing:0.05em;">RUN</div>
            </div>
          </div>
        `;

      // ── 07 LEMMATIZATION ──────────────────────────────────────
      case 'lemmatization':
        return `
          <div style="max-width:740px;width:100%;text-align:center;">
            ${this.sectionLabel(sec.number, sec.title, '#3A7D44')}
            <h2 style="
              font-family:var(--font-serif);
              font-size:clamp(1.75rem,3.5vw,2.75rem);
              font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
            " class="section-reveal">${sec.subtitle}</h2>
            <p style="
              font-size:0.9375rem;color:#555555;
              max-width:54ch;margin:0 auto 2.5rem;line-height:1.75;
            " class="section-reveal">${sec.description}</p>

            <div class="panel section-reveal" style="padding:2rem 2.5rem;border-left:3px solid #3A7D44;">
              <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:1.5rem;align-items:center;">
                <!-- Input forms -->
                <div style="display:flex;flex-direction:column;gap:10px;">
                  ${['Better', 'Best', 'Good'].map(w => `
                    <div style="
                      padding:12px 16px;border-radius:8px;
                      background:#F7F5F2;border:1px solid #DDD8CE;
                      font-family:var(--font-serif);
                      font-size:1.25rem;color:#1B1B1B;text-align:center;
                    ">${w}</div>
                  `).join('')}
                </div>

                <!-- Arrow + label -->
                <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                  <span style="
                    font-family:var(--font-mono);font-size:0.65rem;
                    color:#3A7D44;letter-spacing:0.08em;text-align:center;line-height:1.4;
                  ">WordNet<br>Lookup</span>
                  <div style="font-size:1.5rem;color:#3A7D44;">→</div>
                </div>

                <!-- Output -->
                <div style="
                  padding:1.5rem;border-radius:10px;
                  background:rgba(58,125,68,0.06);
                  border:1px solid rgba(58,125,68,0.25);
                  text-align:center;
                ">
                  <div style="font-family:var(--font-mono);font-size:0.65rem;color:#3A7D44;margin-bottom:6px;">Dictionary lemma</div>
                  <div style="font-family:var(--font-serif);font-size:2.75rem;color:#1B1B1B;">Good</div>
                </div>
              </div>
              <div class="callout callout-forest" style="margin-top:1.5rem;border-radius:6px;">
                Unlike stemming, lemmatization preserves the word's true base form by consulting a dictionary — producing linguistically valid roots.
              </div>
            </div>
          </div>
        `;

      // ── 08 FEATURES ───────────────────────────────────────────
      case 'features':
        return `
          <div style="max-width:900px;width:100%;">
            <div style="text-align:center;margin-bottom:3rem;">
              ${this.sectionLabel(sec.number, sec.title)}
              <h2 style="
                font-family:var(--font-serif);
                font-size:clamp(1.75rem,3.5vw,2.75rem);
                font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
              " class="section-reveal">${sec.subtitle}</h2>
              <p style="font-size:0.9375rem;color:#555555;max-width:54ch;margin:0 auto;line-height:1.75;" class="section-reveal">${sec.description}</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;">
              ${[
                { num:'01', label:'Term Frequency (TF)', title:'Local Occurrence', desc:'How often does a word appear in this specific document?', formula:'TF = count(W, D) / total_words', fill:72, color:'#C65D3B', accent:'--terracotta' },
                { num:'02', label:'Inverse Doc Frequency (IDF)', title:'Global Rarity', desc:'How rare is this word across all documents in the corpus?', formula:'IDF = log(total_docs / docs_with_W)', fill:87, color:'#4F5D95', accent:'--indigo' },
                { num:'03', label:'TF-IDF Product', title:'Semantic Signature', desc:'Words frequent locally but rare globally become powerful distinguishing vectors.', formula:'TF × IDF = Vector Weight', fill:95, color:'#C9A227', accent:'--gold' }
              ].map(f => `
                <div class="panel section-reveal" style="padding:1.5rem;border-top:3px solid ${f.color};">
                  <div style="font-family:var(--font-mono);font-size:0.65rem;color:${f.color};letter-spacing:0.08em;margin-bottom:0.5rem;">${f.num} / ${f.label}</div>
                  <h3 style="font-family:var(--font-serif);font-size:1.25rem;font-weight:400;color:#1B1B1B;margin-bottom:0.5rem;">${f.title}</h3>
                  <p style="font-size:0.8rem;color:#555555;line-height:1.65;margin-bottom:1rem;">${f.desc}</p>
                  <div class="progress-track" style="margin-bottom:8px;">
                    <div class="progress-fill" style="width:${f.fill}%;background:${f.color};"></div>
                  </div>
                  <div style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;text-align:right;">${f.formula}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      // ── 09 EMBEDDINGS ─────────────────────────────────────────
      case 'embeddings':
        return `
          <div style="max-width:800px;width:100%;text-align:center;">
            ${this.sectionLabel(sec.number, sec.title)}
            <h2 style="
              font-family:var(--font-serif);
              font-size:clamp(1.75rem,3.5vw,2.75rem);
              font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
            " class="section-reveal">${sec.subtitle}</h2>
            <p style="
              font-size:0.9375rem;color:#555555;
              max-width:54ch;margin:0 auto 2.5rem;line-height:1.75;
            " class="section-reveal">${sec.description}</p>

            <div class="panel section-reveal" style="padding:2.5rem 2rem;border-top:3px solid #C9A227;">
              <div style="
                font-family:var(--font-mono);font-size:0.65rem;
                color:#888880;letter-spacing:0.1em;margin-bottom:1.75rem;
              ">Famous vector arithmetic in 3D space</div>

              <div style="
                display:flex;flex-wrap:wrap;align-items:center;
                justify-content:center;gap:1rem;
                font-family:var(--font-serif);
                font-size:clamp(1.5rem,4vw,2.5rem);
              ">
                <span style="
                  padding:0.4em 0.7em;border-radius:8px;
                  background:rgba(201,162,39,0.1);
                  border:1px solid rgba(201,162,39,0.3);
                  color:#8B6E00;
                ">King</span>
                <span style="font-size:0.8em;color:#888880;">−</span>
                <span style="
                  padding:0.4em 0.7em;border-radius:8px;
                  background:rgba(79,93,149,0.1);
                  border:1px solid rgba(79,93,149,0.3);
                  color:#4F5D95;
                ">Man</span>
                <span style="font-size:0.8em;color:#888880;">+</span>
                <span style="
                  padding:0.4em 0.7em;border-radius:8px;
                  background:rgba(198,93,59,0.1);
                  border:1px solid rgba(198,93,59,0.3);
                  color:#C65D3B;
                ">Woman</span>
                <span style="font-size:0.8em;color:#1B1B1B;">=</span>
                <span style="
                  padding:0.4em 0.85em;border-radius:8px;
                  background:#1B1B1B;color:#F7F5F2;
                  font-weight:400;
                ">Queen</span>
              </div>

              <p style="
                margin-top:1.5rem;
                font-size:0.85rem;color:#555555;line-height:1.7;
                max-width:52ch;margin-left:auto;margin-right:auto;
              ">
                Subtracting the "masculine" direction from King and adding the "feminine" direction lands precisely on the vector coordinates for Queen.
              </p>
            </div>
          </div>
        `;

      // ── 10 WORD2VEC ───────────────────────────────────────────
      case 'word2vec':
        return `
          <div style="max-width:900px;width:100%;">
            <div style="text-align:center;margin-bottom:3rem;">
              ${this.sectionLabel(sec.number, sec.title, '#4F5D95')}
              <h2 style="
                font-family:var(--font-serif);
                font-size:clamp(1.75rem,3.5vw,2.75rem);
                font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
              " class="section-reveal">${sec.subtitle}</h2>
              <p style="font-size:0.9375rem;color:#555555;max-width:54ch;margin:0 auto;line-height:1.75;" class="section-reveal">${sec.description}</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.25rem;">
              <div class="panel section-reveal" style="padding:2rem;border-left:3px solid #4F5D95;">
                <div style="font-family:var(--font-mono);font-size:0.65rem;color:#4F5D95;letter-spacing:0.08em;margin-bottom:0.75rem;">Skip-Gram Architecture</div>
                <h3 style="font-family:var(--font-serif);font-size:1.375rem;font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;">Predicting the Context</h3>
                <p style="font-size:0.875rem;color:#555555;line-height:1.7;margin-bottom:1.25rem;">
                  Given a center word like <em style="font-style:italic;color:#4F5D95;">"coffee"</em>, the neural network learns to predict surrounding words: <span style="font-family:var(--font-mono);font-size:0.8em;color:#888880;">"morning", "hot", "drink", "cup"</span>.
                </p>
                <div class="callout callout-indigo" style="border-radius:6px;">
                  <strong style="color:#4F5D95;">Objective:</strong> Maximize log probability of context words given the center word's vector weights.
                </div>
              </div>

              <div class="panel section-reveal" style="padding:2rem;border-left:3px solid #C65D3B;">
                <div style="font-family:var(--font-mono);font-size:0.65rem;color:#C65D3B;letter-spacing:0.08em;margin-bottom:0.75rem;">Continuous Bag of Words (CBOW)</div>
                <h3 style="font-family:var(--font-serif);font-size:1.375rem;font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;">Predicting the Center</h3>
                <p style="font-size:0.875rem;color:#555555;line-height:1.7;margin-bottom:1.25rem;">
                  The inverse: given context words <span style="font-family:var(--font-mono);font-size:0.8em;color:#888880;">"the", "black", "___", "jumped"</span>, predict the missing target — <em style="font-style:italic;color:#C65D3B;">"cat"</em> or <em style="font-style:italic;color:#C65D3B;">"dog"</em>.
                </p>
                <div class="callout" style="border-radius:6px;">
                  <strong style="color:#C65D3B;">Emergent property:</strong> Words with similar replacement contexts acquire nearly identical vector coordinates.
                </div>
              </div>
            </div>
          </div>
        `;

      // ── 11 TRANSFORMERS ───────────────────────────────────────
      case 'transformers':
        return `
          <div style="max-width:820px;width:100%;text-align:center;">
            ${this.sectionLabel(sec.number, sec.title, '#4F5D95')}
            <h2 style="
              font-family:var(--font-serif);
              font-size:clamp(1.75rem,3.5vw,2.75rem);
              font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
            " class="section-reveal">${sec.subtitle}</h2>
            <p style="
              font-size:0.9375rem;color:#555555;
              max-width:54ch;margin:0 auto 2.5rem;line-height:1.75;
            " class="section-reveal">${sec.description}</p>

            <div class="panel section-reveal" style="padding:2rem 2.5rem;text-align:left;border-top:3px solid #4F5D95;">
              <div style="
                display:flex;align-items:flex-start;justify-content:space-between;
                padding-bottom:1rem;margin-bottom:1.25rem;
                border-bottom:1px solid #ECE8E1;gap:1rem;flex-wrap:wrap;
              ">
                <div>
                  <div style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Interactive Self-Attention Simulator</div>
                  <div style="font-size:0.875rem;color:#555555;">
                    Click the word <span id="att-trigger-it" class="att-word att-trigger" style="
                      cursor:pointer;font-weight:600;
                      background:rgba(79,93,149,0.1);
                      border:1px solid rgba(79,93,149,0.3);
                      color:#4F5D95;padding:3px 10px;border-radius:5px;
                    ">it</span> to see which words the model attends to.
                  </div>
                </div>
                <span style="
                  font-family:var(--font-mono);font-size:0.65rem;
                  padding:4px 12px;border-radius:4px;
                  background:rgba(79,93,149,0.08);border:1px solid rgba(79,93,149,0.2);
                  color:#4F5D95;white-space:nowrap;
                ">Multi-Head Attention</span>
              </div>

              <div id="attention-sentence" style="
                font-family:var(--font-serif);
                font-size:clamp(1.1rem,2.5vw,1.5rem);
                color:#1B1B1B;line-height:1.8;
                display:flex;flex-wrap:wrap;gap:8px;align-items:center;
              ">
                <span class="att-word" data-weight="0.1" style="border:1px solid transparent;">The</span>
                <span class="att-word" data-weight="0.95" id="att-target-animal" style="border:1px solid transparent;">animal</span>
                <span class="att-word" data-weight="0.2" style="border:1px solid transparent;">didn't</span>
                <span class="att-word" data-weight="0.3" style="border:1px solid transparent;">cross</span>
                <span class="att-word" data-weight="0.1" style="border:1px solid transparent;">the</span>
                <span class="att-word" data-weight="0.4" style="border:1px solid transparent;">street</span>
                <span class="att-word" data-weight="0.2" style="border:1px solid transparent;">because</span>
                <span class="att-word" data-weight="0.2" style="border:1px solid transparent;">was</span>
                <span class="att-word" data-weight="0.5" style="border:1px solid transparent;">too</span>
                <span class="att-word" data-weight="0.85" id="att-target-tired" style="border:1px solid transparent;">tired.</span>
              </div>

              <div id="attention-explain" style="
                display:none;
                margin-top:1.25rem;
                padding:1rem 1.25rem;border-radius:8px;
                background:rgba(79,93,149,0.06);
                border-left:3px solid #4F5D95;
                font-size:0.85rem;color:#555555;line-height:1.7;
              ">
                <strong style="color:#4F5D95;">Attention result:</strong>
                "it" attends most strongly to <strong style="color:#1B1B1B;">"animal"</strong> (0.95) and <strong style="color:#1B1B1B;">"tired"</strong> (0.85) rather than "street" — because the adjective "tired" contextualises the referent. This context-awareness is what makes Transformers revolutionary.
              </div>
            </div>
          </div>
        `;

      // ── 12 MODERN AI ──────────────────────────────────────────
      case 'modern-ai':
        return `
          <div style="max-width:900px;width:100%;">
            <div style="text-align:center;margin-bottom:3rem;">
              ${this.sectionLabel(sec.number, sec.title)}
              <h2 style="
                font-family:var(--font-serif);
                font-size:clamp(1.75rem,3.5vw,2.75rem);
                font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
              " class="section-reveal">${sec.subtitle}</h2>
              <p style="font-size:0.9375rem;color:#555555;max-width:54ch;margin:0 auto;line-height:1.75;" class="section-reveal">${sec.description}</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;">
              ${[
                { icon:'💬', title:'Conversational AI',  sub:'ChatGPT / LLMs', color:'#C65D3B' },
                { icon:'🌐', title:'Translation',         sub:'200+ Languages',  color:'#4F5D95' },
                { icon:'📝', title:'Summarization',       sub:'Long-context RAG', color:'#C9A227' },
                { icon:'🎯', title:'Recommendation',      sub:'Semantic Search',  color:'#3A7D44' },
                { icon:'🔍', title:'Neural Search',       sub:'Dense Retrieval',  color:'#8B6E5A' },
                { icon:'🗣️', title:'Speech Synthesis',   sub:'Real-time Prosody', color:'#4F5D95' }
              ].map(item => `
                <div class="panel section-reveal" style="padding:1.25rem;text-align:center;border-top:2px solid ${item.color};">
                  <div style="font-size:1.75rem;margin-bottom:0.5rem;">${item.icon}</div>
                  <div style="font-family:var(--font-sans);font-size:0.8rem;font-weight:600;color:#1B1B1B;margin-bottom:3px;">${item.title}</div>
                  <div style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;">${item.sub}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      // ── 13 APPLICATIONS ───────────────────────────────────────
      case 'applications':
        return `
          <div style="max-width:960px;width:100%;">
            <div style="text-align:center;margin-bottom:3.5rem;">
              ${this.sectionLabel(sec.number, sec.title)}
              <h2 style="
                font-family:var(--font-serif);
                font-size:clamp(1.75rem,3.5vw,2.75rem);
                font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
              " class="section-reveal">${sec.subtitle}</h2>
              <p style="font-size:0.9375rem;color:#555555;max-width:54ch;margin:0 auto;line-height:1.75;" class="section-reveal">${sec.description}</p>
            </div>

            <div style="display:flex;flex-direction:column;gap:1.25rem;">
              ${APPLICATION_PANELS.map(app => `
                <div class="panel app-panel" style="
                  padding:1.75rem 2rem;
                  border-left:4px solid ${app.color};
                ">
                  <div style="
                    display:flex;align-items:flex-start;justify-content:space-between;
                    gap:1rem;flex-wrap:wrap;
                    margin-bottom:1rem;padding-bottom:1rem;
                    border-bottom:1px solid #ECE8E1;
                  ">
                    <div>
                      <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
                        <span style="font-size:1.25rem;">${app.illustration}</span>
                        <h3 style="font-family:var(--font-serif);font-size:1.25rem;font-weight:400;color:#1B1B1B;">${app.title}</h3>
                      </div>
                      <p style="font-size:0.875rem;color:#555555;">${app.tagline}</p>
                    </div>
                    <div style="display:flex;flex-wrap:wrap;gap:6px;">
                      ${app.conceptsUsed.map(c => `
                        <span style="
                          font-family:var(--font-mono);font-size:0.65rem;
                          padding:3px 10px;border-radius:4px;
                          background:#F7F5F2;border:1px solid #DDD8CE;color:#555555;
                        ">${c}</span>
                      `).join('')}
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:1fr auto;gap:1.5rem;align-items:start;flex-wrap:wrap;">
                    <div>
                      <div style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.75rem;">Workflow</div>
                      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;">
                        ${app.workflow.map((step: string, sIdx: number) => `
                          <div style="
                            padding:10px 12px;border-radius:8px;
                            background:#F7F5F2;border:1px solid #ECE8E1;
                            font-size:0.8rem;color:#555555;
                            display:flex;gap:8px;align-items:flex-start;
                          ">
                            <span style="
                              font-family:var(--font-mono);
                              font-size:0.65rem;color:${app.color};font-weight:600;flex-shrink:0;
                            ">${sIdx + 1}.</span>
                            <span>${step}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                    <div style="min-width:180px;">
                      <div style="font-family:var(--font-mono);font-size:0.65rem;color:#888880;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Leaders</div>
                      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
                        ${app.companies.map((comp: string) => `
                          <span style="
                            font-family:var(--font-mono);font-size:0.65rem;
                            padding:3px 8px;border-radius:4px;
                            background:#ECE8E1;color:#555555;
                          ">${comp}</span>
                        `).join('')}
                      </div>
                      <div style="
                        padding:8px 10px;border-radius:6px;
                        background:rgba(58,125,68,0.06);
                        border:1px solid rgba(58,125,68,0.2);
                        font-size:0.775rem;color:#3A7D44;line-height:1.5;
                      ">${app.benefits}</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      // ── 14 RESEARCH ───────────────────────────────────────────
      case 'research':
        return `
          <div style="max-width:820px;width:100%;">
            <div style="text-align:center;margin-bottom:3.5rem;">
              ${this.sectionLabel(sec.number, sec.title, '#4F5D95')}
              <h2 style="
                font-family:var(--font-serif);
                font-size:clamp(1.75rem,3.5vw,2.75rem);
                font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
              " class="section-reveal">${sec.subtitle}</h2>
              <p style="font-size:0.9375rem;color:#555555;max-width:54ch;margin:0 auto;line-height:1.75;" class="section-reveal">${sec.description}</p>
            </div>

            <div class="timeline-line" style="margin-left:4rem;padding-left:0;padding-top:0.5rem;">
              ${RESEARCH_TIMELINE.map((r: any) => `
                <div class="timeline-node" data-year="${r.year}" style="
                  position:relative;padding-left:2rem;padding-bottom:2.5rem;
                ">
                  <!-- dot -->
                  <div class="timeline-dot" style="
                    position:absolute;left:-8px;top:6px;
                  "></div>

                  <!-- year badge -->
                  <div style="
                    position:absolute;left:-5.5rem;top:2px;
                    font-family:var(--font-serif);
                    font-size:1.5rem;color:#C65D3B;
                    white-space:nowrap;
                  ">${r.year}</div>

                  <div class="panel" style="padding:1.5rem 1.75rem;">
                    <div style="
                      display:flex;align-items:flex-start;justify-content:space-between;
                      gap:1rem;flex-wrap:wrap;margin-bottom:0.5rem;
                    ">
                      <h3 style="
                        font-family:var(--font-serif);
                        font-size:1.125rem;font-weight:400;color:#1B1B1B;
                      ">${r.title}</h3>
                      <span style="
                        font-family:var(--font-mono);font-size:0.65rem;
                        padding:3px 10px;border-radius:4px;
                        background:rgba(79,93,149,0.08);border:1px solid rgba(79,93,149,0.2);
                        color:#4F5D95;white-space:nowrap;
                      ">${r.parameters}</span>
                    </div>
                    <div style="
                      font-family:var(--font-mono);font-size:0.7rem;
                      color:#888880;margin-bottom:0.75rem;
                    ">${r.model}</div>
                    <p style="font-size:0.875rem;color:#555555;line-height:1.7;margin-bottom:0.75rem;">${r.breakthrough}</p>
                    <div style="
                      padding-top:0.75rem;border-top:1px solid #ECE8E1;
                      font-family:var(--font-mono);font-size:0.7rem;color:#3A7D44;
                    "><strong>Impact:</strong> ${r.impact}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      // ── 15 SUSTAINABILITY ─────────────────────────────────────
      case 'sustainability':
        return `
          <div style="max-width:900px;width:100%;">
            <div style="text-align:center;margin-bottom:3.5rem;">
              ${this.sectionLabel(sec.number, sec.title, '#3A7D44')}
              <h2 style="
                font-family:var(--font-serif);
                font-size:clamp(1.75rem,3.5vw,2.75rem);
                font-weight:400;color:#1B1B1B;margin-bottom:0.75rem;
              " class="section-reveal">${sec.subtitle}</h2>
              <p style="font-size:0.9375rem;color:#555555;max-width:54ch;margin:0 auto;line-height:1.75;" class="section-reveal">${sec.description}</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;">
              ${SUSTAINABILITY_METRICS.map((sm: any) => `
                <div class="panel section-reveal" style="padding:1.75rem;border-top:3px solid #3A7D44;">
                  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem;gap:1rem;">
                    <h3 style="font-family:var(--font-serif);font-size:1.125rem;font-weight:400;color:#1B1B1B;">${sm.title}</h3>
                    <span style="
                      font-family:var(--font-mono);font-size:0.65rem;
                      padding:4px 10px;border-radius:4px;
                      background:rgba(58,125,68,0.08);border:1px solid rgba(58,125,68,0.25);
                      color:#3A7D44;white-space:nowrap;flex-shrink:0;
                    ">${sm.stat}</span>
                  </div>
                  <p style="font-size:0.875rem;color:#555555;line-height:1.7;margin-bottom:1rem;">${sm.description}</p>
                  <div style="
                    display:flex;align-items:center;justify-content:space-between;
                    padding-top:0.75rem;border-top:1px solid #ECE8E1;
                    font-family:var(--font-mono);font-size:0.65rem;color:#888880;
                  ">
                    <span>Planetary scale</span>
                    <span style="color:#3A7D44;font-weight:500;">● Active</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      // ── 16 ENDING ─────────────────────────────────────────────
      case 'ending':
        return `
          <div style="
            max-width:680px;text-align:center;
            display:flex;flex-direction:column;align-items:center;
          ">
            <div style="
              width:3rem;height:2px;background:#C65D3B;
              border-radius:1px;margin-bottom:2.5rem;
            " class="section-reveal"></div>

            <h1 style="
              font-family:var(--font-serif);
              font-size:clamp(2.25rem,5.5vw,4rem);
              font-weight:400;color:#1B1B1B;
              letter-spacing:-0.02em;line-height:1.15;
              margin-bottom:1.75rem;
            " class="section-reveal">
              Language became<br>
              <em style="font-style:italic;color:#C65D3B;">Intelligence.</em>
            </h1>

            <p style="
              font-size:1.0rem;color:#555555;
              max-width:52ch;line-height:1.8;margin-bottom:3rem;
            " class="section-reveal">${sec.description}</p>

            <div style="
              display:flex;flex-direction:column;align-items:center;gap:1rem;
              width:100%;max-width:360px;
            " class="section-reveal">
              <button id="end-sandbox-btn" class="btn-primary" style="width:100%;justify-content:center;padding:14px 28px;border-radius:8px;font-size:0.9375rem;pointer-events:auto;">
                Open Semantic Sandbox →
              </button>
              <button id="explore-again-btn" class="btn-ghost" style="width:100%;justify-content:center;padding:13px 28px;border-radius:8px;font-size:0.9375rem;pointer-events:auto;">
                ↑ Explore Again
              </button>
            </div>

            <div style="
              margin-top:4rem;
              font-family:var(--font-mono);font-size:0.75rem;
              color:#888880;letter-spacing:0.05em;
              text-align:center;
            " class="section-reveal">
              <div style="margin-bottom:0.5rem;color:#1B1B1B;font-weight:600;">CONTRIBUTORS</div>
              <div>Mantra (50%) &nbsp;•&nbsp; Animeshh (50%)</div>
            </div>
          </div>
        `;

      default:
        return '';
    }
  }
}
