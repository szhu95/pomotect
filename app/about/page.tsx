
import React from 'react'
import { Header } from '@/components'

const About = () => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    let lastUpdatedDate = mm + '/' + dd + '/' + yyyy;

    return (
        <div>
            <div className="site-section">
                <div className="about-section">
                    <h3 className="main_header">About</h3>
                    <p><i>Most recently updated on {lastUpdatedDate}</i></p>
                </div>
                <div className="about-section">
                    <h3 className="about_header">Postmodern Tectonics </h3>

                    <p>Or, sometimes <b>POMO—TECT™</b> is a b2b (back-to-back) of ideas.</p>

                    <p>We talk about, research, and design tools and symbols for people who like to:</p>


                    <ul className="padding-x">
                        <li>DJ.</li>
                        <li>Design.</li>
                        <li>Dance.</li>
                        <li>Make Music.</li>
                        <li>and Art.</li>
                        <li>Architect Stuff.</li>
                        <li>Engineer Things.</li>
                    </ul>
                    <br />
                    <p>We are eternally inspired by these people, so we outfit them for purpose with our products and celebrate them through our brand.</p>
                </div>
                <div className="about-section">
                    <h3><b>Objects</b></h3>
                    Form and function and all that. A collection of things and garments that we make and sometimes
                    sell if we can figure out how to actually make them. Let us know if you want to help with that last part.
                    It’s hard.
                </div>

                <div className="about-section">
                    <h3><b>Words</b></h3>
                    Here we explore general curiosities and questions. We quote. We clip things from the web.
                    Disciplined observation of the world is the source of all creative inspiration so we try
                    to keep an eye or ear out for goings-on worth capturing.
                </div>

                <div className="about-section">
                    <h3><b>Events</b></h3>
                    From time-to-time, we bring people together to dance, to listen more,
                    and to talk less — a temporary autonomous zone.
                </div>

                <div className="about-section">
                    <h3 className="about_header">About the About</h3>
                    Founded in 2024© by a few longtime friends.
                    <p>Find us somewhere in between New York & Los Angeles.</p>
                </div>
            </div>
        </div >
    )
}

export default About