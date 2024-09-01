import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMAGE_BASE_URL } from "../utils/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const MovieSlider = ({ category }: any) => {
  const { contentType }: any = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const formatedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formatedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(`/api/${contentType}/${category}`);
      setContent(response.data.content);
    };

    getContent();
  }, [contentType, category]);

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="text-white bg-black px-5 md:px-20 relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h1 className="text-2xl font-bold">
        {formatedCategoryName} {formatedContentType}
      </h1>

      <div
        className="flex space-x-4 mt-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item: any) => (
          <Link
            to={`/watch/${contentType}/${item.id}`}
            key={item.id}
            className="min-w-[250px] relative group"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMAGE_BASE_URL + item.backdrop_path}
                alt={item.title}
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="text-center text-sm font-normal mt-2">
              {item.title || item.name}
            </p>
          </Link>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            onClick={handleScrollLeft}
            className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 mx-24"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleScrollRight}
            className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 mx-24"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};
