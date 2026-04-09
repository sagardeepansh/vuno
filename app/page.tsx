'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'query' | 'manage' | 'api'>('upload');

  const showTab = (tab: 'upload' | 'query' | 'manage' | 'api') => {
    setActiveTab(tab);
  };

  const toggleFaq = (e: React.MouseEvent<HTMLButtonElement>) => {
    const content = e.currentTarget.nextElementSibling as HTMLElement;
    const arrow = e.currentTarget.querySelector('span') as HTMLElement;

    if (content && arrow) {
      content.classList.toggle('hidden');
      arrow.style.transform = content.classList.contains('hidden')
        ? ''
        : 'rotate(180deg)';
    }
  };

  return (
    <div className="bg-white antialiased">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#e3e5ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-bold text-lg text-black">Vuno</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {/* <a href="#product" className="text-sm text-[#74798a] hover:text-black transition-colors">Product</a>
              <a href="#features" className="text-sm text-[#74798a] hover:text-black transition-colors">Features</a>
              <a href="#security" className="text-sm text-[#74798a] hover:text-black transition-colors">Security</a>
              <a href="#pricing" className="text-sm text-[#74798a] hover:text-black transition-colors">Pricing</a>
              <a href="#blog" className="text-sm text-[#74798a] hover:text-black transition-colors">Blog</a> */}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="px-3 py-2 text-sm text-black cursor-pointer hover:bg-[#eeeff2] rounded-md transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-4 py-2 text-sm bg-black cursor-pointer text-white rounded-md font-medium">
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div id="mobile-menu" className="hidden md:hidden py-4 space-y-3 border-t border-[#e3e5ea]">
            <a href="#product" className="block text-sm text-[#74798a] hover:text-black">Product</a>
            <a href="#features" className="block text-sm text-[#74798a] hover:text-black">Features</a>
            <a href="#security" className="block text-sm text-[#74798a] hover:text-black">Security</a>
            <a href="#pricing" className="block text-sm text-[#74798a] hover:text-black">Pricing</a>            <a href="#blog" className="block text-sm text-[#74798a] hover:text-black">Blog</a>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="px-3 py-2 text-sm text-black cursor-pointer hover:bg-[#eeeff2] rounded-md">
                Sign In
              </Link>
              <Link href="/register" className="px-4 py-2 text-sm bg-black cursor-pointer text-white rounded-md font-medium">
                 Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eeeff2] text-black text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              Powered by RAG Architecture
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-black">
              AI Document<br />Assistant Trained<br />on{' '}
              <span className="bg-black bg-clip-text text-transparent">
                Your Data
              </span>
            </h1>

            <p className="text-[#74798a] text-lg max-w-md leading-relaxed">
              Upload documents, ask questions, and get accurate answers grounded in your content.
              Vuno eliminates manual searching through large files.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/register" className="h-11 px-8 bg-black text-white rounded-md text-sm font-medium inline-flex items-center gap-2 hover:brightness-105 transition-all">
                Try for Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/register" className="h-11 px-8 border border-[#e3e5ea] text-gray-700 rounded-md text-sm font-medium inline-flex items-center gap-2 hover:bg-[#eeeff2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((letter, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#eeeff2] border-2 border-white flex items-center justify-center text-xs font-medium text-black">
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#74798a]">
                <span className="font-semibold text-black">1,000+</span> teams already use Vuno
              </p>
            </div>
          </div>

          {/* Interactive Chat Demo */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-black opacity-10 rounded-3xl blur-3xl"></div>
            <div className="relative z-10 w-full max-w-lg animate-[float_3s_ease-in-out_infinite] bg-white rounded-2xl shadow-xl border border-[#e3e5ea] p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                  <span className="text-white font-bold text-xs">V</span>
                </div>
                <span className="font-semibold text-sm text-black">Vuno Chat</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="bg-[#eeeff2] rounded-xl p-3 text-sm text-black max-w-[80%]">
                  What are the key findings in Q4 report?
                </div>
                <div className="bg-[#363d4d]/5 rounded-xl p-3 text-sm text-black ml-auto max-w-[85%]">
                  Based on the Q4 report, revenue increased 23% YoY with strong growth in the enterprise segment...
                </div>
                <div className="bg-[#eeeff2] rounded-xl p-3 text-sm text-black max-w-[70%]">
                  What about expenses?
                </div>
              </div>

              <div className="flex items-center gap-2 border border-[#e3e5ea] rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Ask about your documents..."
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-[#74798a] text-black"
                />
                <button className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#f8f9fa] to-white" id="product">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Real-world use cases that<br />
              <span className="bg-black bg-clip-text text-transparent">earn &amp; save</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                title: "Document Ingestion",
                desc: "Upload PDFs, text files, and more. Auto-extract and preprocess content."
              },
              {
                icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                title: "Smart Retrieval",
                desc: "Vector-based semantic search finds the most relevant document sections."
              },
              {
                icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-2.303 2.303a2.25 2.25 0 01-1.838.652L12 17l-3.659.455a2.25 2.25 0 01-1.838-.652L4.2 14.5m15.6 0l.402.401a2.25 2.25 0 010 3.182l-2.236 2.236a2.25 2.25 0 01-3.182 0L12 17.586l-2.784 2.733a2.25 2.25 0 01-3.182 0l-2.236-2.236a2.25 2.25 0 010-3.182L4.2 14.5",
                title: "AI-Powered Q&A",
                desc: "Get accurate answers grounded strictly in your document context."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#e3e5ea] hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#eeeff2] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#363d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-sm text-[#74798a] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
            {['MongoDB', 'Node.js', 'Gemini', 'Next.js', 'Tailwind'].map((tech) => (
              <span key={tech} className="text-sm font-semibold tracking-wider text-black uppercase">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4" >
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", stat: "98%", label: "Retrieval Accuracy" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", stat: "10x", label: "Faster Document Search" },
              { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", stat: "1000+", label: "Active Users" },
              { icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z", stat: "50+", label: "Document Formats" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-[#eeeff2]/50 border border-[#e3e5ea]">
                <svg className="w-7 h-7 mx-auto mb-3 text-[#363d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <div className="text-3xl font-bold text-black mb-1">{item.stat}</div>
                <div className="text-sm text-[#74798a]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-[#f8f9fa] to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#74798a] mb-3 font-medium">Developer-First</p>
            <h2 className="text-3xl sm:text-4xl text-black font-bold  mb-4">Integrate with a <span className="text-gradient">simple API</span></h2>
            <p className="text-muted mb-6 text-[#74798a] leading-relaxed">Use our RESTful API to upload documents and query them from any platform. SDKs available for popular languages.</p>
            <Link href="/api-docs" className="h-11 px-8  bg-black text-white rounded-md text-sm font-medium inline-flex items-center gap-2">
              View API Docs <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
          <div className="bg-[#1e1e2e] rounded-2xl p-6 font-mono text-sm overflow-x-auto border border-[#2a2f3a]">
            {/* top dots */}
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
            </div>

            <div className="relative bg-[#0f172a] border border-white/10 rounded-xl p-5 text-left font-mono text-sm">

              {/* Copy Button */}
              <button
                onClick={() => navigator.clipboard.writeText(`<script>
  window.ChatBotConfig = {
    apiKey: "YOUR_API_KEY",
  };
</script>

<script src="https://vuno-backend.vercel.app/embed/chatbot.min.js"></script>`)}
                className="absolute top-3 right-3 text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md text-gray-300 transition"
              >
                Copy
              </button>

              {/* Label */}
              <p className="text-xs text-gray-400 mb-3">Add this before your closing &lt;/body&gt; tag</p>

              {/* Code */}
              <pre className="text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                <code>
                  {`<script>
  window.ChatBotConfig = {
    apiKey: "YOUR_API_KEY",
  };
</script>

<script src="https://vuno-backend.vercel.app/embed/chatbot.min.js"></script>`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Explore Our Features</h2>
            <p className="text-[#74798a] max-w-2xl mx-auto">
              Vuno combines cutting-edge AI with robust document processing to deliver accurate, context-bound answers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12", title: "Document Ingestion", desc: "Upload PDFs, DOCX, TXT and more. Automatic text extraction and chunking." },
              { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Contextual Retrieval", desc: "Embeddings-based vector search retrieves the most relevant document sections." },
              { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: "Conversational Interface", desc: "Natural language chat interface for intuitive document interaction." },
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "JWT Authentication", desc: "Secure user authentication with token-based API access control." },
              { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", title: "RAG Architecture", desc: "Retrieval-Augmented Generation ensures answers are grounded in your data." },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Real-time Responses", desc: "Fast inference with streaming responses for seamless user experience." }
            ].map((feature, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-[#e3e5ea] hover:border-[#363d4d]/30 bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#eeeff2] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#363d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-sm text-[#74798a] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-black font-bold text-fg mb-4">Works like the best <span className="text-gradient">document assistants</span></h2>
            <p className="text-muted max-w-2xl mx-auto text-[#74798a]">Vuno follows a simple 4-step workflow to turn your documents into an interactive knowledge base.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative p-6 rounded-2xl border border-border bg-white">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">1</div>
              <svg className="w-7 h-7 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <h3 className="font-semibold text-fg mb-2">Upload Documents</h3>
              <p className="text-sm text-muted leading-relaxed">Drag and drop your PDFs, text files, or any supported document format.</p>
            </div>
            <div className="relative p-6 rounded-2xl border border-border bg-white">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">2</div>
              <svg className="w-7 h-7 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
              <h3 className="font-semibold text-fg mb-2">AI Processing</h3>
              <p className="text-sm text-muted leading-relaxed">Documents are chunked, embedded, and stored in a vector database for semantic search.</p>
            </div>
            <div className="relative p-6 rounded-2xl border border-border bg-white">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">3</div>
              <svg className="w-7 h-7 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <h3 className="font-semibold text-fg mb-2">Ask Questions</h3>
              <p className="text-sm text-muted leading-relaxed">Chat naturally with your documents. Ask anything about the content.</p>
            </div>
            <div className="relative p-6 rounded-2xl border border-border bg-white">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">4</div>
              <svg className="w-7 h-7 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 className="font-semibold text-fg mb-2">Get Accurate Answers</h3>
              <p className="text-sm text-muted leading-relaxed">Receive context-grounded responses with source references from your documents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section (Dark) */}
      <section className="py-24 px-4 bg-[#171a22] text-[#f2f2f2]">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-xs uppercase tracking-[0.2em] mb-3 text-gray-400">
            Our Platform
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mb-10 leading-tight">
            Discover the{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Vuno Platform
            </span>
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(['upload', 'query', 'manage', 'api'] as const).map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => showTab(tab)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${isActive
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {tab === 'upload' && 'Document Upload'}
                  {tab === 'query' && 'Query Interface'}
                  {tab === 'manage' && 'Document Management'}
                  {tab === 'api' && 'API Access'}

                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-white/20"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Content Card */}
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1f2b] to-[#13151d] p-8 sm:p-10 text-left min-h-[180px] overflow-hidden">

            {/* subtle glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 transition-all duration-500 ease-in-out">

              {activeTab === 'upload' && (
                <div className="animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">
                    Document Upload
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                    Drag & drop files or upload via API. Vuno processes PDFs, DOCX, and TXT by extracting text, chunking intelligently, and generating vector embeddings optimized for semantic retrieval.
                  </p>
                </div>
              )}

              {activeTab === 'query' && (
                <div className="animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">
                    Query Interface
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                    Ask natural language questions and get context-aware answers. Vuno uses retrieval-augmented generation (RAG) to ensure responses are grounded in your data—not hallucinated.
                  </p>
                </div>
              )}

              {activeTab === 'manage' && (
                <div className="animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">
                    Document Management
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                    Structure your knowledge base with tags, collections, and access controls. Track usage analytics and maintain full visibility into document interactions.
                  </p>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">
                    API Access
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                    Seamlessly integrate Vuno via REST APIs. Upload, query, and retrieve answers programmatically with scalable endpoints and SDK-ready architecture.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      {/* <section className="py-20 px-4" id="security">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Enterprise Security. <span className="bg-black bg-clip-text text-transparent">Maximum Privacy.</span>
          </h2>
          <p className="text-[#74798a] max-w-2xl mx-auto mb-12">
            Your documents are encrypted, processed securely, and never used to train AI models. Full compliance with enterprise security standards.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Your data stays yours", desc: "End-to-end encryption for all documents and queries." },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Enterprise-Ready Security", desc: "SOC 2 compliant with role-based access controls." },
              { icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", title: "Data Retention Policies", desc: "Full control over how long your data is stored." }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#e3e5ea] overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 bg-[#eeeff2] flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#363d4d]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                  </svg>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-semibold text-black mb-1">{item.title}</h3>
                  <p className="text-sm text-[#74798a]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#f8f9fa] to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Testimonials</h2>
          <p className="text-[#74798a] mb-12 max-w-xl mx-auto">
            Hear from teams who transformed their document workflows with Vuno.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "Vuno saved our team hours of manual document review. The accuracy is incredible — it never makes up answers.", name: "Sarah Chen", role: "Legal Analyst" },
              { text: "We process hundreds of research papers. Vuno's RAG approach means every answer is backed by actual document content.", name: "Mark Johnson", role: "Research Director" },
              { text: "The API integration was seamless. We embedded Vuno into our internal tools in under a day. Game changer.", name: "Priya Patel", role: "Product Manager" }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#e3e5ea] text-left hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-4 text-yellow-400">★★★★★</div>
                <p className="text-sm text-[#74798a] leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">{testimonial.name}</p>
                    <p className="text-xs text-[#74798a]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#f8f9fa] to-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8">Frequently Asked<br />Questions</h2>

          <div className="space-y-3">
            {[
              { q: "What is Vuno?", a: "Vuno is an AI-powered document assistant that uses RAG (Retrieval-Augmented Generation) to answer questions based strictly on your uploaded documents." },
              { q: "What document formats are supported?", a: "Vuno supports PDFs, DOCX, TXT, and various other text-based formats. More formats are continuously being added." },
              { q: "Does Vuno hallucinate answers?", a: "No. Vuno is designed to answer only from document context. If the answer isn't in the document, it responds with 'I don't know based on the provided document.'" },
              { q: "Is my data secure?", a: "Yes. All documents are encrypted end-to-end. Your data is never used for model training and you have full control over data retention policies." },
              { q: "Can I integrate Vuno into my app?", a: "Absolutely. Vuno provides a RESTful API and SDKs for seamless integration into any application or workflow." },
              { q: "How accurate is the retrieval?", a: "Vuno achieves 98%+ retrieval accuracy through advanced embedding models and vector search optimized for document context." }
            ].map((faq, i) => (
              <div key={i} className="border border-[#e3e5ea] rounded-xl bg-white overflow-hidden">
                <button
                  onClick={toggleFaq}
                  className="w-full px-6 py-4 text-left text-sm font-medium text-black flex items-center justify-between hover:bg-[#f8f9fa] transition-colors"
                >
                  {faq.q}
                  <span className="transform transition-transform">▼</span>
                </button>
                <div className="hidden px-6 pb-4 text-sm text-[#74798a] leading-relaxed">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-b from-black to-[#0f1117] border border-white/10 rounded-2xl p-10 sm:p-14 text-center relative overflow-hidden">

          {/* subtle glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Start using Vuno for free
          </h2>

          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Upload your first document and experience AI-powered document intelligence instantly. No limits. No credit card. No friction.
          </p>

          <Link href="/register" className="h-11 px-8 bg-white text-black rounded-md text-sm font-medium inline-flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]">
            Get Started
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* trust line */}
          <p className="text-xs text-gray-500 mt-6">
            No signup required • Works instantly
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4  border-[#e3e5ea]">
        <div className="max-w-7xl mx-auto">
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="font-bold text-lg text-black">Vuno</span>
              </div>
              <p className="text-sm text-[#74798a] leading-relaxed">
                AI-powered document assistant for teams who need accurate, context-bound answers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Pricing</a></li>
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">API Docs</a></li>
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Careers</a></li>
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Privacy</a></li>
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Terms</a></li>
                <li><a href="#" className="text-[#74798a] hover:text-black transition-colors">Security</a></li>
              </ul>
            </div>
          </div> */}
          <div className="pt-6 border-t border-[#e3e5ea] text-center text-xs text-[#74798a]">
            © 2026 Vuno All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}