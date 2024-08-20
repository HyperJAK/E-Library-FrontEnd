'use client'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'
import {
  GetRecipeDetails,
  GetRecipeIngredients,
  GetRecipePublisher,
  GetRecipeReviews,
} from '@/config/services/recipe'
import Rating from '@/components/recipe/Rating'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import {Rubik} from 'next/font/google'
import Link from 'next/link'

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
  const [recipeSearchResults, setRecipeSearchResults] = useState([])
  const [recipeName, setRecipeName] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const name = urlParams.get('id')
    setRecipeName(name)
    console.log('Recipe id is: ' + name)

    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/recipes/getSearchResults?id=${name}`,
          {
            method: 'GET',
          }
        )

        const data = await response.json()

        if (data) {
          setRecipeSearchResults(data)
        } else {
          setRecipeSearchResults([])
        }

        if (name == '') {
          setRecipeSearchResults([])
        }

        console.log(setRecipeSearchResults[0].name)
      } catch (error) {}
    }
    fetchData()
  }, [])

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start gap-40 align-middle text-black">
        {recipeSearchResults && (
          <>
            <div
              className={` mt-6 w-[90%] items-center rounded-full bg-secondary p-2 text-center text-white ${rubikBold.variable} font-rubik text-[2rem]`}>
              <p>
                {recipeSearchResults.length} results for: {recipeName}
              </p>
            </div>

            {/*Div for all recipes*/}
            <div className={'flex flex-row flex-wrap justify-between gap-20'}>
              {recipeSearchResults.map((recipe) => {
                {
                  /*Div for each recipe*/
                }
                return (
                  <div
                    className={'group flex flex-row flex-nowrap justify-center'}
                    key={recipe.recipe_id}>
                    {/*div for main info of recipe*/}
                    <div
                      className={
                        'flex flex-col items-center justify-center gap-4 rounded-bl-2xl rounded-tl-2xl border-b-2 border-l-2 border-t-2 border-transparent p-2 group-hover:border-secondary'
                      }>
                      <p
                        className={`${rubikBold.variable} font-rubik text-[1rem] text-opposite`}>
                        {recipe.name}
                      </p>
                      <p>
                        <div
                          className={
                            'flex flex-row justify-center self-center'
                          }>
                          <Rating rating={recipe.rating} />
                        </div>
                      </p>

                      <Image
                        src={recipe.share_link}
                        alt={'recipe image'}
                        width={150}
                        height={150}
                        className={
                          'rotate-12 rounded-bl-[100px] rounded-tr-[100px] border-2 border-secondary'
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
                          {recipe.cooking_time}
                        </div>
                        <div
                          className={
                            'flex  flex-row items-center justify-center gap-1 rounded-2xl bg-secondary p-1 text-[0.6rem]'
                          }>
                          <InsightsRoundedIcon fontSize="small" />
                          {recipe.difficulty}
                        </div>
                        <div
                          className={
                            'flex  flex-row items-center justify-center gap-1 rounded-2xl bg-secondary p-1 text-[0.6rem]'
                          }>
                          <PeopleAltRoundedIcon fontSize="small" />
                          {recipe.servings}
                        </div>
                      </div>
                    </div>
                    {/*div for description and button to navigate to recipe page*/}
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
                        {recipe.directions}
                      </p>

                      <Link
                        href={`/recipes/${recipe.recipe_id}?id=${recipe.recipe_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Button
                          style={
                            'justify-center text-[0.8rem] flex flex-row border-solid border-secondary border-2 bg-secondary p-2 hover:bg-accent hover:cursor-pointer text-page rounded-2xl hover:text-opposite'
                          }
                          itemComponents={<p>View Recipe</p>}
                          handle={''}
                        />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>
    </>
  )
}
