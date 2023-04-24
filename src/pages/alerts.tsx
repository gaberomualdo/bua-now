import Container from "@/components/Container";
import ResponsiveContainer from "@/components/Responsive";
import config from "@/lib/config";
import Head from "next/head";

export default function Alerts() {
  return (
    <Container>
      <Head>
        <title>{`Alerts – ${config.title}`}</title>
        <meta name="description" content="Get alerts from BUA Now." />
      </Head>
      <div className="grow flex-1 w-full h-full flex flex-col justify-center items-center">
        <ResponsiveContainer>
          <div className="w-full border rounded-md flex overflow-hidden">
            <div className="flex-1 w-2/3 bg-gray-50 py-12">
              <h1 className="text-3xl text-gray-800 text-center">
                <span className="font-semibold">Do you care about BUA?</span>
              </h1>
              <p className="text-lg opacity-70 text-center mt-1.5">
                Yes? Sign up for alerts from BUA Now.
              </p>
              <div className="space-y-0.5 mx-auto w-96 mt-6">
                {[
                  "New articles every week, if not every day",
                  "Keep updated on everything at BUA",
                  "Get a simple notification with new articles",
                  "Access reporting direct from BUA students",
                  "Support the BUA Now team",
                ].map((e, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <span className="text-blue-600 text-2xl font-bold">✓</span>
                    <span className="opacity-80">{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-l p-10 flex flex-col items-center justify-center">
              <h1 className="font-semibold text-2xl text-gray-800 text-center">
                Sign Up For Alerts
              </h1>
              <p className="text-center text-gray-500 text-sm mt-1">
                Get a text every time we release a new article.
              </p>
              <div className="flex justify-between space-x-3 mt-5">
                <input
                  className="w-full px-4 py-2.5 h-12 bg-gray-100 rounded-md outline-none focus:bg-gray-200 transition-all"
                  type="text"
                  placeholder="Your Phone Number"
                />
                <button className="bg-blue-600 text-white rounded-md h-12 py-2.5 text-center font-medium px-4 transition-all hover:bg-blue-500 active:bg-blue-700">
                  Sign&nbsp;Up
                </button>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
