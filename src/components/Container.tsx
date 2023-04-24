import { Inter } from "next/font/google";
import { PropsWithChildren, useEffect, useState } from "react";
import ResponsiveContainer from "./Responsive";
import config from "@/lib/config";
import { useRouter } from "next/router";

export default function Container({ children }: PropsWithChildren) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const [tabId, setTabId] = useState(isHome ? "home" : null);
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop),
    });

    // @ts-ignore
    const tab = params?.tab;
    if (["home", "opinions", "facts"].includes(tab) && isHome) {
      setTabId(tab);
    }
  }, []);

  return (
    <>
      <div
        className={`${
          router.pathname === "/alerts" || router.pathname === "/"
            ? "hidden"
            : ""
        } fixed border-t border-gray-700 bg-white px-3 py-3 w-full bottom-0 left-0 z-50`}
        style={{
          backgroundColor: "rgb(25, 28, 31)",
        }}
      >
        <ResponsiveContainer>
          <div className="flex items-center justify-between text-white">
            <p
              className=""
              style={{
                fontSize: "1.05rem",
              }}
            >
              <span className="font-semibold">Do you care about BUA?</span> If
              so, sign up for BUA Now alerts.
            </p>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/alerts"
              className="px-4 py-2.5 rounded-md text-base text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all"
            >
              <span className="font-semibold">Sign Up For Alerts</span> — free
            </a>
          </div>
        </ResponsiveContainer>
      </div>
      <main className={`flex flex-col min-h-screen items-center`}>
        <div
          className="w-full flex-col border-b"
          style={{
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="py-4">
            <ResponsiveContainer>
              <div className="w-full flex justify-between items-center">
                <a href="./">
                  <img
                    src="/logo.png"
                    alt={config.title}
                    className="h-12 w-auto"
                  />
                </a>
                <div className="flex space-x-6 items-center">
                  <a
                    href=""
                    className="pt-0.5 text-gray-800 font-medium border-b border-transparent transition-all hover:border-gray-700"
                  >
                    Write
                  </a>
                  <a
                    href=""
                    className="pt-0.5 text-gray-800 font-medium border-b border-transparent transition-all hover:border-gray-700"
                  >
                    About
                  </a>
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a
                    href="/alerts"
                    className="px-4 py-2.5 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all"
                  >
                    Get Alerts
                  </a>
                </div>
              </div>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-3 border-t">
            {[
              {
                title: "Home",
                id: "home",
              },
              {
                title: "Facts",
                id: "facts",
              },
              {
                title: "Opinions",
                id: "opinions",
              },
            ].map((e, i) => (
              <a
                key={i}
                className={`max-w-1/3 w-32 border-b-2 border-t-2 text-center border-transparent z-50 py-2.5 uppercase tracking-wide font-medium ${
                  e.id === tabId
                    ? "border-b-blue-600 text-blue-700"
                    : "text-gray-800"
                }`}
                style={{
                  fontSize: "0.95rem",
                }}
                href={`/?tab=${e.id}`}
              >
                {e.title}
              </a>
            ))}
          </div>
        </div>
        <div className="grow flex-1 flex flex-col w-full">{children}</div>
        <div
          className={`text-white w-full py-10 ${
            router.pathname === "/alerts" || router.pathname === "/"
              ? ""
              : "mb-16"
          }`}
          style={{
            backgroundColor: "rgb(25, 28, 31)",
          }}
        >
          <ResponsiveContainer>
            <div className="justify-between items-center flex">
              <img
                src="/logo.png"
                alt={config.title}
                className="h-11 w-auto opacity-50"
                style={{
                  filter: "brightness(10000)",
                }}
              />
              <div className="text-right space-y-2">
                <div className="flex space-x-4">
                  {[
                    {
                      title: "Instagram",
                      href: "",
                    },
                    {
                      title: "Write",
                      href: "",
                    },
                    {
                      title: "About",
                      href: "",
                    },
                  ].map((e, i) => (
                    <a
                      href={e.href}
                      key={i}
                      className="font-medium hover:underline"
                    >
                      {e.title}
                    </a>
                  ))}
                </div>
                <p className="opacity-70">
                  &copy; BUA Now {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      </main>
    </>
  );
}
