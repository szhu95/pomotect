
import React from 'react'
import { formatDate } from '@/utils';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const About = () => {

    let lastUpdatedDate = formatDate();

    return (
        <div>
            <div className="site-section">
                <div className="about-section">
                    <h3 className="main_header">About</h3>
                    <p><i>Most recently updated on February 01, 2024</i></p>
                </div>
                <div className="about-section">
                    <h3 className="about_header pr-6">Postmodern Tectonics </h3>

                    <div className="about-section">Or, sometimes <b>POMO—TECT™</b> is a b2b (back-to-back) of ideas.</div>

                    <div className="about-section">We talk about, research, and design tools and symbols for people who like to:</div>


                    <ul className="padding-x">
                        <li className="minion-font">DJ.</li>
                        <li className="minion-font">Design.</li>
                        <li className="minion-font">Dance.</li>
                        <li className="minion-font">Make Music.</li>
                        <li className="minion-font">and Art.</li>
                        <li className="minion-font">Engineer Things.</li>
                        <li className="minion-font">or Architect Stuff.</li>
                    </ul>
                    <br />

                    <div className="about-section">We are eternally inspired by these people, so we outfit them for purpose with our products and celebrate them through our brand.</div>
                </div>
                <div className="about-section">
                    <div className="minion-font font-bold">Objects</div>
                    Form and function and all that. A collection of things and garments that we make and sometimes
                    sell if we can figure out how to actually make them. Let us know if you want to help with that last part.
                    It’s hard.
                </div>

                <div className="about-section">
                    <div className="minion-font font-bold">Words</div>
                    Here we explore general curiosities and questions. We quote. We clip things from the web.
                    Disciplined observation of the world is the source of all creative inspiration so we try
                    to keep an eye or ear out for goings-on worth capturing.
                </div>

                <div className="about-section">
                    <div className="minion-font font-bold">Events</div>
                    From time-to-time, we bring people together to dance, to listen more,
                    and to talk less — a temporary autonomous zone.
                </div>

                <div className="about-section">
                    <h3 className="about_header pr-6">About the About</h3>
                    Founded in 2024© by a few longtime friends. <br></br>
                    Find us somewhere in between New York & Los Angeles.
                </div>
            </div>
            <ScrollToTopButton />
        </div >
    )
}

export default About