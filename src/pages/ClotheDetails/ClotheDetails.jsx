import { useLoaderData } from "react-router-dom";
import axios from 'axios';
import { NavLink, Link, useNavigate } from "react-router-dom";

export async function loader({ params }) {
  const id = params.id;

  try {
    // Obtener detalles en inglés
    const responseEnglish = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=9ebbf65c80c0e6ee15f83825a6422dd5&language=en`
    );
    const englishMovieDetails = responseEnglish.data;

    // Obtener la sinopsis en español
    const responseSpanish = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=9ebbf65c80c0e6ee15f83825a6422dd5&language=es`
    );
    const spanishOverview = responseSpanish.data.overview;

    // Obtener videos asociados a la película (trailers)
    const responseVideos = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9ebbf65c80c0e6ee15f83825a6422dd5&language=es`
    );
    const spanishTrailers = responseVideos.data.results;

    // Obtener valoración y actores/directores en inglés
    const responseCredits = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9ebbf65c80c0e6ee15f83825a6422dd5&language=en`
    );
    const credits = responseCredits.data;

    // Obtener géneros en español
    const responseGenres = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=9ebbf65c80c0e6ee15f83825a6422dd5&language=es`
    );
    const genres = responseGenres.data.genres;

    // Agregar la sinopsis traducida, trailers, valoración, actores, directores y géneros al objeto de detalles de la película
    const movieDetails = {
      ...englishMovieDetails,
      overview_es: spanishOverview,
      trailers_es: spanishTrailers,
      vote_average: englishMovieDetails.vote_average,
      cast: credits.cast,
      crew: credits.crew,
      genres: genres
    };

    return { id, movieDetails };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return { id, movieDetails: null, error: 'No se pudo encontrar la sinopsis de la película' };
  }
}

function ClotheDetails() {
  const { id, movieDetails, error } = useLoaderData();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Detalles de la película: {movieDetails.title} ({movieDetails.release_date && movieDetails.release_date.substring(0, 4)})</h1>
      <h1 className="text-2xl font-bold mb-2">Valoración: {movieDetails.vote_average}/10</h1>
      <div className="container mx-auto p-4 text-center flex items-center">
        <div className="w-1/2 pr-8">
          {error && (
            <p className="text-red-500 font-bold">{error}</p>
          )}
          {movieDetails && !error && (
            <div className="mt-1">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="mx-auto max-w-full h-auto scale-75 transform"
              />
            </div>
          )}
        </div>

        {movieDetails && !error && (
          <div className="w-1/2">
            <h1 className="text-2xl font-bold mb-2">Sinopsis:</h1>
            <p className="text-white">{movieDetails.overview_es}</p>

            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-bold mt-7">Director:</h2>
                <ul>
                  {movieDetails.crew
                    .filter(member => member.job === "Director")
                    .map(director => (
                      <li key={director.id}>{director.name}</li>
                    ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mt-7">Géneros:</h2>
                <ul>
                  {movieDetails.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </div>

          <br/>
            <Link to={`/ReservaPage/${id}`} className="bg-red-900 hover:bg-red-900/90 text-white font-bold py-2 px-4 rounded">
            Reservar
            </Link>

          </div>
        )}

      </div>

      {movieDetails && movieDetails.trailers_es && movieDetails.trailers_es.length > 0 && (
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-2xl font-bold mb-2">Tráiler:</h1>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movieDetails.trailers_es[0].key}`}
            title="Trailer"
            className="mx-auto"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <br/><br/>


      {movieDetails && !error && (
        <div className="container mx-auto p-4 text-center">
          <div className="flex justify-around">
            <div>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Actor</th>
                    <th className="px-4 py-2">Personaje Interpretado</th>
                  </tr>
                </thead>
                <tbody>
                  {movieDetails.cast.map(actor => (
                    <tr key={actor.id}>
                      <td className="border border-red-900 px-4 py-2">{actor.name}</td>
                      <td className="border border-red-900 px-4 py-2">{actor.character}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClotheDetails;
