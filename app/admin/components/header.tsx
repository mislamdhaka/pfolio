import { Dropdown } from "./dropdown";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex shrink-0 h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 ring-0 sm:px-6 lg:px-8">
      <button type="button" className="p-2.5 text-gray-700 -m-2.5 lg:hidden">
        <span className="sr-only">Open sidebar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div className="bg-gray-200 w-px h-6" aria-hidden="true" />
      <div className="self-stretch flex flex-1 gap-x-4 lg:gap-x-6">
        <form className="flex flex-1 relative" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="search-field"
            className="block w-full h-full border-0 py-0 pl-8 pr-0 text-gray-900 sm:text-sm focus:ring-0"
            placeholder="Search..."
            type="search"
            name="search"
            autoComplete="off"
          />
        </form>
        <div className="flex items-center gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-gray-400">
            <span className="sr-only">View notifications</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
          <div className="bg-gray-200 w-px h-6" aria-hidden="true" />
          <div className="relative" data-headlessui-state="">
            {/* <button
              className="flex items-center -mx-1.5 p-1.5"
              id="headlessui-menu-button-1"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  Tom Cook
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-gray-400 h-5 w-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <div
              className="bg-white border w-32 border-gray-200 mt-2.5 py-2 rounded-md absolute right-0 shadow-md z-10 scale-100 origin-top-right ring-0"
              aria-labelledby="headlessui-menu-button-1"
              id="headlessui-menu-items-15"
              role="menu"
              tabIndex={0}
              data-headlessui-state="open"
            >
              <a
                href="#"
                className="block text-sm px-3 py-1 text-gray-900 leading-6"
                id="headlessui-menu-item-16"
                role="menuitem"
                tabIndex={-1}
                data-headlessui-state=""
              >
                Your profile
              </a>
              <a
                href="#"
                className="block text-sm px-3 py-1 text-gray-900 leading-6"
                id="headlessui-menu-item-17"
                role="menuitem"
                tabIndex={-1}
                data-headlessui-state=""
              >
                Sign out
              </a>
            </div> */}
            <Dropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
