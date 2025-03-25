import MovieDetailView from "../../components/MovieDetailView";
import { MovieDetail } from "../../types/Movie";

async function getMovieData(imdbID: string) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=cd2aa4ca&i=${imdbID}&plot=full`
  );
  if (!res.ok) throw new Error("Failed to fetch movie data");
  return res.json();
}

export default async function MoviePage({ params }: { params: { imdbID: string } }) {
  const movieData = await getMovieData(params.imdbID);

  const movie: MovieDetail = {
    Title: movieData.Title,
    Year: movieData.Year,
    Plot: movieData.Plot,
    Ratings: movieData.Ratings,
  };

  return <MovieDetailView movie={movie} />;
}