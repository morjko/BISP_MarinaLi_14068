import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaCat,
  FaDog,
  FaEllipsisH,
  FaEnvelope,
  FaFrog,
  FaKiwiBird,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact.jsx";

export default function Advert() {
  const params = useParams();
  const [advert, setAdvert] = useState(null);
  const [error, setError] = useState(false);
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchAdvert = async () => {
      try {
        const res = await fetch(`/api/advert/get/${params.advertId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setAdvert(data);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchAdvert();
  }, [params.advertId]);

  return (
    <div className="border border-green-600">
      {error && (
        <p className="text-red-600 text-center my-10 font-nunito">
          There is an error to load an advert
        </p>
      )}

      {advert && !error && (
        <div
          className="max-w-6xl mx-auto font-nunito"
          style={{ display: "flex" }}
        >
          <div className="max-w-2/3 w-1/2 custom-height flex flex-col gap-4 place-content-center mr-10">
            <p className="text-4xl font-bold">{advert.name}</p>

            <div className="flex items-center gap-1 text-lg">
              <FaMapMarkedAlt />
              <p>
                {advert.location} -{" "}
                <span className="font-extrabold">{advert.price}</span> UZS /
                hour
              </p>
            </div>

            <div className="">{advert.bio}</div>

            <ul>
              <p className="text-lg font-bold">Can look after:</p>
              {advert.dogs && (
                <li className="flex items-center gap-2">
                  <FaDog />
                  Dogs
                </li>
              )}
              {advert.cats && (
                <li className="flex items-center gap-2">
                  <FaCat />
                  Cats
                </li>
              )}
              {advert.birds && (
                <li className="flex items-center gap-2">
                  <FaKiwiBird />
                  Birds
                </li>
              )}
              {advert.reptiles && (
                <li className="flex items-center gap-2">
                  <FaFrog />
                  Reptiles
                </li>
              )}
              {advert.others && (
                <li className="flex items-end gap-2">
                  <FaEllipsisH />
                  Others
                </li>
              )}
            </ul>

            {currentUser && advert.userRef !== currentUser._id && !contact && (
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-green-600 text-lg" />
                <button
                  onClick={() => setContact(true)}
                  className="flex text-align-left text-green-600 hover:underline uppercase font-bold text-lg"
                >
                  Contact
                </button>
              </div>
            )}
            {contact && <Contact advert={advert} />}
          </div>

          <Swiper navigation>
            {advert.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="custom-height"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "350px",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
