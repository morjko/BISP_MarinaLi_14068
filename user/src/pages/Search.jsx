import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adverts, setAdverts] = useState([]);
  
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    dogs: false,
    cats: false,
    birds: false,
    reptiles: false,
    others: false,
    sort: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const dogsFromUrl = urlParams.get("dogs");
    const catsFromUrl = urlParams.get("cats");
    const birdsFromUrl = urlParams.get("birds");
    const reptilesFromUrl = urlParams.get("reptiles");
    const othersFromUrl = urlParams.get("others");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      dogsFromUrl ||
      catsFromUrl ||
      birdsFromUrl ||
      reptilesFromUrl ||
      othersFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        dogs: dogsFromUrl === "true" ? true : false,
        cats: catsFromUrl === "true" ? true : false,
        birds: birdsFromUrl === "true" ? true : false,
        reptiles: reptilesFromUrl === "true" ? true : false,
        others: othersFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchData = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/advert/get?${searchQuery}`);
        const data = await res.json();
        setAdverts(data);
        setLoading(false);
    } 
    fetchData();

  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "dogs" ||
      e.target.id === "cats" ||
      e.target.id === "birds" ||
      e.target.id === "reptiles" ||
      e.target.id === "others"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("dogs", sidebarData.dogs);
    urlParams.set("cats", sidebarData.cats);
    urlParams.set("birds", sidebarData.birds);
    urlParams.set("reptiles", sidebarData.reptiles);
    urlParams.set("others", sidebarData.others);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-10 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold text-green-600">
              Search term:
            </label>
            <input
              className="border border-rose-400 p-2 w-full rounded-md"
              type="text"
              id="searchTerm"
              placeholder="Search"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <label className="font-semibold text-green-600">Pet type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="dogs"
                checked={sidebarData.dogs}
                onChange={handleChange}
              />
              <span>Dogs</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="cats"
                checked={sidebarData.cats}
                onChange={handleChange}
              />
              <span>Cats</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="birds"
                checked={sidebarData.birds}
                onChange={handleChange}
              />
              <span>Birds</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="reptiles"
                checked={sidebarData.reptiles}
                onChange={handleChange}
              />
              <span>Reptiles</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="others"
                checked={sidebarData.others}
                onChange={handleChange}
              />
              <span>Others</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="font-semibold text-green-600">Sort:</label>
            <select
              className="border border-rose-400 p-2 rounded-md"
              id="sort_order"
              defaultValue={"created_at_desc"}
              onChange={handleChange}
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="price_asc">Price low to high</option>
              <option value="price_desc">Price high to low</option>
            </select>
          </div>

          <button className="bg-rose-400 text-white uppercase p-2 rounded-md hover:bg-green-600">
            Search
          </button>
        </form>
      </div>

      <div className="p-10">
        <h1 className="text-2xl font-bold text-green-600">Results:</h1>
      </div>
    </div>
  );
}
