import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <div className="flex items-start lg:items-center justify-center relative border-t-1 border-gray-200">
      <div className="flex flex-col basis-1 gap-10 p-10 lg:flex-row lg:gap-30 lg:basis-1/2 flex-grow lg:p-16">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">Contact</h2>
          <p className="text-lg text-gray-400">
            <a href="mailto:teameliza@proton.me" className="text-blue-500 hover:underline">
              teameliza@proton.me
            </a>
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">Terms and conditions</h2>
          <p className="text-lg text-gray-400">
            This website is operated by a student team from KTH as part of a
            course project. By using the site, you agree to comply with Swedish
            law and our terms of use. Personal data is handled in accordance
            with the GDPR.
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:items-start sm:justify-end lg:items-center p-10 ">
        <Logo />
      </div>
    </div>
  );
}
