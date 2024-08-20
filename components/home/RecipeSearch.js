'use client'
//font import
import {Rubik} from 'next/font/google'

//next link
import Link from 'next/link'

//components
import Socials from '../Socials'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import * as withClient from 'react'

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

const RecipeSearch = () => {
  const [recipeName, setRecipeName] = useState('')
  const [recipeSuggestions, setRecipeSuggestions] = useState([])

  const handleInputChange = async (event) => {
    setRecipeName(event.target.value)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/recipes/getSuggestions?id=${recipeName}`,
          {
            method: 'GET',
          }
        )

        const data = await response.json()

        if (data) {
          setRecipeSuggestions(data)
        } else {
          setRecipeSuggestions([])
        }

        if (recipeName == '') {
          setRecipeSuggestions([])
        }

        console.log(recipeSuggestions[0].name)
      } catch (error) {}
    }

    fetchData()
  }, [recipeName])

  return (
    <>
      {/*Main components parent*/}
      <div
        className={
          'z-50 mt-[200px] flex w-full flex-row flex-wrap items-center justify-center gap-60 pl-40 pr-40'
        }>
        {/*Search and suggestions under it*/}
        <div className={'relative flex flex-col gap-5'}>
          {/*Catchphrase and search textfield*/}
          <div
            className={'flex w-[775px] flex-col items-center justify-center'}>
            {/*Catchphrase*/}
            <p
              className={`${rubikBold.variable} text-center font-rubik text-[4rem] text-opposite`}>
              <span className={'text-secondary'}>Slogan</span> Here,
              <br></br> Stay with a{' '}
              <span className={'text-secondary'}>Beer</span>
            </p>
            {/*search textfield*/}
            <div
              className={
                'flex h-[60px] w-[80%] flex-row justify-between gap-2 rounded-2xl border-white/40 '
              }>
              <input
                placeholder={'Search recipe'}
                type={'text'}
                onChange={handleInputChange}
                className={'textarea w-[90%] border-white/40'}></input>
              {/*buttons here*/}
              <div className={'flex flex-row gap-2'}>
                <Image
                  src={'/icons/person.png'}
                  alt={'edit icon'}
                  width={60}
                  height={30}
                  className={'rounded-2xl mix-blend-lighten hover:bg-secondary'}
                />
                <Link href={`/recipes/searchResults?id=${recipeName}`}>
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
          </div>

          <div
            className={`flex h-72 max-h-72 flex-col justify-start gap-2 overflow-auto rounded-2xl p-5 ${recipeSuggestions.length === 0 ? 'bg-transparent' : 'bg-opposite'}`}>
            {recipeSuggestions &&
              recipeSuggestions.map((suggestion) => {
                return (
                  <Link
                    href={`/recipes/${suggestion.recipe_id}?id=${suggestion.recipe_id}`}
                    key={suggestion.recipe_id}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="flex cursor-pointer flex-row justify-start gap-2 rounded-2xl p-4 hover:bg-secondary">
                      <Image
                        src={suggestion.share_link}
                        alt="image"
                        width={30}
                        height={30}
                      />
                      <p>{suggestion.name}</p>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>

        {/*picture*/}
        <div>
          <Image
            src={'/pot.png'}
            alt={'introductory pic'}
            width={400}
            height={400}
          />
        </div>
      </div>
    </>
  )
}

export default RecipeSearch
