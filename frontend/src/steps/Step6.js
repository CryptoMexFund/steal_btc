import React, {useState} from 'react';
import Section from "../components/Section";
import TextInputBox from "../components/TextInputBox";
import {AsyncActionButton} from "../components/Buttons";
import {TextHyperlink} from "../components/Links";
import axios from 'axios';


function Step5(){
    const [txHex, setTxHex] = useState(null)
    const [privateKey, setPrivateKey] = useState(null);

    return (
        <Section title="Step 6. Sign the transaction">
            <div className="flex flex-col space-y-4">
                <p>We are finally at the phase where we see why private keys are so important to keep secret.</p>
                <p>If you've noticed, prior to this, all of the steps have used public information. By design, anyone can see UTXOs, wallet balances, and more, but the private key should never be held by anyone except the owner. I highly encourage you to read the article to learn more about this, but if you are just in it for the show, simply paste your raw transaction and private key below and click sign.</p>
                <TextInputBox onChange={(e) => setTxHex(e.target.value)} value={txHex} placeholder="Enter the raw TX hex (from Step 5)"/>
                <TextInputBox onChange={(e) => setPrivateKey(e.target.value)} value={privateKey} placeholder="Enter your private key (from Step 1)"/>
                <AsyncActionButton onClick={() => axios.post("/crypto/transaction/sign", {tx: txHex, private_key: privateKey})} renderResults={data => <p className="break-all">{data.tx}</p>}>Sign Transaction</AsyncActionButton>
                <p>After you are done with this step, I again highly encourage you to go <TextHyperlink href="https://live.blockcypher.com/btc/decodetx/">here</TextHyperlink> and check out how the transaction changed.</p>
            </div>
        </Section>
    )
}

export default Step5;