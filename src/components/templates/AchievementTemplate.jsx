import React from 'react';

const AchievementTemplate = ({ data }) => {
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

    // Variant 0: Premium Image/Layout Overlay
    return (
        <div className="relative w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-12 overflow-hidden font-sans" style={backgroundStyle}>
            <ImenaBranding />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0"></div>
            <div className="relative z-10 w-full flex flex-col items-center text-center">
                <div className="w-16 h-1 bg-gold-500 mb-8"></div>
                <h2 className="text-gold-500 uppercase tracking-[0.4em] text-xs font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {title || "Certificate of Excellence"}
                </h2>
                <h1 className="text-5xl font-serif italic text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {subtitle || "Recipient Name"}
                </h1>
                <p className="text-white/80 text-sm max-w-sm mb-10 italic leading-relaxed">
                    "{message || "For outstanding performance and dedication to excellence."}"
                </p>
                <div className="flex gap-12 text-white/60 text-[10px] font-bold uppercase tracking-widest border-t border-white/10 pt-8 mt-4">
                    <div className="text-center"><span className="block text-gold-500 mb-1">Date</span>{date || "2024"}</div>
                    <div className="text-center"><span className="block text-gold-500 mb-1">Authority</span>{location || "Head of Department"}</div>
                </div>
            </div>
        </div>
    );
};

export default AchievementTemplate;
