import { Logo } from "@/componets/logo";

export function Footer() {
  return (
    <div className="flex items-center justify-center relative ">
        <div className="flex flex-row gap-30  basis-1/2 flex-grow p-16">
            <div className="flex flex-col">
                <h2 className="font-bold text-xl">Contact</h2>
                <p className="text-sm text-gray-400">
                <a href="mailto:teameliza@proton.me"> teameliza@proton.me </a>
                </p>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold text-xl">Terms and conditions</h2>
                <p className="text-sm text-gray-400">
                    This website is operated by a student team from KTH as part of a course project. By using the site, you agree to comply with Swedish law and our terms of use. Personal data is handled in accordance with the GDPR.
                </p>
            </div>
        </div>
        <div className="flex items-center justify-end p-10 ">
            <Logo />
        </div>
    </div>
  )
}