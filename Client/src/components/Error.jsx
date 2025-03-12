import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl text-gray-700 mt-4">Oops! Page not found.</p>
      <p className="text-lg text-gray-500 mt-2">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;