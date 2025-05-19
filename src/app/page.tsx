import { Great_Vibes } from "next/font/google";
import Link from "next/link";
import { AboutUs } from "./about-us/page";
import Suggestions from "@/ui/Suggestion";

const greateVibes = Great_Vibes({ weight: "400" });

export default function Home() {
  return (
    <>
      <div className="bg-[url(/sunrise-cafe-banner.jpg)] bg-cover bg-center h-screen flex">
        <div className="absolute inset-0 bg-black/10 -z-10"></div>
        <div className="my-auto ml-[10vw] text-right">
          <h1 className={`${greateVibes.className} text-8xl text-white mb-8`}>
            Sunrise Cafe
          </h1>
          <p className={`text-white text-xl mb-8`}>
            Dedicated to provide a good morning coffee
          </p>
          <Link
            href={"/menu"}
            className="text-white text-xl italic hover:cursor-pointer border-solid border-white border-2 p-2.5 rounded-lg hover:bg-white hover:text-black transition duration-300"
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
