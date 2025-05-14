import { useLocation } from 'react-router';
import { LogoAnimated } from "../logoAnimated";
import { GoChevronDown } from "react-icons/go";
import { useState, useEffect, useRef } from 'react';

export function Footer() {
  // Determine if we're on the home page
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Control arrow visibility based on footer intersection
  const [showArrow, setShowArrow] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    if (!isHomePage || !footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide arrow when footer fully visible (ratio === 1), show otherwise
        setShowArrow(entry.intersectionRatio < 1);
      },
      { threshold: 1.0 }
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, [isHomePage]);

  // Smooth-scroll into view
  const scrollToFooter = () => {
    const el = footerRef.current;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="footer"
      ref={footerRef}
      className="relative flex items-start justify-center border-t border-gray-200"
    >
      {/* Down-arrow only on home and when footer not fully visible */}
      {isHomePage && showArrow && (
        <button
          onClick={scrollToFooter}
          className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-lg z-10"
          aria-label="Show footer"
        >
          <GoChevronDown className="h-6 w-6 text-gray-600" />
        </button>
      )}

      <div className="flex flex-col basis-1 gap-10 px-10 py-4 lg:flex-row lg:gap-40 lg:basis-1/2 flex-grow lg:px-16 lg:py-8">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Contact</h2>
          <p className="text-sm text-gray-400">
            <a href="mailto:teameliza@proton.me" className='text-blue-500'>teameliza@proton.me</a>
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Terms and conditions</h2>
          <p className="text-sm text-gray-400">
            This website is operated by a student team from KTH as part of a
            course project. By using the site, you agree to comply with Swedish
            law and our terms of use. Personal data is handled in accordance
            with the GDPR.
          </p>
        </div>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-end lg:justify-end lg:items-center px-10 py-10">
        <LogoAnimated />
      </div>
    </div>
  );
}




