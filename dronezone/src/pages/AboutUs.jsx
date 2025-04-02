
import { Header } from "@/componets/header";
import { AboutInfo } from "@/componets/aboutInfo";
import { Footer } from "@/componets/footer";


export function AboutUs() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <AboutInfo />
      <Footer />
    </div>
  )
}