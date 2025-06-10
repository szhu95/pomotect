import Link from 'next/link';
import React from 'react'
import localFont from 'next/font/local';
import { getPosts } from '@/utils';
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
    const posts = await getPosts()

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        posts
    }
}

const Process = async () => {
    const data = await getData();

    let projects = data.posts.posts.filter((post: any) => { return (post.primary_tag?.name === "Process") });

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