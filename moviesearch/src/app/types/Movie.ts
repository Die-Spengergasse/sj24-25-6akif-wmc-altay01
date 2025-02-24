export interface Movie {
    Title: string,
    Year: number,
    imdbID: string,
    Poster: string
}

export interface MovieDetail {
    Title: string;
    Year: string;
    Plot: string;
    Ratings: { Source: string; Value: string }[];
  }