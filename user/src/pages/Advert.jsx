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
  const {currentUser} = useSelector((state) => state.user);
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
    <div>
      {error && (
        <p className="text-red-600 text-center my-10">
          There is an error to load an advert
        </p>
      )}

      {advert && !error && (
        <div className="max-w-4xl mx-auto" style={{ display: "flex"}}>
          <div className="max-w-2/3 w-1/2 h-[600px] text-green-600 flex flex-col gap-4 place-content-center mr-10">
            <div>
              <p className="text-4xl font-semibold">{advert.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkedAlt className="text-rose-400" />
              <p>
                {advert.location} -{" "}
                <span className="font-bold">{advert.price}</span> UZS / hour
              </p>
            </div>
            <div>
              <p className="font-bold">
                About <span className="text-sm">{advert.name}</span>
              </p>
              <p className="text-sm">{advert.bio}</p>
            </div>
            <ul>
              <p className="font-bold">Can look after:</p>
              {advert.dogs && (
                <li className="flex items-center gap-2">
                  <FaDog className="text-rose-400" />
                  Dogs
                </li>
              )}
              {advert.cats && (
                <li className="flex items-center gap-2">
                  <FaCat className="text-rose-400" />
                  Cats
                </li>
              )}
              {advert.birds && (
                <li className="flex items-center gap-2">
                  <FaKiwiBird className="text-rose-400" />
                  Birds
                </li>
              )}
              {advert.reptiles && (
                <li className="flex items-center gap-2">
                  <FaFrog className="text-rose-400" />
                  Reptiles
                </li>
              )}
              {advert.others && (
                <li className="flex items-end gap-2">
                  <FaEllipsisH className="text-rose-400" />
                  Others
                </li>
              )}
            </ul>

            {currentUser && advert.userRef !== currentUser._id && !contact && (
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-rose-400 text-lg" />
                <button onClick={() => setContact(true)} className="flex text-align-left text-rose-400 hover:underline uppercase font-bold text-lg">
                  Contact
                </button>
              </div>
            )}
            {contact && <Contact advert = {advert} />}
          </div>

          <Swiper navigation>
            {advert.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[600px]"
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
