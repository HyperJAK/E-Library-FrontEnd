'use client'
// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from 'react-icons/hi2'

//Auth
import {useUser} from '@auth0/nextjs-auth0/client'

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
import {HashPassword} from '@/config/Utilities'
import {
  currentCartId,
  currentUserId,
  getCurrentCartId,
  getCurrentUserId,
  setCurrentCartId,
  setCurrentUserId,
} from '@/config/data'

import {
  CheckUserCartStatus,
  GetAllActiveCartItems,
} from '@/config/API/cart/cartRequest'

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

  const handleCartClicked = async () => {
    try {
      const response1 = await CheckUserCartStatus({userId: getCurrentUserId()})

      if (response1) {
        setCurrentCartId(response1.cart_id)

        console.log('Current user id: ' + getCurrentUserId())
        console.log('Current Cart id: ' + getCurrentCartId())
      }
    } catch (e) {}
  }

  useEffect(() => {
    /*async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/me`)

        const data = await response.json()
        console.log('The auth email is: ' + data.email)

        if (data) {
          setAuthed(true)
          try {
            const sub = data.sub
            const email = data.email

            const hashedSub = await HashPassword({sub})

            //here first we call a api call to get the id from database based on the email
            const response = await SignInFunc({email, password: hashedSub})

            //Then we add the info to local storage
            if (response) {
              const userForStorage = {
                userId: response.user_id,
              }

              localStorage.setItem('user', JSON.stringify(userForStorage))
            }
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        setAuthed(false)
      }
    }*/

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/me`)

        const data = await response.json()
        console.log('The auth email is: ' + data.email)
        console.log('The password is: ' + data.sub)

        if (data) {
          try {
            const sub = data.sub
            const email = data.email
            const name = data.name

            const hashedSub = await HashPassword({sub})
            console.log('Entering Signin func')

            //here first we call a api call to get the id from database based on the email
            const response = await SignInFunc({email, password: hashedSub})

            if (!response.user_id) {
              const response2 = await SignUpFunc({
                email,
                password: hashedSub,
                username: name,
              })

              if (response2.insertId) {
                //here we put the nav value of id so we can use it for profile page:
                setAuthed(true)

                if (getCurrentUserId()) {
                  setId(getCurrentUserId())
                  console.log(getCurrentUserId())
                }
              } else {
                console.log('Failed to Signup, err Nav line 174')
              }
            } else {
              setAuthed(true)
              //here we put the nav value of id so we can use it for profile page:

              if (getCurrentUserId()) {
                setId(getCurrentUserId())
                console.log(getCurrentUserId())
              }
            }
          } catch (error) {
            console.log(error)
            console.log('Crashed inside')
          }
        }
      } catch (error) {
        console.log('Crashed outside')
      }
    }
    /*fetchData2()*/
    if (getCurrentUserId() === null) {
      fetchData()
    } else {
      setAuthed(true)
      setId(getCurrentUserId)
    }
  }, [])

  const handleLogout = (e) => {
    setAuthed(false)
    setCurrentUserId(null)
    setCurrentCartId(null)
  }

  return (
    <>
      <div className={'z-50 flex flex-col'}>
        {/*Normal nav*/}
        <div
          className={
            ' my-auto flex h-20 w-full flex-row items-center justify-between bg-primary pl-4 pr-4'
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
              className={`${pathName === '/' ? 'border-b-4' : ''}  border-b-accent p-6 hover:cursor-pointer hover:border-b-4 hover:border-solid`}>
              Home
            </Link>

            <Link
              href={'/book'}
              className={`${pathName === '/book' ? 'border-b-4' : ''}  border-b-accent p-6  hover:cursor-pointer hover:border-b-4 hover:border-solid`}>
              Books
            </Link>

            <Link
              href={'/aboutUs'}
              className={`${pathName === '/aboutus' ? 'border-b-4' : ''}  border-b-accent p-6 hover:cursor-pointer hover:border-b-4 hover:border-solid`}>
              Kitchen Tips
            </Link>

            <Link
              href={'/contactUs'}
              className={`${pathName === '/contactus' ? 'border-b-4' : ''}  border-b-accent p-6  hover:cursor-pointer hover:border-b-4 hover:border-solid`}>
              Shop
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
            <Link href={'/cart'}>
              <Button
                itemComponents={
                  <div className={'flex flex-row gap-2'}>
                    <p>Your Cart</p>
                    <Image
                      src={'/icons/shopping_cart.png'}
                      alt={'arrow down'}
                      width={20}
                      height={20}
                    />
                  </div>
                }
                handle={handleCartClicked}
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
          className={`${profilePicClicked ? 'block' : 'hidden'} absolute right-0 top-16 mt-1 flex flex-row justify-end bg-transparent ${rubikSemiBold.variable} font-rubik`}>
          <div className={'flex w-full flex-col rounded-bl-2xl text-opposite'}>
            <Link
              href={`/profile?id=${id}`}
              as={`/profile/${id}`}
              onClick={handleProfileButtonClick}>
              <Button
                style={
                  'bg-accent/50 p-10 pr-40 hover:bg-secondary hover:cursor-pointer flex-row flex gap-2'
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
                'bg-accent/50 p-10 pr-40 hover:bg-secondary hover:cursor-pointer flex-row flex gap-2'
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
                  'bg-accent/50 p-10 pr-40 hover:bg-secondary hover:cursor-pointer flex-row flex gap-2'
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
                  'bg-accent/50 p-10 pr-40 hover:bg-secondary hover:cursor-pointer flex-row flex gap-2 rounded-bl-2xl'
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

            <Link href={'/api/auth/logout'}>
              <Button
                style={
                  'bg-accent/50 p-10 pr-40 hover:bg-secondary hover:cursor-pointer flex-row flex gap-2 rounded-bl-2xl'
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
          </div>
        </div>
      </div>
      {showAuth && !showSignIn ? <SignUp setShowSignIn={setShowSignIn} /> : ''}
      {showAuth && showSignIn ? <SignIn setShowSignIn={setShowSignIn} /> : ''}
    </>
  )
}

export default Nav
