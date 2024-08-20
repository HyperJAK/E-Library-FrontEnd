'use client'
//font import
import {Rubik} from 'next/font/google'

//components
import Image from 'next/image'
import {useState} from 'react'
import Button from '@/components/shared/Button'
import Link from 'next/link'
import EmailTextfield from '@/components/shared/Validation/EmailTextfield'
import PasswordTextfield from '@/components/shared/Validation/PasswordTextfield'

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

const UserProfilePicDiv = ({data}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleButtonClick = (event) => {
    setNavToRecipeWithId(event.target.key)
  }

  return (
    <>
      {/*User information component in profile page*/}
      <div
        className={
          'flex h-fit w-[40%] flex-col items-center gap-6 rounded-3xl bg-accent p-10 lg:translate-y-[-50%]'
        }>
        <Image
          src={'/chef.png'}
          alt={'Profile pic'}
          width={300}
          height={300}
        />
        {/*3 info boxes*/}
        <div className={'flex flex-row flex-wrap gap-5'}>
          {/*Friends info box (for now hardcoded)*/}
          <div
            className={
              'flex h-[120px] w-[120px] min-w-[100px] flex-col items-center justify-between rounded-2xl border-2 border-solid border-secondary p-6 text-center align-middle'
            }>
            {/*Icon / Main Text*/}
            <h1 className={'text-2xl text-secondary'}>{'27'}</h1>
            {/*Informative text*/}
            <p className={'text-opposite'}>{'Friends'}</p>
          </div>

          {/*Saved recipes info box*/}
          <div
            className={
              'flex h-[120px] w-[120px] min-w-[100px] flex-col items-center justify-between rounded-2xl border-2 border-solid border-secondary p-6 text-center align-middle'
            }>
            {/*Icon / Main Text*/}
            <h1 className={'text-2xl text-secondary'}>{'10'}</h1>
            {/*Informative text*/}
            <p className={'text-opposite'}>{'Saved Recipes'}</p>
          </div>

          {/*Reviews made info box*/}
          <div
            className={
              'flex h-[120px] w-[120px] min-w-[100px] flex-col items-center justify-between rounded-2xl border-2 border-solid border-secondary p-6 text-center align-middle'
            }>
            {/*Icon / Main Text*/}
            <h1 className={'text-2xl text-secondary'}>{'10'}</h1>
            {/*Informative text*/}
            <p className={'text-opposite'}>{'Reviews'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfilePicDiv
