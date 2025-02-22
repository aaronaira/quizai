'use client'
import React, { useState } from 'react'
import Image from 'next/image'

function Avatar() {
    const [subMenu, setSubMenu] = useState<Boolean>(false)
    return (
        <div className="border rounded-full p-1 cursor-pointer">
            <Image
                src="./avatar.svg"
                width={32}
                height={32}
                alt="User Avatar"
                onClick={() => setSubMenu((prevSubMenu) => !prevSubMenu)}
            />
            {subMenu &&
                <div className='absolute top-[62] p-4 z-10 rounded-md right-[-20] bg-white shadow-lg '>
                    <ul><li>asdsad</li>
                        <li>asdasd</li>
                        <li></li>asdasdasd</ul>

                </div>}
        </div>
    )
}

export default Avatar