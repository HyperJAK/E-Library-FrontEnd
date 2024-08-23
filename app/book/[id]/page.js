'use client'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'

import Rating from '@/components/shared/Rating'
import {Rubik} from 'next/font/google'


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
    /*if (!recipe) {
      // Handle the case where no recipe data was found (optional)
      return <p>Recipe not found!</p>
    }*/
    const [bookInfo, setBookInfo] = useState('')
    const [bookDetails, setBookDetails] = useState('')
    const [bookAuthor, setBookAuthor] = useState([])
    const [recipeReviews, setRecipeReviews] = useState([])
    const [detailsHovered, setDetailsHovered] = useState(false)

    const BookInfoDiv = () => {
        return (
            <div className={'flex flex-row flex-wrap self-start'}>
                {/*We use a fetch in this component to get the user info so like username*/}
                <div className={'flex flex-col flex-wrap justify-start m-auto items-start gap-1'}>
                    <p className={`pt-3 pr-3 pb-3 ${rubikRegular.variable} font-rubik text-[1.4rem]`}><span className={`${rubikBold.variable} font-rubik text-[2.5rem]`}>Harry potter{bookInfo.title}</span>  -  {bookInfo.publishingDate}2023-01-02

                    </p>
                    <div className={'flex flex-row flex-nowrap justify-between gap-2'}>

                        <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                            Written by: {bookAuthor.firstName} {bookAuthor.lastName}John Doe
                        </div>

                        <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                            {bookInfo.type}Physical
                        </div>

                        {/*This can be count if its regular or file size if its digital*/}
                        {
                            bookInfo.type === 'Digital' ? (
                                <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                                    {bookInfo.fileSize}30 MB
                                </div>
                            ) : (
                                <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                                    {bookInfo.physicalBookCount}30 Books
                                </div>
                            )
                        }

                        <div className={`rounded-full bg-secondary ${rubikRegular.variable} text-accent font-rubik text-[0.8rem] p-2`}>
                            {bookInfo.pageCount} 220 Pages
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
                        src={bookInfo.coverImageURL?bookInfo.coverImageURL:'/recipeExample.png'}
                        alt={'recipe image'}
                        layout="fill"
                        objectFit="cover"
                        className="z-10"
                    />
                </div>
            </div>
        );
    }

    const BookDescription = () => {
        const [isExpanded, setIsExpanded] = useState(false);

        const toggleDescription = () => {
            setIsExpanded(!isExpanded);
        };

        const description = `The Kingdom of Clays faces a dire crisis: an assassination attempt has just been made on its own Princess Lynneburg, and its neighboring countries eye the aftermath like starving vultures, plotting the Kingdom's downfall. The ensuing conflict will shape the face of the continent for centuries to come...but Noor doesn’t have a clue about any of that! Having freshly arrived at the royal capital after over a decade of rigorous, isolated training at his mountain home, he’s dead set on achieving his childhood dream of becoming an adventurer, even if the only skills he possesses are useless ones. Sure, he can "Parry" thousands of swords in the span of a single breath, but everybody knows you need more than that if you want to be an adventurer! Our hero’s road to making his dream come true will be long(?) and arduous(?)—but if there’s one thing Noor’s not afraid of, it’s some good ol’ fashioned hard work!`;

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
    const ButtonsChoiceDiv = () => {
        return (
            <div className={'flex flex-row flex-nowrap justify-center gap-36'}>
                <Button
                    style={
                        'justify-center w-[40%] flex flex-row border-solid border-secondary border-2 bg-secondary p-3 hover:bg-accent hover:cursor-pointer flex-row flex text-page rounded-full hover:text-opposite'
                    }
                    itemComponents={<p>Save Recipe</p>}
                    handle={''}
                />
                <Button
                    style={
                        'justify-center w-[40%] flex flex-row border-solid border-secondary border-2 bg-secondary p-3 hover:bg-accent hover:cursor-pointer flex-row flex text-page rounded-full hover:text-opposite'
                    }
                    itemComponents={<p>Share Recipe</p>}
                    handle={''}
                />
            </div>
        )
    }

    const BookDetailsSection1 = () => {
        return (
            <div className={'flex flex-col flex-nowrap'}>

                {/*type*/}
                <p>Type: <span className={'text-secondary'}>{bookInfo.type}Physical</span></p>
                {/*languages*/}

                {/*publishing date*/}
                <p>Publishing Date: <span className={'text-secondary'}>{bookInfo.type}2023-03-01</span></p>
                {/*author*/}
                <p>Author: <span className={'text-secondary'}>{bookInfo.type}Shakespear</span></p>

                {/*genres*/}


            </div>
        )
    }

    const BookDetailsSection2 = () => {
        return (
            <div className={'flex flex-col flex-nowrap'}>

                {/*pages count*/}
                <p>Pages: <span className={'text-secondary'}>{bookInfo.pageCount}300</span></p>
                {/*size if digital, or stock if physical*/}
                {
                    bookInfo.type === 'Digital' ? (
                        <p>Size: <span className={'text-secondary'}>{bookInfo.fileSizeInMB}30 MB</span></p>
                    ) : (
                        <p>Stock: <span className={'text-secondary'}>{bookInfo.physicalBookCount}30</span></p>
                    )
                }
                {/*publisher*/}
                <p>Publisher: <span className={'text-secondary'}>{bookInfo.type}Someone</span></p>


                {/*tags*/}



                {/*formats if digital / physical location in library if regular*/}
                {
                    bookInfo.type === 'Digital' ? (
                        <p>here we should look and put formats using (map)</p>
                    ) : (
                        <p>Location: <span className={'text-secondary'}>{bookInfo.type} Floor: 2 - Section: B - Shelf: 4</span></p>
                    )
                }

            </div>
        )
    }

    const NutritionFacts = () => {
        return (
            <div
                className={
                    'flex flex-col flex-nowrap items-center justify-between gap-10'
                }>
                <div
                    className={`flex flex-col items-center justify-center ${rubikBold.variable} font-rubik text-[2rem]`}>
                    <h1>Nutrition Facts</h1>
                    <h1>(Per serving)</h1>
                </div>
                <div>
                    <div
                        className={
                            'flex flex-row flex-wrap justify-center gap-10 lg:gap-32'
                        }>
                        {InterestData.bottomInfo.map((infoData) => {
                            return (
                                <div
                                    key={infoData.description}
                                    className={
                                        'flex h-[180px] w-[180px] min-w-[180px] flex-col items-center justify-evenly rounded-2xl border-2 border-solid border-secondary p-6 text-center align-middle'
                                    }>
                                    {/*Icon / Main Text*/}
                                    <h1 className={'text-2xl text-secondary'}>
                                        {infoData.dataNb}
                                    </h1>
                                    {/*Informative text*/}
                                    <p className={'text-opposite'}>{infoData.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const RecipeReviews = () => {
        return (
            <div
                className={
                    'flex w-[90%] flex-col flex-nowrap justify-center gap-10 rounded-2xl bg-accent p-10'
                }>
                {/*Review count*/}
                <div
                    className={`text-center ${rubikBold.variable} font-rubik text-[2rem]`}>
                    Reviews ({recipeReviews ? recipeReviews.length : ''})
                </div>
                {/*filter*/}
                <div className={'text-right'}>filter here</div>
                {recipeReviews
                    ? recipeReviews.map((review, index) => {
                        return (
                            <div
                                className={
                                    'flex flex-col justify-between gap-2 rounded-3xl border border-b-2 border-b-secondary bg-accent p-10 text-accent'
                                }
                                key={index}>
                                {/*publisher info*/}
                                <div className={'flex flex-row flex-nowrap'}>
                                    <Image
                                        src={/*publisher ? publisher.profilePic : */ ''}
                                        alt={'profile pic'}
                                        width={50}
                                        height={50}
                                    />
                                    {/*We use a fetch in this component to get the user info so like username*/}
                                    <div
                                        className={
                                            'flex flex-row flex-wrap justify-center gap-5'
                                        }>
                                        <div className={'rounded-full bg-secondary p-3'}>
                                            {review.username}
                                        </div>
                                        <div className={'rounded-full bg-secondary p-3'}>
                                            {review.email}
                                        </div>
                                    </div>
                                </div>
                                <div className={'flex flex-row gap-3'}>
                                    <Rating rating={review.rating} />
                                </div>
                                <div className={'text-opposite'}>{review.description}</div>
                            </div>
                        )
                    })
                    : ''}
            </div>
        )
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const id = urlParams.get('id')
        console.log('Recipe id is: ' + id)

        async function fetchData() {

        }
        fetchData()
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
                        <BookPic />

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
