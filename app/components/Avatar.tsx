'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, X } from 'lucide-react'
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react'

function Avatar({ session }: { session: Session | null }) {

    const [subMenu, setSubMenu] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleToggle = () => setSubMenu(!subMenu)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setSubMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <div className="border-2 border-gray-300 rounded-full p-1 cursor-pointer hover:shadow-md transition" onClick={handleToggle}>
                <Image
                    src={session?.user?.image ? session.user.image : "/avatar.svg"}
                    width={40}
                    height={40}
                    alt="User Avatar"
                    className="rounded-full"
                />
            </div>

            <AnimatePresence>
                {subMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 min-w-[180px] rounded-2xl bg-white shadow-2xl p-3 z-20"
                    >
                        <ul className="flex flex-col gap-2 text-gray-700">
                            <MenuItem icon={<User size={18} />} label="Profile" onClick={() => alert('Go to Profile')} />
                            <MenuItem icon={<LogOut size={18} />} label="Logout" onClick={async () => await signOut({ redirectTo: "/" })} />
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

interface MenuItemProps {
    icon: React.ReactNode
    label: string
    onClick: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick }) => (
    <li
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
        onClick={onClick}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </li>
)

export default Avatar
