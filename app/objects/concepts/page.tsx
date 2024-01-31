import { CustomButton } from '@/components';
import { formatDate } from '@/utils';
import Link from 'next/link';
import React from 'react'

const Concepts = () => {

    let lastUpdatedDate = formatDate();
    
    return (
        <div>
            <div className="site-section">
                <h3 className="main_header">Objects</h3>
                <p><i>Most recently updated on {lastUpdatedDate}</i></p>
            </div>
            <div className="site-section">
                <Link href="/objects" scroll={false} className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">For Sale</Link>
                <Link href="/objects/concepts" scroll={false} className="objects_link bg-black text-white hover:bg-black hover:text-white">{`Stuff we don't know how to make yet`}</Link>
            </div>

            <div className="site-section"><i>Still Thinking . . .</i></div>
        </div>
    )
}

export default Concepts

