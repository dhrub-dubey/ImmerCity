import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-900/50 to-gray-900/70" />

      <div className="relative z-10 text-center px-4 space-y-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
          Discover Kolkata's
          <br />
          <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Rich Heritage
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/90 backdrop-blur-sm bg-black/20 rounded-2xl px-6 py-4 inline-block border border-white/20">
          Explore historic landmarks, cultural treasures, and hidden gems
        </p>

        <button className="group backdrop-blur-xl bg-white/90 hover:bg-white text-gray-900 px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 border border-white/30 flex items-center space-x-3 mx-auto">
          <span>Plan My Heritage Tour</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
