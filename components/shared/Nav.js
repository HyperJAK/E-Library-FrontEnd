'use client'
// icons
import {HiEnvelope, HiHome, HiUser, HiViewColumns,} from 'react-icons/hi2'
//Next.js linker
import Link from 'next/link'

//Next.js Router
import {usePathname} from 'next/navigation'
import Image from 'next/image'
import {Rubik} from 'next/font/google'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'
import SignUp from '@/components/shared/Validation/SignUp'
import Title from '@/components/shared/Title'
import SignIn from '@/components/shared/Validation/SignIn'
import {GetUser, RemoveUser} from '@/config/Utilities'
import {setCurrentCartId,} from '@/config/data'
import {currentUser, getCurrentUser, setCurrentUser} from "@/config/API/server";

//Auth

// nav data
export const navData = [
  {name: 'home', path: '/', icon: <HiHome />},
  {name: 'about', path: '/about', icon: <HiUser />},
  {name: 'work', path: '/work', icon: <HiViewColumns />},
  {
    name: 'contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
]

const rubikRegular = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['400'],
})

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

const Nav = () => {
  const pathName = usePathname()

  const [languageClicked, setLanguageClicked] = useState(false)
  const [profilePicClicked, setProfilePicClicked] = useState(false)
  const [id, setId] = useState(-1)
  const [showAuth, setShowAuth] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState('')

  const [showSignIn, setShowSignIn] = useState(false)

  const handleSignInButtonClick = () => {
    setShowAuth(!showAuth)
    console.log('clicked')
    //handle other things when sign in clicked
  }

  const handleLanguageButtonClick = () => {
    setLanguageClicked(!languageClicked)
    console.log('clicked')
  }

  const handleProfileButtonClick = () => {
    setProfilePicClicked(!profilePicClicked)
  }

  const handleAccountClick = () => {
    /*handle account clicked*/
  }

  const handleDarkModeClick = () => {
    /*handle dark mode clicked*/
  }

  const handleContactUsClick = () => {
    /*handle contact us clicked*/
  }

  const handleNopeClick = () => {
    /*handle contact us clicked*/
  }

  const handleAboutUsClick = () => {
    /*handle about us clicked*/
  }

  useEffect(() => {
    async function fetchData() {
      try {

        const u = await GetUser()

        if(u != null){
          setCurrentUser(u)
          setAuthed(true)
          setShowAuth(false)
          setUser(getCurrentUser())
          setId(getCurrentUser().id)
        }


      } catch (error) {
        console.log('Crashed outside')
      }
    }
    async function refreshUser(){
      setUser(getCurrentUser())
    }
    /*fetchData2()*/
    if (getCurrentUser() == null) {
      fetchData()
    } else {
      refreshUser()
    }
  }, [authed, showAuth])

  const handleLogout = (e) => {
    setAuthed(false)
    RemoveUser()
    setCurrentCartId(null)
  }

  return (
    <>
      <div className={'flex flex-col'}>
        {/*Normal nav*/}
        <div
          className={
            ' my-auto flex h-20 w-full z-50 flex-row items-center justify-between bg-primary pl-4 pr-4'
          }>
          {/*Logo*/}
          <div>
            {/*<Image
            src={'/W4Kitchen.png'}
            alt={'website logo'}
            width={'213'}
            height={'43'}
          />*/}
            <Title />
          </div>

          {/*IMP !!!!!!!!! change font to rubik same as design*/}
          {/*navigation options*/}
          <div
            className={`flex flex-row justify-center gap-x-10 ${rubikBold.variable} h-full font-rubik text-[18px] text-opposite`}>
            <Link
              href={'/'}
              className={`${pathName === '/' ? 'border-b-4' : ''} rounded-br-2xl border-b-accent p-6 hover:cursor-pointer hover:border-b-4 hover:border-solid`}>
              Home
            </Link>

            <Link
              href={'/book'}
              className={`${pathName === '/book' ? 'border-b-4' : ''} rounded-br-2xl border-b-accent p-6  hover:cursor-pointer hover:border-b-4 hover:border-solid`}>
              Books
            </Link>

            <Link
              href={'/aboutUs'}
              className={`${pathName === '/aboutus' ? 'border-b-4' : ''} rounded-br-2xl border-b-accent p-6 hover:cursor-pointer hover:border-b-4 hover:border-solid`}>
              About Us
            </Link>

            <Link
              href={'/contactUs'}
              className={`${pathName === '/contactus' ? 'border-b-4' : ''} rounded-br-2xl border-b-accent p-6  hover:cursor-pointer hover:border-b-4 hover:border-solid`}>
              Contact Us
            </Link>

          </div>

          {/*buttons right*/}
          <div
            className={
              'my-auto flex flex-row items-center justify-center gap-x-5'
            }>
            {/*signin / logout button here*/}
            {!authed && (
              <Button
                itemComponents={<p>Sign In</p>}
                handle={handleSignInButtonClick}
              />
            )}

            {/*language chooser button here*/}
            <Button
              itemComponents={
                <>
                  <p>Eng</p>
                  <Image
                    src={'/icons/keyboard_arrow_down.png'}
                    alt={'arrow down'}
                    width={20}
                    height={20}
                  />
                </>
              }
              handle={handleLanguageButtonClick}
            />

            {/*User Cart*/}
            <Link href={'/book/borrowedBooks'}>
              <Button
                itemComponents={
                  <div className={'flex flex-row gap-2'}>
                    <p>Your Books</p>
                    <Image
                      src={'/icons/shopping_cart.png'}
                      alt={'arrow down'}
                      width={20}
                      height={20}
                    />
                  </div>
                }
                handle={''}
              />
            </Link>

            {/*Profile button here*/}
            <div
              className={'rounded-full bg-accent p-2'}
              onClick={handleProfileButtonClick}>
              <Image
                src={'/icons/person.png'}
                alt={'pfp pic'}
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>

        {/*drop down of profile click*/}
        <div
          className={`${profilePicClicked ? 'block' : 'hidden'} absolute right-0 z-40 top-16 mt-1 flex flex-row justify-end bg-transparent ${rubikSemiBold.variable} font-rubik`}>
          <div className={'flex w-full flex-col rounded-bl-2xl text-opposite'}>
            <Link
              href={`/profile?id=${id}`}
              as={`/profile/${id}`}
              onClick={handleProfileButtonClick}>
              <Button
                style={
                  'bg-accent/50 p-10 pr-40 hover:bg-secondary text-primary hover:cursor-pointer flex-row flex gap-2'
                }
                itemComponents={
                  <>
                    <p>Account</p>{' '}
                    <Image
                      src={'/icons/person.png'}
                      alt={'person image'}
                      width={20}
                      height={20}
                    />
                  </>
                }
              />
            </Link>

            <Button
              style={
                'bg-accent/50 p-10 pr-40 hover:bg-secondary text-primary hover:cursor-pointer flex-row flex gap-2'
              }
              itemComponents={
                <>
                  <p>Dark mode</p>{' '}
                  <Image
                    src={'/icons/person.png'}
                    alt={'person image'}
                    width={20}
                    height={20}
                  />
                </>
              }
              handle={handleDarkModeClick}
            />

            <Link
              href={'/contactUs'}
              onClick={handleProfileButtonClick}>
              <Button
                style={
                  'bg-accent/50 p-10 pr-40 hover:bg-secondary text-primary hover:cursor-pointer flex-row flex gap-2'
                }
                itemComponents={
                  <>
                    <p>Contact us</p>{' '}
                    <Image
                      src={'/icons/person.png'}
                      alt={'person image'}
                      width={20}
                      height={20}
                    />
                  </>
                }
                handle={handleContactUsClick}
              />
            </Link>

            <Link
              href={'/aboutUs'}
              onClick={handleProfileButtonClick}>
              <Button
                style={
                  'bg-accent/50 p-10 pr-40 hover:bg-secondary text-primary hover:cursor-pointer flex-row flex gap-2 rounded-bl-2xl'
                }
                itemComponents={
                  <>
                    <p>About us</p>{' '}
                    <Image
                      src={'/icons/person.png'}
                      alt={'person image'}
                      width={20}
                      height={20}
                    />
                  </>
                }
                handle={handleAboutUsClick}
              />
            </Link>

            {!showAuth && authed &&
                <Link href={'/'}>
                  <Button
                      style={
                        'bg-accent/50 p-10 pr-40 hover:bg-secondary text-primary hover:cursor-pointer flex-row flex gap-2 rounded-bl-2xl'
                      }
                      itemComponents={
                        <>
                          <p>Log out</p>{' '}
                          <Image
                              src={'/icons/person.png'}
                              alt={'person image'}
                              width={20}
                              height={20}
                          />
                        </>
                      }
                      handle={handleLogout}
                  />
                </Link>
            }

          </div>
        </div>
      </div>
      {showAuth && !showSignIn ? <SignUp setShowSignIn={setShowSignIn} setShowAuth={setShowAuth} authed={authed} setAuthed={setAuthed}/> : ''}
      {showAuth && showSignIn ? <SignIn setShowSignIn={setShowSignIn} setShowAuth={setShowAuth} authed={authed} setAuthed={setAuthed}/> : ''}
    </>
  )
}

export default Nav
