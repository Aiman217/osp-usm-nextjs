import React from "react";
import Head from "next/head";
import Image from "next/image";
import GoogleMapReact from "google-map-react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

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
            <div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase">About Us</h1>
            </div>
          <div className="divider"></div>
            {/* Start of Carousel */}
            <div className="carousel w-full sm:w-[60%] h-[40vh] rounded-2xl">
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
            <div className="divider"></div>
            {/* Start of USM Map */}
            <div className="card card-compact w-full bg-base-100 shadow-xl">
              <figure className=" w-full h-[60vh]">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
                  }}
                  center={defaultProps.center}
                  zoom={defaultProps.zoom}
                >
                </GoogleMapReact>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title uppercase">We are here!</h2>
              </div>
            </div>
            {/* End of USM Map */}
            <div className="divider"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
