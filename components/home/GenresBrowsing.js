'use client'
//font import
import {Rubik} from 'next/font/google'

//next link
import Link from 'next/link'

//components
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'

const rubikBold = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
    weight: ['700'],
})

const rubikRegular = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
    weight: ['400'],
})

const GenresBrowsing = () => {


    const [genres, setGenres] = useState([])

    useEffect(() => {

        function getGenresFromDb(){

        }

        if(genres.length === 0){
            getGenresFromDb();
        }

    }, [])

    return (
        <>
            {/*Main components parent*/}
            <div
                className={
                    'z-50 flex w-full flex-row flex-nowrap items-center justify-center gap-20 bg-accent pb-[120px] pl-40 pr-40 pt-[120px]'
                }>
                {/*Main info div*/}

            </div>
        </>
    )
}

export default GenresBrowsing
