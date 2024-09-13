import { useEffect, useState } from "react";

export default function useMatchMedia(query: string): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    const handleIsMatch = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches);
    };

    window.matchMedia(query).addEventListener("change", handleIsMatch);
    return () =>
      window.matchMedia(query).removeEventListener("change", handleIsMatch);
  }, [query]);

  return isMatch;
}
