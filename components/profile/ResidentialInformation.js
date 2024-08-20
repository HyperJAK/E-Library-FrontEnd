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

const ResidentialInformation = ({data, setData, allowEdit}) => {
  const handleAddress = (e) => {
    if (allowEdit === true && e.target.value.length < 501) {
      setData((prevData) => ({
        ...prevData,
        address: e.target.value,
      }))
      console.log('This is data address: ' + data.address)
    }
  }

  const handleCity = (e) => {
    if (allowEdit === true && e.target.value.length < 46) {
      setData((prevData) => ({
        ...prevData,
        city: e.target.value,
      }))
    }
  }

  const handleCountry = (e) => {
    if (allowEdit === true && e.target.value.length < 46) {
      setData((prevData) => ({
        ...prevData,
        country: e.target.value,
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
          Residential Information
        </p>
        {/*Fields*/}
        <div className={'flex w-full flex-row gap-10'}>
          {/*Address*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Address'}} />
            <EmailTextfield
              props={{
                email: data.address,
                title: 'Address',
                allowEdit: allowEdit,
                handleChange: handleAddress,
              }}
            />
          </div>
        </div>
        <div className={'flex flex-row gap-10'}>
          {/*City*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'City'}} />
            <EmailTextfield
              props={{
                email: data.city,
                title: 'City',
                allowEdit: allowEdit,
                handleChange: handleCity,
              }}
            />
          </div>

          {/*Country*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Country'}} />
            <EmailTextfield
              props={{
                email: data.country,
                title: 'Country',
                allowEdit: allowEdit,
                handleChange: handleCountry,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ResidentialInformation
