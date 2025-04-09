import { Header } from "@/components/header";
import Map from "@/components/map";
import { Footer } from "@/components/footer";
import LoggedInMap from "@/components/loggedInMap";

export function Home() {
  return (
    <>
      <Header />
      <LoggedInMap />
      <Footer />
    </>
  );
}
