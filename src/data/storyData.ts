import { SectionData, TokenItem, EmbeddingNode, ApplicationPanel, ResearchYear, SustainabilityMetric } from '../types';

export const SECTIONS_DATA: SectionData[] = [
  {
    id: 'hero',
    number: '01',
    title: 'How does a computer understand language?',
    subtitle: 'THE SCROLLING JOURNEY OF NATURAL LANGUAGE PROCESSING',
    description: 'For decades, computers only understood binary zeroes and ones. Human language is messy, poetic, ambiguous, and infinite. How did we bridge the gap? Scroll to begin the transformation from raw character dust to synthetic intelligence.',
    bgType: 'deep',
    threeZone: 'hero'
  },
  {
    id: 'raw-text',
    number: '02',
    title: 'The Chaos of Raw Text',
    subtitle: 'FROM UNSTRUCTURED PIXELS TO SYMBOLS',
    description: 'When you type a sentence like "I love studying Natural Language Processing!", the computer initially sees an amorphous stream of ASCII characters and UTF-8 byte codes. Notice how punctuation and whitespace blend into letters.',
    bgType: 'particles',
    threeZone: 'raw'
  },
  {
    id: 'segmentation',
    number: '03',
    title: 'Sentence Segmentation',
    subtitle: 'BREAKING THE STREAM INTO BOUNDARIES',
    description: 'Before analyzing meaning, NLP algorithms split paragraphs into discrete sentences using syntactic rules and neural boundary detection. Each sentence becomes a distinct container of thought.',
    bgType: 'grid',
    threeZone: 'segmentation'
  },
  {
    id: 'tokenization',
    number: '04',
    title: 'Tokenization',
    subtitle: 'THE ATOMIC BUILDING BLOCKS OF AI',
    description: 'Sentences are shattered into tokens—words, subwords, or individual characters. Every modern LLM (from open-source models to frontier systems) views text as numerical token IDs. Hover or click the 3D token cubes below to inspect their atomic properties!',
    bgType: 'aurora',
    threeZone: 'tokenization'
  },
  {
    id: 'cleaning',
    number: '05',
    title: 'Noise Reduction & Cleaning',
    subtitle: 'DISSOLVING STOPWORDS AND SPECIAL SYMBOLS',
    description: 'In traditional NLP, high-frequency "stopwords" like "the", "is", and "at" carry little semantic differentiation. Watch as syntactic noise dissolves away, leaving only high-value semantic anchors burning brightly.',
    bgType: 'nebula',
    threeZone: 'cleaning'
  },
  {
    id: 'stemming',
    number: '06',
    title: 'Stemming',
    subtitle: 'CRUDE ALGORITHMIC CHOPPING',
    description: 'Stemming uses heuristic suffix stripping (like the Porter Stemmer) to chop endings. "Running", "Runner", and "Runs" all collapse violently into "Run". It is fast, but sometimes crude.',
    bgType: 'grid',
    threeZone: 'stemming'
  },
  {
    id: 'lemmatization',
    number: '07',
    title: 'Lemmatization',
    subtitle: 'INTELLIGENT VOCABULARY MAPPING',
    description: 'Unlike crude stemming, Lemmatization consults vocabulary dictionaries and morphological analysis. "Better", "Best", and "Good" all transform elegantly into their true dictionary lemma: "Good".',
    bgType: 'aurora',
    threeZone: 'lemmatization'
  },
  {
    id: 'features',
    number: '08',
    title: 'Feature Engineering: TF-IDF',
    subtitle: 'TRANSLATING WORDS INTO NUMERICAL IMPORTANCE',
    description: 'How do we know which words define a document? Term Frequency-Inverse Document Frequency (TF-IDF) balances how often a word appears locally against how rare it is across the global corpus. Words become mathematical vectors.',
    bgType: 'particles',
    threeZone: 'features'
  },
  {
    id: 'embeddings',
    number: '09',
    title: '3D Vector Embeddings',
    subtitle: 'MAPPING MEANING INTO MULTI-DIMENSIONAL SPACE',
    description: 'This was the greatest revolution in NLP history. Words are projected into 300 to 3,072-dimensional vector spaces where geometric distance equals semantic similarity. Watch vector arithmetic come alive: King - Man + Woman = Queen.',
    bgType: 'deep',
    threeZone: 'embeddings'
  },
  {
    id: 'word2vec',
    number: '10',
    title: 'Word2Vec & Neural Relationships',
    subtitle: 'LEARNING BY PREDICTING NEIGHBORS',
    description: '"You shall know a word by the company it keeps." By training neural networks to predict missing words in millions of sentences (Skip-Gram and CBOW), machines spontaneously discovered human analogy, gender, tense, and geography.',
    bgType: 'nebula',
    threeZone: 'word2vec'
  },
  {
    id: 'transformers',
    number: '11',
    title: 'The Transformer & Self-Attention',
    subtitle: 'ATTENTION IS ALL YOU NEED (2017)',
    description: 'Before Transformers, computers read text left-to-right like a human, forgetting early context. Self-Attention allows every token to simultaneously inspect and communicate with every other token in a sentence, grasping subtle sarcasm, idioms, and long-range dependencies.',
    bgType: 'aurora',
    threeZone: 'transformers'
  },
  {
    id: 'modern-ai',
    number: '12',
    title: 'Modern Generative AI Core',
    subtitle: 'BILLIONS OF PARAMETERS IN SYNCHRONY',
    description: 'Today’s frontier models stack dozens of transformer layers and trillions of parameters. They do not just classify text; they reason, write code, compose poetry, and synthesize cross-modal intelligence.',
    bgType: 'deep',
    threeZone: 'modern'
  },
  {
    id: 'applications',
    number: '13',
    title: 'Real-World Applications',
    subtitle: 'HOW NLP POWERS THE GLOBAL DIGITAL ECONOMY',
    description: 'From live speech translation in medical emergency rooms to automated code generation and legal document synthesis, NLP is the invisible nervous system of enterprise technology. Explore the expanding floating glass panels below.',
    bgType: 'grid',
    threeZone: 'apps'
  },
  {
    id: 'research',
    number: '14',
    title: 'The Research Horizon (2020 - 2026)',
    subtitle: 'THE EXPONENTIAL ACCELERATION OF ARCHITECTURE',
    description: 'Trace the astonishing evolution from early scaling laws to multimodal reasoning agents, long-context windows exceeding millions of tokens, and autonomous self-improving AI loops.',
    bgType: 'particles',
    threeZone: 'research'
  },
  {
    id: 'sustainability',
    number: '15',
    title: 'Global Impact & Sustainability',
    subtitle: 'ACCESSIBILITY, REGIONAL DIALECTS, AND GREEN AI',
    description: 'True intelligence must be inclusive and sustainable. Modern NLP preserves endangered indigenous languages, breaks down global communication barriers, democratizes education, and optimizes model quantization for lower carbon footprints.',
    bgType: 'nebula',
    threeZone: 'sustainability'
  },
  {
    id: 'ending',
    number: '16',
    title: 'Language Became Intelligence.',
    subtitle: 'THE CONTINUING EVOLUTION OF HUMAN-MACHINE COLLABORATION',
    description: 'What began as rules to parse grammar has evolved into a universal cognitive interface. When we taught computers how to understand words, we unlocked the ability to amplify human thought.',
    bgType: 'deep',
    threeZone: 'ending'
  }
];

