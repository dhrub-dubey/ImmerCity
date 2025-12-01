import { useState, useEffect } from 'react';

const heritageSlides = [
  {
    image: 'https://images.pexels.com/photos/13641896/pexels-photo-13641896.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Victoria Memorial',
    subtitle: 'Iconic marble monument',
  },
  {
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Princep Ghat',
    subtitle: 'Historic riverside promenade',
  },
  {
    image: 'https://images.pexels.com/photos/7365985/pexels-photo-7365985.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Dakshineswar Temple',
    subtitle: 'Spiritual heritage site',
  },
  {
    image: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Howrah Bridge',
    subtitle: 'Engineering marvel',
  },
];

export default function GalleryBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heritageSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Heritage Highlights</h2>

        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          {heritageSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-md bg-white/10 border-t border-white/20">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {slide.title}
                </h3>
                <p className="text-lg text-white/90">{slide.subtitle}</p>
              </div>
            </div>
          ))}

          <div className="absolute bottom-8 right-8 flex space-x-2 z-10">
            {heritageSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
