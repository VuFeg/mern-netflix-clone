import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/netflix-logo.png";
import React from "react";
import { ChevronRight } from "lucide-react";
import tv from "../../assets/images/tv.png";
import herovideo from "../../assets/videos/hero-vid.mp4";
import strangerThingsLg from "../../assets/images/stranger-things-lg.png";
import strangerThingsSm from "../../assets/images/stranger-things-sm.png";
import downloadIcon from "../../assets/images/download-icon.gif";
import devicePile from "../../assets/images/device-pile.png";
import videoDevices from "../../assets/videos/video-devices.mp4";
import imgKids from "../../assets/images/kids.png";

const AuthScreen = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/register?email=" + email);
  };

  return (
    <div className="bg-hero relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img src={logo} alt="logo" className="w-32 md:w-52" />
        <Link to={"/login"} className="text-white bg-red-600 py-2 px-4 rounded">
          Sign In
        </Link>
      </header>

      {/* hero section */}
      <div className="max-w-6xl flex flex-col items-center justify-center mx-auto text-center text-white py-56">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimated movies, TV shows, and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create to restart your membership.
        </p>

        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            placeholder="you@example.com"
            id="email"
          />
          <button className="bg-red-600 text-base lg:text-xl px-2 lg:px-4 py-1 md:py-2 rounded flex justify-center items-center">
            Get Started
            <ChevronRight className="size-4 md:size-6" />
          </button>
        </form>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="max-w-6xl flex mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1 relative">
            <img src={tv} alt="Tv image" className="mt-4 z-20" />
            <video
              src={herovideo}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            ></video>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
        <div className="max-w-6xl flex mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1">
            <div className="relative">
              <img
                src={strangerThingsLg}
                alt="Stranger Thongs image"
                className="mt-4"
              />
              <div
                className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500
              rounded-md px-2"
              >
                <img src={strangerThingsSm} alt="image" className="h-full" />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>

                  <img src={downloadIcon} alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorites easily and always have somthing to watch
            </p>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="max-w-6xl flex mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src={devicePile}
              alt="Tv image"
              className="mt-4 z-20 relative"
            />
            <video
              src={videoDevices}
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%] "
              playsInline
              autoPlay={true}
              muted
              loop
            ></video>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 4th section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2">
          {/* Left */}
          <div className="flex-1 relative">
            <img src={imgKids} alt="" className="mt-4" />
          </div>

          {/* Right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
