'use client'
//font import
import {Rubik} from 'next/font/google'

//next link
import Link from 'next/link'

//components
import Socials from '../Socials'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useState} from 'react'

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

const AboutUsInfo = () => {
  const handleButtonClick = (event) => {
    alert('hi')
  }

  const [data, setData] = useState([])

  const handleClick = async () => {
    try {
      const response = await fetch('/api/hello') // Adjust path if needed
      const fetchedData = await response.json()
      setData(fetchedData)
      alert(fetchedData)
    } catch (error) {
      console.error(error)
      // Handle errors appropriately, e.g., display an error message
    }
  }

  return (
    <>
      {/*Main components parent*/}
      <div
        className={
          'z-50 flex w-full flex-row flex-nowrap items-center justify-center gap-20 bg-accent pb-[120px] pl-40 pr-40 pt-[120px]'
        }>
        {/*Main info div*/}
        <div className={'flex w-[50%] flex-col flex-wrap gap-5 text-[1.2rem]'}>
          <p className={'text-opposite'}>
            <span className={'text-secondary'}>1- </span>Our cooking website is
            a culinary haven, a digital space where food enthusiasts from around
            the globe come together to explore and celebrate the rich tapestry
            of international cuisines.
            <br />
            <br />
            <span className={'text-secondary'}>2- </span>We curate and share a
            diverse array of recipes, ranging from the comforting familiarity of
            home-cooked classics to the bold and exotic flavors that transport
            your taste buds to far-off lands. <br />
            <br />
            <span className={'text-secondary'}>3- </span>Our mission is to
            inspire and encourage everyone, regardless of their culinary
            expertise, to embark on flavorful journeys in their own kitchens.
            <br />
            <br />
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className={'text-secondary'}>4- </span>So, whether you're a
            seasoned chef or a kitchen novice, join us in
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            the joy of cooking and savoring the world's diverse culinary
            offerings!
          </p>
          <Link href={'/recipes'}>
            <Button
              style={
                'justify-center flex flex-row border-solid border-secondary border-2 bg-secondary p-10 hover:bg-accent hover:cursor-pointer flex-row flex text-page rounded-2xl hover:text-opposite'
              }
              itemComponents={<p>Read About Us</p>}
              handle={handleClick}
            />
          </Link>
        </div>
        {/*Image div*/}
        <div className={'relative'}>
          <Image
            src={'/iceCream.png'}
            alt={'rabbit image'}
            width={500}
            height={500}
            className={'rounded-2xl'}
          />
        </div>
      </div>
    </>
  )
}

export default AboutUsInfo
