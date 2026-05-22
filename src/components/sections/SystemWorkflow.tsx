"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  Sliders, 
  FileText, 
  Grid, 
  Database, 
  Search, 
  BrainCircuit, 
  CheckSquare, 
  ChevronRight,
  Code
} from "lucide-react";
import Card from "@/components/ui/Card";

interface StepDetails {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  desc: string;
  techs: string[];
  metric: string;
  codeSnippet: string;
  formula?: string;
}

function FormulaRenderer({ formula }: { formula: string }) {
  const normalized = formula.replace(/\\\\/g, "\\").trim();

  const renderFraction = (num: React.ReactNode, den: React.ReactNode) => (
    <span className="inline-flex flex-col items-center align-middle mx-1 leading-none">
      <span className="text-slate-800 px-1 pb-0.5 font-semibold text-[11px]">{num}</span>
      <span className="w-full h-px bg-slate-300 self-stretch my-0.5" />
      <span className="text-slate-500 px-1 pt-0.5 text-[10px]">{den}</span>
    </span>
  );

  if (normalized.includes("g(x,y) = \\text{clamp}")) {
    return (
      <div className="inline-flex items-center text-xs font-mono text-slate-800">
        <span>g(x,y)</span>
        <span className="mx-1.5 text-slate-400">=</span>
        <span className="text-brand-cyan font-sans font-semibold">clamp</span>
        <span className="text-slate-600 font-sans">(α · f(x,y) + β)</span>
      </div>
    );
  }

  if (normalized.includes("P(\\mathbf{l}|\\mathbf{x}) = \\sum")) {
    return (
      <div className="inline-flex items-center text-xs font-mono text-slate-800">
        <span>P(l | x)</span>
        <span className="mx-1.5 text-slate-400">=</span>
        <span className="text-brand-cyan text-sm font-semibold align-middle">∑</span>
        <sub className="text-slate-500 mr-1 leading-none">π ∈ ℬ<sup>-1</sup>(l)</sub>
        <span>P(π | x)</span>
      </div>
    );
  }

  if (normalized.includes("\\mathbf{e}_i = \\mathbf{w}_i")) {
    return (
      <div className="inline-flex items-center text-xs font-sans text-slate-800 tracking-wide">
        <span>e<sub>i</sub></span>
        <span className="mx-1.5 text-slate-400">=</span>
        <span>w<sub>i</sub></span>
        <span className="mx-1.5 text-slate-300">+</span>
        <span>p<sub>i</sub><sup>1D</sup></span>
        <span className="mx-1.5 text-slate-300">+</span>
        <span>p<sub>i, box</sub><sup>2D</sup></span>
      </div>
    );
  }

  if (normalized.includes("\\mathbf{v}_{\\text{fused}}")) {
    return (
      <div className="inline-flex items-center text-xs font-sans text-slate-800 tracking-wide">
        <span>v<sub>fused</sub></span>
        <span className="mx-1.5 text-slate-400">=</span>
        <span className="text-brand-violet font-semibold">L<sub>2</sub></span>
        <span className="text-slate-600 font-mono">(W<sub>t</sub>v<sub>t</sub> + W<sub>v</sub>v<sub>v</sub> + W<sub>s</sub>v<sub>s</sub>)</span>
      </div>
    );
  }

  if (normalized.includes("RRF(d) = \\sum")) {
    return (
      <div className="inline-flex items-center text-xs font-mono text-slate-800">
        <span className="font-sans">RRF(d)</span>
        <span className="mx-1.5 text-slate-400">=</span>
        <span className="text-brand-violet text-sm font-semibold align-middle">∑</span>
        <sub className="text-slate-500 mr-1 leading-none">m ∈ M</sub>
        {renderFraction(
          <span>1</span>,
          <span>k + r<sub>m</sub>(d)</span>
        )}
      </div>
    );
  }

  if (normalized.includes("\\text{IoU}(\\text{Source}")) {
    return (
      <div className="inline-flex items-center text-xs font-sans text-slate-800">
        <span className="font-semibold text-brand-emerald">IoU</span>
        <span className="text-slate-600">(Source, Citation)</span>
        <span className="mx-1.5 text-brand-emerald font-semibold">≥</span>
        <span className="font-mono text-slate-900 font-semibold">0.95</span>
      </div>
    );
  }

  return (
    <div className="font-mono text-[11px] text-slate-600 select-text max-w-full text-center">
      {formula}
    </div>
  );
}

export default function SystemWorkflow() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: StepDetails[] = [
    {
      title: "User Upload",
      icon: <UploadCloud className="w-5 h-5" />,
      subtitle: "Document Ingestion",
      desc: "The pipeline ingests complex multi-page files, raw scanned PNGs, or corporate PDFs. Background tasks initialize thread workers to stream pages dynamically.",
      techs: ["Next.js API", "FastAPI FileStream", "Python-multipart"],
      metric: "Ingestion Speed: < 240ms",
      codeSnippet: `def handle_upload(file: UploadFile):\n    # Initialize safe buffer stream\n    temp_path = save_temp_buffer(file)\n    metadata = extract_pdf_headers(temp_path)\n    trigger_background_worker(temp_path)\n    return {"status": "queued", "id": metadata.doc_id}`
    },
    {
      title: "OpenCV Enhancement",
      icon: <Sliders className="w-5 h-5" />,
      subtitle: "Visual Preprocessing",
      desc: "Applies deskewing, noise reduction, and high-frequency adaptive thresholding. Ensures faded scan characters and grid borders are optimized for neural reading.",
      techs: ["OpenCV", "NumPy", "Bilateral Filter"],
      metric: "Image Contrast: +140%",
      formula: "g(x,y) = \\text{clamp}\\left(\\alpha \\cdot f(x,y) + \\beta\\right)",
      codeSnippet: `# De-noising & thresholding for scanned papers\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nblurred = cv2.bilateralFilter(gray, 9, 75, 75)\nthresh = cv2.adaptiveThreshold(\n    blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, \n    cv2.THRESH_BINARY, 11, 2\n)`
    },
    {
      title: "OCR Extraction",
      icon: <FileText className="w-5 h-5" />,
      subtitle: "Character Layout Coordinate Mapping",
      desc: "Executes deep learning text recognition. Captures characters, words, and exact absolute layout coordinates relative to page dimensions.",
      techs: ["EasyOCR", "PyTorch", "CTC Decoding"],
      metric: "Character Precision: 98.4%",
      formula: "P(\\mathbf{l}|\\mathbf{x}) = \\sum_{\\pi \\in \\mathcal{B}^{-1}(\\mathbf{l})} P(\\pi|\\mathbf{x})",
      codeSnippet: `# Extract bounding boxes & text strings\nreader = easyocr.Reader(['en'], gpu=True)\nresults = reader.readtext(enhanced_image)\n# Format: [([x1, y1], [x2, y2], [x3, y3], [x4, y4]), text, confidence]\ncoordinates_map = format_easyocr_boxes(results)`
    },
    {
      title: "Layout Detection",
      icon: <Grid className="w-5 h-5" />,
      subtitle: "Structural Parsing",
      desc: "Fuses word strings and 2D bounding boxes using a spatial transformer model. Maps logical flows, categorizing text, tables, headers, and figures.",
      techs: ["LayoutLMv3", "Hugging Face", "Visual Transformers"],
      metric: "Layout IoU: 0.912",
      formula: "\\mathbf{e}_i = \\mathbf{w}_i + \\mathbf{p}_i^{\\text{1D}} + \\mathbf{p}_{i, \\text{box}}^{\\text{2D}}",
      codeSnippet: `# Encode text tokens fused with spatial bounding coordinates\ninputs = processor(\n    image, text_tokens,\n    boxes=normalized_bounding_boxes,\n    return_tensors="pt"\n)\noutputs = layoutlm_model(**inputs)\nlogical_segments = parse_logits(outputs.logits)`
    },
    {
      title: "Embedding Gen",
      icon: <Database className="w-5 h-5" />,
      subtitle: "Multimodal Vector Encodings",
      desc: "Creates dense numerical representations representing semantic meaning, visual tokens, and spatial layout coordinate weights.",
      techs: ["CLIP", "Sentence-Transformers", "Hugging Face"],
      metric: "Vector Size: 768-Dim",
      formula: "\\mathbf{v}_{\\text{fused}} = L_2\\left(W_t \\mathbf{v}_t + W_v \\mathbf{v}_v + W_s \\mathbf{v}_s\\right)",
      codeSnippet: `# Vectorize combined layout contexts & visual crops\ntext_vec = text_encoder.encode(segment.text)\nvisual_crop = extract_crop(image, segment.box)\nimage_vec = clip_encoder.encode(visual_crop)\n\nfused_vector = np.concatenate([text_vec, image_vec])\nnormalized_embedding = fused_vector / np.linalg.norm(fused_vector)`
    },
    {
      title: "Hybrid Retrieval",
      icon: <Search className="w-5 h-5" />,
      subtitle: "Multi-Index Dense & Sparse Search",
      desc: "Executes concurrent lookups: Cosine Similarity over vector space, and BM25 token matching over spatial OCR text databases.",
      techs: ["FAISS index", "Rank-BM25", "Reciprocal Rank Fusion"],
      metric: "Retrieval Recall: 96.5%",
      formula: "RRF(d) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}",
      codeSnippet: `# Dual index query search with Reciprocal Rank Fusion (RRF)\nsparse_scores = bm25_index.get_scores(query_tokens)\nvector_distances, vector_ids = faiss_index.search(query_vector, k=10)\n\nranked_results = reciprocal_rank_fusion(\n    sparse_scores, vector_ids, vector_distances, k=60\n)`
    },
    {
      title: "Gemini Reasoning",
      icon: <BrainCircuit className="w-5 h-5" />,
      subtitle: "Multimodal Reasoning Synthesis",
      desc: "Streams selected document regions, figures, and spatial layout tables to Google Gemini 1.5. Synthesizes a structured answer reflecting all parameters.",
      techs: ["Gemini 1.5 Pro", "Structured JSON Schema", "Google AI"],
      metric: "Tokens Processed: Up to 2M",
      codeSnippet: `# Multimodal RAG payload containing text & visual coordinate slices\nprompt = f"Answer the query: {query}. Base it STRICTLY on these cited parts:"\nresponse = gemini_client.generate_content([\n    prompt,\n    *extracted_layout_images,  # Visual grounded segments\n    f"Spatial Context: {json.dumps(logical_contexts)}"\n])`
    },
    {
      title: "Grounded Answer",
      icon: <CheckSquare className="w-5 h-5" />,
      subtitle: "Citation Coordinate Mapping",
      desc: "Validates facts against coordinate bounding boxes. Output returns structural paragraphs, and exact footnotes drawing highlighting markers on the PDF canvas.",
      techs: ["Visual Grounding", "Next.js Canvas", "PDF.js highlighter"],
      metric: "Citation Confidence: 99.8%",
      formula: "\\text{IoU}(\\text{Source}, \\text{Citation}) \\ge 0.95",
      codeSnippet: `# Output coordinates mapping verification\ngrounded_citations = []\nfor footnote in response.citations:\n    box = lookup_source_box(footnote.source_id)\n    grounded_citations.append({\n        "text": footnote.quote,\n        "page": box.page,\n        "coordinates": box.coords # [x1, y1, x2, y2]\n    })`
    }
  ];

  return (
    <section id="workflow" className="relative py-24 bg-grid z-10 scroll-mt-28">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-brand-cyan/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
            Operational Blueprint
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            How the Multimodal Pipeline Works
          </h3>
          <p className="text-slate-600 text-base">
            From raw user document upload to spatial enhancement, visual-spatial embedding generation, hybrid search, and Gemini reasoning. Click on any step to dissect the underlying technical engine.
          </p>
        </div>

        {/* Workflow Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 8 Steps Vertical List */}
          <div className="lg:col-span-5 flex flex-col gap-3 relative">
            {/* Connecting Vertical Line behind icons */}
            <div className="absolute left-7 top-4 bottom-4 w-[1px] bg-gradient-to-b from-brand-cyan via-brand-violet to-brand-emerald opacity-30 hidden sm:block" />

            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              
              // Colors matching pipeline transitions (Teal to Violet to Emerald)
              let borderAccent = "border-slate-200/60 bg-white/40";
              let iconBg = "bg-slate-100/80";
              let iconColor = "text-slate-400";
              
              if (isActive) {
                if (idx < 3) {
                  borderAccent = "border-brand-cyan/50 bg-brand-cyan/[0.03] shadow-[0_4px_20px_rgba(6,182,212,0.05)]";
                  iconBg = "bg-brand-cyan/15";
                  iconColor = "text-brand-cyan";
                } else if (idx < 6) {
                  borderAccent = "border-brand-violet/50 bg-brand-violet/[0.03] shadow-[0_4px_20px_rgba(139,92,246,0.05)]";
                  iconBg = "bg-brand-violet/15";
                  iconColor = "text-brand-violet";
                } else {
                  borderAccent = "border-brand-emerald/50 bg-brand-emerald/[0.03] shadow-[0_4px_20px_rgba(16,185,129,0.05)]";
                  iconBg = "bg-brand-emerald/15";
                  iconColor = "text-brand-emerald";
                }
              }

              return (
                <div
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-4 p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-300 ${borderAccent} hover:bg-slate-50`}
                  id={`workflow-step-${idx}`}
                >
                  {/* Step Number & Icon */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200/80 transition-all duration-300 ${iconBg} ${iconColor}`}>
                      {step.icon}
                    </div>
                    {/* Glowing active node dot */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          idx < 3 ? "bg-brand-cyan" : idx < 6 ? "bg-brand-violet" : "bg-brand-emerald"
                        }`} />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${
                          idx < 3 ? "bg-brand-cyan" : idx < 6 ? "bg-brand-violet" : "bg-brand-emerald"
                        }`} />
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="flex-grow">
                    <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                      STEP 0{idx + 1}
                    </span>
                    <h4 className={`text-sm font-bold tracking-tight transition-colors duration-300 ${isActive ? "text-slate-900" : "text-slate-500"}`}>
                      {step.title}
                    </h4>
                  </div>

                  {/* Visual transition helper */}
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-slate-800 translate-x-1" : "text-slate-300"}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Code and Specs Interactive Terminal */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <Card className="h-full border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl relative overflow-hidden flex flex-col gap-6" hoverEffect={false}>
                  {/* Decorative neon corner glow */}
                  <div className={`absolute top-0 right-0 w-[180px] h-[180px] rounded-full blur-[60px] opacity-20 pointer-events-none ${
                    activeStep < 3 ? "bg-brand-cyan" : activeStep < 6 ? "bg-brand-violet" : "bg-brand-emerald"
                  }`} />

                  {/* Details Header */}
                  <div className="border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-2.5 py-0.5 rounded border border-brand-cyan/20">
                        {steps[activeStep].subtitle}
                      </span>
                      <span className="text-xs font-mono text-slate-300">|</span>
                      <span className="text-xs font-mono text-brand-violet">{steps[activeStep].metric}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {steps[activeStep].title} Engine
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {steps[activeStep].desc}
                  </p>

                  {/* Math Formula if exists */}
                  {steps[activeStep].formula && (
                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-3 flex items-center justify-between gap-4 font-sans text-xs text-slate-700 select-none">
                      <span className="text-[10px] text-slate-400 font-semibold tracking-wider font-mono shrink-0">MATHEMATICAL MODEL:</span>
                      <div className="bg-slate-50 px-3.5 py-2 rounded border border-slate-200/80 flex items-center justify-center min-h-[38px]">
                        <FormulaRenderer formula={steps[activeStep].formula} />
                      </div>
                    </div>
                  )}

                  {/* Code Snippet Terminal */}
                  <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
                    {/* Terminal Top Bar */}
                    <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800 px-4 py-2 select-none">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="text-[9px] text-slate-400 ml-2 tracking-wider flex items-center gap-1">
                          <Code className="w-3 h-3" /> pipeline_engine.py
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-500">PYTHON 3.10</span>
                    </div>
                    {/* Snippet Area */}
                    <div className="p-4 overflow-x-auto text-[11px] text-slate-300 leading-relaxed max-h-[220px] select-text">
                      <pre>{steps[activeStep].codeSnippet}</pre>
                    </div>
                  </div>

                  {/* Technologies Used Grid */}
                  <div className="mt-auto">
                    <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2.5">
                      INTEGRATED MODULES
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {steps[activeStep].techs.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80 text-slate-600 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
