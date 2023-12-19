import React from 'react'
import Image from 'next/image';
import lockIcon from '../../assets/images/lock-icon.png';

const Archive = () => {
    return (
        <div className="site-section grid hover:bg-black content-center">
            <Image
                src={lockIcon}
                width={200}
                height={700}
                alt="lock icon"
            />
        </div>
    )
}

export default Archive