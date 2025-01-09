import axios from "axios";
import useSWR from "swr";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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

  console.log(data);

  return <main className={inter.className}></main>;
}
