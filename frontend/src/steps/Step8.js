import React, {useState} from 'react';
import Section from "../components/Section";
import { AsyncActionButton } from '../components/Buttons';
import axios from 'axios';
import TextInputBox from '../components/TextInputBox';

function Step8(){
    const [privKey, setPrivKey] = useState(null);

    return (
        <Section title="Step 8. Return testnet BTC">
            <div className="flex flex-col space-y-4">
                <p>Congrats! You have now officially stolen bitcoins using a private key by creating, signing, and broadcasting a raw Bitcoin transaction. Now, <span className="font-semibold">please enter the private key of the wallet that received the BTC (the one from Step 3) below and click the button.</span></p>
                <p>This is critical because if you don't return the BTC, the service will run out of testnet bitcoins and that is very not desirable. Although these Bitcoins have no monetary value, there is a limited supply of them and not that many options to acquire them, so please return whatever you received. If you received BTC from a faucet other than the one hyperlinked in Step 2, please repeat steps 4-6 and create an output using whatever wallet you need to return the BTC to (just note that certain types of wallets are not supported by this system, so if you can't send it back to whatever testnet you got it from, just use this interface so that the BTC isn't just dead on some unused wallet).</p>
                <TextInputBox onChange={(e) => setPrivKey(e.target.value)} value={privKey} placeholder="Enter your private key"/>
                <AsyncActionButton onClick={() => axios.post("/crypto/return", {private_key: privKey})} renderResults={data => <h4>{data.message}</h4>}>Return Testnet BTC</AsyncActionButton>
            </div>
        </Section>
    )
}

export default Step8;