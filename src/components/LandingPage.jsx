import React, { useEffect, useRef } from 'react';
import {
    ArrowRight, Sparkles, Crown, ShieldCheck,
    FileText, Zap, MousePointer2, ChevronRight
} from 'lucide-react';

const LandingPage = ({ onGetStarted, user, onLogin }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 12;
            const y = (clientY / innerHeight - 0.5) * 12;
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden font-sans selection:bg-amber-500/30 selection:text-amber-200">

            {/* AMBIENT LIGHTING ENVIRONMENT */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Main center glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.07)_0%,transparent_60%)]"></div>

                {/* Top architectural line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

                {/* Floating Essence */}
                <div className="absolute inset-0">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-amber-400/20 rounded-full animate-float"
                            style={{
                                width: Math.random() * 2 + 1 + 'px',
                                height: Math.random() * 2 + 1 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                animationDuration: Math.random() * 10 + 10 + 's',
                                animationDelay: Math.random() * -10 + 's',
                                opacity: Math.random() * 0.3 + 0.1
                            }}
                        />
                    ))}
                </div>

                {/* Subtle Grain Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            {/* PROFESSIONAL NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-black/40 border-b border-white/5">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-[0_0_25px_rgba(234,179,8,0.3)]">
                        <Crown className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-serif italic tracking-tighter leading-none">PaperPop</span>
                        <span className="text-[7px] font-black uppercase tracking-[0.4em] text-amber-500/60 mt-0.5">Studio Studio</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-12">
                    <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-all">Templates</a>
                    <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-all">Collections</a>
                    <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-all">Pricing</a>
                </div>

                <div className="flex items-center gap-6">
                    <button onClick={onLogin} className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-all">Log In</button>
                    <button
                        onClick={onGetStarted}
                        className="px-7 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all duration-500 active:scale-95 shadow-xl"
                    >
                        Start Designing
                    </button>
                </div>
            </nav>

            {/* MAIN STAGE */}
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24">

                <div
                    ref={containerRef}
                    className="max-w-6xl w-full flex flex-col items-center text-center transition-transform duration-500 ease-out"
                    style={{ transform: 'translate(var(--mouse-x, 0px), var(--mouse-y, 0px))' }}
                >
                    {/* Premiere Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl mb-14 animate-fade-in shadow-2xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                        <span className="text-[9px] font-black text-white tracking-[0.4em] uppercase">Private Creative Studio</span>
                    </div>

                    {/* Logo Focal Point */}
                    <div className="relative mb-8 group animate-scale-up">
                        <div className="absolute -inset-14 bg-amber-500/15 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s]"></div>
                        <img
                            src="/imena-logo.svg"
                            alt="Imena"
                            className="h-36 md:h-52 object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] relative z-10"
                        />
                    </div>

                    {/* High-End Heading */}
                    <header className="mb-10 animate-fade-in-up">
                        <h1 className="relative font-serif text-7xl md:text-[9rem] tracking-tighter leading-[0.85] mb-6">
                            <span className="block text-white opacity-90 italic">Digital</span>
                            <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-400 to-amber-700 drop-shadow-[0_0_20px_rgba(234,179,8,0.25)]">
                                Stationery.
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-neutral-500 text-xs md:text-sm font-bold uppercase tracking-[0.4em] leading-relaxed">
                            Crafting elite family invitations <br />
                            <span className="text-white/80">for the most significant occasions.</span>
                        </p>
                    </header>

                    {/* Elite Action Bar */}
                    <div className="flex flex-col md:flex-row items-center gap-10 mt-12 animate-fade-in-up animation-delay-300">
                        <button
                            onClick={onGetStarted}
                            className="group relative px-14 py-6 bg-amber-500 rounded-2xl flex items-center gap-4 shadow-[0_25px_50px_-12px_rgba(234,179,8,0.3)] hover:shadow-[0_35px_70px_-12px_rgba(234,179,8,0.5)] transition-all duration-700 hover:-translate-y-2 active:translate-y-0 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                            <span className="relative z-10 text-black text-[11px] font-black uppercase tracking-[0.4em]">Initialize Studio</span>
                            <ArrowRight className="relative z-10 w-4 h-4 text-black group-hover:translate-x-3 transition-transform duration-500" />
                        </button>

                        <div className="flex items-center gap-5 px-6 py-4 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/5">
                            <div className="flex -space-x-3">
                                {[10, 20, 30].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-neutral-900 overflow-hidden shadow-lg">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full object-cover grayscale" />
                                    </div>
                                ))}
                            </div>
                            <div className="h-6 w-[1px] bg-white/10"></div>
                            <div className="text-left">
                                <span className="block text-[9px] font-black text-white/80 uppercase tracking-widest leading-none mb-1">Trusted By</span>
                                <span className="block text-[8px] font-bold text-neutral-600 uppercase tracking-widest leading-none">Global Creators</span>
                            </div>
                        </div>
                    </div>

                    {/* Refined Feature Strip */}
                    <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-5xl opacity-40 hover:opacity-100 transition-opacity duration-1000 animate-fade-in animation-delay-600">
                        <div className="flex flex-col items-center gap-4 group">
                            <ShieldCheck className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Guaranteed Quality</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4 group">
                            <Zap className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Instant Generation</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4 group">
                            <FileText className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Professional PDF</h3>
                        </div>
                    </div>
                </div>

                {/* Vertical Scroll Indicator */}
                <div className="mt-32 pb-16 flex flex-col items-center gap-8 opacity-20">
                    <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
                    <span className="text-[10px] font-black uppercase tracking-[1em] mr-[-1em]">Studio</span>
                </div>
            </main>

            {/* MINIMALIST FOOTER CORNERS */}
            <div className="fixed bottom-12 left-12 flex flex-col gap-2 z-50 pointer-events-none opacity-20">
                <span className="text-[9px] font-black uppercase tracking-widest">© 2024</span>
                <div className="h-[1px] w-8 bg-white"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Imena Group</span>
            </div>

            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 z-50 pointer-events-none opacity-20">
                <MousePointer2 className="w-4 h-4 text-amber-500 mb-2" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Designed for Excellence</span>
            </div>

        </div>
    );
};

export default LandingPage;
