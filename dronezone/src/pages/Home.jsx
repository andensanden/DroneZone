import { Header } from "@/components/header";
import { useState } from 'react';
import { Footer } from "@/components/footer";
import MapSelector from "@/components/mapSelector" 


export function Home() {
  return (
    <>
      <Header />
      <MapSelector />
      <Footer />
    </>
  );
}
