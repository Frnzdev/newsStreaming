interface NewsProps {
  title: string;
  image_url: string;
  description: string;
  pubDate: string;
  url: string; // Added url property
}

interface ApiResponse {
  results: NewsProps[];
}

export async function fetchNews(): Promise<NewsProps[]> {
  const response = await fetch(
    "https://newsdata.io/api/1/latest?apikey=pub_7cb1233e86614bde8dfba325752b04f6&q=Politica&language=pt"
  );
  if (!response.ok) {
    throw new Error("failed to fetch");
  }
  const data: ApiResponse = await response.json();
  return data.results;
}
