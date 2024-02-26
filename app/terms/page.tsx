import React from 'react'
import ScrollToTopButton from '@/components/ScrollToTopButton';

const Terms = () => {

    return (
        <div>
            <div className="site-section">
                <div className="about-section">
                    <object
                        className="border-2 border-primary-blue border-dashed w-full h-[100vh]"
                        data="terms.html"
                        type="text/html"></object>
                </div>
            </div>
            <ScrollToTopButton />
        </div >
    )
}

export default Terms