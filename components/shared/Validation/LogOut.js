/*
import React, {useState} from 'react'
import {Button} from 'react-bootstrap'

import AuthRegister from '@/components/shared/Validation/AuthRegister'

const LogOut = ({setIsLogIn, setCurrentScreen}) => {
  const [isHovered, setIsHovered] = useState(false)

  const button_style = {
    width: '100%',
    height: '50px',
    fontWeight: isHovered ? 'bold' : 'normal',
    color: isHovered ? 'white' : 'black',
    border: '1px solid rgba(13,110,253,255)',
    backgroundColor: isHovered ? '#333333' : 'transparent',
  }

  const {logout, isAuthenticated} = useAuth0()

  return (
    <div className="mb-4 pt-1">
      <Button
        style={button_style}
        size="md"
        onClick={() => {
          if (isAuthenticated) {
            logout().then(() => {
              setIsLogIn(true)
              setCurrentScreen('login')
            })
          }

          try {
            localStorage.clear('userInfo')
          } catch {
            console.log("Couldn't clear user info from local storage")
          }
          try {
            localStorage.clear('currentScreen')
          } catch {
            console.log("Couldn't clear currentScreen from local storage")
          }
          setCurrentScreen('login')
          setIsLogIn(true)
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        LogOut
      </Button>
    </div>
  )
}
export default LogOut
*/
