import Link from 'next/link';
import React from 'react'
import localFont from 'next/font/local';
import { getPosts } from '@/utils';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { ProjectPosts } from '@/components';

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

const Projects = async () => {

    const data = await getData();

    let projects = data.posts.posts.filter((post: any) => { return (post.primary_tag?.name === "Projects") });

    //console.log(projects)

    return (
        <div>
            <div className="site-section">
                <h3 className={`${pomotectBoldFont.className} main_header`}>Objects</h3>
                <p className={`${pomotectFont.className} italic`}>Most recently updated on January 18, 2025</p>
            </div>
            <div className="site-section">
                <Link href="/products" scroll={false} className={`${pomotectFont.className} objects_link focus:bg-black focus:text-white hover:bg-black hover:text-white`}>For Sale</Link>
                <Link href="/products/concepts" scroll={false} className={`${pomotectFont.className} objects_link bg-black text-white hover:bg-black hover:text-white`}>Projects</Link>
            </div>

            <ProjectPosts response={projects} containerHeight={"max-h-[85vh]"} />
            <div className="hidden md:block">
                <ScrollToTopButton />
            </div>
        </div>
    )
}

export default Projects