import React from 'react';
import { User, Star } from 'lucide-react';

const BirthdayTemplate = ({ data }) => {
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

    // Variant 5: Golden Glitter Party
    if (variant === 5) {
        return (
            <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans" style={backgroundStyle}>
                <ImenaBranding />

                {/* OPAQUE MASK: Specifically covers the center area where original text is */}
                <div className="absolute top-[20%] bottom-[20%] left-[10%] right-[10%] bg-black z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center">
                    <div className="mb-4 mt-16 bg-black px-6 py-2 border border-amber-500/30">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-amber-400 uppercase">You are invited to my</span>
                    </div>

                    <h1 className="text-7xl font-cursive text-amber-400 mb-0 leading-none drop-shadow-2xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
                        {subtitle || "Birthday"}
                    </h1>
                    <h2 className="text-4xl font-black tracking-[0.5em] text-amber-500 uppercase mb-8">
                        {title || 'PARTY'}
                    </h2>

                    <div className="flex flex-col items-center mb-8 bg-black p-6 rounded-lg border border-amber-500/20">
                        <div className="text-xl font-bold tracking-[0.2em] text-amber-400 mb-1">MARCH</div>
                        <div className="flex items-center gap-6">
                            <span className="text-sm font-medium opacity-70">SUNDAY</span>
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-6xl font-black">{date?.split(' ')[1] || "16"}</span>
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-sm font-bold uppercase">{time || "AT 5 PM"}</span>
                        </div>
                        <div className="text-xl font-bold tracking-[0.2em] mt-1 text-amber-400">2024</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-amber-400 font-bold tracking-[0.2em] text-sm">{phone || "+123-456-7890"}</div>
                        <div className="text-gray-300 text-[10px] font-medium tracking-[0.1em] uppercase max-w-[250px] leading-relaxed italic">{location || "123 Anywhere St., Any City"}</div>
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

                {/* OPAQUE WHITE MASK: Clears the right side and name block */}
                <div className="absolute right-0 top-0 w-1/2 h-full bg-white z-0"></div>
                <div className="absolute bottom-0 left-0 w-full h-[20%] bg-white z-10"></div>

                {/* User Photo Overlay */}
                <div className="absolute top-[14%] left-[10.5%] w-[42.5%] h-[68%] z-20">
                    <div className="w-full h-full relative overflow-hidden bg-neutral-100">
                        {image ? (
                            <img src={image} className="w-full h-full object-cover grayscale brightness-110 contrast-110" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                <User className="w-20 h-20" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Text Content */}
                <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col justify-center p-14 z-30">
                    <div className="mb-8">
                        <h2 className="font-cursive text-5xl text-amber-700 leading-none mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                            {title?.split(' ')[0] || "Happy"}
                        </h2>
                        <h1 className="text-5xl font-black text-black tracking-tight leading-none uppercase">
                            {title?.toUpperCase().includes('HAPPY') ? 'BIRTHDAY' : (title || 'BIRTHDAY')}
                        </h1>
                    </div>

                    <p className="text-neutral-500 text-[11px] leading-relaxed mb-10 max-w-[180px] border-l-4 border-amber-600 pl-5 italic">
                        {message || "Wishing you yet the most amazing birthday ever."}
                    </p>

                    <div className="mt-8 self-end">
                        <div className="bg-[#8b4513] text-white px-10 py-4 font-bold text-2xl uppercase tracking-widest shadow-2xl">
                            {subtitle || "NAME"}
                        </div>
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

                {/* OPAQUE MASK: Specifically masks out the "Happy Birthday" and text in the center */}
                <div className="absolute top-[15%] bottom-[15%] left-[15%] right-[15%] bg-black z-0"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-14">
                    <h2 className="text-amber-500 font-bold tracking-[0.5em] uppercase text-sm mb-4 drop-shadow-md">
                        {title || "HAPPY"}
                    </h2>
                    <h1 className="text-8xl font-serif italic text-white leading-none mb-10 drop-shadow-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {subtitle || "Birthday"}
                    </h1>

                    <div className="max-w-[300px] text-gray-300 text-xs leading-relaxed mb-12 bg-black/80 p-6 rounded-2xl border border-white/10 shadow-2xl">
                        <p className="italic">"{message || "Wishing you a day filled with love and laughter."}"</p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="text-amber-400 font-bold tracking-[0.3em] text-base">{date || "MARCH 16, 2024"}</div>
                        <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-white/60">
                            <span>{time || "5:00 PM"}</span>
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                            <span>{location || "YOUR PLACE"}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default BirthdayTemplate;
