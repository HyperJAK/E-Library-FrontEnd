import {useEffect, useState} from 'react'

import {
  ValidEmail,
  ValidPassword,
  SignUpFunc,
  EncryptPassword,
  ValidUsername,
  HashPassword, StoreUser, GetUser,
} from '@/config/Utilities'
import EmailTextfield from '@/components/shared/Validation/EmailTextfield'
import PasswordTextfield from '@/components/shared/Validation/PasswordTextfield'
import Button from '@/components/shared/Button'
import Link from 'next/link'
import Title from '@/components/shared/Title'
import Image from 'next/image'
import {Rubik} from 'next/font/google'
import AuthRegister from '@/components/shared/Validation/AuthRegister'
import {handleCreateUser, handleVerifyUser} from "@/config/API/user/userService";
import ErrorNotification from "@/components/shared/ErrorNotification";
import SuccessNotification from "@/components/shared/SuccessNotification";

const rubikBold = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['700'],
})

const SignUp = ({setShowSignIn, setShowAuth}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPass] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [user, setUser] = useState('')

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      if(cPassword === password){
        const response= await handleCreateUser(username, email, password)

        if (response?.ok || response.status === 200){
          //insert here code to save userData somewhere
          const resp = await StoreUser(response)

          if(resp){
            setUser(response)
            setShowSuccess(true);
          }
          else{
            setShowError(true);
          }
        }

      }
      else{
        setShowError(true);
      }

    } catch (error) {
      setShowError(true);
    }

  }

  useEffect(() => {
    async function fetchData(){
      setUser(await GetUser())
    }

    if(showSuccess){
      const timeout = setTimeout(() => {
        setShowSuccess(false)
        setShowAuth(false)
      }, 3000)
      fetchData();
      return () => clearTimeout(timeout)
    }
    if(showError){
      const timeout = setTimeout(() => {
        setShowError(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }

  }, [showError, showSuccess])

  return (
    <div
      className={
        'relative flex flex-col items-center justify-center gap-10 rounded-bl-2xl rounded-br-2xl border-2 border-secondary bg-page p-6 align-middle'
      }>

      {showError && (
          <ErrorNotification message={"Wrong credentials or non existent user"}/>
      )}
      {showSuccess && (
          <SuccessNotification message={`Welcome, ${user.username}`}/>
      )}

      <div className={'absolute bottom-0 right-0'}>
        <Image
          src={'/signup.png'}
          alt={'sign up'}
          width={200}
          height={200}
        />
      </div>

      {/*Title here*/}
      <div className={'flex flex-row self-center'}>
        <p
          className={`${rubikBold.variable} font-rubik text-[30px] text-primary`}>Sign up
        </p>
      </div>
      {/*Buttons and textfields here*/}
      <div className={'flex flex-col gap-4'}>
        {/*Username textfield here*/}
        <EmailTextfield
          props={{email: username, setEmail: setUsername, title: 'Username'}}
        />
        {/*Email + small info p under*/}
        <div className={'flex flex-col'}>
          <EmailTextfield props={{email: email, setEmail: setEmail}} />
          <p>You can use letters, numbers and periods</p>
        </div>
        {/*Password + confirm password + p info*/}
        <div className={'flex flex-col'}>
          <div className={'flex flex-row gap-2'}>
            <PasswordTextfield
              props={{
                password: password,
                setPassword: setPassword,
                showPassword: showPassword,
              }}
            />
            <PasswordTextfield
              props={{
                password: cPassword,
                setPassword: setCPass,
                title: 'Confirm password',
                showPassword: showPassword,
              }}
            />
          </div>
          <p>
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        </div>
        {/*Show password checkbox*/}
        <div>
          <span className="mr-2 text-primary">Show Password</span>
          <input
            type="checkbox"
            id="show-password"
            name="show-password"
            className="focus:ring-none h-4 w-4 rounded border border-gray-300 bg-white accent-blue-600 focus:ring-blue-500"
            checked={showPassword}
            onChange={handleShowPassword}
          />
        </div>
        {/*Sign up button*/}
        <Button
          style={
            'justify-center w-50 flex flex-row border-solid border-secondary border-2 bg-secondary p-4 hover:bg-accent hover:cursor-pointer flex-row flex text-page rounded-2xl hover:text-primary'
          }
          itemComponents={<p>Sign Up</p>}
          handle={handleSignup}
        />
        {/*External logins and pic here*/}
        <AuthRegister />

        {/*Sign ip button and text*/}
        <div
          className={'flex flex-row flex-wrap items-center justify-end gap-4'}>
          <p>Already have an account ?</p>
          <Button
            style={
              'justify-center w-50 flex flex-row border-solid border-secondary border-2 bg-opposite p-4 hover:bg-accent hover:cursor-pointer flex-row flex text-primary rounded-2xl hover:text-primary'
            }
            itemComponents={<p>Sign In</p>}
            handle={() => setShowSignIn(true)}
          />
        </div>
      </div>
    </div>
  )
}

export default SignUp
