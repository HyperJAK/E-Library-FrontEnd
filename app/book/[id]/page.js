'use client'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'
import {Rubik} from 'next/font/google'
import {fetchBook, handleClearCache} from "@/config/API/book/bookService";
import {handleBorrowBook, handleGetUserById, handleUnborrowBook} from "@/config/API/user/userService";
import {GetUser} from "@/config/Utilities";
import ErrorNotification from "@/components/shared/ErrorNotification";
import SuccessNotification from "@/components/shared/SuccessNotification";
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

export default function SpecificBook({params}) {

    const [bookDetails, setBookDetails] = useState([])
    const [bookId, setBookId] = useState(null)

    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showMessage, setShowMessage] = useState('')

    const [user, setUser] = useState([])

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
                <div>
                    <Image
                        src={bookDetails.coverImageURL ?? '/bookPlaceholder.png'}
                        alt={'book image'}
                        layout="fill"
                       /* objectFit="cover"*/
                        className="z-10"
                    />
                </div>
            </div>
        );
    }

    const ButtonsChoiceDiv = () => {

        const borrowBook = async() => {
            const userId = await GetUser()
            const response = await handleBorrowBook(userId?.id, bookId)
            console.log('Response' + response)

            if(response == null){
                setShowMessage("An unexpected error occurred. Please try again.")
                setShowError(true)
            }

            if (response && response.status === 200) {
                //here we are setting the user that we get from the repsonse as default user
                console.log(response.user)
                setUser(response.user)

                setShowMessage(response?.message)
                setShowSuccess(true)
                /*//we then clear the cache
                await handleClearCache(bookId)*/
            } else {
                setShowMessage(response?.message)
                setShowError(true)
            }
        }

        const unborrowBook = async() => {
            const userId = await GetUser()
            const response = await handleUnborrowBook(userId?.id, bookId)
            console.log('Response' + response)

            if(response == null){
                setShowMessage("An unexpected error occurred. Please try again.")
                setShowError(true)
            }

            if (response && response.status === 200) {
                //here we are setting the user that we get from the repsonse as default user
                console.log(response.user)
                setUser(response.user)

                //we then clear the cache
                await handleClearCache(bookId)

                setShowMessage(response?.message)
                setShowSuccess(true)
            } else {
                setShowMessage(response?.message)
                setShowError(true)
            }
        }


        return (
            <div className={'flex flex-row flex-nowrap justify-center gap-2'}>
                {
                    user?.userBooks?.length > 0? (

                        <Button
                            style={
                                'justify-center w-[40%] flex text-[0.9rem] flex-row border-solid border-secondary border-2 bg-secondary p-3 hover:bg-accent hover:cursor-pointer flex-row flex text-page rounded-full hover:text-secondary'
                            }
                            itemComponents={<p>Unborrow Book</p>}
                            handle={unborrowBook}
                        />
                    ) : (

                        <Button
                            style={
                                'justify-center w-[40%] flex text-[0.9rem] flex-row border-solid border-secondary border-2 bg-secondary p-3 hover:bg-accent hover:cursor-pointer flex-row flex text-page rounded-full hover:text-secondary'
                            }
                            itemComponents={<p>Borrow Book</p>}
                            handle={borrowBook}
                        />
                    )
                }


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
                <p className={'text-primary font-bold'}>Type: <span className={'text-primary font-normal'}>{bookDetails.type ?? 'Physical'}</span></p>
                {/*languages*/}
                <p className={'text-primary font-bold'}>Languages:
                    {bookDetails.languages &&
                        bookDetails.languages.map((language) => {
                            return (
                                <span key={language.id}><span className={'text-primary font-normal'}> {language.type}</span>
                                    {language.id !== bookDetails.languages[bookDetails.languages.length - 1].id? ', ':''}
                                </span>
                            );
                        })
                    }
                </p>


                {/*publishing date*/}
                <p className={'text-primary font-bold'}>Publishing Date: <span className={'text-primary font-normal'}>{bookDetails.publishingDate ?? '2023-03-01'}</span></p>
                {/*author*/}
                <p className={'text-primary font-bold'}>Author: <span className={'text-primary font-normal'}>{bookDetails.author?.firstName ?? 'Unknown'} {bookDetails.author?.lastName ?? 'Unknown'}</span></p>

                {/*genres*/}
                <p className={'max-w-[400px] text-primary font-bold'}>Genres:
                    {bookDetails.genres &&
                        bookDetails.genres.map((genre) => {
                            return (
                                <span key={genre.id}><span className={'text-primary font-normal'}> {genre.type}</span>
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
                <p className={'text-primary font-bold'}>Pages: <span className={'text-primary font-normal'}>{bookDetails.pageCount ?? '300'}</span></p>
                {/*size if digital, or stock if physical*/}
                {
                    bookDetails.type === 'Digital' ? (
                        <p className={'text-primary font-bold'}>Size: <span className={'text-primary font-normal'}>{bookDetails.fileSizeInMB ?? '30'}MB</span></p>
                    ) : (
                        <p className={'text-primary font-bold'}>Stock: <span className={'text-primary font-normal'}>{bookDetails.physicalBookCount ?? '30'}</span></p>
                    )
                }
                {/*publisher*/}
                <p className={'text-primary font-bold'}>Publisher: <span className={'text-primary font-normal'}>{bookDetails.publisher ?? 'Someone'}</span></p>


                {/*tags*/}
                <p className={'text-primary font-bold'}>
                    Tags:
                    {bookDetails.tags &&
                        bookDetails.tags.map((tag) => {
                            return (
                                <span key={tag.id}><span className={'text-primary font-normal'}> {tag.type}</span>
                                    {tag.id !== bookDetails.tags[bookDetails.tags.length - 1].id? ', ':''}
                                </span>
                            );
                        })
                    }
                </p>




                {/*formats if digital / physical location in library if regular*/}
                {
                    bookDetails.type === 'Digital' ? (
                        <p className={'text-primary font-bold'}>
                            Formats:
                            {bookDetails.formats && bookDetails.formats.length > 0 ? (
                                bookDetails.formats.map((format) => (
                                    <span key={format.id}>
                                        <span className="text-primary font-normal"> {format.type}</span>
                                        {format.id !== bookDetails.formats[bookDetails.formats.length - 1].id? ', ':''}
                                    </span>
                                ))
                            ) : (
                                <span>No formats available</span>
                            )}
                        </p>
                    ) : (
                        <p className={'text-primary font-bold'}>
                            Location:
                            <span className="text-primary font-normal">{' '}
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
        setBookId(id)
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

        async function fetchUser() {
            try {
                const data = await GetUser()
                const newUser = await handleGetUserById(data.id)
                console.log('Going inside to fetch user')
                console.log('The user object is : ' + newUser)

                console.log('The user object is : ' + newUser.userBooks.length)


                if (newUser) {
                    setUser(newUser)
                } else {
                    setUser([])
                }

            } catch (error) {}
        }
        async function resetMessageBoxes(){
            if(showSuccess){
                const timeout = setTimeout(() => {
                    setShowSuccess(false)
                }, 3000)
                //we fetch data again because now the book remaining amount should be down by 1
                await fetchData();
                return () => clearTimeout(timeout)
            }
            if(showError){
                const timeout = setTimeout(() => {
                    setShowError(false)
                }, 3000)
                return () => clearTimeout(timeout)
            }
        }

        resetMessageBoxes()

        fetchData()
        if(user == null || user === []){
            fetchUser()
        }

    }, [showError, showSuccess, showMessage, user])

    return (

            <main className="relative flex min-h-screen flex-col items-center justify-between gap-40 p-10 text-black">
                {bookDetails ? (
                    <>

                        {showError && (
                            <ErrorNotification message={showMessage}/>
                        )}
                        {showSuccess && (
                            <SuccessNotification message={showMessage}/>
                        )}
                        {/*Main div*/}
                        <div
                            className={
                                'flex w-[100%] flex-row justify-center items-center flex-wrap rounded-2xl bg-accent p-4'
                            }>
                            {/*picture div*/}
                            <div className={'flex flex-col gap-2'}>
                                <BookPic/>
                                <ButtonsChoiceDiv/>
                            </div>


                            <div className={'flex flex-col flex-nowrap gap-2'}>
                                {/*Book info div*/}
                                <BookInfoDiv/>
                                {/*Book description here*/}
                                <BookDescription/>

                                <div className={'flex flex-row flex-nowrap gap-10'}>
                                    {/*Book details 1*/}
                                    <BookDetailsSection1/>

                                    {/*Book details 2*/}
                                    <BookDetailsSection2/>
                                </div>


                            </div>


                        </div>

                    </>
                        ) : (<Loading message={'Loading your book'}/>)

                    }
            </main>



    )
}
