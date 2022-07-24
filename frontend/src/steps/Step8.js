import React from 'react';
import Section from "../components/Section";
import {TextHyperlink} from "../components/Links";

function Step8(){
    return (
        <Section title="(Optional) Step 8. Steal my Bitcoin">
            <div className="flex flex-col space-y-4">
                <p>Somewhere in the <TextHyperlink href="https://github.com/CryptoMexFund/steal_btc">github repo for this project</TextHyperlink>, I may have had a slight security oversight and leaked the private keys of a Bitcoin wallet with some BTC on it. Find it and steal my Bitcoins!</p>
            </div>
        </Section>
    )
}

export default Step8;