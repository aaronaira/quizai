import Link from "next/link"
import { auth } from "@/app/auth"
import Image from "next/image"
import Avatar from "@/app/components/Avatar";


async function NavLink() {
    const session = await auth();
    if (session) console.log(session)


    return (
        <nav className="flex space-x-8 items-center text-sm">
            {session ? <Avatar /> :
                <>
                    <Link href="/signin">Sign In</Link>
                    <Link href="/signup" className="hover:bg-[--main-color] hover:text-white p-2 px-5 text-[--main-color] border-[--main-color] border-2 rounded-full font-semibold">Sign Up</Link>
                </>
            }

        </nav>
    )
}

export default NavLink