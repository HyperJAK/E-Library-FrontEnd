'use client'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'
import {Rubik} from 'next/font/google'
import SuccessNotification from '@/components/shared/SuccessNotification'
import {getCurrentCartId, getCurrentUserId} from '@/config/data'
import {GetUserInfo, UpdateProfile} from '@/config/services/user'
import ResidentialInformation from '@/components/profile/ResidentialInformation'
import CreditCardInfo from '@/components/profile/CreditCardInfo'
import ErrorNotification from '@/components/shared/ErrorNotification'
import {PlaceOrderForUser} from '@/config/services/order'

const rubikBold = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['700'],
})

export default function Order() {
  const [userDetails, setUserDetails] = useState([])
  const [orderAdded, setOrderAdded] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await GetUserInfo({id: getCurrentUserId()})

        if (response) {
          setUserDetails(response)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    if (orderAdded) {
      const timeout = setTimeout(() => {
        setOrderAdded(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [orderAdded, setOrderAdded])

  useEffect(() => {
    if (showError) {
      const timeout = setTimeout(() => {
        setShowError(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [showError, setShowError])

  const handleSaveClick = async (event) => {
    try {
      if (
        userDetails.address !== 'Not filled' &&
        userDetails.city !== 'Not filled' &&
        userDetails.country !== 'Not filled' &&
        userDetails.card_number !== 'Not filled' &&
        userDetails.card_expiration_date !== 'Not filled' &&
        userDetails.card_cvv !== 'Not filled' &&
        userDetails.card_postal_code !== 'Not filled'
      ) {
        await UpdateProfile({data: userDetails})

        const res = await PlaceOrderForUser({
          address:
            userDetails.country +
            ' ' +
            userDetails.city +
            ' ' +
            userDetails.address,
          cartId: getCurrentCartId(),
          userId: getCurrentUserId(),
        })

        if (res) {
          setOrderAdded(true)
        }
      } else {
        setShowError(true)
      }
    } catch (error) {}
  }

  return (
    <>
      {userDetails && (
        <main className="flex min-h-screen flex-col items-center justify-between gap-40 p-24 text-black">
          {/*Main div*/}
          <div
            className={
              'flex w-[90%] flex-col flex-nowrap rounded-2xl bg-accent p-10'
            }>
            <div className={'top-200 absolute w-[100%] self-center'}>
              {orderAdded && (
                <SuccessNotification
                  message={'Order was added to your account'}
                />
              )}
              {showError && (
                <ErrorNotification message={'Please fill all fields'} />
              )}
            </div>

            {/*Title of page*/}
            <p
              className={`${rubikBold.variable} text-center font-rubik text-[4rem] text-opposite`}>
              <span className={'text-secondary'}>Fill</span> Information to
              place your <span className={'text-secondary'}>order</span>
            </p>

            {/*Residential info component*/}
            <ResidentialInformation
              data={userDetails}
              setData={setUserDetails}
              allowEdit={true}
            />

            {/*Credit card info component*/}
            <CreditCardInfo
              data={userDetails}
              setData={setUserDetails}
              allowEdit={true}
            />

            <Button
              style={
                'flex flex-row justify-center p-5 bg-secondary rounded-2xl text-accent hover:bg-accent border-2 border-secondary hover:text-opposite mt-10'
              }
              itemComponents={
                <div className={'flex flex-row gap-2'}>
                  <p>Place Order</p>
                  <Image
                    src={'/icons/shopping_cart.png'}
                    alt={'arrow down'}
                    width={20}
                    height={20}
                  />
                </div>
              }
              handle={handleSaveClick}
            />
          </div>
        </main>
      )}
    </>
  )
}
