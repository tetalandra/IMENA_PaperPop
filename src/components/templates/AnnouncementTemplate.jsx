import React from 'react';
import brandLogo from '@/assets/brand-logo.png';

const AnnouncementTemplate = ({ data }) => {
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

    // Variant 5: Annual Gala Dinner
    if (variant === 5) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Enhanced coverage for a cleaner look */}
                <div className="absolute top-[8%] bottom-[8%] left-[10%] right-[10%] bg-black/95 z-0 border border-amber-500/10 shadow-[0_0_100px_50px_rgba(0,0,0,0.95)]"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-16 text-center">
                    <div className="mb-4 mt-12 bg-black/80 px-4 py-2 border border-brand-gold/20 inline-block">
                        <div className="text-[10px] font-black tracking-[0.5em] text-brand-gold uppercase">{subtitle || "COMPANY NAME"}</div>
                    </div>
                    <div className="text-[8px] tracking-[0.4em] uppercase mb-10 opacity-50 font-bold italic">Requests the honor of your presence</div>

                    <h1 className="text-7xl font-cursive text-amber-400 mb-10 leading-none drop-shadow-2xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                        {title || "Annual Gala Dinner"}
                    </h1>

                    <div className="flex items-center gap-12 border-y border-white/5 py-8 mb-12 w-full justify-center">
                        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">SATURDAY</div>
                        <div className="text-6xl font-serif text-brand-gold leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{date?.split(' ')[1] || "17"}</div>
                        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">{time || "6:00 PM"}</div>
                    </div>

                    <div className="space-y-6">
                        <div className="text-[11px] font-black tracking-[0.4em] uppercase text-white shadow-sm inline-block">{location || "THE GRAND BALLROOM"}</div>
                        <p className="text-[10px] opacity-60 tracking-[0.1em] max-w-[280px] leading-relaxed italic mx-auto">"{message || "Join us for an evening of celebration and excellence."}"</p>
                        <div className="w-12 h-[1px] bg-brand-gold/40 mx-auto mt-6"></div>
                        <div className="text-[9px] text-brand-gold font-black tracking-[0.3em] uppercase opacity-80">{phone || "R.S.V.P REQUIRED"}</div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 6: Luxury Event (Custom Background 20.jpg)
    if (variant === 6) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* Cinematic Overlays: Subtle darkened center for text legibility */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] z-0"></div>
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-14 text-center">
                    <div className="mb-8 w-16 h-[1px] bg-white/20"></div>

                    <h2 className="text-white uppercase tracking-[0.6em] text-[10px] font-black mb-4 drop-shadow-lg">
                        {subtitle || "Exclusively Yours"}
                    </h2>

                    <h1 className="text-6xl font-black text-white leading-none mb-10 uppercase drop-shadow-2xl"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        {title || "LUXURY EVENT"}
                    </h1>

                    <div className="w-full max-w-sm border-t border-white/10 pt-10">
                        <p className="text-white font-medium text-[13px] leading-relaxed uppercase tracking-[0.2em] mb-12">
                            {message || "We request the pleasure of your company for an unforgettable evening of elegance."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 w-full max-w-xs border-y border-white/5 py-8">
                        <div className="text-center group">
                            <span className="block text-[8px] text-white/40 mb-1 font-black uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">Date</span>
                            <span className="text-xs font-bold tracking-widest">{date || "TBA"}</span>
                        </div>
                        <div className="text-center group">
                            <span className="block text-[8px] text-white/40 mb-1 font-black uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">Venue</span>
                            <span className="text-xs font-bold tracking-widest truncate block w-32">{location || "GRAND PLAZA"}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 7: Grand Opening
    if (variant === 7) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Clears the center text while keeping the golden ribbons */}
                <div className="absolute top-[20%] bottom-[20%] left-[20%] right-[20%] bg-black z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-14 text-center">
                    <div className="mb-10 bg-black p-5 border border-brand-gold/20 rounded-full shadow-2xl">
                        <div className="text-brand-gold font-cursive text-3xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                            {subtitle || "Ray's Bistro"}
                        </div>
                    </div>

                    <div className="relative">
                        <h1 className="text-9xl font-black text-brand-gold italic leading-none mb-1 transform scale-y-125" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {title?.split(' ')[0] || "Grand"}
                        </h1>
                        <h2 className="text-4xl font-black tracking-[0.5em] text-white uppercase mb-12">Opening</h2>
                    </div>

                    <div className="flex gap-14 mb-14 bg-black p-6 border border-white/5 shadow-2xl">
                        <div className="text-center">
                            <span className="block text-[9px] font-black uppercase tracking-widest text-brand-gold mb-2">DATE:</span>
                            <span className="text-3xl font-black tracking-tighter">{date || "31st"}</span>
                        </div>
                        <div className="w-[1px] h-12 bg-white/20"></div>
                        <div className="text-center">
                            <span className="block text-[9px] font-black uppercase tracking-widest text-brand-gold mb-2">TIME:</span>
                            <span className="text-3xl font-black tracking-tighter">{time || "4pm"}</span>
                        </div>
                    </div>

                    <p className="max-w-[250px] text-[10px] font-bold tracking-[0.2em] italic text-gray-500 mb-6 leading-relaxed">
                        {location}
                    </p>

                    <div className="text-amber-400 text-xs font-black tracking-[0.3em] border-t border-amber-500/10 pt-4 w-full max-w-[200px]">
                        {phone || "R.S.V.P"}
                    </div>
                </div>
            </div>
        );
    }

    // Default / Fallback
    return (
        <div className="relative w-full h-full bg-black text-white flex flex-col items-center justify-center p-12 text-center" style={backgroundStyle}>
            <ImenaBranding />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
            <div className="relative z-10 border border-white/10 p-12 bg-black/80">
                <div className="w-12 h-1 bg-brand-gold mb-8 mx-auto"></div>
                <h1 className="text-3xl font-black tracking-[0.4em] uppercase mb-6">{title || "Notice"}</h1>
                <p className="text-sm font-medium tracking-[0.2em] text-white/60 mb-10 max-w-xs">{message || "You are cordially invited."}</p>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] border-t border-white/10 pt-8">
                    {date} • {location}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementTemplate;
