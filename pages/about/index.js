import React from "react";
import Head from "next/head";
import Image from "next/image";
import GoogleMapReact from "google-map-react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import {
  TbBrandNextjs,
  TbBrandFirebase,
  TbBrandVercel,
  TbBrandTailwind,
} from "react-icons/tb";

const About = () => {
  const slideList = [
    {
      src_img: "/slideImg/slideImg_01.png",
    },
    {
      src_img: "/slideImg/slideImg_02.png",
    },
    {
      src_img: "/slideImg/slideImg_03.png",
    },
    {
      src_img: "/slideImg/slideImg_04.png",
    },
  ];
  const toolList = [
    {
      name: "NextJS",
      color: "shadow-primary",
      icon: <TbBrandNextjs size={60} />,
      url: "https://nextjs.org/",
    },
    {
      name: "TailwindCSS",
      color: "shadow-secondary",
      icon: <TbBrandTailwind size={60} />,
      url: "https://tailwindcss.com/",
    },
    {
      name: "Vercel",
      color: "shadow-primary",
      icon: <TbBrandVercel size={60} />,
      url: "https://vercel.com/",
    },
    {
      name: "Firebase",
      color: "shadow-secondary",
      icon: <TbBrandFirebase size={60} />,
      url: "https://firebase.google.com/",
    },
  ];

  const defaultProps = {
    center: {
      lat: 5.35416525,
      lng: 100.30083213,
    },
    zoom: 17,
  };

  return (
    <>
      <Head>
        <title>OSP@USM | About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 sm:py-8 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full">
              <h1 className="text-xl sm:text-2xl font-bold uppercase text-center tracking-widest">
                About Us
              </h1>
              <div className="divider uppercase font-bold">History</div>
              <div className="w-full h-[30vh] relative bg-gray-100 rounded-lg">
                <Image
                  src="/usm_full_logo.png"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  alt="USM Logo"
                />
              </div>
              <br />
              <p className="text-justify">
                The idea of a university in Penang was first mooted by D. S.
                Ramanathan in 1959 in the State Assembly and later crystallised
                when he was nominated chairman of the Penang University Project
                committee. The acquisition of a piece of land in Sungai Ara was
                then followed by the ceremonial laying of the foundation stone
                by the then Prime Minister of Malaysia, Y.T.M Tunku Abdul Rahman
                Putra Al-Haj on 7 August 1967. USM was established as a
                statutory body in 1969 as the second university in Malaysia. It
                was first known as Universiti Pulau Pinang. The university
                operated on borrowed premises at the Malayan Teachers&apos;
                Training College at Gelugor. In 1971, it moved to its present
                239-hectare site at Minden (formerly Minden Barracks of the
                British Far East Command) in Gelugor, 10 kilometres from the
                city of Georgetown. There are two other USM campuses: one at
                Kubang Kerian in Kelantan, known as the Health campus, and the
                other at Seri Ampangan, Nibong Tebal in Penang, known as the
                Engineering campus. The former houses the School of Medical
                Sciences, the School of Health Sciences and the School of Dental
                Sciences, while the latter houses the six engineering schools.
                Universiti Sains Malaysia teaches in the fields of Pure
                Sciences, Applied Sciences, Pharmaceutical Sciences, Building
                Science and Technology, Social Sciences, Humanities and
                Education as well as conducts research. USM offers courses at
                undergraduate and postgraduate levels to more than 28,000
                students. USM has won the Asian Innovation Award in which USM
                emerged as the only winner from this country.
              </p>
            </div>
            <div className="divider uppercase font-bold">Photos</div>
            {/* Start of Carousel */}
            <div className="carousel w-full sm:w-[90%] h-[40vh] sm:h-[60vh] rounded-2xl">
              {slideList.map((item, index) => (
                <div
                  key={index}
                  id={index}
                  className="carousel-item relative w-full"
                >
                  <Image
                    src={item.src_img}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Slide Images"
                  />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a
                      href={
                        index == 0
                          ? "#" + (slideList?.length - 1)
                          : "#" + (index - 1)
                      }
                      className="btn btn-circle"
                    >
                      <AiOutlineArrowLeft size={20} />
                    </a>
                    <a
                      href={
                        index == slideList.length - 1 ? "#0" : "#" + (index + 1)
                      }
                      className="btn btn-circle"
                    >
                      <AiOutlineArrowRight size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {/* End of Carousel */}
            <div className="divider uppercase font-bold">We are here!</div>
            {/* Start of USM Map */}
            <div className="card card-compact w-full bg-base-100 shadow-xl">
              <figure className=" w-full h-[60vh]">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
                  }}
                  center={defaultProps.center}
                  zoom={defaultProps.zoom}
                ></GoogleMapReact>
              </figure>
            </div>
            {/* End of USM Map */}
            <div className="divider uppercase font-bold">Technologies used</div>
            {/* Start of Tool Use */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-fit">
              {toolList.map((item, index) => (
                <div
                  key={index}
                  className={
                    "card card-compact bg-base-100 shadow-md " + item.color
                  }
                >
                  <div className="card-body items-center text-center">
                    {item.icon}
                    <h2 className="card-title">{item.name}</h2>
                    <div className="card-actions justify-end">
                      <a href={item.url} className="btn btn-primary btn-sm">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* End of Tool Use */}
            <div className="divider uppercase font-bold">Source Code</div>
            {/* Start of Source Code */}
            <p>
              If you wish to see the source code for this website,
              <a
                href="https://github.com/Aiman217/osp-usm-nextjs"
                className="link link-primary ml-1"
              >
                click here.
              </a>
            </p>
            <br />
            <p>If you wish to contribute, please follow the steps below.</p>
            <br />
            <div
              tabIndex="0"
              className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box w-[90%]"
            >
              <div className="collapse-title text-lg font-medium">Step 1</div>
              <div className="collapse-content">
                <p>Go to github link provided above and fork the repository.</p>
              </div>
            </div>
            <br />
            <div
              tabIndex="0"
              className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box w-[90%]"
            >
              <div className="collapse-title text-lg font-medium">Step 2</div>
              <div className="collapse-content">
                <p>
                  Do any changes that you consider fit for the improvement of
                  this website.
                </p>
              </div>
            </div>
            <br />
            <div
              tabIndex="0"
              className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box w-[90%]"
            >
              <div className="collapse-title text-lg font-medium">Step 3</div>
              <div className="collapse-content">
                <p>
                  Make pull request and answer any questions if ask by the
                  repository owner.
                </p>
              </div>
            </div>
            {/* End of Source Code */}
            <div className="divider uppercase font-bold"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
