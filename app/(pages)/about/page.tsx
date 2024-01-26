import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { AiOutlineSkype } from "react-icons/ai";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import PageBanner from "@/components/page-banner";
import Footer from "@/components/footer";

const About = () => {
  return (
    <>
      <PageBanner title="About" />
      <div className="mx-auto max-w-4xl divide-y py-20">
        <div className="pb-6">
          <div className="h-24 bg-border sm:h-20 lg:h-28" />
          <div className="mt-12 flow-root px-4 sm:mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16">
            <div>
              <div className="-mt-1 flex">
                <div className="inline-flex overflow-hidden rounded-lg border-4 border-ring">
                  <Image
                    src="/mislam.jpg"
                    alt="portfolio picture"
                    width={400}
                    height={400}
                    className="h-24 w-24 shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                  />
                </div>
              </div>
            </div>
            <div className="sm:ml-4 grid grid-cols-1">
              <div className="mb-8">
                <div className="flex items-center">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Monirul Islam
                  </h3>
                  <span className="ml-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-green-400">
                    <span className="sr-only">Online</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500 text-left">@mailmonir</p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    <HiOutlineEnvelope className="w-5 h-auto text-gray-300 mr-2" />
                    Message
                  </Button>
                </Link>
                <a href="https://wa.me/1749277075" type="button">
                  <Button variant="outline" className="w-full">
                    <FaWhatsapp className="w-5 h-auto text-gray-300 mr-2" />
                    WhatsApp
                  </Button>
                </a>
                <a href="skype:monir.mnu?chat" type="button">
                  <Button variant="outline" className="w-full">
                    <AiOutlineSkype className="w-5 h-auto text-gray-300 mr-2" />{" "}
                    Skype
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-0 sm:py-0">
          <dl className="grid grid-cols-1 gap-4 divide-y">
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium sm:w-40 sm:shrink-0 lg:w-48">
                Bio
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground sm:col-span-2 sm:ml-6 sm:mt-0">
                <p>
                  I served in the various private organizations as a Mechanical
                  Engineer for seventeen long years. From my student life, I had
                  a passion for computer programming, but had no opportunity to
                  move forward. Recently I&apos;ve quit my job and started
                  programming. I&apos;ve studied HTML, CSS, Javascript, React,
                  Nextjs, Node and Wordpress. I love Javascript, React and
                  Nextjs the most. I aim to become a full-fledged full stack
                  Javascript developer though I&apos;m quite good at Wordpress.
                  I think and believe that Javascript is the future.
                </p>
              </dd>
            </div>
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium sm:w-40 sm:shrink-0 lg:w-48">
                Location
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground sm:grid-cols-2 sm:ml-6 sm:mt-0">
                Uttara, Dhaka, Bangladesh
              </dd>
            </div>
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium sm:w-40 sm:shrink-0 lg:w-48">
                Birthday
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground sm:grid-cols-2 sm:ml-6 sm:mt-0">
                <time dateTime="1982-06-23">August 09, 1975</time>
              </dd>
            </div>
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium sm:w-40 sm:shrink-0 lg:w-48">
                Email
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground sm:grid-cols-2 sm:ml-6 sm:mt-0">
                <time dateTime="1982-06-23">mailmonir@gmail.com</time>
              </dd>
            </div>
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium sm:w-40 sm:shrink-0 lg:w-48">
                Phone
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground sm:grid-cols-2 sm:ml-6 sm:mt-0">
                <time dateTime="1982-06-23">+8801749277075</time>
              </dd>
            </div>
            <div className="sm:flex sm:px-6 sm:py-5">
              <dt className="text-sm font-medium sm:w-40 sm:shrink-0 lg:w-48">
                Website
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground sm:grid-cols-2 sm:ml-6 sm:mt-0">
                <a className="hover:underline" href="https://mislam.varcel.app">
                  mislam.varcel.app
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default About;
