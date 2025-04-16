import { Header } from "@/components/header";

import { useState } from "react";
import MapSelector from "@/components/mapSelector";

import Map from "@/components/Map/map";
import { Footer } from "@/components/footer";
import LoggedInMap from "@/components/Map/loggedInMap";
import EndFlightMode from "@/components/Map/endFlightMode";

export function Home() {
  return (
    <>
      <Header />
      {/*<MapSelector />*/}
      <Map />
      <Footer />
    </>
  );
}
