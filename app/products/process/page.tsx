import Link from 'next/link';
import React from 'react'
import localFont from 'next/font/local';
import { getCachedGhostPosts } from '@/lib/ghostPosts';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { ProjectPosts } from '@/components';
import ProcessSidebar from '@/components/ProcessSidebar';

const pomotectBoldFont = localFont({
    src: '../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
    src: '../../../fonts/pomotect-analog-regular.otf',
});

async function getData() {
    const ghostData = await getCachedGhostPosts();

    if (ghostData.rateLimited) {
        return { rateLimited: true as const };
    }

    if (!ghostData.posts.length) {
        return { notFound: true as const };
    }

    return { posts: ghostData.posts };
}

const Process = async () => {
    const data = await getData();

    if ('rateLimited' in data && data.rateLimited) {
        return (
            <div className="relative">
                <div className="site-section">
                    <h3 className={`${pomotectBoldFont.className} main_header`}>Objects</h3>
                    <p className={`${pomotectFont.className} italic`}>
                        Ghost is temporarily rate-limiting requests. Wait a few minutes and refresh.
                    </p>
                </div>
            </div>
        );
    }

    if ('notFound' in data) {
        return (
            <div className="relative">
                <div className="site-section">
                    <h3 className={`${pomotectBoldFont.className} main_header`}>Objects</h3>
                    <p className={`${pomotectFont.className} italic`}>No process posts to show right now.</p>
                </div>
            </div>
        );
    }

    const projects = data.posts.filter((post: any) => post.primary_tag?.name === 'Process');

    return (
        <div className="relative">
            <div className="site-section">
                <h3 className={`${pomotectBoldFont.className} main_header`}>Objects</h3>
                <p className={`${pomotectFont.className} italic`}>Most recently updated on February 12, 2025</p>
            </div>
            <div className="site-section flex justify-center items-center gap-16 -ml-6">
                <Link href="/products" className={`${pomotectFont.className} objects_link hover:bg-black hover:text-white`}>For Sale</Link>
                <span className={`${pomotectFont.className} objects_link bg-black text-white`}>Process</span>
            </div>

            <div className="flex justify-center">
                <div className="w-full md:w-[65%] md:px-4">
                    <ProjectPosts response={projects} containerHeight={"max-h-[85vh]"} />
                </div>
            </div>

            <ProcessSidebar posts={projects} />
            
            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>
        </div>
    )
}

export default Process