import Link from "next/link";

import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

const BASE_API = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
const API_KEY = process.env.NEXT_PUBLIC_BEARER_TOKEN as string;

export default function Home() {
  const { data, error, isLoading } = useSWR(
    [`${BASE_API}/3/movie/popular`, API_KEY],
    ([url, token]) => fetcher(url, token)
  );

  if (error) return "error";
  if (!data || isLoading) return "loading...";

  const movies = data.results as {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];

  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col">
      <h1 className="font-bold text-2xl text-center my-16">
        Popular Movies Today
      </h1>
      <div className="grid grid-cols-3 gap-4 w-full max-w-screen-md mx-auto">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/${movie.id}`}
            className="border rounded-lg p-4 hover:bg-gray-50"
          >
            {movie.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
