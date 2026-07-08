import { HashRouter, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { CommandDeck } from "./pages/CommandDeck";
import { SecurityForAI } from "./pages/SecurityForAI";
import { SaseSdwan } from "./pages/SaseSdwan";
import { Battlecards } from "./pages/Battlecards";
import { SkuNavigator } from "./pages/SkuNavigator";
import { MigrationPlays } from "./pages/MigrationPlays";
import { Learn } from "./pages/Learn";
import { DealDesk } from "./pages/DealDesk";
import { WhyCdw } from "./pages/WhyCdw";
import { IntelFeed } from "./pages/IntelFeed";

/** HashRouter so v1 deploys to any static host with zero rewrite config. */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<CommandDeck />} />
          <Route path="security-for-ai" element={<SecurityForAI />} />
          <Route path="sase-sd-wan" element={<SaseSdwan />} />
          <Route path="tools/battlecards" element={<Battlecards />} />
          <Route path="tools/skus" element={<SkuNavigator />} />
          <Route path="tools/migrations" element={<MigrationPlays />} />
          <Route path="learn" element={<Learn />} />
          <Route path="deal-desk" element={<DealDesk />} />
          <Route path="why-cdw" element={<WhyCdw />} />
          <Route path="intel" element={<IntelFeed />} />
          <Route path="*" element={<CommandDeck />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
