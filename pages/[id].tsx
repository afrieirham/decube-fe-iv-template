import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import axios from "axios";
import useSWR from "swr";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

const BASE_API = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
const API_KEY = process.env.NEXT_PUBLIC_BEARER_TOKEN as string;
const POSTER_URL = process.env.NEXT_PUBLIC_API_IMAGE_PATH as string;

function MovieDetailsPage() {
  const router = useRouter();
  const movieId = router.query.id;

  const { data, error, isLoading } = useSWR(
    [`${BASE_API}/3/movie/${movieId}`, API_KEY],
    ([url, token]) => fetcher(url, token)
  );

  if (error) return "movie not found";
  if (!data || isLoading) return "loading...";

  const movie = data as Movie;

  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto pt-16">
      <div className="mb-6 flex items-start w-full">
        <Link
          href="/"
          className="bg-gray-100 px-2 py-1.5 rounded-lg text-sm hover:bg-gray-200 text-gray-800"
        >
          ← back to movies
        </Link>
      </div>
      <div className="flex gap-4 border p-4 rounded-lg w-full">
        <Image
          src={`${POSTER_URL}${movie.poster_path}`}
          alt=""
          width={1080}
          height={1920}
          className="w-40"
        />
        <h1 className="font-bold">{movie.title}</h1>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
