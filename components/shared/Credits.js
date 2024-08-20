//font import
import {Rubik} from 'next/font/google'

//next link
import Link from 'next/link'

//components
import Socials from '../Socials'

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

const Credits = () => {
  return <></>
}

export default Credits
