import Link from "next/link"

function NavLink() {
    return (
        <nav className="flex space-x-8 items-center text-sm">
            <Link href="/signin">Sign In</Link>
            <Link href="/signup" className="hover:bg-[--main-color] hover:text-white p-2 px-5 text-[--main-color] border-[--main-color] border-2 rounded-full font-semibold">Sign Up</Link>
        </nav>
    )
}

export default NavLink