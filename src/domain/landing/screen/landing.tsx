import { useEffect, useState } from "react";
import { useLanding } from "../hooks/use-landing";
import "./styles.css";

export const LandingScreen = () => {
  const { getPercentageScrolled } = useLanding();
  const [olha, setOlha] = useState(false);

  return (
    <main>
      <section className="top-section">
        <h1>Top Section</h1>
        <div className="left">
          left <button onClick={getPercentageScrolled}>a</button>
        </div>
        <div className="right">
          <button onClick={() => setOlha(true)}>b</button>
        </div>
      </section>

      <section className="full-section">dsfdsfdsfds</section>
    </main>
  );
};
