import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import { useGetTrendingContent } from "../../hooks/useGetTrendingContent";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMAGE_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constant";
import { useContentStore } from "../../store/content";
import { MovieSlider } from "../../components/MovieSlider";
import { useState } from "react";

const HomeScreen = () => {
  const { trendingContent }: any = useGetTrendingContent();
  const { contentType }: any = useContentStore();
  const [imgLoading, setImgLoading] = useState(true);

  // TODO: Add a loading spinner
  if (!trendingContent) {
    return (
      <div className="relative h-screen text-white">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  }

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />

        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}

        <img
          src={ORIGINAL_IMAGE_BASE_URL + trendingContent?.backdrop_path}
          alt={trendingContent?.title || trendingContent?.name}
          className="absolute top-0 left-0 -z-50 w-full h-full object-cover"
          onLoad={() => setImgLoading(false)}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-40"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center p-8 md:p-16 lg:p-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full -z-30" />
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>

          <div className="flex mt-8 gap-4">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-bold hover:bg-white/80 transition-all duration-300"
            >
              <Play className="size-6 fill-black" />
              Play
            </Link>
            <Link
              to={`/movie/${trendingContent?.id}`}
              className="flex items-center gap-2 bg-gray-500/70 text-white px-4 py-2 rounded font-bold hover:bg-gray-500 transition-all duration-300"
            >
              <Info className="size-6" />
              Movie Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
