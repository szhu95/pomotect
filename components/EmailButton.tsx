"use client";
import React from 'react';
import { motion } from 'framer-motion';
import TurnRightIcon from '../assets/images/turn-right.svg';

const EmailButton = () => {
    return (
        <div>
            <div className='flex'>
                <TurnRightIcon height={12} width={12}/>
                <input className="ml-2 md:w-1/3 w-full field" name="email-signup" placeholder=' Enter your email for updates' />
                {/* <button type="submit">Submit</button> */}
            </div>
        </div>
    )
}

export default EmailButton