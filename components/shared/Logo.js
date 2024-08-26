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

const Logo = () => {
  return (
    <header className={'flex w-full'}>
      <Link
        href={'/'}
        className={`${rubikBold.variable} z-30 w-[50%] whitespace-nowrap text-center font-rubik xl:text-5xl`}>
        W<span className={'whitespace-nowrap text-accent xl:text-5xl'}>4</span>
        Kitchen{' '}
        <span className={'whitespace-nowrap text-accent xl:text-5xl'}>.</span>
      </Link>
    </header>
  )
}

export default Logo
