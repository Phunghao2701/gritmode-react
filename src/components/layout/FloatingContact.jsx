import { useLocation } from "react-router-dom";

export default function FloatingContact() {
  const location = useLocation();
  if (location.pathname.startsWith("/admin") || location.pathname === "/login") return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-4">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/84123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative"
      >
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat Zalo
        </span>
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
            alt="Zalo"
            className="w-8 h-8"
        />
      </a>

      {/* Messenger Button */}
      <a
        href="https://m.me/gritmode"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#0084FF] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative"
      >
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat Messenger
        </span>
        <svg
          className="w-8 h-8 text-white fill-current"
          viewBox="0 0 36 36"
        >
          <path d="M18 1C8.6 1 1 8.2 1 17c0 4.8 2.2 9.2 5.9 12.1.3.2.5.6.5 1v4.4c0 .6.6 1.1 1.2.9l5-2.5c.3-.1.6-.2 1-.1 1.1.3 2.3.5 3.5.5 9.4 0 17-7.2 17-16S27.4 1 18 1zm1.1 22.3l-4.5-4.8c-.4-.4-1.1-.5-1.5-.1l-5.6 4.3c-.6.5-1.4-.3-.9-.9l6.5-10.4c.4-.6 1.3-.7 1.8-.2l4.5 4.8c.4.4 1.1.5 1.5.1l5.6-4.3c.6-.5 1.4.3.9.9l-6.5 10.4c-.4.6-1.3.7-1.8.2z" />
        </svg>
      </a>
    </div>
  );
}
