import { Link } from 'react-router-dom'
import { LogoIcon } from 'src/Icons'

function RegisterHeader() {
  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to={'/'}>
            <LogoIcon className='fill-primary h-8 lg:h-11' />
          </Link>
          <div className='text-xl ml-5 lg:text-2xl'>Đăng ký</div>
        </nav>
      </div>
    </header>
  )
}

export default RegisterHeader
