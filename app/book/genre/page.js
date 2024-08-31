'use client'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'
import Rating from '@/components/book/Rating'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import {Rubik} from 'next/font/google'
import Link from 'next/link'
import {fetchBooksWithGenre} from "@/config/API/book/bookService";
import Loading from "@/components/shared/Loading";


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

export default function SpecificGenre({params}) {
    const [genreSearchResults, setGenreSearchResults] = useState([])
    const [genreId, setGenreId] = useState('')
    const [genreName, setGenreName] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const id = urlParams.get('id')
        setGenreId(id)
        console.log('Genre ID is: ' + id)

        async function fetchData() {
            try {
                const data = await fetchBooksWithGenre(id);

                if (data) {
                    setGenreSearchResults(data)
                    setGenreName(data?.[0]?.genres?.[0]?.type ?? 'defaultGenreName');
                } else {
                    setGenreSearchResults([])
                }

            } catch (error) {}
        }
        if (id != '') {
            fetchData()
        }
        else{
            setGenreSearchResults([])
        }

    }, [])

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-start gap-40 align-middle text-black">
                {genreSearchResults ? (
                    <>
                        <div
                            className={` mt-6 w-[90%] items-center rounded-full bg-secondary p-2 text-center text-white ${rubikBold.variable} font-rubik text-[2rem]`}>
                            <p>
                                {genreSearchResults.length} results for: {genreName} genre
                            </p>
                        </div>

                        {/*Div for all book*/}
                        <div className={'flex flex-row flex-wrap justify-between gap-20'}>
                            {genreSearchResults.map((book) => {
                                {
                                    /*Div for each book*/
                                }
                                return (
                                    <div
                                        className={'group flex flex-row flex-nowrap justify-center border-2 border-primary rounded-2xl'}
                                        key={book.id}>
                                        {/*div for main info of book*/}
                                        <div
                                            className={
                                                'flex flex-col items-center bg-white border-1 rounded-2xl border-black/50 group-hover:border-2 group-hover:border-white group-hover:rounded-tl-2xl group-hover:rounded-bl-2xl justify-center gap-4 group-hover:border-r-2 group-hover:rounded-br-none group-hover:rounded-tr-none group:hover:border-r-white p-2 '
                                            }>
                                            <p
                                                className={`${rubikBold.variable} font-rubik text-[1rem] text-center text-primary w-[80%]`}>
                                                {book.title}
                                            </p>
                                            <p className={`${rubikBold.variable} font-rubik text-[0.6rem] text-center text-primary w-[80%]`}>{book.publishingDate}</p>

                                            <Image
                                                src={book.coverImageURL}
                                                alt={'book image'}
                                                width={150}
                                                height={150}
                                                className={
                                                    'rounded-2xl border-2 border-secondary'
                                                }
                                            />

                                            <div
                                                className={
                                                    'z-30 flex flex-row flex-wrap justify-center gap-2'
                                                }>
                                                <div
                                                    className={
                                                        'flex  flex-row items-center justify-center gap-1 rounded-2xl bg-secondary p-1 text-[0.6rem] text-accent'
                                                    }>
                                                    <AccessTimeFilledRoundedIcon fontSize="small" />
                                                    {book.type}
                                                </div>
                                                <div
                                                    className={
                                                        'flex  flex-row items-center justify-center gap-1 rounded-2xl bg-secondary p-1 text-[0.6rem] text-accent'
                                                    }>
                                                    <InsightsRoundedIcon fontSize="small" />
                                                    {book.pageCount}
                                                </div>
                                                <div
                                                    className={
                                                        'flex  flex-row items-center justify-center gap-1 rounded-2xl bg-secondary p-1 text-[0.6rem] text-accent'
                                                    }>
                                                    <PeopleAltRoundedIcon fontSize="small" />
                                                    {book.publisher}
                                                </div>
                                            </div>
                                        </div>
                                        {/*div for description and button to navigate to book page*/}
                                        <div
                                            className={
                                                'hidden flex-col shadow-inner shadow-primary bg-white items-center justify-between rounded-br-2xl rounded-tr-2xl border-b-2 border-r-2 border-t-2 border-transparent p-2 align-middle group-hover:flex'
                                            }>
                                            <p
                                                className={`${rubikBold.variable} font-rubik text-[1rem] text-primary`}>
                                                Info
                                            </p>
                                            <p
                                                className={`${rubikRegular.variable} max-h-[100px] max-w-[200px] overflow-auto font-rubik text-[0.6rem] text-primary`}>
                                                {book.description}
                                            </p>

                                            <Link
                                                href={`/book/${book.id}?id=${book.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <Button
                                                    style={
                                                        'justify-center text-[0.8rem] flex flex-row border-solid border-secondary border-2 bg-secondary p-2 hover:bg-accent hover:cursor-pointer text-page rounded-2xl hover:text-secondary'
                                                    }
                                                    itemComponents={<p>View Book</p>}
                                                    handle={''}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ) : <Loading message={'Loading books'}/>}
            </main>
        </>
    )
}
