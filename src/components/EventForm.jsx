import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronRight, Camera, Palette, Layout, Heart,
    Gift, Bell, BookOpen, Users, Feather, Award as AwardIcon, Image as ImageIcon,
    CheckCircle, MessageSquare, Star, PartyPopper, Crown, Scissors, Trophy,
    GraduationCap, Presentation, Flower2, Flame, User, Type, AlignLeft,
    ArrowLeft, Download, Calendar, MapPin, Clock, Phone, FileText, Save, Loader2, Megaphone
} from 'lucide-react';
import InvitationPreview from './InvitationPreview';
import { downloadPDF, downloadPNG } from '../utils/pdfUtils';
import { createInvitation, uploadImage } from '../utils/api';
import Toast from './Toast';

import birthdayV5 from '../assets/templates/birthday_variant_5.jpg';
import birthdayV6 from '../assets/templates/birthday_variant_6.jpg';
import birthdayV7 from '../assets/templates/birthday_variant_7.jpg';
import noticeV5 from '../assets/templates/notice_variant_5.jpg';
import noticeV6 from '../assets/templates/notice_variant_6.jpg';
import noticeV7 from '../assets/templates/notice_variant_7.jpg';
import assemblyTuesday from '../assets/templates/17.jpg';
import awardBg from '../assets/templates/18.jpg';
import assemblySaturday from '../assets/templates/19.jpg';
import kwibukaBg from '../assets/templates/kwibuka.jpg';
import kwibukaLogo from '../assets/kwibuka.png';
import valentineV10 from '../assets/templates/valentine_v10.jpg';
import valentineV11 from '../assets/templates/valentine_v11.jpg';
import noticeV20 from '../assets/templates/20.jpg';
import awardGraduation from '../assets/templates/21.jpg';
const InputGroup = ({
    label, name, value, onChange, type = "text", icon: Icon, placeholder, multiline = false,
    delay, isFocused, onFocus, onBlur, className, required = false
}) => {
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    return (
        <div
            className={`relative transition-all duration-500 ease-out ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div
                className={`relative group bg-card/60 backdrop-blur-2xl border rounded-[1.25rem] overflow-hidden transition-all duration-700
                ${isFocused
                        ? 'border-brand-blue/40 shadow-[0_25px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.5)] bg-card/90 -translate-y-1'
                        : 'border-foreground/[0.03] hover:border-foreground/[0.08] shadow-sm'
                    }
            `}
            >
                {/* Floating Label */}
                <label
                    className={`absolute left-12 transition-all duration-500 pointer-events-none z-10 font-semibold tracking-widest
                    ${(isFocused || hasValue)
                            ? 'top-3 text-[8px] text-brand-blue uppercase'
                            : 'top-1/2 -translate-y-1/2 text-xs text-neutral-500 uppercase'
                        }
                `}
                >
                    {label} {required && <span className="text-red-500 ml-1 italic group-hover:not-italic transition-all">*</span>}
                </label>

                {/* Icon */}
                <div className={`absolute top-0 left-0 h-full w-12 flex items-center justify-center transition-all duration-500
                    ${isFocused ? 'text-brand-blue scale-110' : 'text-neutral-600'}
                `}>
                    {Icon && <Icon className="w-4 h-4" />}
                </div>

                {multiline ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        rows="3"
                        className="w-full bg-transparent border-none text-foreground placeholder-transparent focus:ring-0 pt-8 pb-4 pl-12 pr-6 text-sm resize-none custom-scrollbar font-medium"
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        className="w-full bg-transparent border-none text-foreground placeholder-transparent focus:ring-0 pt-8 pb-4 pl-12 pr-6 text-sm h-[68px] font-medium"
                        placeholder={placeholder}
                    />
                )}

                {/* Focus Accent */}
                <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent transition-all duration-700 ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
            </div>
        </div>
    );
};

const EventForm = ({ onBack }) => {
    const previewRef = useRef();
    const [templateType, setTemplateType] = useState('birthday');
    const [focusedField, setFocusedField] = useState(null);

    const initialFormState = {
        title: '',
        subtitle: '',
        date: '',
        time: '',
        location: '',
        phone: '',
        message: '',
        variant: 1,
        backgroundType: 'color',
        backgroundImage: null,
        image: null // Personal photo
    };

    const [formData, setFormData] = useState({
        // Birthdays
        'birthday-5': { ...initialFormState, title: 'John Doe', subtitle: 'Birthday Party', date: 'March 16', variant: 5, backgroundType: 'image', backgroundImage: birthdayV5.src || birthdayV5 },
        'birthday-6': { ...initialFormState, title: 'Modern One', variant: 6, backgroundType: 'image', backgroundImage: birthdayV6.src || birthdayV6 },
        'birthday-7': { ...initialFormState, title: 'Balloon Day', variant: 7, backgroundType: 'image', backgroundImage: birthdayV7.src || birthdayV7 },
        // Announcements
        'announcement-5': { ...initialFormState, title: 'Annual Gala', subtitle: 'Global Solutions', variant: 5, backgroundType: 'image', backgroundImage: noticeV5.src || noticeV5 },
        'announcement-6': { ...initialFormState, title: 'Luxury Event', variant: 6, backgroundType: 'image', backgroundImage: noticeV20.src || noticeV20 },
        'announcement-7': { ...initialFormState, title: 'Grand Opening', subtitle: "Ray's Bistro", variant: 7, backgroundType: 'image', backgroundImage: noticeV7.src || noticeV7 },
        // Achievement
        'achievement-0': { ...initialFormState, title: 'Certificate of Excellence', variant: 0, backgroundType: 'image', backgroundImage: awardBg.src || awardBg },
        'achievement-30': { ...initialFormState, title: 'SOFTWARE ENGINEER', subtitle: 'David Lee', location: 'COMPANY NAME', variant: 30, backgroundType: 'color' },
        'achievement-31': { ...initialFormState, title: 'Class of 2026', subtitle: 'Jordan Jonson', variant: 31, backgroundType: 'image', backgroundImage: awardGraduation.src || awardGraduation },
        // Assembly
        'assembly-3': { ...initialFormState, title: 'Weekly Assembly', variant: 3, backgroundType: 'image', backgroundImage: assemblyTuesday.src || assemblyTuesday },
        'assembly-4': { ...initialFormState, variant: 4, backgroundType: 'image', backgroundImage: assemblySaturday.src || assemblySaturday },
        // Valentine
        'valentine-10': { ...initialFormState, title: "", subtitle: '', variant: 10, backgroundType: 'image', backgroundImage: valentineV10.src || valentineV10 },
        'valentine-11': { ...initialFormState, title: "", subtitle: '', variant: 11, backgroundType: 'image', backgroundImage: valentineV11.src || valentineV11 },
        // Remembering
        'remembering-20': { ...initialFormState, title: "In Memory", subtitle: 'Peaceful Lily', variant: 20 },
        'remembering-21': { ...initialFormState, title: "Kwibuka 31", subtitle: 'Remember-Unite-Renew', variant: 21, backgroundType: 'image', backgroundImage: kwibukaBg.src || kwibukaBg, logo: kwibukaLogo },
    });

    const [currentVariant, setCurrentVariant] = useState(5); // Shared across types but used as key

    const activeKey = `${templateType}-${currentVariant}`;
    const activeData = formData[activeKey] || { ...initialFormState, variant: currentVariant };

    const [templateImages, setTemplateImages] = useState({});
    const [imageFiles, setImageFiles] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [activeKey]: { ...activeData, [name]: value }
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageKey = activeKey;
                setTemplateImages(prev => ({ ...prev, [imageKey]: reader.result }));
                setImageFiles(prev => ({ ...prev, [imageKey]: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const selectPredefinedTemplate = (bg) => {
        setCurrentVariant(bg.variant);
        // Ensure the data exists for this specific premium choice
        if (!formData[`${templateType}-${bg.variant}`]) {
            setFormData(prev => ({
                ...prev,
                [`${templateType}-${bg.variant}`]: {
                    ...initialFormState,
                    variant: bg.variant,
                    backgroundImage: bg.img,
                    backgroundType: bg.img ? 'image' : 'color'
                }
            }));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const { requiredFields } = getFieldConfig();
        const missingFields = requiredFields.filter(f => !activeData[f]);

        if (missingFields.length > 0) {
            showToast(`Missing fields: ${missingFields.join(', ')}`, 'error');
            setIsSaving(false);
            return;
        }

        try {
            let personalImageUrl = activeData.image; // Should be null or existing URL
            const imageKey = `${templateType}-${activeData.variant}`;
            const file = imageFiles[imageKey];

            if (file) {
                const uploadRes = await uploadImage(file);
                personalImageUrl = uploadRes.url;
            }

            await createInvitation({
                ...activeData,
                templateType,
                image: personalImageUrl,
                backgroundImage: activeData.backgroundImage
            });

            showToast('Invitation saved successfully!', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to save invitation', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFocus = (name) => setFocusedField(name);
    const handleBlur = () => setFocusedField(null);

    const handleDownload = async () => {
        try {
            await downloadPDF('invitation-card', `PaperPop-${activeData.title || 'Invitation'}.pdf`);
            showToast('PDF Downloaded Successfully', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to download PDF', 'error');
        }
    };

    const templates = [
        { id: 'birthday', label: 'Birthday', icon: <PartyPopper className="w-4 h-4" />, color: 'from-brand-blue/20' },
        { id: 'announcement', label: 'Notices', icon: <Megaphone className="w-4 h-4" />, color: 'from-brand-gold/20' },
        { id: 'achievement', label: 'Award', icon: <Trophy className="w-4 h-4" />, color: 'from-brand-blue/20' },
        { id: 'assembly', label: 'Assembly', icon: <Presentation className="w-4 h-4" />, color: 'from-brand-gold/20' },
        { id: 'valentine', label: 'Valentine', icon: <Heart className="w-4 h-4" />, color: 'from-red-500/20' },
        { id: 'remembering', label: 'Remembering', icon: <Feather className="w-4 h-4" />, color: 'from-neutral-500/20' },
    ];

    const predefinedBackgrounds = [
        { id: 'b5', label: 'Golden Glitter', img: birthdayV5.src || birthdayV5, variant: 5, category: 'birthday' },
        { id: 'b6', label: 'Modern Photo', img: birthdayV6.src || birthdayV6, variant: 6, category: 'birthday' },
        { id: 'b7', label: 'Balloon Party', img: birthdayV7.src || birthdayV7, variant: 7, category: 'birthday' },
        { id: 'n5', label: 'Annual Gala', img: noticeV5.src || noticeV5, variant: 5, category: 'announcement' },
        { id: 'n6', label: 'Luxury Event', img: noticeV20.src || noticeV20, variant: 6, category: 'announcement' },
        { id: 'n7', label: 'Grand Opening', img: noticeV7.src || noticeV7, variant: 7, category: 'announcement' },
        { id: 'v10', label: 'Velvet Romance', img: valentineV10.src || valentineV10, variant: 10, category: 'valentine' },
        { id: 'v11', label: 'Peony Lace', img: valentineV11.src || valentineV11, variant: 11, category: 'valentine' },
        { id: 'r20', label: 'Peaceful Lily', img: null, variant: 20, category: 'remembering' },
        { id: 'r21', label: 'Candle Light', img: null, variant: 21, category: 'remembering' },
        { id: 'a30', label: 'Employee of Month', img: null, variant: 30, category: 'achievement' },
        { id: 'a31', label: 'Graduation Gratitude', img: null, variant: 31, category: 'achievement' },
    ];

    const getFieldConfig = () => {
        let config = {
            showTime: true,
            showLocation: true,
            locationLabel: 'Location',
            locationIcon: MapPin,
            titleLabel: 'Headline',
            subtitleLabel: 'Name / Subject',
            dateLabel: 'Event Date',
            showPhone: true,
            phoneLabel: 'R.S.V.P',
            showImage: false,
            requiredFields: ['title', 'date', 'location'],
            messagePlaceholder: 'Write a warm invitation message...',
            showMessage: true,
            showDate: true,
        };

        switch (templateType) {
            case 'birthday':
                config.showImage = true;
                config.titleLabel = 'Birthday Name';
                config.locationLabel = 'Party Venue';
                config.requiredFields = ['title', 'date', 'location', 'time'];
                config.messagePlaceholder = 'Wishing you a very happy birthday...';
                config.variants = [
                    { id: 5, name: 'Golden Glitter', preview: <Star className="w-5 h-5" />, img: birthdayV5.src || birthdayV5 },
                    { id: 6, name: 'Modern Photo', preview: <Camera className="w-5 h-5" />, img: birthdayV6.src || birthdayV6 },
                    { id: 7, name: 'Balloon Party', preview: <PartyPopper className="w-5 h-5" />, img: birthdayV7.src || birthdayV7 }
                ];
                break;
            case 'announcement':
                config.showImage = false;
                config.titleLabel = 'Event Title';
                config.requiredFields = ['title', 'date', 'location'];
                config.variants = [
                    { id: 5, name: 'Annual Gala', preview: <Calendar className="w-5 h-5" />, img: noticeV5.src || noticeV5 },
                    { id: 6, name: 'Luxury Event', preview: <Crown className="w-5 h-5" />, img: noticeV20.src || noticeV20 },
                    { id: 7, name: 'Grand Opening', preview: <Scissors className="w-5 h-5" />, img: noticeV7.src || noticeV7 }
                ];

                // Variant Specific Adjustments
                if (currentVariant === 6) {
                    config.showTime = false;
                    config.showPhone = false;
                }
                if (currentVariant === 7) {
                    config.showMessage = false;
                }
                break;
            case 'achievement':
                config.showTime = false;
                config.showPhone = false;
                config.showImage = true; // Enabled for 18.jpg
                config.titleLabel = 'Award Holder';
                config.locationLabel = 'Award Title';
                config.requiredFields = ['title', 'location', 'date'];

                // Variant Specific Adjustments
                if (currentVariant === 30) {
                    config.showImage = true;
                    config.titleLabel = 'Job Role';
                    config.subtitleLabel = 'Employee Name';
                    config.locationLabel = 'Company Name';
                }
                if (currentVariant === 31) {
                    config.titleLabel = 'Graduation Year';
                    config.subtitleLabel = 'Graduate Name';
                    config.dateLabel = 'Class of';
                }

                config.variants = [
                    { id: 0, name: 'Premium Certificate', preview: <AwardIcon className="w-5 h-5" />, img: awardBg.src || awardBg },
                    { id: 30, name: 'Employee Month', preview: <Trophy className="w-5 h-5" /> },
                    { id: 31, name: 'Graduation', preview: <GraduationCap className="w-5 h-5" />, img: awardGraduation.src || awardGraduation }
                ];
                break;
            case 'assembly':
                config.showImage = false;
                config.titleLabel = 'Assembly Name';
                config.requiredFields = ['title', 'date', 'location'];
                config.variants = [
                    { id: 3, name: 'Tuesday Session', preview: <Calendar className="w-5 h-5" />, img: assemblyTuesday.src || assemblyTuesday },
                    { id: 4, name: 'Saturday Session', preview: <Calendar className="w-5 h-5" />, img: assemblySaturday.src || assemblySaturday }
                ];
                break;
            case 'valentine':
                config.showTime = false;
                config.showLocation = false;
                config.showPhone = false;
                config.dateLabel = 'Valentine Date';
                config.titleLabel = 'Romantic Title';
                config.subtitleLabel = 'Couple Names / Subtitle';
                config.requiredFields = ['title']; // simplified
                config.showMessage = false; // Custom flag to hide message field
                config.variants = [
                    { id: 10, name: 'Velvet Romance', preview: <Heart className="w-5 h-5" />, img: valentineV10.src || valentineV10 },
                    { id: 11, name: 'Peony Lace', preview: <Heart className="w-5 h-5" />, img: valentineV11.src || valentineV11 }
                ];
                break;
            case 'remembering':
                config.titleLabel = 'Full Name';
                config.subtitleLabel = 'Life Dates (e.g. 1950 - 2024)';
                config.locationLabel = 'Chapel / Location';
                config.phoneLabel = 'Contact Person';
                config.requiredFields = ['title', 'date', 'location'];
                config.messagePlaceholder = 'A tribute to a life well lived...';
                config.variants = [
                    { id: 20, name: 'Peaceful Lily', preview: <Feather className="w-5 h-5" /> },
                    { id: 21, name: 'Kwibuka', preview: <Flame className="w-5 h-5" />, img: kwibukaBg.src || kwibukaBg, logo: kwibukaLogo }
                ];

                if (currentVariant === 21) {
                    config.showDate = false;
                    config.showTime = false;
                    config.showLocation = false;
                    config.showPhone = false;
                    config.titleLabel = 'Title';
                    config.subtitleLabel = 'Subtitle / Motto';
                }
                break;
        }
        return config;
    };

    const {
        showTime, showLocation, locationLabel, locationIcon, titleLabel, subtitleLabel, dateLabel,
        showPhone, phoneLabel, showImage, variants, requiredFields, messagePlaceholder, showMessage, showDate
    } = getFieldConfig();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row overflow-hidden font-sans transition-colors duration-500">

            {/* LEFT SIDEBAR: CREATIVE CONTROLS */}
            <div className="w-full lg:w-[580px] h-screen overflow-y-auto bg-card/95 backdrop-blur-2xl border-r border-foreground/5 relative z-20 custom-scrollbar flex flex-col shadow-[20px_0_60px_rgba(0,0,0,0.05)] transition-all duration-700 ease-in-out">

                {/* Visual Flair: Top Gradient */}
                <div className={`absolute top-0 left-0 w-full h-64 bg-gradient-to-b ${templates.find(t => t.id === templateType)?.color || 'from-amber-500/10'} to-transparent opacity-30 pointer-events-none z-0 transition-all duration-1000`}></div>

                <div className="p-8 lg:p-12 pb-32 relative z-10">
                    {/* Header Navigation */}
                    <div className="flex justify-between items-center mb-10">
                        <button onClick={onBack} className="group flex items-center gap-3 text-[10px] font-black text-neutral-500 hover:text-foreground transition-all tracking-[0.3em] uppercase">
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                            Studio
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                            <span className="text-[10px] font-black text-brand-blue tracking-widest uppercase">Live Draft</span>
                        </div>
                    </div>

                    <header className="mb-14">
                        <h1 className="text-5xl font-serif text-foreground mb-3 leading-[1.1] tracking-tight">
                            Design Your <br />
                            <span className="italic bg-gradient-to-r from-brand-blue to-brand-gold bg-clip-text text-transparent">Event Masterpiece</span>
                        </h1>
                        <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-[0.3em] opacity-80">Tailor every detail to perfection</p>
                    </header>

                    {/* Category Selection: Luxury Grid */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-[10px] text-neutral-500 font-black tracking-[0.3em] uppercase">Category</label>
                            <Palette className="w-3 h-3 text-brand-blue/50" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {templates.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTemplateType(t.id);
                                        const defaultVariantMap = {
                                            birthday: 5,
                                            announcement: 5,
                                            achievement: 0,
                                            assembly: 3,
                                            valentine: 10,
                                            remembering: 20
                                        };
                                        setCurrentVariant(defaultVariantMap[t.id] || 1);
                                    }}
                                    className={`relative flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border transition-all duration-500 group overflow-hidden
                                        ${templateType === t.id
                                            ? 'bg-foreground text-background border-foreground shadow-2xl scale-[1.02] z-10'
                                            : 'bg-card/40 border-foreground/5 text-neutral-500 hover:border-foreground/10 hover:bg-card/60'
                                        }`}
                                >
                                    {templateType === t.id && (
                                        <div className="absolute top-0 right-0 p-2">
                                            <div className="w-1 h-1 rounded-full bg-brand-gold animate-pulse"></div>
                                        </div>
                                    )}
                                    <div className={`p-4 rounded-full transition-all duration-500 
                                        ${templateType === t.id ? 'bg-background/20 scale-110' : 'bg-foreground/5 group-hover:scale-110'}
                                    `}>
                                        {t.icon}
                                    </div>
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Collection Gallery: Horizontal Luxury Scroll */}
                    <div className="mb-14">
                        <div className="flex items-center justify-between mb-6">
                            <label className="text-[11px] text-neutral-500 font-black tracking-[0.4em] uppercase">Premium Collection</label>
                            <span className="text-[9px] text-brand-gold font-bold uppercase tracking-widest bg-brand-gold/10 px-3 py-1.5 rounded-full border border-brand-gold/20 backdrop-blur-md">6 Handpicked Styles</span>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar snap-x">
                            {predefinedBackgrounds.filter(bg => bg.category === templateType).map((bg) => (
                                <button
                                    key={bg.id}
                                    onClick={() => selectPredefinedTemplate(bg)}
                                    className={`relative flex-shrink-0 w-32 aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all duration-500 group snap-start
                                        ${activeData.backgroundImage === bg.img
                                            ? 'border-brand-blue shadow-[0_15px_30px_rgba(37,99,235,0.3)] scale-105'
                                            : 'border-white/5 hover:border-white/20 scale-100'
                                        }`}
                                >
                                    {bg.img ? (
                                        <img src={bg.img} alt={bg.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center
                                            ${bg.category === 'valentine' ? 'bg-gradient-to-br from-red-900 to-red-950' :
                                                bg.category === 'remembering' ? 'bg-gradient-to-br from-neutral-800 to-black' :
                                                    'bg-gradient-to-br from-brand-blue/10 to-brand-blue/20'}
                                        `}>
                                            <div className="flex flex-col items-center gap-1 opacity-40">
                                                {bg.category === 'valentine' ? <Heart className="w-6 h-6 text-red-400" /> :
                                                    bg.category === 'remembering' ? <Feather className="w-6 h-6 text-neutral-400" /> :
                                                        <ImageIcon className="w-6 h-6 text-brand-blue" />}
                                                <span className="text-[7px] font-black uppercase tracking-widest text-white/50">Premium</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${activeData.backgroundImage === bg.img ? 'opacity-0' : 'opacity-40 group-hover:opacity-0'}`}></div>
                                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent">
                                        <span className="text-[9px] text-white font-black uppercase tracking-widest leading-none block">{bg.label}</span>
                                    </div>
                                    {activeData.backgroundImage === bg.img && !bg.img && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    )}
                                    {activeData.backgroundImage === bg.img && bg.img && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Style Variant Selector */}
                    {variants && (
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-[10px] text-neutral-500 font-black tracking-[0.3em] uppercase">Style Variant</label>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {variants.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => {
                                            setCurrentVariant(v.id);
                                            if (!formData[`${templateType}-${v.id}`]) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    [`${templateType}-${v.id}`]: {
                                                        ...initialFormState,
                                                        variant: v.id,
                                                        backgroundImage: v.img || initialFormState.backgroundImage,
                                                        backgroundType: v.img ? 'image' : 'color'
                                                    }
                                                }));
                                            }
                                        }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300
                                            ${activeData.variant === v.id
                                                ? 'bg-brand-blue/10 border-brand-blue text-brand-blue'
                                                : 'bg-foreground/5 border-foreground/5 text-neutral-500 hover:border-foreground/10 hover:text-foreground'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-xl transition-all duration-500 bg-foreground/5 group-hover:bg-brand-blue/10
                                            ${activeData.variant === v.id ? 'bg-brand-blue/20 rotate-12 scale-110' : 'rotate-0 scale-100'}
                                        `}>
                                            <div className={activeData.variant === v.id ? 'text-brand-blue' : 'text-neutral-500'}>
                                                {v.preview}
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-widest">{v.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Editor Section */}
                    <div className="space-y-10">
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] flex-1 bg-foreground/5"></div>
                                <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Content Studio</h3>
                                <div className="h-[1px] flex-1 bg-foreground/5"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    label={titleLabel} name="title" value={activeData.title} onChange={handleChange}
                                    icon={Type} placeholder="Headline" delay={100}
                                    isFocused={focusedField === 'title'} onFocus={() => handleFocus('title')} onBlur={handleBlur}
                                    required={requiredFields.includes('title')}
                                />
                                <InputGroup
                                    label={subtitleLabel} name="subtitle" value={activeData.subtitle} onChange={handleChange}
                                    icon={User} placeholder="Who is it for?" delay={200}
                                    isFocused={focusedField === 'subtitle'} onFocus={() => handleFocus('subtitle')} onBlur={handleBlur}
                                    required={requiredFields.includes('subtitle')}
                                />
                            </div>

                            {showMessage !== false && (
                                <InputGroup
                                    label="Invitation Message" name="message" value={activeData.message} onChange={handleChange}
                                    icon={AlignLeft} placeholder={messagePlaceholder} multiline delay={300}
                                    isFocused={focusedField === 'message'} onFocus={() => handleFocus('message')} onBlur={handleBlur}
                                    required={requiredFields.includes('message')}
                                />
                            )}
                        </section>

                        {showImage && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-[1px] flex-1 bg-foreground/5"></div>
                                    <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Visual Assets</h3>
                                    <div className="h-[1px] flex-1 bg-foreground/5"></div>
                                </div>
                                <div className="bg-foreground/5 backdrop-blur-xl border border-foreground/5 rounded-3xl p-6 group hover:border-brand-blue/20 transition-all duration-500 shadow-xl">
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="w-24 h-24 bg-background rounded-2xl flex items-center justify-center overflow-hidden border border-foreground/10 shadow-inner">
                                            {templateImages[`${templateType}-${activeData.variant}`] ? (
                                                <img src={templateImages[`${templateType}-${activeData.variant}`]} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                                    <Camera className="w-8 h-8 text-foreground" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-foreground">Choose Photo</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-foreground mb-2 uppercase tracking-widest">Personal Image</h4>
                                            <p className="text-[10px] text-neutral-500 font-medium leading-relaxed uppercase tracking-wider">High resolution JPG or PNG recommended for professional results.</p>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} id="file-upload" className="hidden" />
                                    <label htmlFor="file-upload" className="flex items-center justify-center gap-3 w-full py-4 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-2xl cursor-pointer transition-all duration-300 border border-foreground/10 active:scale-[0.98] group-hover:border-brand-blue/30 shadow-xl">
                                        <ImageIcon className="w-4 h-4 text-brand-blue" />
                                        <span className="text-xs font-black tracking-[0.2em] uppercase">Select Asset</span>
                                    </label>
                                </div>
                            </section>
                        )}

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] flex-1 bg-foreground/5"></div>
                                <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Logistics</h3>
                                <div className="h-[1px] flex-1 bg-foreground/5"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {showDate !== false && (
                                    <InputGroup
                                        label={dateLabel} name="date" value={activeData.date} onChange={handleChange}
                                        icon={Calendar} placeholder="Date" delay={400}
                                        isFocused={focusedField === 'date'} onFocus={() => handleFocus('date')} onBlur={handleBlur}
                                        required={requiredFields.includes('date')}
                                    />
                                )}
                                {showTime && (
                                    <InputGroup
                                        label="Time" name="time" value={activeData.time} onChange={handleChange}
                                        icon={Clock} placeholder="00:00" delay={500}
                                        isFocused={focusedField === 'time'} onFocus={() => handleFocus('time')} onBlur={handleBlur}
                                        required={requiredFields.includes('time')}
                                    />
                                )}
                            </div>

                            {showLocation && (
                                <InputGroup
                                    label={locationLabel} name="location" value={activeData.location} onChange={handleChange}
                                    icon={locationIcon} placeholder="Venue" delay={600}
                                    isFocused={focusedField === 'location'} onFocus={() => handleFocus('location')} onBlur={handleBlur}
                                    required={requiredFields.includes('location')}
                                />
                            )}

                            {showPhone && (
                                <InputGroup
                                    label={phoneLabel} name="phone" value={activeData.phone} onChange={handleChange}
                                    icon={Phone} placeholder="Phone / Email" delay={700}
                                    isFocused={focusedField === 'phone'} onFocus={() => handleFocus('phone')} onBlur={handleBlur}
                                    required={requiredFields.includes('phone')}
                                />
                            )}
                        </section>
                    </div>
                </div>

                {/* Fixed Footer Actions */}
                <div className="sticky bottom-0 left-0 w-full p-10 bg-background/90 backdrop-blur-3xl border-t border-foreground/[0.03] z-[100] shadow-[0_-40px_80px_rgba(0,0,0,0.05)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.7)] flex flex-col gap-5">
                    <div className="flex gap-5">
                        <button
                            onClick={handleDownload}
                            className="flex-[2.5] relative group overflow-hidden rounded-[1.25rem] bg-brand-blue text-white py-5 shadow-[0_20px_40px_rgba(37,99,235,0.25)] transition-all duration-500 hover:shadow-[0_25px_50px_rgba(37,99,235,0.45)] hover:-translate-y-1 active:translate-y-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                            <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.4em] uppercase text-[10px] font-black">
                                <Download className="w-4 h-4" />
                                Export PDF
                            </span>
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    await downloadPNG('invitation-card', `PaperPop-${activeData.title || 'Invitation'}.png`);
                                    showToast('PNG Downloaded Successfully', 'success');
                                } catch (error) {
                                    console.error(error);
                                    showToast('Failed to download PNG', 'error');
                                }
                            }}
                            className="flex-[1] relative group overflow-hidden rounded-[1.25rem] bg-brand-gold text-white py-5 shadow-[0_20px_40px_rgba(245,158,11,0.25)] transition-all duration-500 hover:shadow-[0_25px_50px_rgba(245,158,11,0.45)] hover:-translate-y-1 active:translate-y-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                            <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.4em] uppercase text-[10px] font-black">
                                <ImageIcon className="w-4 h-4" />
                                PNG
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-2 opacity-20">
                        <div className="h-[1px] w-4 bg-foreground"></div>
                        <span className="text-[8px] font-semibold tracking-[0.4em] uppercase">Powered by Imena Studio</span>
                        <div className="h-[1px] w-4 bg-foreground"></div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR: PREVIEW STAGE */}
            <div className="flex-1 relative flex items-center justify-center bg-background overflow-hidden transition-colors duration-500">

                {/* Cinematic Environment */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)] opacity-60 blur-[120px]"></div>
                    <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.04)_0%,transparent_60%)] blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.04)_0%,transparent_60%)] blur-[100px]"></div>
                    {/* Perspective lines/texture */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Label/Status */}
                    <div className="mb-12 flex flex-col items-center gap-4 animate-fade-in">
                        <span className="text-[10px] font-semibold text-foreground/30 tracking-[0.6em] uppercase">Interactive Preview</span>
                        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-brand-blue/50 to-transparent"></div>
                    </div>

                    {/* The Masterpiece Stage */}
                    <div className="relative group transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu hover:scale-[1.04]">
                        {/* Shadow Diffusion: Deeper and more natural */}
                        <div className="absolute -inset-16 bg-black/40 blur-[80px] rounded-full opacity-40 group-hover:opacity-70 transition-all duration-700"></div>
                        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[80%] h-20 bg-black/40 blur-[50px] rounded-[100%] transition-opacity duration-700 opacity-50 group-hover:opacity-80"></div>

                        {/* Frame and Content */}
                        <div className="relative shadow-[0_100px_200px_-50px_rgba(0,0,0,0.95)] rounded-[6px] ring-[1px] ring-foreground/[0.08] overflow-hidden transform-gpu bg-card">
                            <InvitationPreview
                                ref={previewRef}
                                data={{ ...activeData, image: templateImages[`${templateType}-${activeData.variant}`] }}
                                templateType={templateType}
                            />
                            {/* Surface Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30 pointer-events-none mix-blend-overlay"></div>
                        </div>

                        {/* Visual Quality Indicator */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-full">
                                <CheckCircle className="w-3 h-3 text-brand-gold" />
                                <span className="text-[9px] font-semibold text-foreground uppercase tracking-widest whitespace-nowrap">Premium Print Quality</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Hint */}
                <div className="absolute bottom-10 right-10 flex items-center gap-4 animate-fade-in animation-delay-700">
                    <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Scroll to Design</span>
                    <div className="w-8 h-[1px] bg-neutral-800"></div>
                </div>
            </div>

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(prev => ({ ...prev, show: false }))}
                />
            )}
        </div>
    );
};

export default EventForm;
