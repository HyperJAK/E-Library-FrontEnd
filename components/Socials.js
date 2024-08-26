//next image import
import Image from 'next/image'

//icon import
import {
  RiGithubLine,
  RiLinkedinLine,
  RiInstagramLine,
  RiFacebookLine,
} from 'react-icons/ri'
import Link from 'next/link'

const Socials = () => {
  const linkedInRef = 'https://www.linkedin.com/in/james-abou-khalil-489b32179/'
  const gitHubRef = 'https://github.com/HyperJAK'
  const facebookRef =
    'https://www.facebook.com/james.aboukhalil?mibextid=ZbWKwL'
  const instagramRef = 'https://www.instagram.com/_hyper_jak_'
  return (
    <div
      className={
        'z-30 mx-auto flex w-[50%] items-center justify-center px-16 xl:h-[90px] xl:px-0'
      }>
      <div
        className={
          'flex flex-row items-center gap-5 text-2xl lg:rounded-full lg:border-2 lg:border-accent lg:p-3'
        }>
        <Link
          href={gitHubRef}
          className={'transition-all duration-300 hover:text-accent'}
          target="_blank">
          <RiGithubLine />
        </Link>
        <Link
          href={linkedInRef}
          className={'transition-all duration-300 hover:text-accent'}
          target="_blank">
          <RiLinkedinLine />
        </Link>
        <Link
          href={facebookRef}
          className={'transition-all duration-300 hover:text-accent'}
          target="_blank">
          <RiFacebookLine />
        </Link>
        <Link
          href={instagramRef}
          className={'transition-all duration-300 hover:text-accent'}
          target="_blank">
          <RiInstagramLine />
        </Link>
      </div>
    </div>
  )
}

export default Socials
