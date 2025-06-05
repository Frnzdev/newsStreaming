export interface NewsProps {
  title: string;
  image_url: string;
  description: string;
  pubDate: string;
  url: string; // Added url property
}

export interface ApiResponse {
  results: NewsProps[];
}

export async function fetchNews(): Promise<NewsProps[]> {
  const response = await fetch(
    "https://newsdata.io/api/1/latest?apikey=pub_7cb1233e86614bde8dfba325752b04f6&q=Futebol",
    { next: { revalidate: 3600 } } // Revalidate data every hour (3600 seconds)
  );

  if (!response.ok) {
    // It's good practice to log or handle the error more gracefully in a real app
    console.error("Failed to fetch news:", response.statusText);
    throw new Error("Erro ao buscar notícias");
  }

  const data: ApiResponse = await response.json();

  // Return only the results array
  return data.results;
}
