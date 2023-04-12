import { headers } from "next/headers";

export default async function Home() {
  const h = headers();
  const url = h.get("x-url") || "http://localhost:3000";
  const apiUrl = new URL(url);
  apiUrl.pathname = "/api/graphql";
  const finalUrl = apiUrl.toString();

  const response = await fetch(finalUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query { hello }`,
    }),
  });

  const { data } = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">{data.hello}</h1>
    </main>
  );
}
