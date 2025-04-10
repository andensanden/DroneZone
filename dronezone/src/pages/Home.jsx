import { Header } from "@/components/header";
import { useState } from 'react';
import Map from "@/components/map";
import { Footer } from "@/components/footer";
import MapSelector from "@/components/mapSelector" 
import LoggedInMap from "@/components/loggedInMap";
import EndFlightMode from "@/components/endFlightMode";

export function Home() {
  return (
    <>
      <Header />
      <MapSelector />
      <Footer />
    </>
  );
}
