"use client";

import { fetchNews } from "@/app/api/newsSlider";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { NewsProps } from "@/app/api/newsApi";

export default function NewsSlider() {
  const [news, setNews] = useState<NewsProps[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  useEffect(() => {
    if (news.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % news.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [news]);

  return (
    <div className="w-full mx-auto p-4">
      {news.length > 0 ? (
        <Carousel
          className="w-full max-w-2xl mx-auto overflow-hidden"
          opts={{ align: "start" }}
        >
          <CarouselContent
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: "transform 0.5s ease-in-out",
              display: "flex",
            }}
          >
            {news.map((artigo, index) => (
              <CarouselItem
                key={artigo.url || index}
                className="flex-none w-full flex justify-center items-center"
              >
                <div className="flex flex-col items-center p-2 w-full">
                  {artigo.image_url ? (
                    <img
                      src={artigo.image_url}
                      alt={artigo.title || "Notícia"}
                      className="h-60 w-full object-cover rounded-md shadow-md"
                    />
                  ) : (
                    <div className="h-60 w-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                      Imagem não disponível
                    </div>
                  )}
                  <h3 className="text-md font-semibold mt-2 text-center line-clamp-2">
                    {artigo.title}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <p className="col-span-full text-center text-gray-600">
          Nenhuma notícia encontrada para o slider.
        </p>
      )}
    </div>
  );
}
