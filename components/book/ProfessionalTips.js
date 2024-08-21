//font import
import {Rubik} from 'next/font/google'

//components
import Image from 'next/image'
import Button from '@/components/shared/Button'
import Link from 'next/link'

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

const ProData = {
  tips: [
    {
      title: 'Sharpen Your Knives ',
      description:
        'A dull knife is more dangerous (it requires more force to cut, leading to slips) and less effective (it tears food instead of giving clean cuts). Aim to sharpen your knives regularly (weekly for frequent cooks) with a honing steel or a sharpening tool. Sharp knives not only make prep work faster and easier, but they also improve the final presentation of your dish.',
    },
    {
      title: 'Taste as You Go',
      description:
        '\n' +
        "Don't wait until the end to discover your dish is lacking something. Season your food throughout the cooking process, starting with a small amount of salt and pepper early on.  Add more in small increments as needed.  This allows the flavors to develop and prevents over-seasoning.  You can also taste for other elements like acidity or sweetness and adjust accordingly.",
    },
    {
      title: "Don't Crowd the Pan",
      description:
        'When searing meat, fish, or vegetables, resist the urge to overcrowd the pan. This will steam the food instead of searing it, resulting in a soggy and flavorless dish.  Wait until the pan is hot before adding your ingredients, and leave enough space between them for them to brown properly.',
    },
  ],
}

const ProfessionalTips = () => {
  return (
    <>
      <div
        className={
          'relative z-50 flex w-full flex-row flex-wrap items-center justify-center gap-40 pb-[50px] pt-[50px]'
        }>
        {/*Title and chef image and button div*/}
        <div className={'flex flex-col'}>
          {/*Catchphrase*/}
          <p
            className={`${rubikBold.variable} text-center font-rubik text-[3rem] text-opposite`}>
            <span className={'text-secondary'}>Professional</span>
            <br></br> Tips
          </p>
          <div>
            <Image
              src={'/chef.png'}
              alt={'chef logo'}
              width={400}
              height={400}
            />
          </div>
          <Button
            style={
              'justify-center flex flex-row text-white hover:text-black border-solid border-secondary border-2 bg-secondary p-7 hover:bg-white  hover:cursor-pointer flex-row flex rounded-2xl'
            }
            itemComponents={<p>Check out more</p>}
          />
        </div>
        {/*Tips div*/}
        <div
          className={
            'flex w-[60%] flex-col items-end justify-end gap-5 self-end'
          }>
          {ProData.tips.map((tip) => {
            return (
              <div
                key={tip.title}
                className={
                  'rounded-3xl border-2 border-solid border-secondary p-6'
                }>
                <h1 className={'text-[2rem] text-secondary'}>{tip.title}</h1>
                <p className={'text-[1.1rem] text-opposite'}>
                  {tip.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ProfessionalTips
