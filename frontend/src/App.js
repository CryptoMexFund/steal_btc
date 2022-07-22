import React from "react";
import Section from "./components/Section";
import * as steps from "./steps";

function App() {
  return (
    <div className="flex flex-col items-center bg-indigo-900 min-w-screen min-h-screen">
      <div className="flex flex-col items-center max-w-[1200px] space-y-10">
        <div className="flex flex-row w-full justify-between items-center bg-indigo-500 w-screen py-2 px-10 text-white">
            <h1>Bitcoin Stealr</h1>
            <a href="https://www.cryptomexfund.com" className="text-h4 hover:underline">Powered by Cryptomex</a>
        </div>
        <Section title="Disclaimer">
          <p>All of this is for educational purposes only, and is solely meant to provide some foundational understanding about how Bitcoin transactions actually work under the hood. We do not advocate trying to steal people's private keys or Bitcoins.</p>
        </Section>
        {steps.Step1()}
      </div>
    </div>
  );
}

export default App;
