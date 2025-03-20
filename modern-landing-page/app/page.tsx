"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"
import { galleryImages } from "@/data/gallery"
import { useIsMobile } from "@/hooks/use-mobile"

export default function LandingPage() {
  const isMobile = useIsMobile()
  const [displayCount, setDisplayCount] = useState(isMobile ? 3 : 6)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Add this useEffect to handle mobile/desktop changes
  useEffect(() => {
    setDisplayCount(isMobile ? 3 : 6)
  }, [isMobile])

  // Calculate opacity for the background transition
  const heroOpacity = Math.max(0, 1 - scrollPosition / 500)
  const blackBgOpacity = Math.min(1, scrollPosition / 500)

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + (isMobile ? 3 : 6))
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero section with background image */}
      <div className="fixed inset-0 w-full h-screen" style={{ opacity: heroOpacity }}>
        <Image
          src="/golfcourse.jpg"
          alt="Golf course background"
          fill
          priority
          className="object-cover object-middle"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 backdrop-blur-sm"></div>
      </div>

      {/* Black background that appears on scroll */}
      <div
        className="fixed inset-0 bg-gradient-to-t from-black via-black/90 to-transparent transition-opacity duration-300"
        style={{ opacity: blackBgOpacity }}
      ></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Header with logo and social link */}
        <header className="container mx-auto px-8 py-6 mt-2 flex justify-between items-center">
          <div className="w-80 h-24 relative flex justify-start pl-4">
            <div className="relative w-full h-full">
              <Image
                src="/wings-logo.png"
                alt="Jag Putters Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
          <div className="pr-4">
            <Link
              href="https://instagram.com/jag_putters"
              target="_blank"
              className="p-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-6 h-6 text-[#E1306C]" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </header>

        {/* Hero content */}
        <div className="container mx-auto px-4 pt-20 pb-40 text-center text-white">
          <h1 className="text-5xl md:text-7xl mb-6 leading-relaxed">Welcome to Jag Putters</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-cormorant">
            Discover the brand through our gallery or send us a message via email or Instagram.
          </p>
        </div>

        {/* Story section */}
        <div className="relative bg-black pt-32 pb-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl text-white mb-12 text-center">Our Story</h2>
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-lg">
              <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-6">
              I fell in love with golf in 2019, and after my first pure strike at the range, there was no turning back.
              But the real obsession began when I started hunting for equipment—haggling over used Scottys on Facebook,
              chasing down vintage blades with worn leather grips, and unearthing rusty wedges with a story to tell.
              There was a thrill in the search, the satisfaction of finding a hidden gem at a bargain,
              and the endless curiosity that kept me asking: why can't I create my own?
                </p>
                <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-6">
                After years of frustration and research, I set out to rethink the supply chain and create
                something better -— an affordable, fully customizable blade putter, hand-assembled to order in Tampere, Finland.
                Making tour-style blades available to everyone at a fraction of the price.
                </p>
                <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-6">
                Launched in 2023, we've already shipped putters to seven countries,
                proving that premium design doesn't have to come with a premium price tag.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery section */}
        <div className="relative bg-black pt-20 pb-40">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl text-white mb-12 text-center">Our Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.slice(0, displayCount).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white/5 rounded-md overflow-hidden hover:bg-white/10 transition-colors md:p-0"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {displayCount < galleryImages.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mid-page image section */}
        <div className="relative h-[50vh] w-full">
          <Image
            src="/golfcourse3.jpg"
            alt="Golf course view"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>

          {/* Logo overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40 md:w-60 md:h-60">
              <Image
                src="/wings-logo.png"
                alt="Jag Putters Logo"
                fill
                className="object-contain opacity-70"
              />
            </div>
          </div>
        </div>

        {/* Contact section */}
        <footer className="relative bg-black pt-20 pb-20 border-t border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl text-white mb-12 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white mb-2">Email</h3>
                <a href="mailto:hello@studio.com" className="text-white/80 hover:text-white transition-colors">
                  jag_putters@outlook.com
                </a>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white mb-2">Social</h3>
                <a href="tel:+1234567890" className="text-white/80 hover:text-white transition-colors">
                  @jag_putters
                </a>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white mb-2">Location</h3>
                <address className="text-white/80 not-italic">
                  Tampere, 33540
                  <br />
                  Suomi
                </address>
              </div>
            </div>

            <div className="mt-16 text-center text-white/60 text-sm">
              <p>&copy; {new Date().getFullYear()} Jag Putters. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

