import { formatUpdatedDate } from "@/utils";
import parse from 'html-react-parser';
import Image from "next/image";
import Link from "next/link";

export default async function Posts({ response }: any) {

    return (
        response.posts.map((post: any) => {

            //console.log("POST IS +++++" + JSON.stringify(post))
            let postUtcTimeString = post.published_at;
            let postDate = new Date(postUtcTimeString)
            let formattedPostDate = formatUpdatedDate(postDate);

            let finalHtml = post.html.replaceAll('<p', '<p className="minion-font"')
                .replaceAll('<li', '<li className="minion-font"')
                .replaceAll('<strong', '<strong className="minion-font"')
                .replaceAll('<a', '<a className="minion-font text-primary-blue"')
                .replaceAll('<u', '<u className="minion-font text-inherit"')
                .replaceAll('<em', '<em className="minion-font"')
                .replaceAll('class=\"italic\"', '')
                .replaceAll('<span', '<span className="minion-font"')
                .replaceAll('/p>', '/p><br>')
                .replaceAll('/figure>', '/figure><br>');

            console.log("FINAL POST IS +++++" + JSON.stringify(finalHtml))

            let parsedPost = parse(finalHtml);

            return (
                <div key={post.id} className="mt-5">
                        <div className='site-section words-header'>
                            <Link
                                key={post.slug}
                                href={`/words/${post.slug}`}
                            >
                                <div className="hover:bg-yellow hover:text-black entry-number bg-black text-white font-['Minion']">{post.title ? post.title : 'Title'}</div>
                            </Link>
                            <div className="font-['Minion'] italic">On {formattedPostDate}, {(post.primary_author.name ? post.primary_author.name : "Anonymous")} {'<' + (post.custom_excerpt ? post.custom_excerpt : "office@pomotect.com") + '>'} wrote:</div>
                        </div>
                        <div className={`site-section mx-2 words-body max-h-[85vh] overflow-y-auto`}>
                            <div className="pr-2 py-1 font-['Minion'] text-justify">{parsedPost}</div>
                            {/* <div className="pr-2 py-2">
                                {post.feature_image && <Image
                                    src={post.feature_image}
                                    alt={"words-image"}
                                    width={500}
                                    height={500}
                                    className="h-full w-full object-cover object-center"
                                />}
                            </div> */}
                        </div>
                </div >
            )
        })
    );
}
