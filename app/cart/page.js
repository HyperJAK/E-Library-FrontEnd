'use client'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import {useEffect, useState} from 'react'
import Rating from '@/components/recipe/Rating'
import {Rubik} from 'next/font/google'
import {GetProductDetails} from '@/config/API/product/productRequest'
import {AddProductToCart, GetAllActiveCartItems} from '@/config/API/cart/cartRequest'
import SuccessNotification from '@/components/shared/SuccessNotification'
import {currentCartId, getCurrentCartId, getCurrentUserId} from '@/config/data'
import Link from 'next/link'

const rubikBold = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['700'],
})

export default function Cart() {
  const [cartDetails, setCartDetails] = useState([])
  const [detailsHovered, setDetailsHovered] = useState(false)
  const [orderAdded, setOrderAdded] = useState(false)

  useEffect(() => {
    console.log('My cart id: ' + getCurrentCartId())
    async function fetchData() {
      try {
        const cart = await GetAllActiveCartItems({cartId: getCurrentCartId()})

        if (cart) {
          setCartDetails(cart)
        } else {
          console.log('Failed to get Cart details')
        }
      } catch (e1) {}
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (orderAdded) {
      const timeout = setTimeout(() => {
        setOrderAdded(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [orderAdded, setOrderAdded])

  return (
    <>
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
          </div>
          {cartDetails.length > 0 ? (
            <>
              {/*Title of page*/}
              <p
                className={`${rubikBold.variable} text-center font-rubik text-[4rem] text-opposite`}>
                <span className={'text-secondary'}>Your</span> Cart
              </p>

              <div className={'flex flex-col justify-center gap-5'}>
                <Link href={'/order'}>
                  <Button
                    style={
                      'flex flex-row justify-center p-3 bg-secondary rounded-2xl text-accent hover:bg-accent border-2 border-secondary hover:text-opposite'
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
                    handle={''}
                  />
                </Link>

                {cartDetails.map((product) => {
                  return (
                    <div
                      key={product.product_id}
                      className={
                        'flex w-full flex-row items-center justify-between rounded-2xl bg-opposite p-3 align-middle text-accent'
                      }>
                      <Image
                        src={product.picture}
                        alt={'product pic'}
                        width={50}
                        height={50}
                        className={
                          'rounded-full border border-2 border-secondary'
                        }
                      />
                      {/*product name*/}
                      <p>{product.name}</p>
                      {/*product name*/}
                      <p>{product.description}</p>
                      {/*product name*/}
                      <p>{product.price}</p>
                      {/*product name*/}
                      <div className={'max-w-[20%]'}>
                        <Rating
                          rating={product.rating}
                          fontSize={'small'}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              {/*Title of page*/}
              <p
                className={`${rubikBold.variable} text-center font-rubik text-[4rem] text-opposite`}>
                <span className={'text-secondary'}>Your</span> Cart is{' '}
                <span className={'text-secondary'}>Empty</span>
              </p>
            </>
          )}
        </div>
      </main>
    </>
  )
}
