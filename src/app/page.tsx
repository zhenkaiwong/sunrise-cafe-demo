import { Great_Vibes } from "next/font/google";
import Link from "next/link";
import Suggestions from "@/ui/Suggestion";

const greateVibes = Great_Vibes({ weight: "400", subsets: ["cyrillic", "latin"] });

export default function Home() {
  return (
    <>
      <div className="flex h-screen justify-center bg-[url(/sunrise-cafe-banner.jpg)] bg-cover bg-center md:justify-start">
        <div className="absolute inset-0 -z-10 bg-black/10"></div>
        <div className="my-auto text-center md:ml-[10vw] md:text-right">
          <h1 className={`${greateVibes.className} mb-8 text-8xl text-white`}>
            Sunrise Cafe
          </h1>
          <p className={`mb-8 text-xl text-white`}>
            Dedicated to provide a good morning coffee
          </p>
          <Link
            href={"/menu"}
            className="rounded-lg border-2 border-solid border-white p-2.5 text-xl text-white italic transition duration-300 hover:cursor-pointer hover:bg-white hover:text-black"
          >
            View Menu
          </Link>
        </div>
      </div>

      <div className="flex justify-around pt-[50px]">
        <Suggestions label="Best in town" />
      </div>
    </>
  );
}
