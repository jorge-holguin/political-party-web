"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"

const navItems = [
  { name: "Inicio", href: "/inicio" },
  { name: "Prensa", href: "/prensa" },
  { name: "Comités", href: "/comites" },
  { name: "Contacto", href: "/contacto" },
]

const tcpItems = [
  { name: "Estatuto", href: "/todo-con-el-pueblo" },
  { name: "Reglamento", href: "/todo-con-el-pueblo" },
  { name: "Síntesis", href: "/todo-con-el-pueblo" },
]

const uneteItems = [
  { name: "Afiliados", href: "/afiliados" },
  { name: "Representantes", href: "/representantes" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [tcpOpen, setTcpOpen] = useState(false)
  const [uneteOpen, setUneteOpen] = useState(false)
  const pathname = usePathname()
  const tcpRef = useRef<HTMLDivElement>(null)
  const uneteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (uneteRef.current && !uneteRef.current.contains(event.target as Node)) {
        setUneteOpen(false)
      }
      if (tcpRef.current && !tcpRef.current.contains(event.target as Node)) {
        setTcpOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/inicio" className="flex-shrink-0 flex items-center gap-2">
              <Image 
                src="/images/logos/logo.png" 
                alt="Todo con el Pueblo" 
                width={48} 
                height={48}
                className="rounded-lg object-contain bg-white p-1"
              />
              <span className="hidden sm:block font-bold text-red-600">
                TCP
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-red-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-red-600 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
              
              {/* Dropdown TCP */}
              <div ref={tcpRef} className="relative">
                <button
                  onClick={() => setTcpOpen(!tcpOpen)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                    tcpOpen || pathname.includes("todo-con-el-pueblo")
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  TCP
                  <ChevronDown className={`h-4 w-4 transition-transform ${tcpOpen ? "rotate-180" : ""}`} />
                </button>
                
                {tcpOpen && (
                  <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                    {tcpItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => setTcpOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Únete */}
              <div ref={uneteRef} className="relative">
                <button
                  onClick={() => setUneteOpen(!uneteOpen)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                    uneteOpen || pathname.includes("afiliados") || pathname.includes("representantes")
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  Únete
                  <ChevronDown className={`h-4 w-4 transition-transform ${uneteOpen ? "rotate-180" : ""}`} />
                </button>
                
                {uneteOpen && (
                  <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                    {uneteItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => setUneteOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full transition-all duration-300 text-gray-600 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="px-4 py-3 space-y-2 bg-white backdrop-blur-md border-t border-gray-200">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-red-600 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
          
          {/* TCP section mobile */}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="px-4 py-2 text-sm font-semibold text-gray-500">Todo con el Pueblo</p>
            {tcpItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.href}
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                {subItem.name}
              </Link>
            ))}
          </div>

          {/* Únete section mobile */}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="px-4 py-2 text-sm font-semibold text-gray-500">Únete</p>
            {uneteItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.href}
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

