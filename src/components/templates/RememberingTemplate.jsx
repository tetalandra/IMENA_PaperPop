import React from 'react';
import brandLogo from '@/assets/brand-logo.png';
import rememberingLogo from '@/assets/remembering-logo.png';

const RememberingTemplate = ({ data }) => {
    const { title, subtitle, date, image, message, variant = 20, location, time, phone, backgroundType, backgroundImage, logo } = data;

    const backgroundStyle = backgroundType === 'image' && backgroundImage ? {
        backgroundImage: `url(${backgroundImage.src || backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    const RememberingLogo = () => (
        <div className="absolute top-6 left-8 z-[60] flex flex-col items-start gap-1 opacity-90 select-none pointer-events-none">
            <img src={rememberingLogo.src || rememberingLogo} alt="In Memory" className="h-20 w-auto drop-shadow-xl mix-blend-multiply" />
        </div>
    );

    const ImenaBranding = () => (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-1.5 opacity-60 select-none pointer-events-none hover:opacity-100 transition-opacity">
            <img src={brandLogo.src || brandLogo} alt="Imena" className="h-7 w-auto drop-shadow-lg" />
            <span className="text-[7px] font-black tracking-[0.3em] uppercase text-neutral-400 whitespace-nowrap">Designed by Imena</span>
        </div>
    );

    // Variant 20: Peaceful Lily (Dignified White with Soft Heavenly Light)
    if (variant === 20) {
        return (
            <div className="relative w-full h-full bg-gradient-to-b from-gray-50 via-white to-gray-100 text-neutral-800 overflow-hidden font-serif" style={backgroundStyle}>
                <RememberingLogo />
                <ImenaBranding />

                {/* Heavenly Light Rays */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20">
                    <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-neutral-200/40 via-white/30 to-transparent"></div>
                </div>

                {/* Subtle Marble Texture Effect */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,0,0,0.05) 0%, transparent 50%)' }}></div>

                {/* Gold Accent Borders */}
                <div className="absolute inset-10 border border-neutral-600/20 rounded-sm pointer-events-none"></div>
                <div className="absolute inset-14 border border-neutral-500/10 rounded-sm pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-16 text-center">
                    <div className="mb-10 bg-white/60 backdrop-blur-sm px-8 py-2 rounded-full border border-neutral-600/20">
                        <span className="text-[9px] font-black tracking-[0.5em] uppercase text-neutral-500">remember -unite-renew</span>
                    </div>

                    <h1 className="text-6xl font-serif mb-4 tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: '#374151' }}>
                        {title || "Johnathan Doe"}
                    </h1>

                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-neutral-600/40 to-transparent mb-6"></div>

                    <div className="text-sm font-medium tracking-[0.2em] text-neutral-600 mb-12">
                        {subtitle || "1950 — 2026"}
                    </div>

                    {/* Quote Card */}
                    <div className="max-w-md bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-2xl p-6 mb-12 shadow-lg">
                        <p className="text-sm italic leading-relaxed text-neutral-700">
                            "{message || "Those we love don't go away, they walk beside us every day. Unseen, unheard, but always near."}"
                        </p>
                    </div>

                    <div className="space-y-3 border-t border-neutral-200 pt-6 w-full max-w-xs">
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-neutral-500">Service Date</span>
                            <span className="text-sm font-semibold text-neutral-700">{date || "TBA"}</span>
                        </div>
                        {location && (
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] font-black tracking-[0.3em] uppercase text-neutral-500">Location</span>
                                <span className="text-sm font-semibold text-neutral-700">{location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Variant 21: Kwibuka (Dignified Remembrance)
    if (variant === 21) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* Cinematic Depth Overlays */}
                <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/80 to-transparent z-10 opacity-70"></div>
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px] z-0"></div>

                <div className="relative z-20 flex flex-col items-center justify-center h-full px-14 text-center">
                    {/* Kwibuka Logo - Top Center */}
                    <div className="mb-12 transform-gpu transition-transform duration-1000 hover:scale-105">
                        {logo ? (
                            <img src={logo.src || logo} alt="Kwibuka" className="h-32 w-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
                        ) : (
                            <div className="h-32 w-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                        )}
                    </div>

                    <div className="max-w-2xl flex flex-col items-center">
                        <h1 className="text-6xl font-black text-white tracking-widest leading-none mb-4 uppercase drop-shadow-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            {title || "KWIBUKA 31"}
                        </h1>

                        <div className="w-48 h-[1px] bg-white/20 mb-8 mt-2"></div>

                        <p className="text-lg font-bold tracking-[0.5em] text-neutral-300 mb-12 uppercase">
                            {subtitle || "REMEMBER-UNITE-RENEW"}
                        </p>

                        {/* Personal Message / Writing Words */}
                        <div className="max-w-md bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                            <p className="text-sm text-neutral-200 leading-relaxed font-medium uppercase tracking-[0.1em]">
                                {message || "A time to remember our loved ones, unite as a nation, and renew our commitment to a peaceful future."}
                            </p>
                        </div>

                        {(date || location) && (
                            <div className="mt-14 flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-white/60">Date</span>
                                    <span className="text-white">{date || "7TH APRIL 2025"}</span>
                                </div>
                                <div className="w-[1px] h-8 bg-white/10"></div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-white/60">Venue</span>
                                    <span className="text-white">{location || "KIGALI MEMORIAL"}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Default Fallback
    return (
        <div className="relative w-full h-full bg-[#1e1e1e] text-white flex flex-col items-center justify-center p-12 text-center" style={backgroundStyle}>
            <RememberingLogo />
            <ImenaBranding />
            <div className="border border-white/10 p-12 w-full h-full flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="text-[10px] font-black tracking-[0.6em] uppercase text-neutral-500 mb-8 font-sans">In Loving Memory</div>
                <h1 className="text-4xl font-serif italic mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{title || "The Departed"}</h1>
                <p className="text-xs text-neutral-400 leading-relaxed mb-10 max-w-[240px] italic">{message}</p>
                <div className="w-12 h-[1px] bg-neutral-800 mb-8"></div>
                <p className="text-[9px] font-black tracking-widest uppercase text-neutral-600 font-sans">{date} • {location}</p>
            </div>
        </div>
    );
};

export default RememberingTemplate;
