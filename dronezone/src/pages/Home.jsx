import { Header } from "@/components/ui/header";
import { useSelector  } from "react-redux";
import { useState } from "react";
//import MapSelector from "@/components/mapSelector";

import Map from "@/components/Map/map";
import { Footer } from "@/components/ui/footer";
import LoggedInMap from "@/components/Map/loggedInMap";
import { NodesProvider } from "@/mapScripts/nodesContext";
import { InFlightProvider } from "@/components/Map/inFlightContext";


export function Home() {
   const isAuth = useSelector((state) => state.auth.isAuth);
    console.log("Authentication State:", isAuth); // Debugging line
  return (
    <>
      <Header />
        <NodesProvider>
        <InFlightProvider>
          {isAuth ? <LoggedInMap /> : <Map/> }
        </InFlightProvider>
        </NodesProvider>
      <Footer />
    </>
  );
}
