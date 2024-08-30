import axios from "axios";
import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";

export const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);

  const { contentType }: any = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const response = await axios.get(`/api/${contentType}/trending`);
      setTrendingContent(response.data.content);
    };

    getTrendingContent();
  }, [contentType]);
  return { trendingContent };
};
