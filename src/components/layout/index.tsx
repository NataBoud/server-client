import { Header } from '../header'
import { Container } from './container'
import { Navbar } from '../navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { selectIsAuthenticated, selectUser } from '../../features/user/userSlice'
import { useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'

export const Layout = () => {
  const isAutenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutenticated) {
      navigate('/auth')
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div>
        </div>
      </Container>
    </>
  )
}
