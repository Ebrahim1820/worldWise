import { useSearchParams } from "react-router-dom";

function useUrlLocation() {
  // this state will recieve parameters from url
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

export { useUrlLocation };
