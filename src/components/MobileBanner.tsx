import { isMobile } from "react-device-detect";

const MobileBanner = () => {
  if (isMobile) {
    return (
      <p
        role="status"
        className="w-full bg-blue-400 p-3 text-center text-sm dark:bg-blue-800 sm:p-4 sm:text-base"
      >
        This typing tester is best experienced on a desktop with a physical
        keyboard.
      </p>
    );
  }

  return null;
};

export default MobileBanner;
