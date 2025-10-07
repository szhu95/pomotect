import { formatUpdatedDate } from "@/utils";
import parse from 'html-react-parser';
import localFont from "next/font/local";

const garamondFont = localFont({
    src: '../fonts/garamond.ttf'
  })

export default async function ProjectPost({ response }: any) {

    return (
        response.posts.map((post: any) => {

            // console.log("POST IS +++++" + JSON.stringify(post))
            let postUtcTimeString = post.published_at;
            let postDate = new Date(postUtcTimeString)
            let formattedPostDate = formatUpdatedDate(postDate);

            let finalHtml = post.html.replaceAll('<p', '<p className="garamond-font"')
                .replaceAll('<li', '<li className="garamond-font"')
                .replaceAll('<strong', '<strong className="garamond-font"')
                .replaceAll('<a', '<a className="garamond-font text-primary-blue"')
                .replaceAll('<u ', '<u className="garamond-font" ')
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
                        <div className='site-section words-header'>
                            <div className="entry-number text-3xl md:text-4xl text-primary-blue font-black md:w-[60%] md:m-auto font-['garamond']">{post.title ? post.title : 'Title'}</div>
                            <div className="font-['Garamond'] italic text-gray-400 md:w-[60%] md:m-auto">{formattedPostDate}</div>
                        </div>
                        <div className={`site-section post-body overflow-y-auto`}>
                            <div className={`pr-2 py-1 ${garamondFont.className} text-justify md:text-lg md:w-[60%] md:m-auto`}>{parsedPost}</div>
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
