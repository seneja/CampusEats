import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    const resolvedUrl = url.startsWith("http")
      ? url
      : new URL(url.replace(/^\/+/, ""), window.location.origin + import.meta.env.BASE_URL).toString();

    fetch(resolvedUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Expected JSON, received ${contentType || "unknown content"}`);
        }

        return res.json();
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [url]);

  return { data, isLoading, error };
}