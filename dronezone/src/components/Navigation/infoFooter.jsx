import { LogoAnimated } from "@/components/logoAnimated";

export function InfoFooter() {
  return (
    <div className="flex items-center justify-center relative border-t-1 border-gray-200">
      <div className="flex flex-row gap-30  basis-1/2 flex-grow p-5">
        <div className="flex flex-col">
          <h5 className="font-bold text-m">More Questions?</h5>
          <p className="text-sm text-gray-400">
            <a href="mailto:teameliza@proton.me">Please contact us at teameliza@proton.me </a>
          </p>
        </div>
       
      </div>
      <div className="flex items-center justify-end p-5 pr-5 ">
        <LogoAnimated />
      </div>
    </div>
  );
}