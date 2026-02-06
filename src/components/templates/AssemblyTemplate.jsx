import React from 'react';

const AssemblyTemplate = ({ data }) => {
    const { title, subtitle, date, time, location, image, message, variant = 1 } = data;

    const ImenaBranding = () => (
        <div className="absolute bottom-4 right-4 z-[60] flex items-center gap-2 opacity-30 select-none pointer-events-none grayscale">
            <img src="/imena-logo.svg" alt="Imena" className="h-6 w-auto" />
            <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Designed by Imena</span>
        </div>
    );

    // Variant 1: Luxury Stage
    if (variant === 1) {
        return (
            <div className="relative w-full h-full bg-neutral-950 overflow-hidden flex flex-col items-center justify-center">
                <ImenaBranding />
                <div className="absolute inset-0 flex pointer-events-none z-0">
                    <div className="w-1/2 h-full bg-gradient-to-r from-black via-neutral-900 to-black relative shadow-[10px_0_50px_rgba(0,0,0,0.8)]"></div>
                    <div className="w-1/2 h-full bg-gradient-to-l from-black via-neutral-900 to-black relative shadow-[-10px_0_50px_rgba(0,0,0,0.8)]"></div>
                </div>

                <div className="relative z-10 w-[300px] h-[300px] bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-600 rounded-full p-[2px] shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                    <div className="w-full h-full bg-black rounded-full border-4 border-neutral-700 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                        <div className="absolute inset-2 border border-neutral-800 rounded-full"></div>
                        <h2 className="font-serif text-white text-2xl tracking-[0.2em] font-light mb-1 mt-4 drop-shadow-md">
                            {title || "PREMIUM"}
                        </h2>
                        <h1 className="font-serif text-neutral-300 text-3xl font-bold tracking-widest mb-6 drop-shadow-lg uppercase">
                            {subtitle || "ASSEMBLY"}
                        </h1>
                        <div className="bg-neutral-800/80 backdrop-blur-md border border-neutral-700 px-6 py-2 rounded-sm shadow-inner">
                            <p className="text-neutral-300 font-serif text-[10px] tracking-widest px-2 uppercase">{date || "SATURDAY, 12 DEC"}</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-12 text-center px-12">
                    <p className="font-serif text-neutral-400 text-[10px] max-w-xs mx-auto leading-relaxed border-t border-neutral-800 pt-6">
                        {message || "We cordially invite you to join us for an event of profound significance."}
                    </p>
                    <p className="text-neutral-500 text-[8px] mt-4 tracking-[0.4em] uppercase font-bold">{location || "GRAND HALL"}</p>
                </div>
            </div>
        );
    }

    // Variant 3: Tuesday Session (Emerald theme)
    if (variant === 3) {
        return (
            <div className="relative w-full h-full bg-[#0a1a0a] text-white flex flex-col items-center justify-center p-12 overflow-hidden font-sans">
                <ImenaBranding />
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b981_0,transparent_50%)]"></div>
                </div>

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <div className="mb-6 bg-emerald-500/10 px-6 py-1 rounded-full border border-emerald-500/20">
                        <span className="text-[10px] font-black tracking-[0.5em] text-emerald-400 uppercase">Weekly Assembly</span>
                    </div>

                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Tuesday
                    </h1>
                    <h2 className="text-2xl font-bold tracking-[0.3em] text-emerald-500 uppercase mb-8">Session</h2>

                    <div className="w-full max-w-sm mb-10 bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <h3 className="text-emerald-400 font-bold text-xl mb-4 italic">{title || "Mid-Week Briefing"}</h3>
                        <p className="text-white/60 text-xs mb-8 leading-relaxed uppercase tracking-wider">{message || "Corporate updates and strategy alignment session."}</p>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                            <div>
                                <span className="block text-[8px] text-emerald-500 mb-1 font-black uppercase tracking-widest">Time</span>
                                <span className="text-sm font-bold">{time || "9:00 AM"}</span>
                            </div>
                            <div>
                                <span className="block text-[8px] text-emerald-500 mb-1 font-black uppercase tracking-widest">Room</span>
                                <span className="text-sm font-bold truncate block">{location || "Executive Suite"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 4: Saturday Session (Ocean theme)
    if (variant === 4) {
        return (
            <div className="relative w-full h-full bg-[#0a0a1a] text-white flex flex-col items-center justify-center p-12 overflow-hidden font-sans">
                <ImenaBranding />
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0,transparent_50%)]"></div>
                </div>

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <div className="mb-6 bg-blue-500/10 px-6 py-1 rounded-full border border-blue-500/20">
                        <span className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase">Weekend Forum</span>
                    </div>

                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Saturday
                    </h1>
                    <h2 className="text-2xl font-bold tracking-[0.3em] text-blue-500 uppercase mb-8">Session</h2>

                    <div className="w-full max-w-sm mb-10 bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <h3 className="text-blue-400 font-bold text-xl mb-4 italic">{title || "Visionary Workshop"}</h3>
                        <p className="text-white/60 text-xs mb-8 leading-relaxed uppercase tracking-wider">{message || "A deep dive into upcoming projects and collaborative brainstorming."}</p>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                            <div>
                                <span className="block text-[8px] text-blue-500 mb-1 font-black uppercase tracking-widest">Time</span>
                                <span className="text-sm font-bold">{time || "2:00 PM"}</span>
                            </div>
                            <div>
                                <span className="block text-[8px] text-blue-500 mb-1 font-black uppercase tracking-widest">Hall</span>
                                <span className="text-sm font-bold truncate block">{location || "Grand Gallery"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AssemblyTemplate;
