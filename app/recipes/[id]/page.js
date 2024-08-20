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

export default function SpecificRecipe({params}) {
  /*if (!recipe) {
    // Handle the case where no recipe data was found (optional)
    return <p>Recipe not found!</p>
  }*/
  const [recipeDetails, setRecipeDetails] = useState('')
  const [publisher, setPublisher] = useState('')
  const [recipeIngredients, setRecipeIngredients] = useState([])
  const [recipeReviews, setRecipeReviews] = useState([])
  const [detailsHovered, setDetailsHovered] = useState(false)

  const UserInfoDiv = () => {
    return (
      <div className={'flex flex-row flex-nowrap'}>
        <Image
          src={/*publisher ? publisher.profilePic : */ ''}
          alt={'profile pic'}
          width={50}
          height={50}
        />
        {/*We use a fetch in this component to get the user info so like username*/}
        <div className={'flex flex-row flex-wrap justify-center gap-5'}>
          <div className={'rounded-full bg-secondary p-3'}>
            {publisher.username}
          </div>
          <div className={'rounded-full bg-secondary p-3'}>
            {publisher.email}
          </div>
          <div className={'rounded-full bg-secondary p-3'}>
            {recipeDetails.date}
          </div>
        </div>
      </div>
    )
  }

  const TitleAndPicDiv = () => {
    return (
      <div
        className={'m-8 h-[600px] w-[100%] self-center rounded-2xl text-white'}>
        {/*We use a fetch in this component to get the user info so like username*/}

        <div
          className={
            'relative flex h-[100%] flex-col flex-nowrap items-center justify-evenly gap-4 rounded-2xl bg-transparent align-middle'
          }>
          <Image
            src={'/recipeExample.png'}
            alt={'recipe image'}
            width={1000}
            height={600}
            className={'absolute z-10 w-[800px]'}
          />

          {/*title and rating*/}
          <div className={'z-30'}>
            <p
              className={`${rubikBold.variable} font-rubik text-[3rem] text-opposite`}>
              {recipeDetails.name}
            </p>
            <p>
              <div className={'flex flex-row justify-center self-center'}>
                <Rating rating={recipeDetails.rating} />
              </div>
            </p>
          </div>
          <div
            className={
              'z-30 flex w-[80%] flex-row flex-wrap justify-center gap-10'
            }>
            <div
              className={
                'flex w-[15%] flex-row items-center justify-center gap-2 rounded-2xl bg-secondary p-3 text-[0.8rem]'
              }>
              <AccessTimeFilledRoundedIcon />
              {recipeDetails.cooking_time}
            </div>
            <div
              className={
                'flex w-[15%] flex-row items-center justify-center gap-2 rounded-2xl bg-secondary p-3 text-[0.8rem]'
              }>
              <InsightsRoundedIcon />
              {recipeDetails.difficulty}
            </div>
            <div
              className={
                'flex w-[15%] flex-row items-center justify-center gap-2 rounded-2xl bg-secondary p-3 text-[0.8rem]'
              }>
              <PeopleAltRoundedIcon />
              {recipeDetails.servings}
            </div>
          </div>
        </div>
      </div>
    )
  }

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

  const IngredientsAndPrep = () => {
    return (
      <>
        {recipeDetails.length > 0 && recipeIngredients.length > 0 && (
          <div className={'flex flex-row flex-nowrap justify-center'}>
            {/* Ingredients */}
            <div
              className={
                'flex h-fit w-[50%] flex-col flex-nowrap items-center justify-center gap-2 p-10 align-middle'
              }>
              <h2 className={`${rubikBold.variable} font-rubik text-[2rem]`}>
                Ingredients
              </h2>
              {/* Map over recipeIngredients and display each ingredient */}
              {recipeIngredients.map((ingredient, index) => (
                <div
                  className={'relative'}
                  key={ingredient.ingredient_id}>
                  <div
                    key={index}
                    className={'relative hover:cursor-pointer'}
                    onMouseEnter={() => setDetailsHovered(true)}
                    onMouseLeave={() => setDetailsHovered(false)}>
                    <span className={'text-[3rem]'}>.</span>
                    {ingredient.quantity} {ingredient.unit_of_measure}{' '}
                    {ingredient.name}
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 m-[-100px] rounded-3xl bg-black/70 p-3 text-white ${detailsHovered ? 'block' : 'hidden'}`}>
                    {ingredient.detailed_instructions}
                  </div>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div
              className={
                'flex h-fit w-[50%] flex-col flex-nowrap items-center justify-center gap-2 p-10 align-middle'
              }>
              <h2 className={`${rubikBold.variable} font-rubik text-[2rem]`}>
                Instructions
              </h2>
              <p>{recipeDetails.directions}</p>
            </div>
          </div>
        )}
      </>
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
      const recipeDetails = await GetRecipeDetails({id: id})

      if (recipeDetails) {
        console.log('Got recipe ' + recipeDetails.recipe_id + ' details')
        setRecipeDetails(recipeDetails)

        const publisherInfo = await GetRecipePublisher({
          id: recipeDetails.User_user_id,
        })

        if (publisherInfo) {
          setPublisher(publisherInfo)

          const ingredients = await GetRecipeIngredients({
            id: recipeDetails.recipe_id,
          })

          if (recipeIngredients) {
            setRecipeIngredients(ingredients)
            const reviews = await GetRecipeReviews({
              id: recipeDetails.recipe_id,
            })

            if (reviews) {
              setRecipeReviews(reviews)
            } else {
              console.log('Failed to get recipe reviews')
            }
          } else {
            console.log('Failed to get recipe ingredients')
          }
        } else {
          console.log('Failed to get publisher details')
        }
      } else {
        console.log('Failed to get recipe details')
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {recipeDetails && publisher && recipeIngredients && recipeReviews && (
        <main className="flex min-h-screen flex-col items-center justify-between gap-40 p-24 text-black">
          {/*Main div*/}
          <div
            className={
              'flex w-[90%] flex-col flex-nowrap rounded-2xl bg-accent p-10'
            }>
            {/*User info div*/}
            <UserInfoDiv />
            {/*title and picture div*/}
            <TitleAndPicDiv />
            {/*buttons choice div*/}
            <ButtonsChoiceDiv />
            {/*ingredients and prep method div*/}
            <IngredientsAndPrep />
            {/*Nutrition facts div*/}
            <NutritionFacts />
          </div>
          {/*Reviews div*/}
          <RecipeReviews />
        </main>
      )}
    </>
  )
}
