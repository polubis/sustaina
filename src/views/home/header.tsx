import React from 'react';
import { Link } from 'gatsby';
import { usePortal } from 'development-kit/use-portal';
import { Button } from 'design-system/button';

const links = [
  {
    label: `About`,
    path: `/about/`,
  },
  {
    label: `Authors`,
    path: `/authors/`,
  },
  {
    label: `Demo`,
    path: `/demo/`,
  },
  {
    label: `Features`,
    path: `/features/`,
  },
  {
    label: `Contact`,
    path: `/contact/`,
  },
] as const;

const Header = () => {
  const { render } = usePortal();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <header className="bg-slate-100">
      <nav className="grid lg:grid-cols-3 py-3 lg:py-0 grid-cols-2 gap-4 items-center justify-items-stretch px-6">
        <div className="font-mono">Logo</div>
        <ul className="lg:flex hidden justify-self-center">
          {links.map((link) => (
            <li className="p-5" key={link.label}>
              <Link
                className="relative hover:before:block hover:before:bottom-[-0.4rem] hover:before:absolute hover:before:w-full hover:before:h-1 hover:before:bg-orange-600 font-sans font-medium hover:text-orange-600 text-xl text-black"
                to={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-self-end">
          <Link to="/app/">
            <Button i={1} rfull>
              App
            </Button>
          </Link>
          <Button
            i={3}
            className="flex lg:hidden ml-4 w-10 h-10 items-center rounded-full justify-center"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z"
                className="fill-black"
              />
            </svg>
          </Button>
        </div>
      </nav>
      {mobileNavOpen &&
        render(
          <>
            <aside className="fixed top-0 left-0 bg-slate-100 overflow-y-auto z-20 h-screen px-6 py-3 min-w-[260px]">
              <header className="flex justify-between items-center">
                <div className="font-mono">Logo</div>
                <Button
                  i={3}
                  className="flex lg:hidden ml-4 w-10 h-10 items-center rounded-full justify-center"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="fill-black"
                        d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                      />
                    </svg>
                  </span>
                </Button>
              </header>
              <ul className="mt-6 mb-10">
                {links.map((link) => (
                  <li
                    className="px-3 py-3 w-full rounded hover:text-orange-600 hover:bg-gray-200/50 hover:cursor-pointer"
                    key={link.label}
                  >
                    <Link className="font-sans font-medium" to={link.path}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link to="/app/">
                <Button i={1} rfull>
                  App
                </Button>
              </Link>
            </aside>
            <div
              className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black/70"
              onClick={() => setMobileNavOpen(false)}
            />
          </>,
        )}
    </header>
  );
};

export { Header };
