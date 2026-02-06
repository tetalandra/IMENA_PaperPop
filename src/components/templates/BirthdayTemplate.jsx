import React from 'react';
import brandLogo from '@/assets/brand-logo.png';
import { User, Star } from 'lucide-react';

const BirthdayTemplate = ({ data }) => {
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

    // Variant 5: Golden Glitter Party
    if (variant === 5) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Expanded to cover bottom contact info as well */}
                <div className="absolute top-[18%] bottom-[5%] left-[8%] right-[8%] bg-black/95 z-0 shadow-[0_0_50px_40px_rgba(0,0,0,0.95)]"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center">
                    <div className="mb-2 mt-12 opacity-80">
                        <span className="text-[9px] font-black tracking-[0.4em] text-brand-gold uppercase">You are invited to the</span>
                    </div>

                    <h1 className="text-8xl font-cursive text-brand-gold mb-12 leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Great Vibes', cursive" }}>
                        {subtitle || "Birthday"}
                    </h1>
                    <h2 className="text-4xl font-black tracking-[0.3em] text-brand-gold uppercase mb-12 drop-shadow-lg">
                        {title || 'PARTY'}
                    </h2>

                    <div className="flex flex-col items-center mb-10 py-6 border-y border-brand-gold/20 w-full max-w-[280px]">
                        <div className="text-lg font-black tracking-[0.3em] text-brand-gold mb-2 uppercase">MARCH</div>
                        <div className="flex items-center gap-5">
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">SUNDAY</span>
                            <div className="w-1.5 h-1.5 bg-brand-gold rotate-45"></div>
                            <span className="text-6xl font-black text-white">{date?.split(' ')[1] || "16"}</span>
                            <div className="w-1.5 h-1.5 bg-brand-gold rotate-45"></div>
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{time || "5 PM"}</span>
                        </div>
                        <div className="text-lg font-black tracking-[0.3em] mt-2 text-brand-gold uppercase">2024</div>
                    </div>

                    <div className="space-y-3 mt-4">
                        <div className="text-brand-gold font-black tracking-[0.2em] text-xs uppercase">{phone || "+123-456-7890"}</div>
                        <div className="text-neutral-400 text-[9px] font-bold tracking-[0.15em] uppercase max-w-[260px] leading-relaxed border-t border-white/10 pt-3">
                            {location || "123 Anywhere St., Any City"}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 6: Modern Photo
    if (variant === 6) {
        return (
            <div className="relative w-full h-full bg-white flex overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE WHITE MASK: Clears the right side and name block completely */}
                <div className="absolute right-0 top-0 w-1/2 h-full bg-white z-0"></div>
                <div className="absolute bottom-0 left-0 w-full h-[25%] bg-white z-10"></div>

                {/* User Photo Overlay */}
                <div className="absolute top-[12%] left-[8%] w-[45%] h-[72%] z-20 shadow-[20px_20px_60px_rgba(0,0,0,0.1)]">
                    <div className="w-full h-full relative overflow-hidden bg-neutral-100 border-[8px] border-white">
                        {image ? (
                            <img src={image} className="w-full h-full object-cover grayscale brightness-105 contrast-110" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                <User className="w-24 h-24 stroke-[1px]" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Text Content */}
                <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col justify-center p-12 z-30">
                    <div className="mb-6">
                        <h2 className="font-cursive text-5xl text-amber-700 leading-none mb-1" style={{ fontFamily: "'Great Vibes', cursive" }}>
                            {title?.split(' ')[0] || "Happy"}
                        </h2>
                        <h1 className="text-4xl font-black text-black tracking-tighter leading-none uppercase">
                            {title?.toUpperCase().includes('HAPPY') ? 'BIRTHDAY' : (title || 'BIRTHDAY')}
                        </h1>
                    </div>

                    <div className="w-8 h-[2px] bg-amber-600 mb-8"></div>

                    <p className="text-neutral-500 text-[10px] leading-relaxed mb-10 max-w-[180px] italic">
                        {message || "Wishing you yet the most amazing birthday ever."}
                    </p>

                    <div className="mt-4">
                        <div className="bg-[#1a1a1a] text-white px-8 py-5 font-black text-xl uppercase tracking-[0.2em] shadow-xl inline-block">
                            {subtitle || "NAME"}
                        </div>
                    </div>

                    <div className="mt-10 space-y-1 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                        <div>{date || "MARCH 16"}</div>
                        <div>{location || "YOUR RESIDENCE"}</div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 7: Elegant Balloon Party
    if (variant === 7) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Enhanced coverage for the central invitation text */}
                <div className="absolute inset-[15%] bg-black/90 z-0 shadow-[0_0_80px_60px_rgba(0,0,0,0.9)]"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-14">
                    <h2 className="text-brand-blue font-black tracking-[0.25em] uppercase text-[10px] mb-4 opacity-80">
                        {title || "HAPPY"}
                    </h2>
                    <h1 className="text-8xl font-serif italic text-white leading-none mb-8 drop-shadow-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {subtitle || "Birthday"}
                    </h1>

                    <div className="max-w-[320px] text-gray-300 text-[11px] leading-relaxed mb-12 px-6">
                        <p className="italic font-medium opacity-80">"{message || "Wishing you a day filled with love and laughter."}"</p>
                    </div>

                    <div className="flex flex-col items-center gap-6 w-full max-w-[200px]">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent"></div>
                        <div className="space-y-2">
                            <div className="text-brand-blue font-black tracking-[0.3em] text-sm uppercase">{date || "MARCH 16"}</div>
                            <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40">
                                {time || "5:00 PM"} <span className="mx-2 text-brand-gold opacity-50">•</span> {location || "YOUR PLACE"}
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Default / Fallback
    return (
        <div className="relative w-full h-full bg-neutral-900 text-white flex flex-col items-center justify-center p-12 text-center" style={backgroundStyle}>
            <ImenaBranding />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            <div className="relative z-10 border-2 border-brand-blue/20 p-10 bg-black/60 rounded-3xl">
                <h1 className="text-4xl font-serif italic mb-4 text-brand-gold">{subtitle || "Birthday"}</h1>
                <h2 className="text-xl font-bold tracking-[0.3em] uppercase mb-8">{title || "Invitation"}</h2>
                <div className="space-y-4 opacity-70">
                    <p className="text-sm tracking-widest uppercase">{date} • {time}</p>
                    <p className="text-xs italic">{location}</p>
                </div>
            </div>
        </div>
    );
};

export default BirthdayTemplate;
