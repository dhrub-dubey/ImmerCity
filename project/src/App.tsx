import { useState } from 'react';
import { LocationProvider } from './context/LocationContext';
import Header from './components/Header';
import DrawerMenu from './components/DrawerMenu';
import Hero from './components/Hero';
import Categories from './components/Categories';
import GalleryBanner from './components/GalleryBanner';
import NearbyPlaces from './components/NearbyPlaces';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <LocationProvider>
      <div className="min-h-screen bg-gray-50">
        <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
        <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <main className="pt-16">
          <Hero />
          <Categories />
          <GalleryBanner />
          <NearbyPlaces />
        </main>

        <Footer />
      </div>
    </LocationProvider>
  );
}

export default App;
