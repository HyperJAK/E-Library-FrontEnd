'use client'
//font import
import {Rubik} from 'next/font/google'

//components
import Image from 'next/image'
import {useEffect, useState} from 'react'
import Button from "@/components/shared/Button";
import Link from "next/link";
import {handleAddSubscription, handleGetUserById} from "@/config/API/user/userService";
import {handleGetAllSubscriptions} from "@/config/API/user/subscription/subscriptionService";
import {GetUser} from "@/config/Utilities";
import {handleClearCache} from "@/config/API/book/bookService";
import ErrorNotification from "@/components/shared/ErrorNotification";
import SuccessNotification from "@/components/shared/SuccessNotification";

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

const UserProfilePicDiv = ({data,setSubscriptionChanged, subscriptionChanged}) => {
  const [showSubscriptions, setShowSubscriptions] = useState(false)
  const [showBooks, setShowBooks] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(data.subscription?.id?true:false)
  const [subscriptions, setSubscriptions] = useState(null)

  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showMessage, setShowMessage] = useState('')

  const handleShowAllBooks = () => {
    setShowBooks(!showBooks)
  }

  const handleSubscriptions = () => {
    setShowSubscriptions(!showSubscriptions)
  }

  const addUserSubscription = async (id) => {
    try {
      const userId = await GetUser()
      const response = await handleAddSubscription(userId?.id, id)

      if(response == null){
        setShowMessage("An unexpected error occurred. Please try again.")
        setShowError(true)
      }

      if (response && response.status === 200) {
        setSubscriptionChanged(!subscriptionChanged)
        setShowMessage(response.message)
        setShowSuccess(true)
      } else {
        setShowMessage(response?.message)
        setShowError(true)
      }
    } catch (error) {
      console.error(error)
    }
  }



  useEffect(() => {

    const fetchSubscriptionsData = async () => {
      try {
        const response = await handleGetAllSubscriptions()

        if (response) {
          setSubscriptions(response)
        }
      } catch (error) {
        console.error(error)
      }
    }


    if(subscriptions == null){
      fetchSubscriptionsData()
    }

  }, [showSubscriptions, subscriptionChanged])

  useEffect(() => {
    async function resetMessageBoxes(){
      if(showSuccess){
        const timeout = setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
        return () => clearTimeout(timeout)
      }
      if(showError){
        const timeout = setTimeout(() => {
          setShowError(false)
        }, 3000)
        return () => clearTimeout(timeout)
      }
    }

    resetMessageBoxes()

  },[showError, showSuccess, showMessage])

  const threshold = 40;

  return (
    <>
      {/*User information component in profile page*/}
      <div
        className={
          'flex h-fit w-[40%] flex-col items-center gap-6 rounded-3xl bg-accent p-10 lg:translate-y-[-50%]'
        }>
        {showError && (
            <ErrorNotification message={showMessage}/>
        )}
        {showSuccess && (
            <SuccessNotification message={showMessage}/>
        )}
        <Image
          src={data.userProfilePicPath ?? '/chef.png'}
          alt={'Profile pic'}
          width={300}
          height={300}
        />
        <div className={'flex flex-col gap-5 items-center'}>
          {/*3 info boxes*/}
          <div className={'flex flex-row flex-wrap gap-5'}>
            {/*Friends info box (for now hardcoded)*/}
            <div
                className={
                  'flex h-[120px] w-[120px] min-w-[100px] flex-col items-center gap-2 justify-between rounded-2xl border-2 border-solid border-secondary p-6 text-center align-middle'
                }>
              {/*Icon / Main Text*/}
              <h1 className={'text-2xl text-secondary'}>{data.subscription?.type ?? 'None'}</h1>
              {/*Informative text*/}
              <p className={'text-primary'}>{'Subscription'}</p>
              {
                  <Button
                      style={
                        'justify-center text-[0.8rem] flex flex-row border-solid border-secondary border-2 bg-secondary p-2 hover:bg-accent hover:cursor-pointer text-page rounded-2xl hover:text-secondary'
                      }
                      itemComponents={<p>{showSubscriptions? 'Hide': hasSubscription?'Update':'Add'}</p>}
                      handle={handleSubscriptions}
                  />
              }
            </div>

            {/*Saved book info box*/}
            <div
                className={
                  'flex h-[120px] w-[120px] min-w-[100px] flex-col items-center justify-between rounded-2xl border-2 border-solid border-secondary p-6 text-center align-middle'
                }>
              {/*Icon / Main Text*/}
              <h1 className={'text-2xl text-secondary'}>{data.userBooks?.length ?? 'None'}</h1>
              {/*Informative text*/}
              <p className={'text-primary text-[0.8rem]'}>{'Borrowed Books'}</p>
              {
                  data.userBooks?.length > 0 &&
                  <Button
                      style={
                        'justify-center text-[0.8rem] flex flex-row border-solid border-secondary border-2 bg-secondary p-2 hover:bg-accent hover:cursor-pointer text-page rounded-2xl hover:text-secondary'
                      }
                      itemComponents={<p>Show</p>}
                      handle={handleShowAllBooks}
                  />
              }
            </div>

          </div>
          {
            showSubscriptions &&
              <div className={'flex flex-row gap-2 flex-wrap overflow-y-auto max-h-[400px]'}>
                {
                  subscriptions?.map((subscription) => {
                    return (
                        <div
                            className={'w-[150px] cursor-pointer'}
                            onClick={() => addUserSubscription(subscription.id)}
                            key={subscription.id}>

                            <div className={'flex flex-col gap-4 items-center rounded-2xl p-4 hover:bg-secondary'}>
                              <p className={` ${rubikRegular.variable} text-primary font-rubik text-[0.8rem]`}>
                              <span className={`${rubikBold.variable} text-primary font-rubik text-[1.4rem]`}>
                                {subscription.type ?? 'Basic'}
                              </span>

                              </p>

                              <div className={'relative w-[30px] h-[30px] self-center'}>
                                <Image
                                    src={'/pot.png'}
                                    alt="image"
                                    layout="fill"
                                    objectFit="cover"
                                />
                              </div>

                              <p className={` ${rubikRegular.variable} text-primary font-rubik text-[0.8rem]`}>
                                {subscription.price ?? '300' }$
                              </p>
                              <p className={` ${rubikRegular.variable} text-primary font-rubik text-[0.8rem]`}>
                                {subscription.durationInDays ?? '20'}
                              </p>


                            </div>




                        </div>
                    )
                  })
                }


              </div>
          }

          {
              showBooks &&
              <div className={'flex flex-col gap-2 overflow-y-auto max-h-[400px]'}>
                {
                  data.userBooks.map((userBook) => {
                    return (
                        <Link
                            href={`/book/${userBook.book.id}?id=${userBook.book.id}`}
                            key={userBook.book.id}
                            target="_blank"
                            rel="noopener noreferrer">
                          <div className="flex cursor-pointer flex-row justify-start gap-2 rounded-2xl p-4 hover:bg-secondary">
                            <div className={'relative w-[30px] h-[30px] self-center'}>
                              <Image
                                  src={userBook.book.CoverImageURL ?? '/pot.png'}
                                  alt="image"
                                  layout="fill"
                                  objectFit="cover"
                              />
                            </div>
                            <div className={'flex flex-col gap-1'}>
                              <p className={`pt-3 pr-3 pb-3 ${rubikRegular.variable} text-primary font-rubik text-[0.8rem]`}>
                              <span className={`${rubikBold.variable} text-primary font-rubik text-[1.4rem]`}>
                                {userBook.book.title?.length > threshold ? `${userBook.book.title.substring(0, threshold)}...` : userBook.book.title ?? 'Harry potter'}
                              </span>

                              </p>

                              <p className={`pt-3 pr-3 pb-3 ${rubikRegular.variable} text-primary font-rubik text-[0.8rem]`}>
                                {userBook.book.publishingDate ?? '2023-01-02'}
                              </p>


                            </div>



                          </div>
                        </Link>
                    )
                  })
                }


              </div>
          }

        </div>

      </div>
    </>
  )
}

export default UserProfilePicDiv
