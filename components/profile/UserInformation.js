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
import LabelField from '@/components/shared/LabelField'

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

const UserInformation = ({
  data,
  setData,
  allowEdit,
  setCPassword,
  cPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleUsername = (e) => {
    if (allowEdit === true && e.target.value.length < 256) {
      setData((prevData) => ({
        ...prevData,
        username: e.target.value,
      }))
    }
  }

  const handleEmail = (e) => {
    if (allowEdit === true && e.target.value.length < 256) {
      setData((prevData) => ({
        ...prevData,
        email: e.target.value,
      }))
    }
  }

  const handlePassword = (e) => {
    if (allowEdit === true && e.target.value.length < 51) {
      setData((prevData) => ({
        ...prevData,
        password: e.target.value,
      }))
    }
  }

  return (
    <>
      {/*User information component in profile page*/}
      <div className={'flex flex-col gap-6 bg-accent p-5'}>
        {/*Title of component*/}
        <p
          className={`${rubikRegular.variable} w-full rounded-full bg-secondary pb-3 pl-5 pt-3 font-rubik text-[1.2rem]`}>
          User Information
        </p>
        {/*Fields*/}
        <div className={'flex w-full flex-row gap-10'}>
          {/*Username*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Username'}} />
            <EmailTextfield
              props={{
                email: data.username,
                title: 'Username',
                allowEdit: allowEdit,
                handleChange: handleUsername,
              }}
            />
          </div>

          {/*Email*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Email'}} />
            <EmailTextfield
              props={{
                email: data.email,
                allowEdit: allowEdit,
                handleChange: handleEmail,
              }}
            />
          </div>
        </div>
        <div className={'flex flex-row gap-10'}>
          {/*Password*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Password'}} />
            <PasswordTextfield
              props={{
                password: data.password,
                showPassword: showPassword,
                allowEdit: allowEdit,
                handleChange: handlePassword,
              }}
            />
          </div>

          {/*Confirm Password*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Confirm password'}} />
            <PasswordTextfield
              props={{
                password: cPassword,
                setPassword: setCPassword,
                title: 'Confirm password',
                showPassword: showPassword,
                allowEdit: allowEdit,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInformation
