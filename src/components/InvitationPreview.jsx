import React, { forwardRef } from 'react';
import BirthdayTemplate from './templates/BirthdayTemplate';
import AssemblyTemplate from './templates/AssemblyTemplate';
import AchievementTemplate from './templates/AchievementTemplate';
import AnnouncementTemplate from './templates/AnnouncementTemplate';
import ValentineTemplate from './templates/ValentineTemplate';
import RememberingTemplate from './templates/RememberingTemplate';

const InvitationPreview = forwardRef(({ data, templateType = 'birthday' }, ref) => {

    const renderTemplate = () => {
        switch (templateType) {
            case 'assembly':
                return <AssemblyTemplate data={data} />;
            case 'achievement':
                return <AchievementTemplate data={data} />;
            case 'announcement':
                return <AnnouncementTemplate data={data} />;
            case 'valentine':
                return <ValentineTemplate data={data} />;
            case 'remembering':
                return <RememberingTemplate data={data} />;
            case 'birthday':
            default:
                return <BirthdayTemplate data={data} />;
        }
    };

    const [scale, setScale] = React.useState(1);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        const calculateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const windowHeight = window.innerHeight;

                // Allow some padding
                const targetWidth = Math.min(containerWidth - 40, 500);
                const targetHeight = Math.min(windowHeight * 0.7, 700);

                const scaleX = targetWidth / 500;
                const scaleY = targetHeight / 700;

                setScale(Math.min(scaleX, scaleY, 1));
            }
        };

        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, []);

    return (
        <div ref={containerRef} className="w-full flex justify-center items-center overflow-hidden py-10 min-h-[400px]">
            {/* 
         Fixed Dimensions: 500x700 (Approx A5 ratio)
         This component represents the "Printable Area"
      */}
            <div
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                }}
                className="transition-transform duration-500 ease-out"
            >
                <div
                    ref={ref}
                    id="invitation-card"
                    className="relative w-[500px] h-[700px] bg-black shadow-2xl overflow-hidden print:shadow-none bg-neutral-950 flex-shrink-0"
                >
                    {/* Global Grain/Noise Texture for Paper Feel */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    ></div>

                    {/* Inner Content */}
                    {renderTemplate()}
                </div>
            </div>
        </div>
    );
});

InvitationPreview.displayName = 'InvitationPreview';
export default InvitationPreview;
