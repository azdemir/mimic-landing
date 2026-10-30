import UtilityBar from "../components/UtilityBar";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Loop from "../components/Loop";
import Demo from "../components/Demo";
import Engine from "../components/Engine";
import Compare from "../components/Compare";
import Stack from "../components/Stack";
import Closing from "../components/Closing";

export default function Home() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="top">
        <Hero />
        <Ticker />
        <Loop />
        <Demo />
        <Engine />
        <Compare />
        <Stack />
        <Closing />
      </main>
    </>
  );
}
