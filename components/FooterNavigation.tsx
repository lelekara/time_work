import Link from "next/link";
import { BarChart3, CalendarDays, Home } from "lucide-react";

export default function FooterNavigation() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50">
      <nav className="flex justify-around items-center py-2">
        <Link href="/calendrier" className="flex flex-col items-center text-gray-700 hover:text-indigo-600 transition-colors">
          <CalendarDays className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Calendrier</span>
        </Link>
        <Link href="/" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Accueil</span>
        </Link>
        <Link href="/stat" className="flex flex-col items-center text-gray-700 hover:text-green-600 transition-colors">
          <BarChart3 className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Stat</span>
        </Link>
      </nav>
    </footer>
  );
}
