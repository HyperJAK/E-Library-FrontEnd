//font import
import {Rubik} from 'next/font/google'

//next link
import Link from 'next/link'

//components
import Socials from '../Socials'
import Image from 'next/image'

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

const InterestData = {
  topInfo: [
    {
      iconPath: '/icons/beenhere.png',
      description: 'Professional chef’s approval',
    },
    {
      iconPath: '/icons/done.png',
      description: 'Safety checks',
    },
    {
      iconPath: '/icons/fast_forward.png',
      description: 'Fast equipment deliveries',
    },
  ],
  bottomInfo: [
    {
      dataNb: 10000,
      description: 'Recipes published',
    },
    {
      dataNb: 7000,
      description: 'Good ratings',
    },
    {
      dataNb: 100000,
      description: 'User reviews',
    },
  ],
}

const InterestingInfo = () => {
  return (
    <>
      {/*Main components parent*/}
      <div
        className={
          'z-50 flex w-full flex-row flex-wrap items-center justify-center gap-60 bg-accent pb-[120px] pl-40 pr-40 pt-[120px]'
        }>
        {/*Image div*/}
        <div className={'relative'}>
          <Image
            src={'/bunnyHoney.png'}
            alt={'rabbit image'}
            width={500}
            height={500}
            className={'rounded-2xl'}
          />
        </div>
        {/*Main info div*/}
        <div className={'flex flex-col flex-wrap gap-5'}>
          {/*first 3 normal ones*/}
          <div className={'flex flex-row flex-wrap gap-5'}>
            {InterestData.topInfo.map((infoData) => {
              return (
                <div
                  key={infoData.description}
                  className={
                    'flex h-[180px] w-[180px] min-w-[180px] flex-col items-center rounded-2xl border-2 border-solid border-secondary p-2 text-center align-middle'
                  }>
                  {/*Icon / Main Text*/}
                  <div>
                    <Image
                      src={infoData.iconPath}
                      alt={'info image'}
                      width={100}
                      height={100}
                      className={'rounded-2xl'}
                    />
                  </div>
                  {/*Informative text*/}
                  <p className={'text-opposite'}>{infoData.description}</p>
                </div>
              )
            })}
          </div>
          {/*last 3 incrementing ones*/}
          <div className={'flex flex-row flex-wrap gap-5'}>
            {InterestData.bottomInfo.map((infoData) => {
              return (
                <div
                  key={infoData.description}
                  className={
                    'flex h-[180px] w-[180px] min-w-[180px] flex-col items-center justify-between rounded-2xl border-2 border-solid border-secondary p-6 text-center align-middle'
                  }>
                  {/*Icon / Main Text*/}
                  <h1 className={'text-2xl text-secondary'}>
                    {infoData.dataNb}
                  </h1>
                  {/*Informative text*/}
                  <p className={'text-opposite'}>{infoData.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default InterestingInfo
