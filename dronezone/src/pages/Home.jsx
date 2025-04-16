import { Header } from "@/components/header";
import Map from "@/components/Map/map";
import { Footer } from "@/components/footer";
import LoggedInMap from "@/components/Map/loggedInMap";
import EndFlightMode from "@/components/Map/endFlightMode";

export function Home() {
  return (
    <>
      <Header />
      <Map/>
      <Footer />
    </>
  );
}
