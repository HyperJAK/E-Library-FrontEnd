'use client'
//font import
import {Rubik} from 'next/font/google'

//components
import Image from 'next/image'
import {useState} from 'react'
import Button from '@/components/shared/Button'
import Link from 'next/link'

const rubikBold = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['700'],
})

const rubikSemiBold = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['600'],
})

const rubikRegular = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['400'],
})

const CategoriesData = {
  categories: [
    {
      name: 'Diets',
      types: [
        {
          name: 'Gluton free',
        },
        {
          name: 'Daity free',
        },
        {
          name: 'Vegeterian',
        },
        {
          name: 'Vegan',
        },
      ],
    },
    {
      name: 'Cuisine',
      types: [
        {
          name: 'Italian',
        },
        {
          name: 'Mexican',
        },
        {
          name: 'Asian',
        },
        {
          name: 'Lebanese',
        },
      ],
    },
    {
      name: 'Meal Type',
      types: [
        {
          name: 'Breakfast',
        },
        {
          name: 'Lunch',
        },
        {
          name: 'Dinner',
        },
        {
          name: 'Snacks',
        },
      ],
    },
  ],
}

const RecipeCategories = () => {
  const [navToRecipeWithId, setNavToRecipeWithId] = useState('')

  const handleButtonClick = (event) => {
    setNavToRecipeWithId(event.target.key)
  }

  return (
    <>
      <div
        className={
          'bg-recipeCategoriesImg relative z-50 flex w-full flex-col flex-wrap items-center justify-between gap-20 bg-cover bg-no-repeat pb-[50px] pl-40 pr-40 pt-[50px]'
        }>
        {/*Title*/}
        <div
          className={`w-[90%] items-center rounded-full bg-secondary p-2 text-center text-white ${rubikBold.variable} font-rubik text-[3rem]`}>
          <p>Recipe Categories</p>
        </div>
        {/*Categories container*/}
        <div
          className={`flex flex-row flex-nowrap gap-10 text-opposite ${rubikSemiBold.variable} w-[80%] items-center justify-center text-center align-middle font-rubik`}>
          {/*Diets*/}
          {CategoriesData.categories.map((category) => {
            return (
              <div
                key={category.name}
                className={'flex w-[30%] flex-col gap-5'}>
                {
                  <>
                    <h1 className={'text-[2rem]'}>{category.name}</h1>
                    {category.types.map((subCat) => {
                      return (
                        <Link
                          key={subCat.name}
                          href={'/recipes'}>
                          {/*replace this href with actual road for the specific category*/}
                          <Button
                            style={
                              'justify-center flex flex-row text-opposite hover:text-page border-solid border-secondary border-2 bg-accent/40 p-7 hover:bg-secondary  hover:cursor-pointer flex-row flex rounded-2xl'
                            }
                            itemComponents={<p>{subCat.name}</p>}
                            handle={handleButtonClick}
                          />
                        </Link>
                      )
                    })}
                  </>
                }
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default RecipeCategories
