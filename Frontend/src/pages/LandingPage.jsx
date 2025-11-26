import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Architects from '../components/Architects';
import CTA from '../components/CTA';

const LandingPage = () => {
    return (
        <div className="bg-[#101010] min-h-screen text-white selection:bg-[#00FFFF] selection:text-[#101010]">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Testimonials />
                <Architects />
                <CTA />
            </main>
        </div>
    );
};

export default LandingPage;