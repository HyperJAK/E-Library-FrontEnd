'use client'
//font import
import {Rubik} from 'next/font/google'

//components
import EmailTextfield from '@/components/shared/Validation/EmailTextfield'
import LabelField from '@/components/shared/LabelField'
import {TuiDatePicker} from 'nextjs-tui-date-picker'

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

const CreditCardInfo = ({data, setData, allowEdit}) => {
  const handleCardNumber = (e) => {
    if (allowEdit === true && e.target.value.length < 201) {
      setData((prevData) => ({
        ...prevData,
        creditCard: {
          ...prevData.creditCard,
          cardNumber: e.target.value,
            timeStamp: new Date().toISOString()
        },
      }))
    }
  }

  const handleExpiration = (e) => {
    if (allowEdit === true) {
      console.log('Date value: ' + e)
      setData((prevData) => ({
        ...prevData,
        creditCard: {
          ...prevData.creditCard,
          expirationDate: e,
            timeStamp: new Date().toISOString()
        },
      }))
    }
  }

  const handleBillingAddress = (e) => {
    if (allowEdit === true) {
      console.log('Billing Address value: ' + e.target.value);
      setData((prevData) => ({
        ...prevData,
        creditCard: {
          ...prevData.creditCard,
          billingAddress: e.target.value,
            timeStamp: new Date().toISOString()
        },
      }));
    }
  };

  const handleFullName = (e) => {
    if (allowEdit === true) {
      console.log('Full Name value: ' + e.target.value);
      setData((prevData) => ({
        ...prevData,
        creditCard: {
          ...prevData.creditCard,
          fullName: e.target.value,
            timeStamp: new Date().toISOString()
        },
      }));
    }
  };

  return (
      <>
        {/* User information component in profile page */}
        <div
            className={
              'flex flex-col gap-6 rounded-bl-3xl rounded-br-3xl bg-accent p-5 text-primary'
            }>
          {/* Title of component */}
          <p
              className={`${rubikRegular.variable} w-full rounded-full bg-secondary pb-3 pl-5 pt-3 font-rubik text-[1.2rem] text-opposite`}>
            Credit Card Info
          </p>
          {/* Fields */}
          <div className={'flex w-full flex-row gap-10'}>
            {/* Full Name */}
            <div className={'flex w-full flex-col gap-1'}>
              <LabelField props={{label: 'Full Name'}} />
              <EmailTextfield
                  props={{
                    email: data.creditCard?.fullName ?? '',
                    title: 'Full Name',
                    allowEdit: allowEdit,
                    handleChange: handleFullName,
                  }}
              />
            </div>
            {/* Card Number */}
            <div className={'flex w-full flex-col gap-1'}>
              <LabelField props={{label: 'Card Number'}} />
              <EmailTextfield
                  props={{
                    email: data.creditCard?.cardNumber ?? '',
                    title: 'Card Number',
                    allowEdit: allowEdit,
                    handleChange: handleCardNumber,
                  }}
              />
            </div>
          </div>
          <div className={'flex flex-row gap-10'}>
            {/* Expiration Date */}
            <div className={'flex w-full flex-col gap-1'}>
              <LabelField props={{label: 'Expiration Date'}} />
              <TuiDatePicker
                  handleChange={handleExpiration}
                  date={
                    new Date(
                        data.creditCard?.expirationDate
                            ? data.creditCard?.expirationDate
                            : '2025-01-01'
                    )
                  }
                  inputWidth={140}
                  containerWidth={200}
                  fontSize={16}
                  showAlways={true}
              />
            </div>


            {/* Billing Address */}
            <div className={'flex w-full flex-col gap-1'}>
              <LabelField props={{label: 'Billing Address'}} />
              <EmailTextfield
                  props={{
                    email: data.creditCard?.billingAddress ?? '',
                    title: 'Billing Address',
                    allowEdit: allowEdit,
                    handleChange: handleBillingAddress,
                  }}
              />
            </div>
          </div>
        </div>
      </>

  )
}

export default CreditCardInfo
