"use client";

import { formatUpdatedDate } from "@/utils";
import parse from 'html-react-parser';
import Image from "next/image";
// import LoadingLink from "./LoadingLink";
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
                .replaceAll('<em', '<em className="garamond-font"')
                .replaceAll('class=\"italic\"', '')
                .replaceAll('<span', '<span className="garamond-font text-gray-400 italic"')
                .replaceAll('/p>', '/p><br>')
                .replaceAll('<img', '<img className="my-4"')
                .replaceAll('/figure>', '/figure><br>');

            let parsedPost = parse(finalHtml);

            return (
                <div key={post.id} className={`w-full md:w-[100%] md:m-auto [margin-top:calc(20px-12px*var(--is-mobile-condensed,0))]`}>
                    <div className='site-section words-header md:border-b border-black md:pb-4'>
                        <div className="md:hidden px-0">
                            <Link
                                key={`${post.slug}-title`}
                                href={`/words/${post.slug}`}
                                className="block group w-full"
                            >
                                <div className={`hover:bg-black hover:text-yellow entry-number text-xl md:text-2xl text-primary-blue font-black minion-font [padding-top:calc(8px-8px*var(--is-mobile-condensed,0))] [padding-bottom:calc(8px-8px*var(--is-mobile-condensed,0))]`}>
                                    {post.title ? post.title : 'Title'}
                                </div>
                            </Link>
                            <div className={`flex justify-between items-center border-b border-black [margin-top:calc(16px-8px*var(--is-mobile-condensed,0))] [margin-bottom:calc(16px-8px*var(--is-mobile-condensed,0))]`}>
                                <div className="minion-font italic md:text-lg">
                                    {formattedPostDate}
                                </div>
                                <div className="minion-font italic md:text-lg">
                                    {(post.custom_excerpt ? post.custom_excerpt : "office@pomotect.com")}
                                </div>
                            </div>
                            {post.feature_image && (
                            <Link
                                    key={`${post.slug}-image`}
                                href={`/words/${post.slug}`}
                                    className="block group w-full"
                            >
                                    <div className={`
                                        relative w-full bg-gray-50 border border-primary-blue border-dashed overflow-hidden transform transition-all duration-300 ease-in-out group-hover:scale-[1.02] md:hidden
                                        [opacity:calc(1-var(--is-mobile-condensed,0))]
                                        [height:calc(192px-192px*var(--is-mobile-condensed,0))]
                                        [margin-bottom:calc(16px-16px*var(--is-mobile-condensed,0))]
                                    `}>
                                        <Image
                                            src={post.feature_image}
                                            alt={post.title || 'Article image'}
                                            fill
                                            className="object-cover transition-opacity duration-200 ease-in-out group-hover:opacity-80 bg-gray-50"
                                            placeholder="empty"
                                        />
                                    </div>
                                </Link>
                                )}
                        </div>
                        <Link
                            key={post.slug}
                            href={`/words/${post.slug}`}
                            className="hidden md:block group"
                        >
                            <div className="hover:bg-black hover:text-yellow entry-number text-xl md:text-2xl text-primary-blue font-black minion-font">{post.title ? post.title : 'Title'}</div>
                        </Link>
                        <div className="minion-font italic hidden md:block">On {formattedPostDate}, {(post.primary_author.name ? post.primary_author.name : "Anonymous")} {'<' + (post.custom_excerpt ? post.custom_excerpt : "office@pomotect.com") + '>'} wrote:</div>
                    </div>
                    <div className={`site-section words-body hidden md:block max-h-[85vh] overflow-y-auto md:border md:border-primary-blue md:border-dashed md:border-2`}>
                        <div className={`pr-2 py-1 ${garamondFont.className} text-justify md:text-lg md:w-[90%] md:m-auto`}>{parsedPost}</div>
                    </div>

                </div>
            )
        })
    );
}
