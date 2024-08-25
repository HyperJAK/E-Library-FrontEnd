import {BsArrowRight} from 'react-icons/bs'
import {Roboto_Slab} from 'next/font/google'
import {useEffect, useState} from 'react'

const roboto_slab = Roboto_Slab({
    subsets: ['latin'],
    variable: '--font-roboto-slab',
    weight: ['400'],
})

export default function Loading({message}) {
    return (
        <div
            className={`absolute left-1/2 top-1/2 z-30 mx-auto flex w-auto items-center justify-center rounded-2xl bg-green-500 p-5 text-center transform -translate-x-1/2 -translate-y-1/2`}>
            <div className={`text-white ${roboto_slab.variable} font-robotoSlab`}>
                {message ? message : 'Success'}
            </div>
        </div>
    )
}
