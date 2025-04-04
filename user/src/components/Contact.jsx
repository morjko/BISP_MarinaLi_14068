import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ advert }) {
  const [sitter, setSitter] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSitter = async () => {
      try {
        const res = await fetch(`/api/user/${advert.userRef}`);
        const data = await res.json();
        setSitter(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSitter();
  }, [advert.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {sitter && (
        <div className="flex flex-col gap-2">
          <p className="text-green-600 font-semibold">
            Contact <span className="font-bold">{sitter.username}</span>
          </p>
          <textarea
            className="w-full border p-2 border-green-600 rounded-md"
            placeholder="Enter message here"
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
          ></textarea>
          <Link
            to={`mailto:${sitter.email}?subject=Regarding your job advert&body=${message}`}
            className="text-green-600 font-bold hover:underline"
          >
            Send
          </Link>
        </div>
      )}
    </>
  );
}
