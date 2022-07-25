import React from "react";
import Section from "./components/Section";
import * as steps from "./steps";
import {TextHyperlink} from "./components/Links"

function App() {
  return (
    <div className="flex flex-col items-center bg-indigo-900 w-full min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-center max-w-[1200px] space-y-10 mb-10">
        <div className="flex flex-row w-full justify-between items-center bg-indigo-500 w-screen py-2 px-10 text-white">
            <h1>Bitcoin Stealr</h1>
            <a href="https://www.cryptomexfund.com" className="text-h4 hover:underline">Powered by Cryptomex</a>
        </div>
        <Section title="Disclaimer">
          <div className="flex flex-col space-y-4">
            <p>All of this is for educational purposes only, and is solely meant to provide some foundational understanding about how Bitcoin transactions actually work under the hood. We do not advocate trying to steal people's private keys or Bitcoins.</p>
            <p>At the end of this exercise, you will also have an opportunity to steal my Bitcoin. If you do it first, please <TextHyperlink href="mailto:matthew@cryptomexfund.com">reach out!</TextHyperlink></p>
            <p>Also, please read the <TextHyperlink href="https://medium.com/@Cryptomex/how-i-stole-andrej-karpathys-bitcoins-e9b82d7b854a">article</TextHyperlink> for a more thorough walkthrough of everything going on on this site.</p>
          </div>
        </Section>
        {steps.Step1()}
        {steps.Step2()}
        {steps.Step3()}
        {steps.Step4()}
        {steps.Step5()}
        {steps.Step6()}
        {steps.Step7()}
        {steps.Step8()}
        {steps.Step9()}
        <span className="text-white text-[10px]">
          This website does not constitute an offer to sell nor a solicitation of an offer to purchase any securities in any jurisdiction in which such an offer or solicitation is not authorized and does not constitute an offer within any jurisdiction to any person to whom such offer would be unlawful.  Further, the securities being offered by the Fund have not been registered under the Securities Act, any state securities laws, or the securities laws of any other jurisdiction and may not be offered or sold absent registration or an applicable exemption from the registration requirements.  The information presented herein is presented in summary form and is therefore subject to numerous qualifications and further explanation.  More complete information regarding the investment described herein is contained in the Offering Documents.  An investment in the Fund is speculative and involves a high degree of risk.
        </span>
      </div>
    </div>
  );
}

export default App;
