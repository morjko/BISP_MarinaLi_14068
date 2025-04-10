import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdvertCard({ advert }) {
  return (
    <div className="bg-white hover:scale-105 duration-500 hover:shadow-xl overflow-hidden rounded-xl w-full sm:w-[250px]">
      <Link to={`/advert/${advert._id}`} className="h-[250px] sm:h-[150px] w-full object-cover">
        <img
          src={advert.imageUrls[0]}
          alt="Advert"
          className="h-[250px] sm:h-[150px] w-full object-cover rounded-xl"
        />

        <div className="w-full flex flex-col gap-2 p-2">
          <p className="truncate text-green-600 font-bold">{advert.name}</p>
          <div className="flex gap-1 items-center">
            <FaMapMarkedAlt className="text-green-600" />
            <p className="truncate text-sm text-gray-700">{advert.location}</p>
          </div>

        <p className="w-full truncate text-sm font-semibold text-gray-500">
            {advert.price} UZS / hour
        </p>
        </div>
      </Link>
    </div>
  );
}
