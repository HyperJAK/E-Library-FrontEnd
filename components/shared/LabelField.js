import {FloatingLabel, Form} from 'react-bootstrap'
import {ValidEmail, ValidPassword} from '@/config/Utilities'
import SignIn from '@/components/shared/Validation/SignIn'

const LabelField = ({props}) => {
  const {label} = props

  return (
    <p className="h-full w-full overflow-auto px-3 py-1 text-[1rem]">
      {label ? label : 'text here'}
    </p>
  )
}

export default LabelField
