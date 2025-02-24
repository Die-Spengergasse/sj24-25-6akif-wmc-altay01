import { MovieDetail } from "../types/Movie";

const MovieDetailView = ({ movie }: { movie: MovieDetail }) => {
  return (
    <div className="movie-detail">
      <h1>{movie.Title} ({movie.Year})</h1>
      <p>{movie.Plot}</p>
      <h2>Bewertungen</h2>
      <ul>
        {movie.Ratings.map((rating, index) => (
          <li key={index}>
            {rating.Source}: {rating.Value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetailView;