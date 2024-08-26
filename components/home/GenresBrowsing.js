'use client'
// Font import
import { Rubik } from 'next/font/google'

// Next link
import Link from 'next/link'

// Components
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { fetchGenres } from "@/config/API/book/genre/genreService"

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
    const [displayedGenres, setDisplayedGenres] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [visibleCount, setVisibleCount] = useState(12)

    useEffect(() => {
        async function getGenresFromDb() {
            try {
                const data = await fetchGenres()
                setGenres(data)
                setDisplayedGenres(data.slice(0, visibleCount))
                setLoading(false)
            } catch (error) {
                console.error('Failed to fetch genres:', error)
                setError(error)
                setLoading(false)
            }
        }
        if(genres.length === 0){
            getGenresFromDb();
        }
    }, [visibleCount])

    const loadMore = () => {
        setVisibleCount(prevCount => {
            const newCount = prevCount + 12
            setDisplayedGenres(genres.slice(0, newCount))
            return newCount
        })
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error loading genres: {error.message}</p>

    return (
        <>
            {/* Main components parent */}
            <div
                className={
                    'relative z-50 flex w-full flex-col flex-nowrap items-center justify-center bg-transparent pb-[120px] mb-[200px] pt-[120px]'
                }
            >
                {/* title and shape before it*/}
                <div className={'flex flex-row justify-between pb-4'}>
                    <div className={'z-10 absolute top-0 left-[-400px]'}>
                        <Image
                            src="/ellipseBlue.svg"
                            alt="My Icon"
                            width={700}
                            height={700}
                        />
                    </div>

                    <div className={'flex flex-row justify-start'}>
                        <p
                            className={`${rubikBold.variable} text-center font-rubik text-[4rem] text-opposite`}>
                            <span className={'text-secondary'}>Some</span> Of Our
                            <br></br>{' '}
                            <span className={'text-secondary'}>Genres</span>
                        </p>
                    </div>
                </div>



                {/* Render genres */}
                <div className={'flex flex-row flex-wrap justify-center z-20'}>
                    {displayedGenres.length > 0 ?
                        (displayedGenres.map((genre) => (
                            <Link href={`/book/genre?id=${genre.id}`} key={genre.id}>
                                <div className={'flex flex-col justify-center ml-4 mt-4 align-middle items-center bg-primary hover:bg-primary/70 w-60 h-60 rounded-2xl'}>
                                    <p className={''}>{genre.type}</p>
                                </div>
                            </Link>
                        )))
                        :
                        (
                            <p>No genres found</p>
                        )
                    }
                </div>

                {/* load more button and shape after it*/}
                <div className={'flex flex-row justify-between pb-4 mt-10'}>
                    {/* Load More button */}
                    {genres.length > displayedGenres.length && (
                        <button
                            onClick={loadMore}
                            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600`}>
                            Load More
                        </button>
                    )}

                    <div className={'z-10 absolute right-[-400px]'}>
                        <Image
                            src="/ellipseBlue.svg"
                            alt="My Icon"
                            width={700}
                            height={700}
                        />
                    </div>
                </div>

            </div>


        </>
    )
}

export default GenresBrowsing
