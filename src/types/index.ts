import type { InputHTMLAttributes } from 'vue';

export interface IFilm {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: string;
  genres: string[];
  plot: string;
  runtime: number;
  budget: string | null;
  revenue: string | null;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string | null;
  production: string | null;
  awardsSummary: string | null;
}

export interface ILocalFilm extends IFilm {
  isFavorite: boolean;
  genreLocal: string;
  duration: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  surname: string;
}

export interface IProfile {
  favorites: string[];
  surname: string;
  name: string;
  email: string;
}

export type noteType = 'error' | 'warning' | 'info';

export interface INote {
  text: string;
  type: noteType;
  id: string;
}

export type FilmTrailer = 'FilmTrailer' | '';

export type FormInputTypes = Extract<
  InputHTMLAttributes['type'],
  'text' | 'number' | 'email' | 'password' | 'tel' | 'url'
>;

export interface IQueryParams {
  count?: string;
  page?: string;
  title?: string;
  genre?: string;
}
