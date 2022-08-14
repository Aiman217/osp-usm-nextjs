import React from "react";
import Head from "next/head";
import GoogleMapReact from "google-map-react";
import { ImLocation } from "react-icons/im";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const LocationMarker = ({ text }) => (
  <div className="text-black font-bold">
    <ImLocation size={25} className=" text-red-600" />
    {text}
  </div>
);

const About = () => {
  const defaultProps = {
    center: {
      lat: 5.35416525,
      lng: 100.30083213,
    },
    zoom: 15,
  };

  return (
    <>
      <Head>
        <title>OSP@USM | About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="w-full flex flex-col justify-center gap-4">
            <div className="card card-compact w-full bg-base-100 shadow-xl">
              <figure className=" w-full h-80">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
                  }}
                  center={defaultProps.center}
                  zoom={defaultProps.zoom}
                >
                  <LocationMarker
                    lat={5.35416525}
                    lng={100.30083213}
                    text="Universiti Sains Malaysia"
                  />
                </GoogleMapReact>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title uppercase">We are here!</h2>
              </div>
            </div>
            <div className="carousel w-full h-40 rounded-2xl">
              <div id="slide1" className="carousel-item relative w-full">
                <img src="https://placeimg.com/800/200/arch" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">
                    <AiOutlineArrowLeft size={20} />
                  </a>
                  <a href="#slide2" className="btn btn-circle">
                    <AiOutlineArrowRight size={20} />
                  </a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full">
                <img src="https://placeimg.com/800/200/arch" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">
                    <AiOutlineArrowLeft size={20} />
                  </a>
                  <a href="#slide3" className="btn btn-circle">
                    <AiOutlineArrowRight size={20} />
                  </a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full">
                <img src="https://placeimg.com/800/200/arch" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">
                    <AiOutlineArrowLeft size={20} />
                  </a>
                  <a href="#slide1" className="btn btn-circle">
                    <AiOutlineArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
