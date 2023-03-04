import Footer from 'src/components/Footer'
import MainHeader from 'src/components/MainHeader'

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <div>
      <MainHeader />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
