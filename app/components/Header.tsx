import Logo from '@/app/components/Logo'
import PageTitle from './PageTitle'
import NavLink from './NavLink'

function Header() {
    return (
        <header className='flex text-[--main-font] p-5 items-center shadow border border-b justify-between'>
            <Logo />
            <PageTitle />
            <NavLink />
        </header>
    )
}

export default Header