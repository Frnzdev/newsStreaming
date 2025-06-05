import NewsEsporte from "@/components/newsEsporte";
import Newspolitica from "@/components/newsPolitica";
import NewsSlider from "@/components/newsSlider";

export default function Home() {
  return (
    <div>
      <NewsSlider />
      <NewsEsporte />
      <Newspolitica />
    </div>
  );
}
