import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

import storyImage from "@/../public/story.jpg";
import baristaImage from "@/../public/basista.jpg";
import findUsImage from "@/../public/find-us.jpg";
import InquiryForm from "@/ui/InquiryForm";

export default function AboutUsPage() {
  return (
    <div className="sm:mt-10 md:m-10 lg:m-20 2xl:flex 2xl:justify-center">
      <AboutUs />
    </div>
  );
}

export function AboutUs() {
  return (
    <div className="flex max-w-[1536px] flex-col gap-20">
      <Section
        title="Our Story"
        image={storyImage}
        imageAlt="A picture of Sunrise Cafe inside"
      >
        Founded with a passion for quality and community, our journey began with
        a simple idea: to create a welcoming space where good coffee and
        meaningful moments come together. From a humble corner to a place where
        people gather, share, and recharge, we’ve grown through our commitment
        to craftsmanship, sustainability, and sincere hospitality.
      </Section>
      <Section
        title="Meet the barista"
        image={baristaImage}
        imageAlt="A picture of the Sunrise Cafe barista"
        reverse
      >
        Say hello to <strong>Elena Wu</strong>, our head barista and the heart
        of our café. With over 8 years of experience behind the bar, Elena honed
        her craft at the renowned Sunrise Café in Melbourne — a spot famous for
        its latte art and specialty single-origin brews.
      </Section>
      <Section
        title="Find us"
        image={findUsImage}
        imageAlt="A picture of Sunrise Cafe store"
      >
        Come visit our store located in the heart of the city. Designed with
        comfort and calm in mind, our space features natural light, curated
        interiors, and cozy corners for work or conversation. We’re open seven
        days a week — stop by, say hello, and stay awhile.
      </Section>
      <WhereWeAre />
      <ContactUs />
    </div>
  );
}

function WhereWeAre() {
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl font-bold lg:text-6xl">Our Location</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.1138041222466!2d101.66164057691772!3d3.0642361969115064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4b07b7a2e615%3A0xe789f4d85e36bd87!2sCasa%20Green!5e0!3m2!1sen!2smy!4v1745926619751!5m2!1sen!2smy"
        className="h-120 w-full border-0 p-5 md:p-0"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

function ContactUs() {
  return <InquiryForm />;
}

function Section(props: {
  title: string;
  image: StaticImageData;
  imageAlt: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-20 pb-4 md:justify-between lg:pb-16 ${
        props.reverse ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"
      }`}
    >
      <Image
        src={props.image}
        alt={props.imageAlt}
        width={450}
        height={800}
        className="max-w-[450px] flex-1"
      />
      <div className="flex-1 p-10 md:p-0">
        <h1 className="pb-8 text-4xl">
          <strong>{props.title}</strong>
        </h1>
        <p>{props.children}</p>
      </div>
    </div>
  );
}
