import React from 'react'
import ScrollToTopButton from '@/components/ScrollToTopButton';

const Terms = () => {

    return (
        <div>
            <div className="site-section">
                <div className="about-section">
                    <iframe className="border-2 border-primary-blue border-dashed w-full h-[100vh]" src="terms.html"></iframe>
                </div>
            </div>
            <ScrollToTopButton />
        </div >
    )
}

export default Terms