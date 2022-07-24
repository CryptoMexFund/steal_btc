import React from 'react';
import Section from "../components/Section";
import {TextHyperlink} from "../components/Links";

function Step2(){
    return (
        <Section title="Step 2. Get some testnet BTC">
            <div className="flex flex-col space-y-4">
                <p>Head over <TextHyperlink href="https://testnet-faucet.mempool.co/">here</TextHyperlink> and transfer some testnet BTC to your target wallet.</p>
                <p>To fully utilize this site, I would recommend making at least two withdrawals from the faucet into your wallet (create two transactions). These withdrawals can be of any size.</p>
            </div>
        </Section>
    )
}

export default Step2;