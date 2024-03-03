import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const About = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 bg-[url('/for_about.png')] bg-no-repeat bg-cover font-mono">
            <div className="bg-white shadow-lg max-w-md rounded-2xl overflow-hidden">
                <Image
                    src="/tunic.jpg"
                    alt="About Image"
                    width={600}
                    height={600}
                    className="mx-auto object-cover"
                />
                <div className="text-center px-8 pb-8 ">
                    <h1 className="text-3xl font-bold mt-4">About</h1>
                    <p className="text-gray-700 mt-2">
                        The site is the part of <span className='text-emerald-300'>final project</span> that some friends did together in the last year of college. The idea was to get the readings from different electrical devices and showcase their energy consumption trends to the end user. 
                    </p>
                    <p className="text-gray-700 mt-2">
                        All secrets of our project can be found here: {' '}
                        <Link target='_blank' href={'https://github.com/Aryan570/soup'} className='underline text-emerald-300'>Source Code</Link>
                        .
                    </p>
                </div>
            </div>
        </div>

    )
}

export default About
