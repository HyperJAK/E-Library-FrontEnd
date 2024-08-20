'use client'
//font import
import {Rubik} from 'next/font/google'

//components
import {useState} from 'react'
import Button from '@/components/shared/Button'
import {HashPassword} from '@/config/Utilities'
import {UpdateProfile} from '@/config/services/user'

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

const MainTopIntroduction = ({
  data,
  setData,
  cPassword,
  allowEdit,
  setAllowEdit,
  originalPass,
}) => {
  const [navToRecipeWithId, setNavToRecipeWithId] = useState('')

  const handleButtonClick = (event) => {
    setNavToRecipeWithId(event.target.key)
  }

  const handleEditClick = async (event) => {
    console.log('Original pass(hashed): ' + originalPass)
    if (allowEdit) {
      if (cPassword === data.password) {
        try {
          console.log('Original pass(hashed): ' + originalPass)
          console.log('New one or old depends if edited: ' + data.password)
          const toHash = data.password
          const hashedPass = await HashPassword({toHash})

          console.log(
            'New either hashed once or twice if it was hashed(hashed): ' +
              hashedPass
          )

          if (originalPass !== toHash) {
            setData((prevData) => ({
              ...prevData,
              password: hashedPass,
            }))
          }

          await UpdateProfile({data})
        } catch (error) {}
      }
    }
    setAllowEdit(!allowEdit)
    console.log(allowEdit)
  }

  return (
    <>
      {/*Top Container with edit button and simple introduction text*/}
      <div
        className={
          'relative flex h-3/4 w-full flex-row bg-profileMainImg bg-cover'
        }>
        <div className={'h-full w-full bg-black/30'}>
          <div className={'flex flex-col gap-10 pb-20 pl-20 pt-10'}>
            {/*Page title*/}
            <p
              className={`${rubikBold.variable} font-rubik text-[2rem] text-white`}>
              User<span className={'text-secondary'}>Account</span>
              <span className={'text-secondary'}>.</span>
            </p>
            {/*Greeting user*/}

            <p
              className={`${rubikBold.variable} font-rubik text-[1.6rem] text-white`}>
              Hello, <span className={'text-secondary'}>{data.username}</span>
              <span className={'text-secondary'}>.</span>
            </p>

            {/*Informative of page*/}
            <p
              className={`${rubikRegular.variable} max-w-lg font-rubik text-[1.2rem] text-white`}>
              This is your profile page. You can see the progress you&apos;ve
              made with your work and manage your projects or assigned tasks
            </p>

            {/*Button to enable editting*/}
            <Button
              style={
                'justify-center w-[15%] flex flex-row border-solid border-secondary border-2 bg-secondary p-4 hover:bg-white hover:cursor-pointer flex-row flex text-white rounded-2xl hover:text-black'
              }
              itemComponents={
                <>{allowEdit ? <p>Save</p> : <p>Edit Profile</p>}</>
              }
              handle={handleEditClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainTopIntroduction
