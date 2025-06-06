import { formatUpdatedDate } from "@/utils";
import parse from 'html-react-parser';
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const garamondFont = localFont({
    src: '../fonts/garamond.ttf'
})


export default async function Posts({ response }: any) {

    return (
        response.map((post: any) => {

            // console.log("POST IS +++++" + JSON.stringify(post))
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

            // console.log("FINAL POST IS +++++" + JSON.stringify(finalHtml))

            let parsedPost = parse(finalHtml);

            return (
                <div key={post.id} className="mt-5 md:w-[75%] md:m-auto">
                    <div className='site-section words-header md:border-b border-black md:pb-4'>
                        <div className="flex justify-between items-center md:hidden mb-2 border-b border-black">
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
                        >
                            <div className="hover:bg-black hover:text-yellow entry-number text-xl text-primary-blue font-black minion-font border border-primary-blue border-dashed border-2 md:border-none">{post.title ? post.title : 'Title'}</div>
                        </Link>
                        <div className="minion-font italic md:block hidden">On {formattedPostDate}, {(post.primary_author.name ? post.primary_author.name : "Anonymous")} {'<' + (post.custom_excerpt ? post.custom_excerpt : "office@pomotect.com") + '>'} wrote:</div>
                    </div>
                    <div className={`site-section words-body max-h-[85vh] overflow-y-auto md:border md:border-primary-blue md:border-dashed md:border-2`}>
                        <div className={`pr-2 py-1 ${garamondFont.className} text-justify md:w-[90%] md:m-auto md:block hidden`}>{parsedPost}</div>
                    </div>
                </div >
            )
        })
    );
}
