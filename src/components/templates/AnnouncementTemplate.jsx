import React from 'react';

const AnnouncementTemplate = ({ data }) => {
    const { title, subtitle, date, image, message, variant = 0, location, time, phone, backgroundType, backgroundImage } = data;

    const backgroundStyle = backgroundType === 'image' && backgroundImage ? {
        backgroundImage: `url(${backgroundImage.src || backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    const ImenaBranding = () => (
        <div className="absolute bottom-4 right-4 z-[60] flex items-center gap-2 opacity-30 select-none pointer-events-none grayscale">
            <img src="/imena-logo.svg" alt="Imena" className="h-6 w-auto" />
            <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Designed by Imena</span>
        </div>
    );

    // Variant 5: Annual Gala Dinner
    if (variant === 5) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Completely clears the inner black box of original text */}
                <div className="absolute top-[10%] bottom-[10%] left-[12%] right-[12%] bg-black z-0 border border-amber-500/20"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-16 text-center">
                    <div className="mb-6 mt-16 bg-black p-3 border border-amber-500/10">
                        <div className="text-sm font-bold tracking-[0.4em] text-amber-200 uppercase">{subtitle || "COMPANY NAME"}</div>
                    </div>
                    <div className="text-[9px] tracking-[0.4em] uppercase mb-10 opacity-70 font-semibold italic">Requests the honor of your presence</div>

                    <h1 className="text-6xl font-cursive text-amber-400 mb-10 leading-tight drop-shadow-2xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                        {title || "Annual Gala Dinner"}
                    </h1>

                    <div className="flex items-center gap-10 border-y border-white/10 py-6 mb-12 w-full justify-center bg-black/40">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">SATURDAY</div>
                        <div className="text-5xl font-serif text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>{date?.split(' ')[1] || "17"}</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">{time || "6:00 PM"}</div>
                    </div>

                    <div className="space-y-5">
                        <div className="text-xs font-black tracking-[0.3em] uppercase text-amber-200">{location || "THE GRAND BALLROOM"}</div>
                        <p className="text-[9px] opacity-70 tracking-widest max-w-[300px] leading-relaxed italic">{message}</p>
                        <div className="text-[10px] text-amber-400 font-bold tracking-[0.2em] pt-4">{phone || "R.S.V.P"}</div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 6: Luxury Event
    if (variant === 6) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Clears the central invitation text block */}
                <div className="absolute top-[35%] bottom-[10%] left-[25%] right-[25%] bg-black z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-14 text-center">
                    <div className="mt-20 mb-8 w-32 h-[1px] bg-white/20"></div>
                    <h2 className="text-white uppercase tracking-[0.6em] text-base font-black mb-6 drop-shadow-lg">
                        {title?.toUpperCase() || "LUXURY EVENT"}
                    </h2>
                    <h1 className="text-6xl font-cursive mb-12 text-white drop-shadow-xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                        Invitation
                    </h1>

                    <div className="w-full max-w-xs border-t border-white/10 pt-10">
                        <p className="text-white/60 font-medium text-[11px] leading-relaxed uppercase tracking-[0.2em] italic">
                            {message || "We request the pleasure of your company."}
                        </p>
                    </div>

                    <div className="mt-16 py-2 px-6 border border-white/10 bg-black shadow-2xl">
                        <div className="text-[10px] tracking-[0.6em] font-bold text-white/70 uppercase">
                            {date || "RSVP REQUIRED"}
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
                    <div className="mb-10 bg-black p-5 border border-amber-500/20 rounded-full shadow-2xl">
                        <div className="text-amber-400 font-cursive text-3xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                            {subtitle || "Ray's Bistro"}
                        </div>
                    </div>

                    <div className="relative">
                        <h1 className="text-9xl font-black text-amber-500 italic leading-none mb-1 transform scale-y-125" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {title?.split(' ')[0] || "Grand"}
                        </h1>
                        <h2 className="text-4xl font-black tracking-[0.5em] text-white uppercase mb-12">Opening</h2>
                    </div>

                    <div className="flex gap-14 mb-14 bg-black p-6 border border-white/5 shadow-2xl">
                        <div className="text-center">
                            <span className="block text-[9px] font-black uppercase tracking-widest text-amber-500 mb-2">DATE:</span>
                            <span className="text-3xl font-black tracking-tighter">{date || "31st"}</span>
                        </div>
                        <div className="w-[1px] h-12 bg-white/20"></div>
                        <div className="text-center">
                            <span className="block text-[9px] font-black uppercase tracking-widest text-amber-500 mb-2">TIME:</span>
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

    return null;
};

export default AnnouncementTemplate;
