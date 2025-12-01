import { BookOpen, Trees, Coffee, Church, Building2, Landmark, ShoppingBag, Theater } from 'lucide-react';

const categories = [
  { icon: BookOpen, label: 'Libraries', color: 'from-blue-400 to-blue-600' },
  { icon: Trees, label: 'Parks', color: 'from-green-400 to-green-600' },
  { icon: Coffee, label: 'Cafés', color: 'from-amber-400 to-amber-600' },
  { icon: Church, label: 'Temples', color: 'from-purple-400 to-purple-600' },
  { icon: Building2, label: 'Heritage', color: 'from-orange-400 to-orange-600' },
  { icon: Landmark, label: 'Museums', color: 'from-red-400 to-red-600' },
  { icon: ShoppingBag, label: 'Markets', color: 'from-pink-400 to-pink-600' },
  { icon: Theater, label: 'Cultural', color: 'from-indigo-400 to-indigo-600' },
];

export default function Categories() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Category</h2>

        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex-shrink-0 group"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`w-20 h-20 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/40 shadow-lg group-hover:shadow-xl transition-all flex items-center justify-center group-hover:scale-110 duration-300`}>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 text-center min-w-[80px]">
                  {category.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
