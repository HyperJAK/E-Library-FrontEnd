'use client'
//font import
import {Rubik} from 'next/font/google'

//components
import TextTextfield from '@/components/shared/TextTextfield'
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

const AboutMe = ({data, setData, allowEdit}) => {
  const handleAboutMe = (e) => {
    if (allowEdit === true && e.target.value.length < 501) {
      setData((prevData) => ({
        ...prevData,
        aboutMe: e.target.value,
      }))
    }
  }

  return (
    <>
      {/*User information component in profile page*/}
      <div className={'flex flex-col gap-6 bg-accent p-5 text-primary'}>
        {/*Title of component*/}
        <p
          className={`${rubikRegular.variable} w-full rounded-full bg-secondary pb-3 pl-5 pt-3 font-rubik text-[1.2rem] text-opposite`}>
          About Me
        </p>
        {/*Fields*/}
        <div className={'flex w-full flex-row gap-10'}>
          {/*About Me*/}
          <div className={'flex h-40 w-full flex-col'}>
            <LabelField props={{label: 'About Me'}} />
            <TextTextfield
              props={{
                text: data.aboutMe,
                title: 'Description about me',
                allowEdit: allowEdit,
                handleChange: handleAboutMe,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutMe
