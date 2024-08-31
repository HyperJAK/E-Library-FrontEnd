'use client'
//font import
import {Rubik} from 'next/font/google'

//next link
import Link from 'next/link'

//components
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {fetchBookSuggestions} from "@/config/API/book/bookService";

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

const BookSearch = () => {
  const [bookName, setBookName] = useState('')
  const [bookSuggestions, setBookSuggestions] = useState([])

  const handleInputChange = async (event) => {
    setBookName(event.target.value)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchBookSuggestions(bookName)

        if (data) {
          setBookSuggestions(data)
        } else {
          setBookSuggestions([])
        }

        console.log(bookSuggestions[0].name)
      } catch (error) {}
    }

    if (bookName != '') {
      fetchData()
    }
    else{
      setBookSuggestions([])
    }

  }, [bookName])

  return (
    <>
      {/*Main components parent*/}
      <div
        className={
          'z-30 mt-[100px] mb-[200px] flex w-full flex-row flex-wrap items-center justify-between '
        }>
        {/*Search and suggestions under it*/}
        <div className={'relative flex flex-col gap-5'}>
          {/*Catchphrase and search textfield*/}
          <div
            className={'flex w-[775px] flex-col items-center justify-center'}>
            {/*Catchphrase*/}
            <p
              className={`${rubikBold.variable} text-center font-rubik text-[4rem] text-opposite`}>
              <span className={'text-secondary'}>Rent</span> Your Books
              <br></br> And Vent Your{' '}
              <span className={'text-secondary'}>Proofs</span>
            </p>
            {/*search textfield*/}
            <div
              className={
                'flex h-[60px] w-[80%] flex-row justify-between gap-2 rounded-2xl border-white/40 '
              }>
              <input
                placeholder={'Search book'}
                type={'text'}
                onChange={handleInputChange}
                className={'textarea text-primary w-[90%] border-white/40 rounded-2xl pl-2'}></input>
              {/*buttons here*/}

              <Link href={`/book/searchResults?id=${bookName}`}>
                <Image
                    src={'/icons/searchBtn.png'}
                    alt={'search icon'}
                    width={60}
                    height={30}
                    className={
                      'rounded-2xl mix-blend-difference hover:bg-secondary'
                    }
                />
              </Link>
            </div>
          </div>

          <div
            className={`h-72 max-h-72 flex-col justify-start gap-2 overflow-auto rounded-2xl p-5 ${bookSuggestions.length === 0 ? 'bg-transparent hidden' : 'bg-opposite flex'}`}>
            {bookSuggestions &&
              bookSuggestions.map((suggestion) => {
                return (
                  <Link
                    href={`/book/${suggestion.id}?id=${suggestion.id}`}
                    key={suggestion.id}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="flex cursor-pointer flex-row justify-start items-center gap-2 rounded-2xl p-4 hover:bg-secondary">
                      <Image
                        src={suggestion.coverImageURL ?? '/pot.png'}
                        alt="image"
                        width={30}
                        height={30}
                      />
                      <p className={'text-primary'}>{suggestion.title}</p>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>

        {/*picture*/}
        <div>
          <Image
            src={'/mainBookPicture.png'}
            alt={'introductory pic'}
            width={400}
            height={400}

          />
        </div>
      </div>
    </>
  )
}

export default BookSearch
