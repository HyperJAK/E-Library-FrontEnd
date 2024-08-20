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
import DatePicker from 'react-datepicker'
import {TuiDatePicker} from 'nextjs-tui-date-picker'
import {red} from 'next/dist/lib/picocolors'

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

const CreditCardInfo = ({data, setData, allowEdit}) => {
  const handleCardNumber = (e) => {
    if (allowEdit === true && e.target.value.length < 201) {
      setData((prevData) => ({
        ...prevData,
        card_number: e.target.value,
      }))
    }
  }

  const handleExpiration = (e) => {
    if (allowEdit === true) {
      console.log('Date value: ' + e)
      setData((prevData) => ({
        ...prevData,
        card_expiration_date: e,
      }))
    }
  }

  const handleCvv = (e) => {
    if (allowEdit === true && e.target.value.length < 11) {
      setData((prevData) => ({
        ...prevData,
        card_cvv: e.target.value,
      }))
    }
  }

  const handlePostal = (e) => {
    if (allowEdit === true && e.target.value.length < 46) {
      setData((prevData) => ({
        ...prevData,
        card_postal_code: e.target.value,
      }))
    }
  }

  return (
    <>
      {/*User information component in profile page*/}
      <div
        className={
          'flex flex-col gap-6 rounded-bl-3xl rounded-br-3xl bg-accent p-5'
        }>
        {/*Title of component*/}
        <p
          className={`${rubikRegular.variable} w-full rounded-full bg-secondary pb-3 pl-5 pt-3 font-rubik text-[1.2rem]`}>
          Credit Card Info
        </p>
        {/*Fields*/}
        <div className={'flex w-full flex-row gap-10'}>
          {/*Card Number*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Card Number'}} />
            <EmailTextfield
              props={{
                email: data.card_number,
                title: 'Card Number',
                allowEdit: allowEdit,
                handleChange: handleCardNumber,
              }}
            />
          </div>
        </div>
        <div className={'flex flex-row gap-10'}>
          {/*Expiration Date*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Expiration Date'}} />
            <TuiDatePicker
              handleChange={handleExpiration}
              date={
                new Date(
                  data.card_expiration_date
                    ? data.card_expiration_date
                    : '2025-01-01'
                )
              }
              inputWidth={140}
              containerWidth={200}
              fontSize={16}
              showAlways={true}
            />
          </div>

          {/*CVV*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'CVV'}} />
            <EmailTextfield
              props={{
                email: data.card_cvv,
                title: 'CVV',
                allowEdit: allowEdit,
                handleChange: handleCvv,
              }}
            />
          </div>

          {/*Postal Code*/}
          <div className={'flex w-full flex-col gap-1'}>
            <LabelField props={{label: 'Postal Code'}} />
            <EmailTextfield
              props={{
                email: data.card_postal_code,
                title: 'Postal Code',
                allowEdit: allowEdit,
                handleChange: handlePostal,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreditCardInfo
