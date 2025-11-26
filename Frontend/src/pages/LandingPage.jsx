import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CodeShowcase from '../components/CodeShowcase';
import Testimonials from '../components/Testimonials';
import Architects from '../components/Architects';
import CTA from '../components/CTA';

const LandingPage = () => {
    return (
        <>
            <main>
                <Hero />
                <Features />
                <CodeShowcase />
                <Testimonials />
                <Architects />
                <CTA />
            </main>
        </>
    );
};

export default LandingPage;