export const SAMPLE_TOKENS: TokenItem[] = [
  { id: 1, word: "I", clean: "i", stem: "i", lemma: "i", isStopword: true, tfidf: 0.05, vector: [-0.12, 0.45, 0.08], pos: "Pronoun", explanation: "Subject pronoun. Often filtered as a high-frequency stopword in classical retrieval systems." },
  { id: 2, word: "love", clean: "love", stem: "lov", lemma: "love", isStopword: false, tfidf: 0.82, vector: [0.89, -0.32, 0.74], pos: "Verb", explanation: "High positive affective valence. Strong semantic link to affinity, emotion, and appreciation." },
  { id: 3, word: "studying", clean: "studying", stem: "studi", lemma: "study", isStopword: false, tfidf: 0.76, vector: [0.45, 0.88, -0.15], pos: "Verb (Gerund)", explanation: "Morphological ending '-ing' stripped during stemming to 'studi', or lemmatized to root noun/verb 'study'." },
  { id: 4, word: "Natural", clean: "natural", stem: "natur", lemma: "natural", isStopword: false, tfidf: 0.91, vector: [-0.23, 0.67, 0.92], pos: "Adjective", explanation: "In this compound phrase, couples with 'Language' to define human biological speech vs artificial code." },
  { id: 5, word: "Language", clean: "language", stem: "languag", lemma: "language", isStopword: false, tfidf: 0.95, vector: [0.78, 0.54, 0.81], pos: "Noun", explanation: "Core domain keyword. Highly clustered in vector space with vocabulary, syntax, linguistics, and semantics." },
  { id: 6, word: "Processing", clean: "processing", stem: "process", lemma: "processing", isStopword: false, tfidf: 0.89, vector: [0.62, -0.71, 0.33], pos: "Noun", explanation: "Computational execution. Transforms the phrase into an algorithmic engineering discipline." },
  { id: 7, word: "!", clean: "", stem: "", lemma: "", isStopword: true, tfidf: 0.01, vector: [0.00, 0.00, 0.00], pos: "Punctuation", explanation: "Syntactic boundary marker conveying high emotional intensity and assertion." }
];

