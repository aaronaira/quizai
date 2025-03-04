'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { User, BookOpenCheck, Settings, File } from 'lucide-react'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();
    const router = useRouter();
    const menus = [
        { name: "Profile", path: "/profile", icon: <User className="mr-2" /> },
        { name: "PDF", path: "/profile/pdfs", icon: <File className="mr-2" /> },
        { name: "Quizzes", path: "/profile/quizzes", icon: <BookOpenCheck className="mr-2" /> },
        { name: "Settings", path: "/profile/settings", icon: <Settings className="mr-2" /> },
    ]


    return (
        <div className="flex w-full justify-center min-h-screen overflow-hidden">
            <div className="flex mt-40 min-w-[1024px]">
                <aside className="w-1/4 max-h-fit relative p-6 bg-white before:absolute before:top-0 before:right-0 before:w-1 before:h-full before:bg-gray-100 before:shadow-lg">
                    <ul className="flex flex-col gap-y-2 text-gray-700">
                        {menus.map(({ name, path, icon }) =>
                            <li key={path} className={`hover:bg-slate-100 rounded-sm p-2 ${path === currentPath ? 'bg-slate-100' : 'bg-transparent'}`}><Link className="flex items-center" href={path}>{icon}{name}</Link></li>

                        )}

                    </ul>
                </aside>

                {/* Contenido dinámico */}
                <div className="flex flex-col p-4 w-3/4">
                    {children}
                </div>
            </div>
        </div>
    );
}
