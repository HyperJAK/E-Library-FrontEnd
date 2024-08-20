import {BsArrowRight} from 'react-icons/bs'
import {Roboto_Slab} from 'next/font/google'
import {useEffect, useState} from 'react'

const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: ['400'],
})

const ErrorNotification = ({message}) => {
  return (
    <div
      className={`duration-2000 absolute left-[25%] top-40 z-30 mx-auto flex w-auto items-center justify-center rounded-2xl bg-red-600 p-5 text-center transition-all sm:left-[44%] sm:top-20`}>
      <div className={`text-white ${roboto_slab.variable} font-robotoSlab`}>
        {message ? message : 'Error'}
      </div>
    </div>
  )
}

export default ErrorNotification
