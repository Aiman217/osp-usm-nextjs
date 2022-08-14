import React from "react";
import Head from "next/head";
import GoogleMapReact from "google-map-react";
import { ImLocation } from "react-icons/im";

const LocationMarker = ({ text }) => (
  <div className="text-black font-bold">
    <ImLocation size={25} className=" text-red-600"/>
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
      <div className="py-4 w-[90%] sm:w-[80%] h-full">
        <h1>Hello Map</h1>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API }}
          center={defaultProps.center}
          zoom={defaultProps.zoom}
        >
          <LocationMarker
            lat={5.35416525}
            lng={100.30083213}
            text="Universiti Sains Malaysia"
          />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default About;
