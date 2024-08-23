'use client'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'

import Rating from '@/components/shared/Rating'
import {Rubik} from 'next/font/google'
import {fetchBook, fetchBookSuggestions} from "@/config/API/book/bookService";


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

export default function SpecificBook({params}) {

    const [bookDetails, setBookDetails] = useState('')

    const BookInfoDiv = () => {
        return (
            <div className={'flex flex-row flex-wrap self-start'}>
                {/*We use a fetch in this component to get the user info so like username*/}
                <div className={'flex flex-col flex-wrap justify-start m-auto items-start gap-1'}>
                    <p className={`pt-3 pr-3 pb-3 ${rubikRegular.variable} font-rubik text-[1.4rem]`}><span className={`${rubikBold.variable} font-rubik text-[2.5rem]`}>{bookDetails.title ?? 'Harry potter'}</span>  -  {bookDetails.publishingDate ?? '2023-01-02'}

                    </p>
                    <div className={'flex flex-row flex-nowrap justify-between gap-2'}>

                        <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                            Written by: {bookDetails.author?.firstName ?? 'Unknown'} {bookDetails.author?.lastName ?? 'Unknown'}
                        </div>

                        <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                            {bookDetails.type ?? 'Physical'}
                        </div>

                        {/*This can be count if its regular or file size if its digital*/}
                        {
                            bookDetails.type === 'Digital' ? (
                                <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                                    {bookDetails.fileSizeInMB ?? '30'}MB
                                </div>
                            ) : (
                                <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                                    {bookDetails.physicalBookCount ?? '30'} Books
                                </div>
                            )
                        }

                        <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                            {bookDetails.pageCount ?? '220'} Pages
                        </div>

                    </div>


                </div>
            </div>
        )
    }

    const BookPic = () => {
        return (
            <div className=" relative m-8 h-[400px] min-h-[400px] w-[300px] min-w-[300px] rounded-2xl text-white">
                {/* Image at the top */}
                <div className=" border-2 border-primary">
                    <Image
                        src={bookDetails.coverImageURL ?? '/recipeExample.png'}
                        alt={'recipe image'}
                        layout="fill"
                        objectFit="cover"
                        className="z-10"
                    />
                </div>
            </div>
        );
    }

    const ButtonsChoiceDiv = () => {
        return (
            <div className={'flex flex-row flex-nowrap justify-center gap-2'}>
                <Button
                    style={
                        'justify-center w-[40%] flex text-[0.9rem] flex-row border-solid border-secondary border-2 bg-secondary p-3 hover:bg-accent hover:cursor-pointer flex-row flex text-page rounded-full hover:text-secondary'
                    }
                    itemComponents={<p>Borrow Book</p>}
                    handle={''}
                />
                <Button
                    style={
                        'justify-center w-[40%] flex flex-row text-[0.9rem]  border-solid border-secondary border-2 bg-secondary p-3 hover:bg-accent hover:cursor-pointer flex-row flex text-page rounded-full hover:text-secondary'
                    }
                    itemComponents={<p>Share Book</p>}
                    handle={copyToClipboard}
                />
            </div>
        )
    }
    const BookDescription = () => {
        const [isExpanded, setIsExpanded] = useState(false);

        const toggleDescription = () => {
            setIsExpanded(!isExpanded);
        };

        const description = bookDetails.description ?? 'The Kingdom of Clays faces a dire crisis: an assassination attempt has just been made on its own Princess Lynneburg, and its neighboring countries eye the aftermath like starving vultures, plotting the Kingdom\'s downfall. The ensuing conflict will shape the face of the continent for centuries to come...but Noor doesn’t have a clue about any of that! Having freshly arrived at the royal capital after over a decade of rigorous, isolated training at his mountain home, he’s dead set on achieving his childhood dream of becoming an adventurer, even if the only skills he possesses are useless ones. Sure, he can "Parry" thousands of swords in the span of a single breath, but everybody knows you need more than that if you want to be an adventurer! Our hero’s road to making his dream come true will be long(?) and arduous(?)—but if there’s one thing Noor’s not afraid of, it’s some good ol’ fashioned hard work!';

        const threshold = 400;

        return (
            <div className={`${rubikRegular.variable} font-rubik text-[0.9rem] text-primary max-w-[800px]`}>
                <p>
                    {isExpanded ? description : `${description.substring(0, threshold)}...`}
                </p>
                <button
                    onClick={toggleDescription}
                    className="text-blue-500 hover:underline"
                >
                    {isExpanded ? '[Read Less]' : '[Read More]'}
                </button>
            </div>
        );
    };
    const BookDetailsSection1 = () => {
        return (
            <div className={'flex flex-col flex-nowrap max-w-[400px]'}>

                {/*type*/}
                <p>Type: <span className={'text-secondary'}>{bookDetails.type ?? 'Physical'}</span></p>
                {/*languages*/}
                <p>Languages:
                    {bookDetails.languages &&
                        bookDetails.languages.map((language) => {
                            return (
                                <span key={language.id}><span className={'text-secondary'}> {language.type}</span>
                                    {language.id !== bookDetails.languages[bookDetails.languages.length - 1].id? ', ':''}
                                </span>
                            );
                        })
                    }
                </p>


                {/*publishing date*/}
                <p>Publishing Date: <span className={'text-secondary'}>{bookDetails.publishingDate ?? '2023-03-01'}</span></p>
                {/*author*/}
                <p>Author: <span className={'text-secondary'}>{bookDetails.author?.firstName ?? 'Unknown'} {bookDetails.author?.lastName ?? 'Unknown'}</span></p>

                {/*genres*/}
                <p className={'max-w-[400px]'}>Genres:
                    {bookDetails.genres &&
                        bookDetails.genres.map((genre) => {
                            return (
                                <span key={genre.id}><span className={'text-secondary'}> {genre.type}</span>
                                    {genre.id !== bookDetails.genres[bookDetails.genres.length - 1].id? ', ':''}
                                </span>
                            );
                        })
                    }

                </p>

            </div>
        )
    }

    const BookDetailsSection2 = () => {
        return (
            <div className={'flex flex-col flex-nowrap'}>

                {/*pages count*/}
                <p>Pages: <span className={'text-secondary'}>{bookDetails.pageCount ?? '300'}</span></p>
                {/*size if digital, or stock if physical*/}
                {
                    bookDetails.type === 'Digital' ? (
                        <p>Size: <span className={'text-secondary'}>{bookDetails.fileSizeInMB ?? '30'}MB</span></p>
                    ) : (
                        <p>Stock: <span className={'text-secondary'}>{bookDetails.physicalBookCount ?? '30'}</span></p>
                    )
                }
                {/*publisher*/}
                <p>Publisher: <span className={'text-secondary'}>{bookDetails.publisher ?? 'Someone'}</span></p>


                {/*tags*/}
                <p>
                    Tags:
                    {bookDetails.tags &&
                        bookDetails.tags.map((tag) => {
                            return (
                                <span key={tag.id}><span className={'text-secondary'}> {tag.type}</span>
                                    {tag.id !== bookDetails.tags[bookDetails.tags.length - 1].id? ', ':''}
                                </span>
                            );
                        })
                    }
                </p>




                {/*formats if digital / physical location in library if regular*/}
                {
                    bookDetails.type === 'Digital' ? (
                        <p>
                            Formats:
                            {bookDetails.formats && bookDetails.formats.length > 0 ? (
                                bookDetails.formats.map((format) => (
                                    <span key={format.id}>
                                        <span className="text-secondary"> {format.type}</span>
                                        {format.id !== bookDetails.formats[bookDetails.formats.length - 1].id? ', ':''}
                                    </span>
                                ))
                            ) : (
                                <span>No formats available</span>
                            )}
                        </p>
                    ) : (
                        <p>
                            Location:
                            <span className="text-secondary">{' '}
                                Floor: {bookDetails.physicalBookLocation?.floor ?? '2'} -
                                Section: {bookDetails.physicalBookLocation?.section ?? 'B'} -
                                Shelf: {bookDetails.physicalBookLocation?.shelf ?? '4'}
                            </span>
                        </p>
                    )
                }


            </div>
        )
    }


    const copyToClipboard = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link)
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const id = urlParams.get('id')
        console.log('book id is: ' + id)

        async function fetchData() {
            try {
                const data = await fetchBook(id)

                if (data) {
                    setBookDetails(data)
                } else {
                    setBookDetails([])
                }

            } catch (error) {}
        }

        if (bookDetails !== []) {
            fetchData()
        }
    }, [])

    return (
        <>

                <main className="flex min-h-screen flex-col items-center justify-between gap-40 p-24 text-black">
                    {/*Main div*/}
                    <div
                        className={
                            'flex w-[90%] flex-row flex-wrap rounded-2xl bg-accent p-10'
                        }>
                        {/*picture div*/}
                        <div className={'flex flex-col gap-2'}>
                            <BookPic />
                            <ButtonsChoiceDiv />
                        </div>


                        <div className={'flex flex-col flex-nowrap gap-2'}>
                            {/*Book info div*/}
                            <BookInfoDiv />
                            {/*Book description here*/}
                            <BookDescription />

                            <div className={'flex flex-row flex-nowrap gap-10'}>
                                {/*Book details 1*/}
                                <BookDetailsSection1 />

                                {/*Book details 2*/}
                                <BookDetailsSection2 />
                            </div>


                        </div>




                    </div>

                </main>

        </>
    )
}
