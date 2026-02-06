import React from 'react';
import brandLogo from '@/assets/brand-logo.png';
import { Heart } from 'lucide-react';

const ValentineTemplate = ({ data }) => {
    const { title, subtitle, date, image, message, variant = 10, location, time, phone, backgroundType, backgroundImage } = data;

    const backgroundStyle = backgroundType === 'image' && backgroundImage ? {
        backgroundImage: `url(${backgroundImage.src || backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    const ImenaBranding = () => (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-1.5 opacity-60 select-none pointer-events-none hover:opacity-100 transition-opacity">
            <img src={brandLogo.src || brandLogo} alt="Imena" className="h-7 w-auto drop-shadow-lg" />
            <span className="text-[7px] font-black tracking-[0.3em] uppercase text-white/50 whitespace-nowrap">Designed by Imena</span>
        </div>
    );

    // Variant 10: Custom Valentine Background 1
    if (variant === 10) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px] z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center">
                    <div className="relative mb-12">
                        <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full"></div>
                        <Heart className="relative text-white w-12 h-12 fill-white animate-pulse opacity-80" />
                    </div>

                    {title && (
                        <>
                            <h1 className="text-5xl font-black text-white leading-tight mb-4 uppercase drop-shadow-2xl"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                {title}
                            </h1>
                            <div className="w-24 h-[1px] bg-white/20 mb-8 mt-2"></div>
                        </>
                    )}

                    {subtitle && (
                        <p className="text-sm font-bold tracking-[0.5em] text-rose-100/80 mb-12 uppercase">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Variant 11: Custom Valentine Background 2
    if (variant === 11) {
        return (
            <div className="relative w-full h-full bg-pink-50 text-rose-900 overflow-hidden font-serif" style={backgroundStyle}>
                <ImenaBranding />

                {/* Light cinematic overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.2px] z-0"></div>

                <div className="relative z-20 flex flex-col items-center justify-center h-full px-14 text-center">
                    <div className="mb-10 opacity-40">
                        <Heart className="w-8 h-8 text-rose-400 fill-rose-200" />
                    </div>

                    {title && (
                        <>
                            <h1 className="text-5xl font-black mb-6 leading-tight uppercase tracking-tighter text-rose-950"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                {title}
                            </h1>
                            <div className="w-16 h-[2px] bg-rose-300/40 mb-10"></div>
                        </>
                    )}

                    {subtitle && (
                        <div className="text-[10px] font-black tracking-[0.6em] uppercase text-rose-400/80">
                            {subtitle}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default Fallback: Minimal Romance
    return (
        <div className="relative w-full h-full bg-white flex flex-col items-center justify-center p-12 text-center" style={backgroundStyle}>
            <ImenaBranding />
            <div className="border border-rose-100 p-12 w-full h-full flex flex-col items-center justify-center bg-rose-50/10">
                <Heart className="text-rose-400 w-8 h-8 mb-8" />
                <h1 className="text-3xl font-serif italic mb-6 text-rose-900">{title || "Valentine's Day"}</h1>
                <div className="w-8 h-[1px] bg-rose-200 mb-8"></div>
                <p className="text-xs text-rose-800/60 leading-relaxed mb-10 max-w-[200px]">{message}</p>
                <p className="text-[9px] font-black tracking-widest uppercase text-rose-300">{date} • {location}</p>
            </div>
        </div>
    );
};

export default ValentineTemplate;
