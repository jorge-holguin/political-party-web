"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"

const navItems = [
  { name: "Inicio", anchor: "#inicio" },
  { name: "Biografía", anchor: "#biografia" },
  { name: "Trayectoria", anchor: "#trayectoria" },
  { name: "Comités", href: "/comites" },
  { name: "Prensa", anchor: "#prensa" },
  { name: "Contacto", anchor: "#contacto" },
]

const uneteItems = [
  { name: "Inscríbete", anchor: "#inscribete" },
  { name: "Afiliados", href: "/afiliados" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [uneteOpen, setUneteOpen] = useState(false)
  const pathname = usePathname()
  const uneteRef = useRef<HTMLDivElement>(null)

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

    const handleClickOutside = (event: MouseEvent) => {
      if (uneteRef.current && !uneteRef.current.contains(event.target as Node)) {
        setUneteOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
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
                if (item.href) {
                  const isActive = pathname === item.href
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
                }
                
                const sectionId = item.anchor?.replace("#", "") || ""
                const isActive = isHomePage && activeSection === sectionId
                
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (isHomePage && item.anchor) {
                        scrollToSection(item.anchor)
                      } else if (item.anchor) {
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
              
              {/* Dropdown Únete */}
              <div ref={uneteRef} className="relative">
                <button
                  onClick={() => setUneteOpen(!uneteOpen)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                    uneteOpen || activeSection === "inscribete"
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  Únete
                  <ChevronDown className={`h-4 w-4 transition-transform ${uneteOpen ? "rotate-180" : ""}`} />
                </button>
                
                {uneteOpen && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                    {uneteItems.map((subItem) => (
                      subItem.href ? (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          onClick={() => setUneteOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ) : (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            if (isHomePage && subItem.anchor) {
                              scrollToSection(subItem.anchor)
                            } else if (subItem.anchor) {
                              window.location.href = "/" + subItem.anchor
                            }
                            setUneteOpen(false)
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {subItem.name}
                        </button>
                      )
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
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="px-4 py-3 space-y-2 bg-white backdrop-blur-md border-t border-gray-200">
          {navItems.map((item) => {
            if (item.href) {
              const isActive = pathname === item.href
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
            }
            
            const sectionId = item.anchor?.replace("#", "") || ""
            const isActive = isHomePage && activeSection === sectionId
            
            return (
              <button
                key={item.name}
                onClick={() => {
                  if (isHomePage && item.anchor) {
                    scrollToSection(item.anchor)
                  } else if (item.anchor) {
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
          
          {/* Únete section mobile */}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="px-4 py-2 text-sm font-semibold text-gray-500">Únete</p>
            {uneteItems.map((subItem) => (
              subItem.href ? (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  {subItem.name}
                </Link>
              ) : (
                <button
                  key={subItem.name}
                  onClick={() => {
                    if (isHomePage && subItem.anchor) {
                      scrollToSection(subItem.anchor)
                    } else if (subItem.anchor) {
                      window.location.href = "/" + subItem.anchor
                    }
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  {subItem.name}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

