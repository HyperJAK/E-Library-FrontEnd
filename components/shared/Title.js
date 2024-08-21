import {Rubik} from 'next/font/google'

const rubikBold = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['700'],
})

const Title = () => {
  return (
    <p className={`${rubikBold.variable} font-rubik text-[30px] text-opposite`}>
      <span className={'text-secondary'}>B</span>ymphony
        <span className={'text-secondary'}>.</span>
    </p>
  )
}

export default Title
