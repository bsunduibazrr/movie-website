import { EmailIcon, LastIcon, PhoneIcon } from "../icons/icons";

export const FooterSection = () => {
  return (
    <div className="pt-12">
      <div className="bg-[#4338CA] w-full max-sm:w-[375px]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <LastIcon />
            <p className="text-white text-[16px] font-normal pt-3">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>

          <div>
            <p className="text-white text-[14px] font-semibold mb-3">
              Contact Information
            </p>

            <div className="flex items-start gap-3 mb-4">
              <EmailIcon />
              <p className="text-white text-sm">
                Email: <br /> support@movieZ.com
              </p>
            </div>

            <div className="flex items-start gap-3">
              <PhoneIcon />
              <p className="text-white text-sm">
                Phone: <br /> +976 (11) 123-4567
              </p>
            </div>
          </div>

          <div>
            <p className="text-white text-[14px] font-semibold mb-3">
              Follow Us
            </p>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-white text-sm hover:underline">
                Facebook
              </a>
              <a href="#" className="text-white text-sm hover:underline">
                Instagram
              </a>
              <a href="#" className="text-white text-sm hover:underline">
                Twitter
              </a>
              <a href="#" className="text-white text-sm hover:underline">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