export const VECTOR_EMBEDDING_NODES: EmbeddingNode[] = [
  { word: "King", category: "royalty", position: [-4, 2, -2], color: 0xffb800, connections: ["Queen", "Man"] },
  { word: "Queen", category: "royalty", position: [-3.8, 3.5, -1.8], color: 0xffb800, connections: ["King", "Woman"] },
  { word: "Man", category: "gender", position: [-2, -1, -2], color: 0x4facfe, connections: ["King", "Woman"] },
  { word: "Woman", category: "gender", position: [-1.8, 0.5, -1.8], color: 0xff416c, connections: ["Queen", "Man"] },
  { word: "Orange", category: "nature", position: [3, -2, 2], color: 0x10b981, connections: ["Banana"] },
  { word: "Banana", category: "nature", position: [3.5, -2.5, 1.5], color: 0x10b981, connections: ["Orange"] },
  { word: "Processor", category: "tech", position: [2.5, 3, 2], color: 0x00f2fe, connections: ["GPU", "Network"] },
  { word: "GPU", category: "tech", position: [3.2, 3.2, 1.8], color: 0x00f2fe, connections: ["Processor", "Network"] },
  { word: "Network", category: "ai", position: [1, 4, 0], color: 0x9f55ff, connections: ["GPU", "Transformer", "Grammar"] },
  { word: "Transformer", category: "ai", position: [0.5, 4.5, -1], color: 0x9f55ff, connections: ["Network", "Grammar"] },
  { word: "Grammar", category: "ai", position: [0, 3, -1.5], color: 0x9f55ff, connections: ["Transformer", "Network"] }
];

