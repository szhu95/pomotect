"use client";

import { formatUpdatedDate } from "@/utils";
import parse from 'html-react-parser';
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useState } from "react";

const garamondFont = localFont({
    src: '../fonts/garamond.ttf'
})

export default function Posts({ response }: any) {
    const [isCondensed, setIsCondensed] = useState(false);

    return (
        response.map((post: any, index: number) => {
            let postUtcTimeString = post.published_at;
            let postDate = new Date(postUtcTimeString)
            let formattedPostDate = formatUpdatedDate(postDate);

            let finalHtml = post.html.replaceAll('<p', '<p className="garamond-font"')
                .replaceAll('<li', '<li className="garamond-font"')
                .replaceAll('<strong', '<strong className="garamond-font"')
                .replaceAll('<a', '<a className="garamond-font text-primary-blue"')
                .replaceAll('<u', '<u className="garamond-font text-inherit"')
                .replaceAll('<em', '<em className="garamond-font"')
                .replaceAll('class=\"italic\"', '')
                .replaceAll('<span', '<span className="garamond-font text-gray-400 italic"')
                .replaceAll('/p>', '/p><br>')
                .replaceAll('<img', '<img className="my-4"')
                .replaceAll('/figure>', '/figure><br>');

            let parsedPost = parse(finalHtml);

            return (
                <div key={post.id} className="mt-5 w-full md:w-[100%] md:m-auto">
                    <div className='site-section words-header md:border-b border-black md:pb-4'>
                        <div className="md:hidden px-0">
                            <div className="flex justify-between items-center mb-4 border-b border-black">
                                <div className="minion-font italic">
                                    {(post.custom_excerpt ? post.custom_excerpt : "office@pomotect.com")}
                                </div>
                                <div className="minion-font italic">
                                    {formattedPostDate}
                                </div>
                            </div>
                            <Link
                                key={post.slug}
                                href={`/words/${post.slug}`}
                                className="flex flex-col gap-2 group w-full"
                            >
                                {post.feature_image && (
                                    <div className={`
                                        relative w-full border border-primary-blue border-dashed overflow-hidden transform transition-all duration-300 ease-in-out group-hover:scale-[1.02] md:hidden
                                        [height:calc(192px*(1-var(--is-mobile-condensed,0)))]
                                        [opacity:calc(1-var(--is-mobile-condensed,0))]
                                        [margin-bottom:calc(0px*var(--is-mobile-condensed,0))]
                                    `}>
                                        <Image
                                            src={post.feature_image}
                                            alt={post.title || 'Article image'}
                                            fill
                                            className="object-cover transition-opacity duration-200 ease-in-out group-hover:opacity-80"
                                        />
                                    </div>
                                )}
                                <div className={`hover:bg-black hover:text-yellow entry-number text-xl text-primary-blue font-black minion-font [padding-top:calc(4px*var(--is-mobile-condensed,0))] [padding-bottom:calc(4px*var(--is-mobile-condensed,0))]`}>
                                    {post.title ? post.title : 'Title'}
                                </div>
                            </Link>
                        </div>
                        <Link
                            key={post.slug}
                            href={`/words/${post.slug}`}
                            className="hidden md:block group"
                        >
                            <div className="hover:bg-black hover:text-yellow entry-number text-xl text-primary-blue font-black minion-font">{post.title ? post.title : 'Title'}</div>
                        </Link>
                        <div className="minion-font italic hidden md:block">On {formattedPostDate}, {(post.primary_author.name ? post.primary_author.name : "Anonymous")} {'<' + (post.custom_excerpt ? post.custom_excerpt : "office@pomotect.com") + '>'} wrote:</div>
                    </div>
                    <div className={`site-section words-body hidden md:block max-h-[85vh] overflow-y-auto md:border md:border-primary-blue md:border-dashed md:border-2`}>
                        <div className={`pr-2 py-1 ${garamondFont.className} text-justify md:w-[90%] md:m-auto`}>{parsedPost}</div>
                    </div>
                    {index < response.length - 1 && (
                        <div className="w-1/2 mx-auto mt-2 mb-3 border-b border-primary-blue border-dashed opacity-50 transition-opacity duration-200 ease-in-out md:hidden"></div>
                    )}
                </div>
            )
        })
    );
}
