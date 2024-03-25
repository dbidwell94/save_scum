import { useEffect } from "react";
import Footer from "./Footer";
import GameView from "./GameView";
import Navbar from "./Navbar";
import { getConfg } from "@api/index";
import { useAppDispatch } from "@src/store";
import { updateGames } from "@state/configReducer";
import { listen } from "@tauri-apps/api/event";
import AddGameModal from "@src/components/AddGameModal";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getConfg().then((config) => {
      void dispatch(updateGames(config));
    });
  }, []);

  useEffect(() => {
    let unlisten: Awaited<ReturnType<typeof listen>> | undefined = undefined;
    (async () => {
      unlisten = await listen("configUpdated", () => {
        getConfg().then((config) => {
          void dispatch(updateGames(config));
        });
      });
    })();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  return (
    <div className="w-full h-full bg-slate-800 flex flex-col justify-between relative">
      <AddGameModal />
      <Navbar />
      <GameView />
      <Footer />
    </div>
  );
}