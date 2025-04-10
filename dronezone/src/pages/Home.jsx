import { Header } from "@/components/header";
import Map from "@/components/map";
import { Footer } from "@/components/footer";
import LoggedInMap from "@/components/loggedInMap";
import EndFlightMode from "@/components/endFlightMode";

export function Home() {
  return (
    <>
      <Header />
      <Map />
      <Footer />
    </>
  );
}
