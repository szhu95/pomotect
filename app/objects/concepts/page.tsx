import { CustomButton } from '@/components';
import Link from 'next/link';
import React from 'react'

const Concepts = () => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    let lastUpdatedDate = mm + '/' + dd + '/' + yyyy;
    
    return (
        <div>
            <div className="site-section">
                <h3 className="main_header">Objects</h3>
                <p><i>Most recently updated on {lastUpdatedDate}</i></p>
            </div>
            <div className="site-section">
                <Link href="/objects" className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">For Sale</Link>
                <Link href="/objects/concepts" className="objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white">{`Stuff we don't know how to make yet`}</Link>
            </div>

            <div>{`Stuff we don't know how to make yet`}</div>
        </div>
    )
}

export default Concepts