export const APPLICATION_PANELS: ApplicationPanel[] = [
  {
    id: 'healthcare',
    title: 'Clinical Bio-NLP & Diagnostic AI',
    iconName: 'HeartPulse',
    tagline: 'Translating complex electronic health records into life-saving clinical insights.',
    illustration: '🏥 -> 🧬 -> 💊',
    workflow: [
      'Ingest unstructured doctor clinical notes and surgical audio logs',
      'Extract medical entities (SNOMED-CT ontology mapping)',
      'Cross-reference patient symptom trajectories against rare disorder databases',
      'Generate real-time diagnostic recommendation summaries for oncologists'
    ],
    companies: ['Clinical AI Labs', 'Epic Systems', 'Nuance Clinical Systems', 'Tempus NLP'],
    conceptsUsed: ['Named Entity Recognition (NER)', 'Biomedical Transformers', 'Cross-Modal Clinical Attention'],
    benefits: 'Reduces physician administrative charting time by 45% and catches rare drug interaction risks before prescription.',
    color: '#ff416c'
  },
  {
    id: 'legal',
    title: 'Contract Jurisprudence & Legal Synthesis',
    iconName: 'Scale',
    tagline: 'Parsing 10,000-page mergers and compliance filings in seconds with precision semantic search.',
    illustration: '⚖️ -> 📑 -> 🔍',
    workflow: [
      'Scan multi-jurisdiction contract repositories and statutory filings',
      'Identify indemnification clauses, liability caps, and hidden compliance anomalies',
      'Execute Retrieval-Augmented Generation (RAG) across case law precedents',
      'Draft defensible legal briefs with explicit paragraph citations'
    ],
    companies: ['Harvey AI', 'Casetext CoCounsel', 'LexisNexis AI', 'Ironclad'],
    conceptsUsed: ['Long-Context Transformers (1M+ tokens)', 'Dense Passage Retrieval (DPR)', 'Legal Lemma Indexing'],
    benefits: 'Compresses due diligence workflows from 3 weeks of junior associate reading to 90 seconds of high-precision synthesis.',
    color: '#b8860b'
  },
  {
    id: 'code-engineering',
    title: 'Autonomous Code Synthesis & Refactoring',
    iconName: 'Code',
    tagline: 'Treating programming languages as formal syntactical systems for automated software evolution.',
    illustration: '💻 -> ⚙️ -> 🚀',
    workflow: [
      'Parse Abstract Syntax Trees (AST) and repository dependency graphs',
      'Predict next-token method completions and generate unit test suites',
      'Translate legacy COBOL/Fortran banking systems into modern Rust/TypeScript',
      'Identify security vulnerabilities and synthesize automatic patch pull requests'
    ],
    companies: ['OpenAI Code / Tabnine', 'GitHub Copilot', 'Cursor', 'Cognition Devin'],
    conceptsUsed: ['Code-Trained Transformers', 'Syntactic Tokenization', 'Reinforcement Learning from Human Feedback (RLHF)'],
    benefits: 'Boosts software engineering velocity by over 55% while eliminating boilerplate repetitive coding tasks.',
    color: '#00f2fe'
  },
  {
    id: 'global-translation',
    title: 'Real-Time Universal Speech & Dialect Matrix',
    iconName: 'Languages',
    tagline: 'Erasing linguistic barriers across 200+ world languages with zero-shot neural machine translation.',
    illustration: '🌐 -> 🗣️ -> 🎧',
    workflow: [
      'Capture streaming spoken audio and transcribe via Automatic Speech Recognition (ASR)',
      'Project tokens into universal multilingual interlingua vector space',
      'Re-synthesize target language voice preserving speaker timbre and emotional prosody',
      'Adapt dynamically to local idioms, slang, and cultural context'
    ],
    companies: ['DeepL Translate', 'DeepL', 'Meta FAIR NLLB', 'ElevenLabs'],
    conceptsUsed: ['Multilingual Shared Embeddings', 'Seq2Seq Attention', 'Cross-Lingual Transfer Learning'],
    benefits: 'Enables seamless international commerce, diplomatic collaboration, and emergency disaster relief across language divides.',
    color: '#9f55ff'
  },
  {
    id: 'enterprise-search',
    title: 'Cognitive Enterprise Knowledge & RAG',
    iconName: 'Search',
    tagline: 'Replacing rigid keyword matching with semantic intent understanding across corporate data silos.',
    illustration: '🏢 -> 🧠 -> ⚡',
    workflow: [
      'Vectorize internal PDFs, Slack archives, Jira tickets, and SQL databases into vector databases',
      'Compute cosine similarity between employee natural language questions and knowledge vectors',
      'Synthesize accurate, hallucination-free executive summaries with clickable source links',
      'Enforce enterprise role-based access control (RBAC) at the embedding layer'
    ],
    companies: ['Glean', 'Pinecone', 'Weaviate', 'Elasticsearch AI'],
    conceptsUsed: ['Vector Embeddings', 'Cosine Distance Matching', 'Retrieval-Augmented Generation (RAG)'],
    benefits: 'Saves the average knowledge worker 2.5 hours per week previously wasted hunting for internal documentation.',
    color: '#10b981'
  }
];

