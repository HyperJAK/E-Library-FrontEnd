'use client'
import {useEffect, useState} from 'react'
import {Rubik} from 'next/font/google'
import UserInformation from '@/components/profile/UserInformation'
import MainTopIntroduction from '@/components/profile/MainTopIntroduction'
import UserProfilePicDiv from '@/components/profile/UserProfilePicDiv'
import ResidentialInformation from '@/components/profile/ResidentialInformation'
import AboutMe from '@/components/profile/AboutMe'
import CreditCardInfo from '@/components/profile/CreditCardInfo'
import {handleGetUserById} from "@/config/API/user/userService";

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

export default function Profile({params}) {
  const [data, setData] = useState(null)
  const [allowEdit, setAllowEdit] = useState(false)
  const [originalPass, setOriginalPass] = useState(null)
  const [cPassword, setCPassword] = useState(null)
  const [subscriptionChanged, setSubscriptionChanged] = useState(false)

  const fetchUserData = async () => {
    try {
      const response = await handleGetUserById(params.id)

      if (response) {
        setData(response)
        setCPassword(response.password)
        setOriginalPass(response.password)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(data == null){
      fetchUserData()
    }

  }, [data])

  //this useEffect is for when the user changes his subscription or add one
  useEffect(() => {
    fetchUserData()

  }, [subscriptionChanged])


  //this use effect works to update profile after saving it
  useEffect(() => {
    if(!allowEdit){
      fetchUserData()
    }

  }, [allowEdit])

  return (
    <>
      <div>
        {data ? (
          <div
            className={`relative z-30 flex h-auto flex-col justify-center text-opposite ${rubikRegular.variable} font-rubik `}
            key={data.id}>
            {/*Div for picture and introductory text and button to edit*/}
            <MainTopIntroduction
              data={data}
              allowEdit={allowEdit}
              setAllowEdit={setAllowEdit}
              cPassword={cPassword}
              originalPass={originalPass}
            />
            {/*Div for info of user and his pfp*/}
            <div className={'flex flex-col flex-wrap gap-20 lg:flex-row'}>
              {/*Div for user info*/}
              <div
                className={
                  'ml-5 flex w-[50%] flex-col rounded-3xl lg:translate-y-[-5%]'
                }>
                {/*Title*/}
                <p
                  className={`${rubikBold.variable} w-full rounded-tl-3xl rounded-tr-3xl bg-primary p-5 font-rubik text-[2rem] text-opposite`}>
                  Account Settings
                </p>
                {/*User Information*/}
                <UserInformation
                  data={data}
                  setData={setData}
                  allowEdit={allowEdit}
                  setCPassword={setCPassword}
                  cPassword={cPassword}
                />

                {/*About me info component*/}
                <AboutMe
                  data={data}
                  setData={setData}
                  allowEdit={allowEdit}
                />

                {/*Credit card info component*/}
                <CreditCardInfo
                  data={data}
                  setData={setData}
                  allowEdit={allowEdit}
                />
              </div>
              {/*User pfp and other info*/}
              <UserProfilePicDiv data={data} setSubscriptionChanged={setSubscriptionChanged} subscriptionChanged={subscriptionChanged}/>
            </div>
          </div>
        ) : (
          'Display a loading div here'
        )}
      </div>
    </>
  )
}
