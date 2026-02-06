import React, { useState, useRef, useEffect } from 'react';
import {
    ArrowLeft, Download, Calendar, MapPin, Clock, Type, AlignLeft,
    Phone, FileText, Sparkles, User, UserCheck, Save, Loader2,
    ChevronRight, Camera, Palette, Layout, Wand2
} from 'lucide-react';
import InvitationPreview from './InvitationPreview';
import { downloadPDF } from '../utils/pdfUtils';
import { createInvitation, uploadImage } from '../utils/api';

import birthdayV5 from '../assets/templates/birthday_variant_5.jpg';
import birthdayV6 from '../assets/templates/birthday_variant_6.jpg';
import birthdayV7 from '../assets/templates/birthday_variant_7.jpg';
import noticeV5 from '../assets/templates/notice_variant_5.jpg';
import noticeV6 from '../assets/templates/notice_variant_6.jpg';
import noticeV7 from '../assets/templates/notice_variant_7.jpg';

const InputGroup = ({
    label, name, value, onChange, type = "text", icon: Icon, placeholder, multiline = false,
    delay, isFocused, onFocus, onBlur, className
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
                className={`relative group bg-neutral-900/40 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-500
                ${isFocused
                        ? 'border-amber-500/50 shadow-[0_20px_40px_rgba(0,0,0,0.6)] bg-neutral-900/80 -translate-y-1'
                        : 'border-white/5 hover:border-white/10'
                    }
            `}
            >
                {/* Floating Label */}
                <label
                    className={`absolute left-12 transition-all duration-500 pointer-events-none z-10 font-bold tracking-widest
                    ${(isFocused || hasValue)
                            ? 'top-3 text-[8px] text-amber-500 uppercase'
                            : 'top-1/2 -translate-y-1/2 text-xs text-neutral-500 uppercase'
                        }
                `}
                >
                    {label}
                </label>

                {/* Icon */}
                <div className={`absolute top-0 left-0 h-full w-12 flex items-center justify-center transition-all duration-500
                    ${isFocused ? 'text-amber-400 scale-110' : 'text-neutral-600'}
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
                        className="w-full bg-transparent border-none text-white placeholder-transparent focus:ring-0 pt-8 pb-4 pl-12 pr-6 text-sm resize-none custom-scrollbar font-medium"
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
                        className="w-full bg-transparent border-none text-white placeholder-transparent focus:ring-0 pt-8 pb-4 pl-12 pr-6 text-sm h-[68px] font-medium"
                        placeholder={placeholder}
                    />
                )}

                {/* Focus Accent */}
                <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-700 ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
            </div>
        </div>
    );
};

const EventForm = ({ onBack }) => {
    const previewRef = useRef();
    const [templateType, setTemplateType] = useState('birthday');
    const [focusedField, setFocusedField] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        date: '',
        time: '',
        location: '',
        phone: '',
        message: '',
        variant: 1,
        backgroundType: 'color',
        backgroundImage: null
    });

    const [templateImages, setTemplateImages] = useState({});
    const [imageFiles, setImageFiles] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageKey = `${templateType}-${formData.variant}`;
                setTemplateImages(prev => ({ ...prev, [imageKey]: reader.result }));
                setImageFiles(prev => ({ ...prev, [imageKey]: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const selectPredefinedTemplate = (bg) => {
        setFormData(prev => ({
            ...prev,
            backgroundType: 'image',
            backgroundImage: bg.img,
            variant: bg.variant
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            let imageUrl = formData.backgroundImage;
            const imageKey = `${templateType}-${formData.variant}`;
            const file = imageFiles[imageKey];

            if (file) {
                const uploadRes = await uploadImage(file);
                imageUrl = uploadRes.url;
            }

            await createInvitation({
                ...formData,
                templateType,
                imageUrl: imageUrl
            });

            alert('Invitation saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to save invitation');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFocus = (name) => setFocusedField(name);
    const handleBlur = () => setFocusedField(null);

    const handleDownload = () => {
        downloadPDF('invitation-card', `PaperPop-${formData.title || 'Invitation'}.pdf`);
    };

    const templates = [
        { id: 'birthday', label: 'Birthday', icon: <Camera className="w-4 h-4" />, color: 'from-amber-500/20' },
        { id: 'announcement', label: 'Notices', icon: <FileText className="w-4 h-4" />, color: 'from-blue-500/20' },
        { id: 'achievement', label: 'Award', icon: <Layout className="w-4 h-4" />, color: 'from-purple-500/20' },
        { id: 'assembly', label: 'Assembly', icon: <UserCheck className="w-4 h-4" />, color: 'from-emerald-500/20' },
    ];

    const predefinedBackgrounds = [
        { id: 'b5', label: 'Golden Glitter', img: birthdayV5.src || birthdayV5, variant: 5, category: 'birthday' },
        { id: 'b6', label: 'Modern Photo', img: birthdayV6.src || birthdayV6, variant: 6, category: 'birthday' },
        { id: 'b7', label: 'Balloon Party', img: birthdayV7.src || birthdayV7, variant: 7, category: 'birthday' },
        { id: 'n5', label: 'Annual Gala', img: noticeV5.src || noticeV5, variant: 5, category: 'announcement' },
        { id: 'n6', label: 'Luxury Event', img: noticeV6.src || noticeV6, variant: 6, category: 'announcement' },
        { id: 'n7', label: 'Grand Opening', img: noticeV7.src || noticeV7, variant: 7, category: 'announcement' },
    ];

    const getFieldConfig = () => {
        let config = {
            showTime: true,
            showLocation: true,
            locationLabel: 'Location',
            locationIcon: MapPin,
            titleLabel: 'Headline',
            showPhone: true,
            phoneLabel: 'R.S.V.P',
            showImage: false,
        };

        switch (templateType) {
            case 'birthday':
                config.showImage = true;
                config.titleLabel = 'Top Heading';
                config.locationLabel = 'Venue';
                break;
            case 'announcement':
                config.showImage = false;
                config.titleLabel = 'Event Title';
                break;
            case 'achievement':
                config.showTime = false;
                config.showPhone = false;
                config.titleLabel = 'Award Title';
                config.locationLabel = 'Issuer';
                break;
            case 'assembly':
                config.showImage = true;
                config.variants = [
                    { id: 1, name: 'Luxury Stage', preview: '🎭' },
                    { id: 3, name: 'Tuesday Session', preview: '🗓️' },
                    { id: 4, name: 'Saturday Session', preview: '📅' }
                ];
                break;
        }
        return config;
    };

    const { showTime, showLocation, locationLabel, locationIcon, titleLabel, showPhone, phoneLabel, showImage } = getFieldConfig();

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row overflow-hidden font-sans">

            {/* LEFT SIDEBAR: CREATIVE CONTROLS */}
            <div className="w-full lg:w-[460px] h-screen overflow-y-auto bg-black border-r border-white/5 relative z-20 custom-scrollbar flex flex-col shadow-2xl">

                {/* Visual Flair: Top Gradient */}
                <div className={`absolute top-0 left-0 w-full h-64 bg-gradient-to-b ${templates.find(t => t.id === templateType)?.color || 'from-amber-500/10'} to-transparent opacity-30 pointer-events-none z-0 transition-all duration-1000`}></div>

                <div className="p-8 lg:p-10 pb-32 relative z-10">
                    {/* Header Navigation */}
                    <div className="flex justify-between items-center mb-10">
                        <button onClick={onBack} className="group flex items-center gap-3 text-[10px] font-black text-neutral-500 hover:text-white transition-all tracking-[0.3em] uppercase">
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                            Studio
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-amber-500 tracking-[0.2em] uppercase">Live Draft</span>
                        </div>
                    </div>

                    <header className="mb-12">
                        <h1 className="text-4xl font-serif text-white mb-2 leading-tight">
                            Create <br />
                            <span className="italic text-amber-500">Masterpiece</span>
                        </h1>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">Tailor every detail to perfection</p>
                    </header>

                    {/* Category Selection: Luxury Grid */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-[10px] text-neutral-500 font-black tracking-[0.3em] uppercase">Category</label>
                            <Palette className="w-3 h-3 text-amber-500/50" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {templates.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTemplateType(t.id);
                                        setFormData(prev => ({ ...prev, variant: 1, backgroundImage: null, backgroundType: 'color' }));
                                    }}
                                    className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group overflow-hidden border
                                    ${templateType === t.id
                                            ? 'bg-white/5 border-amber-500/50 text-white shadow-xl translate-y-[-2px]'
                                            : 'bg-neutral-900/40 border-white/5 text-neutral-500 hover:border-white/10'
                                        }`}
                                >
                                    <div className={`transition-all duration-500 ${templateType === t.id ? 'text-amber-500 scale-125' : 'text-neutral-600'}`}>
                                        {t.icon}
                                    </div>
                                    <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${templateType === t.id ? 'text-white' : ''}`}>
                                        {t.label}
                                    </span>
                                    {templateType === t.id && (
                                        <div className="absolute top-0 right-0 p-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Collection Gallery: Horizontal Luxury Scroll */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-[10px] text-neutral-500 font-black tracking-[0.3em] uppercase">Premium Collection</label>
                            <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">6 Styles Available</span>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar snap-x">
                            {predefinedBackgrounds.filter(bg => bg.category === templateType).map((bg) => (
                                <button
                                    key={bg.id}
                                    onClick={() => selectPredefinedTemplate(bg)}
                                    className={`relative flex-shrink-0 w-32 aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all duration-500 group snap-start
                                        ${formData.backgroundImage === bg.img
                                            ? 'border-amber-500 shadow-[0_15px_30px_rgba(234,179,8,0.3)] scale-105'
                                            : 'border-white/5 hover:border-white/20 scale-100'
                                        }`}
                                >
                                    <img src={bg.img} alt={bg.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${formData.backgroundImage === bg.img ? 'opacity-0' : 'opacity-40 group-hover:opacity-0'}`}></div>
                                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent">
                                        <span className="text-[9px] text-white font-black uppercase tracking-widest leading-none block">{bg.label}</span>
                                    </div>
                                    {formData.backgroundImage === bg.img && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                                            <Sparkles className="w-2.5 h-2.5 text-black" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Editor Section */}
                    <div className="space-y-10">
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] flex-1 bg-white/5"></div>
                                <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Content Studio</h3>
                                <div className="h-[1px] flex-1 bg-white/5"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    label={titleLabel} name="title" value={formData.title} onChange={handleChange}
                                    icon={Wand2} placeholder="Headline" delay={100}
                                    isFocused={focusedField === 'title'} onFocus={() => handleFocus('title')} onBlur={handleBlur}
                                />
                                <InputGroup
                                    label="Name / Subject" name="subtitle" value={formData.subtitle} onChange={handleChange}
                                    icon={User} placeholder="Who is it for?" delay={200}
                                    isFocused={focusedField === 'subtitle'} onFocus={() => handleFocus('subtitle')} onBlur={handleBlur}
                                />
                            </div>

                            <InputGroup
                                label="Invitation Message" name="message" value={formData.message} onChange={handleChange}
                                icon={AlignLeft} placeholder="Something memorable..." multiline delay={300}
                                isFocused={focusedField === 'message'} onFocus={() => handleFocus('message')} onBlur={handleBlur}
                            />
                        </section>

                        {showImage && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-[1px] flex-1 bg-white/5"></div>
                                    <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Visual Assets</h3>
                                    <div className="h-[1px] flex-1 bg-white/5"></div>
                                </div>
                                <div className="bg-neutral-900/20 backdrop-blur-xl border border-white/5 rounded-3xl p-6 group hover:border-amber-500/20 transition-all duration-500 shadow-xl">
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="w-24 h-24 bg-black rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-inner overflow-hidden">
                                            {templateImages[`${templateType}-${formData.variant}`] ? (
                                                <img src={templateImages[`${templateType}-${formData.variant}`]} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                                    <Camera className="w-8 h-8 text-white" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-white">Choose Photo</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Personal Image</h4>
                                            <p className="text-[10px] text-neutral-500 font-medium leading-relaxed uppercase tracking-wider">High resolution JPG or PNG recommended for professional results.</p>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} id="file-upload" className="hidden" />
                                    <label htmlFor="file-upload" className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl cursor-pointer transition-all duration-300 border border-white/10 active:scale-[0.98] group-hover:border-amber-500/30">
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                        <span className="text-xs font-black tracking-[0.2em] uppercase">Select Asset</span>
                                    </label>
                                </div>
                            </section>
                        )}

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] flex-1 bg-white/5"></div>
                                <h3 className="text-[9px] font-black text-neutral-600 tracking-[0.4em] uppercase">Logistics</h3>
                                <div className="h-[1px] flex-1 bg-white/5"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    label="Event Date" name="date" value={formData.date} onChange={handleChange}
                                    icon={Calendar} placeholder="Date" delay={400}
                                    isFocused={focusedField === 'date'} onFocus={() => handleFocus('date')} onBlur={handleBlur}
                                />
                                {showTime && (
                                    <InputGroup
                                        label="Time" name="time" value={formData.time} onChange={handleChange}
                                        icon={Clock} placeholder="00:00" delay={500}
                                        isFocused={focusedField === 'time'} onFocus={() => handleFocus('time')} onBlur={handleBlur}
                                    />
                                )}
                            </div>

                            {showLocation && (
                                <InputGroup
                                    label={locationLabel} name="location" value={formData.location} onChange={handleChange}
                                    icon={locationIcon} placeholder="Venue" delay={600}
                                    isFocused={focusedField === 'location'} onFocus={() => handleFocus('location')} onBlur={handleBlur}
                                />
                            )}

                            {showPhone && (
                                <InputGroup
                                    label={phoneLabel} name="phone" value={formData.phone} onChange={handleChange}
                                    icon={Phone} placeholder="Phone / Email" delay={700}
                                    isFocused={focusedField === 'phone'} onFocus={() => handleFocus('phone')} onBlur={handleBlur}
                                />
                            )}
                        </section>
                    </div>
                </div>

                {/* Fixed Footer Actions */}
                <div className="sticky bottom-0 left-0 w-full p-8 bg-black/80 backdrop-blur-2xl border-t border-white/10 z-[100] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] flex flex-col gap-4">
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 rounded-2xl bg-white/5 text-white font-black py-4 transition-all duration-300 hover:bg-white/10 border border-white/10 active:scale-[0.98] disabled:opacity-50"
                        >
                            <span className="flex items-center justify-center gap-3 tracking-[0.3em] uppercase text-[10px]">
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> : <Save className="w-4 h-4 text-amber-500" />}
                                Save
                            </span>
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex-[2.5] relative group overflow-hidden rounded-2xl bg-amber-500 text-black font-black py-4 shadow-[0_15px_30px_rgba(234,179,8,0.2)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(234,179,8,0.4)] hover:-translate-y-1 active:translate-y-0"
                        >
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.3em] uppercase text-[10px]">
                                <Download className="w-4 h-4" />
                                Export PDF
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-2 opacity-20">
                        <div className="h-[1px] w-4 bg-white"></div>
                        <span className="text-[8px] font-black tracking-[0.4em] uppercase">Powered by Imena Studio</span>
                        <div className="h-[1px] w-4 bg-white"></div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR: PREVIEW STAGE */}
            <div className="flex-1 relative flex items-center justify-center bg-[#0a0a0a] overflow-hidden">

                {/* Cinematic Environment */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-amber-500/5 via-transparent to-transparent opacity-50 blur-[150px]"></div>
                    {/* Perspective lines */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Label/Status */}
                    <div className="mb-12 flex flex-col items-center gap-4 animate-fade-in">
                        <span className="text-[10px] font-black text-white/30 tracking-[0.6em] uppercase">Interactive Preview</span>
                        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"></div>
                    </div>

                    {/* The Masterpiece Stage */}
                    <div className="relative group transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform hover:scale-[1.03] hover:rotate-y-1 hover:rotate-x-1">
                        {/* Shadow Diffusion */}
                        <div className="absolute -inset-10 bg-black/60 blur-[60px] rounded-full opacity-60 group-hover:opacity-80 transition-opacity"></div>

                        {/* Frame and Content */}
                        <div className="relative shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)] rounded-[5px] ring-[0.5px] ring-white/20 overflow-hidden transform-gpu">
                            <InvitationPreview
                                ref={previewRef}
                                data={{ ...formData, image: templateImages[`${templateType}-${formData.variant}`] }}
                                templateType={templateType}
                            />
                            {/* Surface Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30 pointer-events-none mix-blend-overlay"></div>
                        </div>

                        {/* Visual Quality Indicator */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full">
                                <Sparkles className="w-3 h-3 text-amber-500" />
                                <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">Premium Print Quality</span>
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
        </div>
    );
};

export default EventForm;
