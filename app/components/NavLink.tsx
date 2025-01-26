import Link from "next/link"

function NavLink() {
    return (
        <nav>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup" className="p-4 border-[--main-color] border-2 font-semibold">Sign Up</Link>
        </nav>
    )
}

export default NavLink