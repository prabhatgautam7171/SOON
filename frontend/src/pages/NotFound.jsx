import { Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzRjMWQ5NSIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="w-full max-w-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-block overflow-hidden">
            <span className="text-9xl  font-black bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              404
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mt-6 mb-3">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-400 max-w-md mx-auto mb-8">
            Oops! It looks like you've wandered into uncharted territory. The
            page you're looking for doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={"/"}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/50"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg font-medium transition-all border border-gray-600 hover:border-gray-500"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Error Code:{" "}
            <span className="text-indigo-400 font-mono">404_NOT_FOUND</span>
          </p>
        </div>
      </div>

      <div className="absolute top-20 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};
