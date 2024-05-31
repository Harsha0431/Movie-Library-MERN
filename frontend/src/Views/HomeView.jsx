import { useEffect } from "react";
import useUserStore from "../Stores/UserStore";
import useLoaderStore from "../Stores/LoaderStore";

export default function HomeView() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const userPlaylist = useUserStore((state) => state.userPlaylist);
  const updateMainLoader = useLoaderStore((state) => state.updateMainLoader);

  async function fetchUserPlaylists() {
    //TODO: Complete this
    updateMainLoader(true);
    updateMainLoader(false);
  }

  useEffect(() => {
    if (isLoggedIn && userPlaylist.length == 0) {
      fetchUserPlaylists();
    }
  }, [isLoggedIn]);

  return <>{isLoggedIn && <div>
    <h1>Home</h1>
  </div>}</>;
}
