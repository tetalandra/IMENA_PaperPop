"use client";

import React, { useState } from 'react';
import LandingPage from '../components/LandingPage';
import EventForm from '../components/EventForm';

export default function Home() {
    const [showForm, setShowForm] = useState(false);

    const handleGetStarted = () => {
        setShowForm(true);
    };

    return (
        <div className="antialiased text-white">
            {!showForm ? (
                <LandingPage
                    onGetStarted={handleGetStarted}
                    user={null}
                    onLogin={() => { }} // No-op since auth is removed
                />
            ) : (
                <EventForm onBack={() => setShowForm(false)} />
            )}
        </div>
    );
}
