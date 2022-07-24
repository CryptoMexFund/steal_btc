import React from 'react';
import Section from "../components/Section";
import {TextHyperlink} from "../components/Links";

function Step6(){
    return (
        <Section title="Step 6. Broadcast the transaction">
            <div className="flex flex-col space-y-4">
                <p>Now that you have the signed transaction, you can broadcast it to the Bitcoin network so that miners can mine it. Copy and paste your signed transaction and then head <TextHyperlink href="https://blockstream.info/testnet/tx/push">here</TextHyperlink>, paste it, and click the Broadcast Transaction button.</p>
            </div>
        </Section>
    )
}

export default Step6;