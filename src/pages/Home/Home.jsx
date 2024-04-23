import { useEffect, useState } from "react";
import { Carousel } from 'flowbite-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import ClothePoster from '../../components/ClothePoster';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [Clothes, setClothes] = useState([]);

  // Fetch popular movies from API
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=9ebbf65c80c0e6ee15f83825a6422dd5`
        );
        setClothes(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <>
      <section
        className="w-full h-full mb-6 py-12 md:py-24 lg:py-32 xl:py-48"
        style={{
          backgroundImage: "url('')",
          backgroundSize: "cover",
        }}
      >
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl text-white-500 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Bienvenido a Clothe<span className='text-red-700'>Hub</span>
              </h1>
            </div>
            <div className="space-x-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-red-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                to="/Clothes"
              >
                Encuentra tu película favorita
              </Link>
            </div>
          </div>
        </div>
      </section>


       
    </>
  );
}

export default Home;
