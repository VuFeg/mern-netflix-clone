import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../../store/content";
import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import {
  ORIGINAL_IMAGE_BASE_URL,
  SMALL_IMAGE_BASE_URL,
} from "../../utils/constant";
import { formatReleaseDate } from "../../utils/dateFunction";
import { WatchPageSkeleton } from "../../components/skeletons/WatchPageSkeleton";

export const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers]: any = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent]: any = useState({});
  const { contentType }: any = useContentStore();
  const sliderRef: any = useRef();

  // Fetch content trailer
  useEffect(() => {
    try {
      const getTrailers = async () => {
        const response = await axios.get(`/api/${contentType}/${id}/trailers`);
        setTrailers(response.data.trailers);
      };

      getTrailers();
    } catch (error: any) {
      if (error.message.includes("404")) {
        setTrailers([]);
      }
    } finally {
      setLoading(false);
    }
  }, [contentType, id]);

  // Fetch similar content
  useEffect(() => {
    try {
      const getSimilarContent = async () => {
        const response = await axios.get(`/api/${contentType}/${id}/similar`);
        setSimilarContent(response.data.similar);
      };

      getSimilarContent();
    } catch (error: any) {
      if (error.message.includes("404")) {
        setSimilarContent([]);
      }
    }
  }, [contentType, id]);

  useEffect(() => {
    try {
      const getContentDetails = async () => {
        const response = await axios.get(`/api/${contentType}/${id}/details`);
        setContent(response.data.content);
      };

      getContentDetails();
    } catch (error: any) {
      if (error.message.includes("404")) {
        setContent({});
      }
    }
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

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

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/70 hover:bg-gray-500 py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Movie trailer */}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>
            </h2>
          )}
        </div>

        {/* Movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMAGE_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* Similar content */}
        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Show</h3>
            <div
              className="flex overflow-x-hidden scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((item: any) => (
                <Link
                  key={item.id}
                  to={`/watch/${item.id}`}
                  className="w-52 flex-none"
                >
                  <img
                    src={SMALL_IMAGE_BASE_URL + item.poster_path}
                    alt="Poster path"
                    className="w-full h-auto rounded-md"
                  />
                  <h4 className="mt-2 text-lg font-semibold">
                    {item.title || item.name}
                  </h4>
                </Link>
              ))}
              <ChevronLeft
                onClick={handleScrollLeft}
                className="absolute top-1/2 -translate-y-1/2 left-2 size-8 opacity-0 group-hover:opacity-100 rounded-full
                   transition-all duration-300 bg-red-600 text-white cursor-pointer"
              />
              <ChevronRight
                onClick={handleScrollRight}
                className="absolute top-1/2 -translate-y-1/2 right-2 size-8 opacity-0 group-hover:opacity-100 rounded-full 
                  transition-all duration-300 bg-red-600 text-white cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
