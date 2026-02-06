import React from 'react';
import brandLogo from '@/assets/brand-logo.png';

const AchievementTemplate = ({ data }) => {
    const { title, subtitle, date, image, message, variant = 0, location, time, phone, backgroundType, backgroundImage } = data;

    const backgroundStyle = backgroundType === 'image' && backgroundImage ? {
        backgroundImage: `url(${backgroundImage.src || backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    const ImenaBranding = () => (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-1.5 opacity-60 select-none pointer-events-none hover:opacity-100 transition-opacity">
            <img src={brandLogo.src || brandLogo} alt="Imena" className="h-7 w-auto drop-shadow-lg" />
            <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.3em] whitespace-nowrap">Designed by Imena</span>
        </div>
    );

    // Variant 30: Employee of the Month (Navy/Gold Corporate Luxury)
    if (variant === 30) {
        return (
            <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-blue-950 to-black text-white overflow-hidden font-sans p-10 flex flex-col items-center" style={backgroundStyle}>
                <ImenaBranding />

                {/* Navy Blue Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-transparent to-amber-950/30"></div>

                {/* Geometric Hexagonal Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.2) 1px, transparent 0)`, backgroundSize: '32px 32px' }}></div>

                {/* Gold Accent Frame */}
                <div className="absolute inset-8 border-2 border-amber-600/30 rounded-sm pointer-events-none"></div>
                <div className="absolute inset-12 border border-amber-700/20 rounded-sm pointer-events-none"></div>

                <div className="relative z-10 w-full flex flex-col items-center h-full">
                    <div className="mb-6 bg-amber-600/10 px-8 py-2 rounded-full border border-amber-600/30 backdrop-blur-sm">
                        <span className="text-[10px] font-black tracking-[0.4em] text-amber-400 uppercase">{location || "COMPANY NAME"}</span>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-5xl font-black tracking-tighter text-white mb-0 leading-none">EMPLOYEE</h1>
                        <h2 className="text-xl font-bold tracking-[0.5em] text-brand-gold uppercase">OF THE MONTH</h2>
                    </div>

                    {/* Hexagon Photo Frame */}
                    <div className="relative w-64 h-64 mb-10 group">
                        <div className="absolute inset-0 bg-brand-gold rotate-[30deg] scale-105 shadow-[0_0_40px_rgba(212,175,55,0.3)]"></div>
                        <div className="absolute inset-2 bg-black rotate-[30deg]"></div>
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                            {image ? (
                                <img src={image} className="w-full h-full object-cover grayscale brightness-110 contrast-125 transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                                    <div className="w-20 h-20 border-2 border-brand-gold/20 rounded-full flex items-center justify-center">
                                        <div className="w-12 h-12 bg-brand-gold/10 rounded-full"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Ribbons */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-20 h-10 bg-brand-gold/80 z-20 skew-y-12 shadow-xl flex items-center justify-center">
                            <div className="w-16 h-0.5 bg-black/20"></div>
                        </div>
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-20 h-10 bg-brand-gold/80 z-20 -skew-y-12 shadow-xl flex items-center justify-center">
                            <div className="w-16 h-0.5 bg-black/20"></div>
                        </div>
                    </div>

                    <div className="text-center w-full">
                        <div className="text-3xl font-cursive text-white mb-1" style={{ fontFamily: "'Great Vibes', cursive" }}>Congratulations</div>
                        <div className="text-4xl font-black text-white uppercase tracking-tight mb-1">{subtitle || "David Lee"}</div>
                        <div className="text-xs font-bold text-brand-gold tracking-[0.3em] uppercase mb-8">{title || "SOFTWARE ENGINEER"}</div>

                        <div className="max-w-[340px] mx-auto text-[11px] font-medium text-gray-400 leading-relaxed uppercase tracking-widest border-t border-brand-gold/20 pt-6">
                            {message || "Your outstanding technical expertise and collaborative spirit have been instrumental in delivering high-quality solutions to our clients."}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 31: Graduation Thank You (Custom Background 21.jpg)
    if (variant === 31) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans flex flex-col items-center" style={backgroundStyle}>
                <ImenaBranding />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px] z-0"></div>
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 to-transparent z-0"></div>

                <div className="relative z-20 flex flex-col items-center justify-center h-full px-12 text-center">
                    <div className="mb-10 group">
                        <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto mb-4"></div>
                        <span className="text-[11px] font-black tracking-[0.6em] text-brand-gold uppercase drop-shadow-lg">
                            {date || "CLASS OF 2026"}
                        </span>
                    </div>

                    <h1 className="text-7xl font-black text-white leading-none mb-4 uppercase drop-shadow-2xl italic tracking-tighter"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        {title || "GRADUATION"}
                    </h1>

                    <div className="w-32 h-[1px] bg-white/20 mb-12"></div>

                    <div className="max-w-md bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-10 shadow-2xl mb-14">
                        <p className="text-sm font-medium leading-relaxed text-gray-200 uppercase tracking-widest italic">
                            {message || "Thank you for all your support and being part of this special milestone in my journey."}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="text-[10px] font-bold text-brand-gold/60 uppercase tracking-[0.4em]">With Gratitude,</div>
                        <div className="text-2xl font-black tracking-[0.2em] text-white uppercase">{subtitle || "JORDAN JONSON"}</div>
                    </div>
                </div>

                {/* Light Beams */}
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/2 z-0"></div>
            </div>
        );
    }

    // Default Variant 0: Premium Certificate / Overlay Layout
    return (
        <div className="relative w-full h-full bg-black flex flex-col items-center justify-center p-12 overflow-hidden font-sans" style={backgroundStyle}>
            <ImenaBranding />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent z-0 opacity-60"></div>

            <div className="relative z-10 w-full flex flex-col items-center text-center">
                {/* Personal Image Component: Rendered as a prominent feature */}
                <div className="relative mb-10 group">
                    <div className="absolute -inset-1 bg-brand-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative w-64 h-80 rounded-[4px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border-[0.5px] border-white/10 overflow-hidden transform-gpu transition-transform duration-700 group-hover:scale-[1.02]">
                        {image ? (
                            <img src={image} className="w-full h-full object-cover brightness-110 contrast-105" alt="Award Recipient" />
                        ) : (
                            <div className="w-full h-full bg-neutral-900/80 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-dashed border-white/5">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <div className="w-8 h-8 bg-brand-gold/20 rounded-full"></div>
                                </div>
                                <span className="text-[10px] text-white/30 font-black tracking-widest uppercase italic">Photo Here</span>
                            </div>
                        )}
                        {/* Reflective Surface Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-20 pointer-events-none"></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-[1px] bg-brand-gold/40 mb-6"></div>
                        <h2 className="text-brand-gold uppercase tracking-[0.5em] text-[9px] font-black mb-3">
                            {title || "Special Recognition"}
                        </h2>
                        <h1 className="text-4xl font-serif text-white mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {subtitle || "Recipient Name"}
                        </h1>
                        <div className="w-12 h-[1px] bg-brand-gold/40 mt-6"></div>
                    </div>

                    <p className="text-white/70 text-xs max-w-sm mb-10 leading-relaxed uppercase tracking-[0.2em] font-medium pt-4">
                        {message || "For your exceptional contributions and unwavering commitment to excellence."}
                    </p>

                    <div className="flex gap-16 text-white/40 text-[9px] font-black uppercase tracking-[0.3em] border-t border-white/5 pt-10 mt-6">
                        <div className="text-center group">
                            <span className="block text-brand-gold/60 mb-2 transition-colors group-hover:text-brand-gold">Date Presented</span>
                            {date || "2024"}
                        </div>
                        <div className="text-center group">
                            <span className="block text-brand-gold/60 mb-2 transition-colors group-hover:text-brand-gold">Location</span>
                            {location || "Official Venue"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementTemplate;
