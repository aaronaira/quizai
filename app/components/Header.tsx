import Logo from '@/app/components/Logo'
import PageTitle from './PageTitle'

function Header() {
    return (
        <header className='flex text-[--main-font] p-5 items-center shadow border border-b justify-between'>
            <Logo />
            <PageTitle />
        </header>
    )
}

export default Header