export const RESEARCH_TIMELINE: ResearchYear[] = [
  {
    year: 2020,
    title: 'The Scaling Law Revolution',
    model: 'GPT-3 (175 Billion Parameters)',
    parameters: '175B Params',
    breakthrough: 'Demonstrated that scaling model parameters and training compute leads to emergent zero-shot and few-shot reasoning capabilities without task-specific fine-tuning.',
    impact: 'Shifted AI from specialized custom NLP models to general-purpose foundational engines.'
  },
  {
    year: 2021,
    title: 'Multimodal Contrastive Alignment',
    model: 'CLIP & DALL-E / FLAN',
    parameters: 'Multimodal Alignment',
    breakthrough: 'Linked visual image spaces directly to text vector embeddings. Instruction tuning (FLAN) enabled models to follow arbitrary natural language commands.',
    impact: 'Paved the way for AI that sees, reads, and generates across media boundaries.'
  },
  {
    year: 2022,
    title: 'Conversational Alignment & RLHF',
    model: 'ChatGPT & InstructGPT',
    parameters: 'RLHF Breakthrough',
    breakthrough: 'Applied Reinforcement Learning from Human Feedback (RLHF) to align LLM completions with human preferences for helpfulness, honesty, and harmlessness.',
    impact: 'Sparked the global generative AI boom, making AI accessible to hundreds of millions of everyday users.'
  },
  {
    year: 2023,
    title: 'Open Weights & Long Context Windows',
    model: 'Multimodal Architectures & LLaMA 2',
    parameters: '100K - 1M Context',
    breakthrough: 'Introduction of native multimodal architectures and the explosion of high-capability open-weight foundational models capable of reading entire books in prompt memory.',
    impact: 'Democratized AI research and enabled enterprise RAG architectures over massive document libraries.'
  },
  {
    year: 2024,
    title: 'Ultra-Long Context & Native Multimodality',
    model: 'Long-Context Frontier Models & GPT-4o',
    parameters: '2,000,000+ Token Window',
    breakthrough: 'Breakthroughs in RingAttention and MoE (Mixture of Experts) allowing 2 million token context windows—capable of analyzing 50,000 lines of code simultaneously.',
    impact: 'Eliminated traditional context fragmentation and revolutionized complex software engineering analysis.'
  },
  {
    year: 2025,
    title: 'System 2 Deep Reasoning Agents',
    model: 'Deep Reasoning Models & Agents',
    parameters: 'Iterative Chain-of-Thought',
    breakthrough: 'Models that pause to think, verify hypotheses, execute sandboxed code, and self-correct before responding. Agentic workflows that autonomously navigate APIs.',
    impact: 'Transition from passive chatbots to autonomous digital co-workers capable of executing multi-day complex projects.'
  },
  {
    year: 2026,
    title: 'Universal Synthetic Cognition & Bio-NLP',
    model: 'Omni-Modal Quantum-Assisted Transformers',
    parameters: '10+ Trillion Effective Params',
    breakthrough: 'Seamless real-time translation between human speech, DNA sequences, protein folding grammars, and quantum computing instructions in unified embedding spaces.',
    impact: 'Language models become the universal interface for scientific discovery and planetary-scale problem solving.'
  }
];

export const SUSTAINABILITY_METRICS: SustainabilityMetric[] = [
  {
    title: 'Endangered Language Preservation',
    stat: '3,000+ Languages',
    description: 'Zero-shot cross-lingual transfer learning is preserving indigenous dialects with fewer than 1,000 surviving speakers, archiving human cultural heritage for eternity.',
    icon: 'Globe'
  },
  {
    title: 'Green AI & Model Quantization',
    stat: '4x Carbon Reduction',
    description: 'Techniques like 4-bit/8-bit quantization (NF4, GGUF), FlashAttention, and Speculative Decoding have slashed inference energy consumption by over 75% since 2023.',
    icon: 'Leaf'
  },
  {
    title: 'Universal Accessibility Interface',
    stat: '1.3 Billion People',
    description: 'Real-time speech-to-text, eye-tracking NLP communication assistive boards, and automatic visual scene description empower individuals with disabilities globally.',
    icon: 'Accessibility'
  },
  {
    title: 'Democratizing Education',
    stat: '24/7 Socratic Tutors',
    description: 'Personalized AI language tutors adapted to individual learning paces and socio-economic backgrounds are bridging the global educational divide in over 150 countries.',
    icon: 'BookOpen'
  }
];
