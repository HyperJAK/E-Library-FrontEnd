import {AES, enc} from 'crypto-js'

export function ValidAlphaInput(input) {
  const inputRegex = /^[a-zA-Z]+$/
  const isValid = inputRegex.test(input)

  return isValid
}

export async function HashPassword(password) {
  const Hashes = require('jshashes')
  try {
    // Hash password using SHA-256
    const SHA256 = new Hashes.SHA256().hex(password)
    return SHA256.toString()
  } catch (error) {
    console.error('Error hashing password with jshashes:', error)
    throw error
  }
}

export async function EncryptJson(objectData) {
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY

  const plaintext = JSON.stringify(objectData)

  console.log('Pass to encrypt: ' + plaintext)
  console.log('Enc key' + encryptionKey)

  // Encrypt id
  try {
    const encPass = await AES.encrypt(plaintext, "Yesitsme").toString()
    console.log('Passed encryption with pass: ' + encPass)
    return encPass
  } catch (error) {
    console.log(error)
  }
}

export async function DecryptJson(objectData) {
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY

  const plaintext = objectData

  // Decrypt, yes it was hardcoded because .env was not working for some absolute unknown reason
  const bytes = await AES.decrypt(plaintext, "Yesitsme")
  const decryptedText = bytes.toString(enc.Utf8)

  return JSON.parse(decryptedText)
}

export function ValidPassword(pass) {
  var passRegex = new RegExp('^((?=.*?[A-Za-z])(?=.*?[0-9]).{6,})*?$')
  const isValid = passRegex.test(pass)

  if (pass.length === 0) {
    return false
  }

  return isValid

  /*
    * ^: Asserts the start of the string.
    (?=.*[A-Z]): Positive lookahead to ensure there is at least one uppercase letter.
    (?=.*\d): Positive lookahead to ensure there is at least one digit (number).
    (?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]): Positive lookahead to ensure there is at least one special character. Note: Modify the special characters within the square brackets if needed, and be cautious about characters that might be dangerous for SQL injection.
    .{8,}: Ensures that the total length of the password is at least 8 characters.
    $: Asserts the end of the string.
    * */
}

export function ValidEmail(email) {
  var emailRegex = new RegExp(
    '^([a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z])*?$'
  )
  if (email.length === 0) {
    return false
  }

  return emailRegex.test(email)
}

export function ValidUsername(username) {
  if (username === '') {
    return false
  }
  if (username.length < 3 || username.length > 20) {
    return false
  }

  return true
}


export async function StoreUser(userData){
  try{
    const encrypted = await EncryptJson(userData)
    localStorage.setItem('user', encrypted);
    return true;
  }catch(e){
    console.log("failed to save user data to localstorage")
    return false;
  }

}

export async function GetUser(){
  const user = localStorage.getItem('user');
  if(user != null){
    const decrypted = await DecryptJson(user)
    return decrypted;
  }
  else {
    return null
  }
}

export function RemoveUser(){
  localStorage.removeItem('user');
}