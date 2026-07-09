# NLP Odyssey: An Immersive Journey from Words to Intelligence

NLP Odyssey is a state-of-the-art interactive, 3D storytelling application designed to demonstrate the fundamentals and evolution of Natural Language Processing. It takes the viewer on a choreographed camera journey from raw ASCII character dust to complex high-dimensional vector embeddings, self-attention mechanisms, and deep-reasoning neural architectures.

Developed as a student showcase project for the Natural Language Processing course.

## Core Visual Tech Stack
- **Three.js** - High-performance WebGL 3D rendering for tokens, vector projection spaces, attention networks, and globes.
- **GSAP (GreenSock)** - ScrollTrigger choreography, smooth page pinning, and precise camera paths.
- **Lenis** - Smooth kinetic scroll control.
- **Express / Node.js** - Dev server providing real-time local syntax parsing and optional semantic NLP analytics.

## Running Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` environment variable in a `.env` file to enable optional server-side semantic analysis, or run offline (uses high-fidelity local rules-based simulation fallback):
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the application at `http://localhost:3000`.

## Contributors
* **Mantra** - 50% Contribution
* **Animeshh** - 50% Contribution
