import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="">
      <div className="bg-homeBackgroundImg bg-no-repeat bg-cover bg-bottom w-full custom-height ">
        <h1 className="font-nunito font-extrabold text-green-600 text-2xl lg:text-4xl w-full text-center pt-10">
          Trusted Sitters, Happy Pets!
        </h1>
        <Link to={'/sign-up'} className="w-full flex justify-center pt-3 text-sm hover:underline text-green-600">
        Get Started!
        </Link>
      </div>

      <div className="h-screen py-5 max-w-6xl mx-auto">
        <h1 className="font-nunito font-extrabold text-green-600 text-2xl lg:text-4xl w-full text-center pt-10">
          Our Mission is To Make Your Pets Happiness Our Priority!
        </h1>

        <div className="flex gap-6 my-20">
          <div className="flex flex-col gap-6 text-center bg-white w-1/4 rounded-2xl p-2 hover:scale-105 duration-500">
            <img src="card-1.png" className="h-[200px] w-[200px] self-center" />
            <h2 className="font-nunito font-semibold text-2xl text-green-600">
              Trust
            </h2>
            <p className="font-nunito">
              We only hire experienced sitters who are background-checked and
              vetted.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-center bg-white w-1/4 rounded-2xl p-2 hover:scale-105 duration-500">
            <img src="card-2.png" className="h-[200px] w-[200px] self-center" />
            <h2 className="font-nunito font-semibold text-2xl text-green-600">
              Love
            </h2>
            <p className="font-nunito">
              We are pet lovers at heart, ensuring your pets feel special and
              cared for.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-center bg-white w-1/4 rounded-2xl p-2 hover:scale-105 duration-500">
            <img src="card-3.png" className="h-[200px] w-[200px] self-center" />
            <h2 className="font-nunito font-semibold text-2xl text-green-600">
              Safety
            </h2>
            <p className="font-nunito">
              Your pets safety is our top priority - our sitters follow strict
              protocols to ensure a secure environment.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-center bg-white w-1/4 rounded-2xl p-2 hover:scale-105 duration-500">
            <img src="card-4.png" className="h-[200px] w-[200px] self-center" />
            <h2 className="font-nunito font-semibold text-2xl text-green-600">
              Flexibility
            </h2>
            <p className="font-nunito">
              From short visits to overnight stays, we offer flexible options to
              fit your needs.
            </p>
          </div>
        </div>

        <div className="flex gap-2 align-center justify-center mx-auto">
          <h1 className="text-center font-nunito text-lg font-bold text-rose-400">
            Let us spoil your pet with attention and care
          </h1>
          <img src="love-sticker.png" className="h-[25px] w-[25px]" />
        </div>
      </div>
    </div>
  );
}
