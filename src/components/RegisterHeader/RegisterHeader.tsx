import { Link, useMatch } from 'react-router-dom'
import { path } from 'src/Constants/path'
import { LogoIcon } from 'src/Icons'

function RegisterHeader() {
  // const { isAuthenticated } = useContext(AppContext)
  const match = useMatch(path.register)
  const isLogin = Boolean(match)
  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to={'/'}>
            <LogoIcon className='h-8 fill-primary lg:h-11' />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isLogin ? 'Đăng ký' : 'Đăng Nhập'}</div>
        </nav>
      </div>
    </header>
  )
}

export default RegisterHeader
