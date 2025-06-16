"use client";

import { CalendarDays, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NewsCardProps {
  title: string;
  image_url?: string;
  description?: string;
  pubDate?: string;
  url?: string;
}

export default function NewsCard({
  title,
  image_url,
  description,
  pubDate,
  url,
}: NewsCardProps) {
  const formattedDate = pubDate
    ? new Date(pubDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo",
      })
    : "Data desconhecida";

  const [openModal, setOpenModal] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  async function fetchYouTubeVideoId(query: string) {
    setLoadingVideo(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
          query
        )}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      const id = data.items?.[0]?.id?.videoId;
      setVideoId(id || null);
    } catch {
      setVideoId(null);
    } finally {
      setLoadingVideo(false);
    }
  }

  function handleOpenModal() {
    setOpenModal(true);
    fetchYouTubeVideoId(title);
  }

  function handleCloseModal() {
    setOpenModal(false);
    setVideoId(null);
  }

  useEffect(() => {
    document.body.style.overflow = openModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  return (
    <>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative bg-white text-black rounded-xl shadow-lg w-[90%] max-w-xl max-h-[90vh] overflow-y-auto p-6 animate-fade-in-up">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">{title}</h2>

            {image_url && (
              <img
                src={image_url}
                alt={title}
                className="w-full rounded-lg mb-4"
              />
            )}

            <p className="mb-4">{description || "Sem descrição disponível."}</p>

            {loadingVideo ? (
              <p className="text-gray-600 mb-4">Carregando vídeo...</p>
            ) : videoId ? (
              <div className="aspect-video mb-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Vídeo relacionado"
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-600 mb-4">Nenhum vídeo encontrado.</p>
            )}

            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 hover:underline text-sm"
              >
                Ler matéria completa
              </a>
            )}
          </div>
        </div>
      )}

      <div
        onClick={handleOpenModal}
        className="bg-white shadow-md rounded-lg p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
      >
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-40 object-cover rounded-lg mb-2"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-lg mb-2 flex items-center justify-center text-gray-500">
            Sem Imagem
          </div>
        )}

        <h2 className="text-md font-semibold mb-1 line-clamp-2">{title}</h2>

        <p className="text-sm flex-grow line-clamp-3">
          {description || "Sem descrição disponível."}
        </p>

        <p className="text-xs text-gray-500 mt-2 flex items-center">
          <CalendarDays className="mr-2" width={16} height={16} />
          {formattedDate}
        </p>

        {url && (
          <p className="text-blue-600 hover:underline mt-2 text-sm">
            Clique para ler mais
          </p>
        )}
      </div>
    </>
  );
}
