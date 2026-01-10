"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Inicio", path: "/", anchor: "#inicio" },
  { name: "Biografía", path: "/", anchor: "#biografia" },
  { name: "Trayectoria", path: "/", anchor: "#trayectoria" },
  { name: "Prensa", path: "/", anchor: "#prensa" },
  { name: "Inscríbete", path: "/", anchor: "#inscribete" },
  { name: "Contacto", path: "/", anchor: "#contacto" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["inicio", "biografia", "trayectoria", "prensa", "inscribete", "contacto"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (anchor: string) => {
    const id = anchor.replace("#", "")
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const isHomePage = pathname === "/"

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
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
                const sectionId = item.anchor.replace("#", "")
                const isActive = isHomePage && activeSection === sectionId
                
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (isHomePage) {
                        scrollToSection(item.anchor)
                      } else {
                        window.location.href = "/" + item.anchor
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-red-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-red-600 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
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
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="px-4 py-3 space-y-2 bg-white backdrop-blur-md border-t border-gray-200">
          {navItems.map((item) => {
            const sectionId = item.anchor.replace("#", "")
            const isActive = isHomePage && activeSection === sectionId
            
            return (
              <button
                key={item.name}
                onClick={() => {
                  if (isHomePage) {
                    scrollToSection(item.anchor)
                  } else {
                    window.location.href = "/" + item.anchor
                  }
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-red-600 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

