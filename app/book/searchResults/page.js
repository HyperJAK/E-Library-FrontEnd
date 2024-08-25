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
import {fetchBookSearchResults} from "@/config/API/book/bookService";
import Loading from "@/components/shared/Loading";

const InterestData = {
  topInfo: [
    {
      iconPath: '/icons/beenhere.png',
      description: 'Professional chef’s approval',
    },
    {
      iconPath: '/icons/done.png',
      description: 'Safety checks',
    },
    {
      iconPath: '/icons/fast_forward.png',
      description: 'Fast equipment deliveries',
    },
  ],
  bottomInfo: [
    {
      dataNb: 10000,
      description: 'Recipes published',
    },
    {
      dataNb: 7000,
      description: 'Good ratings',
    },
    {
      dataNb: 100000,
      description: 'User reviews',
    },
    {
      dataNb: 100000,
      description: 'User reviews',
    },
  ],
}

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

export default function SearchResults({params}) {
  const [bookSearchResults, setBookSearchResults] = useState([])
  const [bookName, setBookName] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const name = urlParams.get('id')
    setBookName(name)
    console.log('Book Name is: ' + name)

    async function fetchData() {
      try {
        const data = await fetchBookSearchResults(name);

        if (data) {
          setBookSearchResults(data)
        } else {
          setBookSearchResults([])
        }

      } catch (error) {}
    }
    if (name != '') {
      fetchData()
    }
    else{
      setBookSearchResults([])
    }

  }, [])

  return (
      <main className="flex min-h-screen flex-col items-center justify-start gap-40 align-middle text-black">
        {bookSearchResults? (
          <>
            <div
              className={` mt-6 w-[90%] items-center rounded-full bg-secondary p-2 text-center text-white ${rubikBold.variable} font-rubik text-[2rem]`}>
              <p>
                {bookSearchResults.length} results for: {bookName}
              </p>
            </div>

            {/*Div for all book*/}
            <div className={'flex flex-row flex-wrap justify-between gap-20'}>
              {bookSearchResults.map((book) => {
                {
                  /*Div for each book*/
                }
                return (
                  <div
                    className={'group flex flex-row flex-nowrap justify-center'}
                    key={book.id}>
                    {/*div for main info of book*/}
                    <div
                      className={
                        'flex flex-col items-center border-2 border-red-600 justify-center gap-4 group-hover:rounded-br-none group-hover:rounded-tr-none rounded-2xl border-b-2 border-l-2 border-t-2 border-transparent p-2 group-hover:border-secondary'
                      }>
                      <p
                        className={`${rubikBold.variable} font-rubik text-[1rem] text-center text-opposite w-[80%]`}>
                        {book.title}
                      </p>
                      <p className={`${rubikBold.variable} font-rubik text-[1rem] text-center text-opposite w-[80%]`}>{book.publishingDate}</p>

                      <Image
                        src={book.share_link}
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
                            'flex  flex-row items-center justify-center gap-1 rounded-2xl bg-secondary p-1 text-[0.6rem]'
                          }>
                          <AccessTimeFilledRoundedIcon fontSize="small" />
                          {book.type}
                        </div>
                        <div
                          className={
                            'flex  flex-row items-center justify-center gap-1 rounded-2xl bg-secondary p-1 text-[0.6rem]'
                          }>
                          <InsightsRoundedIcon fontSize="small" />
                          {book.pageCount}
                        </div>
                        <div
                          className={
                            'flex  flex-row items-center justify-center gap-1 rounded-2xl bg-secondary p-1 text-[0.6rem]'
                          }>
                          <PeopleAltRoundedIcon fontSize="small" />
                          {book.publisher}
                        </div>
                      </div>
                    </div>
                    {/*div for description and button to navigate to book page*/}
                    <div
                      className={
                        'hidden flex-col items-center justify-between rounded-br-2xl rounded-tr-2xl border-b-2 border-r-2 border-t-2 border-transparent p-2 align-middle group-hover:flex group-hover:border-secondary'
                      }>
                      <p
                        className={`${rubikBold.variable} font-rubik text-[1rem] text-opposite`}>
                        Info
                      </p>
                      <p
                        className={`${rubikRegular.variable} max-h-[100px] max-w-[200px] overflow-auto font-rubik text-[0.6rem] text-opposite`}>
                        {book.description}
                      </p>

                      <Link
                        href={`/book/${book.id}?id=${book.id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Button
                          style={
                            'justify-center text-[0.8rem] flex flex-row border-solid border-secondary border-2 bg-secondary p-2 hover:bg-accent hover:cursor-pointer text-page rounded-2xl hover:text-opposite'
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
        ) : (
            <Loading message={'Loading Search Results'}/>
        )}
      </main>
  )
}
