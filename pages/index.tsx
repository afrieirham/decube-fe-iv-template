import Link from "next/link";
import Image from "next/image";

import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

const BASE_API = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
const API_KEY = process.env.NEXT_PUBLIC_BEARER_TOKEN as string;
const POSTER_URL = process.env.NEXT_PUBLIC_API_IMAGE_PATH as string;

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
      <div className="grid grid-cols-3 gap-4 w-full max-w-screen-lg mx-auto mb-16">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/${movie.id}`}
            className="border rounded-lg p-4 hover:bg-gray-50 flex flex-col items-center gap-4"
          >
            <Image
              src={`${POSTER_URL}${movie.poster_path}`}
              alt=""
              width={1080}
              height={1920}
              className="w-40"
            />
            <p className="text-center">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
