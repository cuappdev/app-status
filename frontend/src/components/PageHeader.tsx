import AppDevLogo from "./svg/AppDevLogo";

export default function PageHeader() {
  return (
    <div className="flex flex-row bg-[rgba(250,250,250,0.48)] items-center p-4 sm-desktop:py-8 sm-desktop:px-6 justify-between">
      <a href="https://www.cornellappdev.com/">
        <AppDevLogo />
      </a>
      <div className="flex flex-row gap-3 max-sm-desktop:hidden">
        <a
          className="font-compact-disp-rg text-[1rem] text-gray-07 opacity-70 hover:opacity-100 transition-opacity duration-300 py-1 px-4"
          href="https://www.cornellappdev.com/team"
        >
          TEAM
        </a>
        <a
          className="font-compact-disp-rg text-[1rem] text-gray-07 opacity-70 hover:opacity-100 transition-opacity duration-300 py-1 px-4"
          href="https://www.cornellappdev.com/apps"
        >
          APPS
        </a>
        <a
          className="font-compact-disp-rg text-[1rem] text-gray-07 opacity-70 hover:opacity-100 transition-opacity duration-300 py-1 px-4"
          href="https://www.cornellappdev.com/courses"
        >
          COURSES
        </a>
        <a
          className="font-compact-disp-rg text-[1rem] text-gray-07 opacity-70 hover:opacity-100 transition-opacity duration-300 py-1 px-4"
          href="https://www.cornellappdev.com/support"
        >
          SUPPORT
        </a>
        <a
          className="font-compact-disp-rg text-[1rem] text-gray-07 opacity-70 hover:opacity-100 transition-opacity duration-300 py-1 px-4"
          href="https://www.cornellappdev.com/apply"
        >
          APPLY
        </a>
        <a
          className="font-compact-disp-rg text-[1rem] py-1 px-4 text-ruby bg-[#FAECEB] rounded-xl font-bold"
          href="https://www.cornellappdev.com/status"
        >
          STATUS
        </a>
      </div>
    </div>
  );
}
