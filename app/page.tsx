import WorldMap from "@/components/WorldMap";
import PlayerHUD from "@/components/PlayerHUD";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <PlayerHUD />
      <WorldMap />
    </main>
  );
}
