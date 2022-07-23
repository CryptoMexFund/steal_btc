import React, {useState} from 'react';
import axios from 'axios';
import {AsyncActionButton} from "../components/Buttons";
import Section from "../components/Section";
import TextInputBox from "../components/TextInputBox";
import {NestedTextCollapse} from "../components/TextCollapse";

function renderAvailableUTXOs(data){
    return (
        <div className="flex flex-col space-y-2">
            <NestedTextCollapse title="UTXOs" json={data} />
            <div className="flex flex-col">
                <span className="text-body font-semibold">Available UTXO TXIDs:</span>
                {data.utxos.map((utxo, i) => {
                    return (<span key={utxo.txid}>{utxo.txid}</span>)
                })}
            </div>
        </div>
    )
}

function Step4(){
    const [getUtxoWallet, setGetUtxoWallet] = useState(null);

    return (
        <Section title="Step 4. Create an unsigned hex transaction">
          <div className="flex flex-col space-y-4">
            <p>At this point, we are going to actually generate a raw bitcoin transaction that we will later sign and broadcast to the bitcoin network.</p>
            <p>First, enter the address you are trying to send bitcoins from below (the address from step 1) to get a list of its UTXOs (read the article for more details about what exactly this is). I encourage you to take a look at what these UTXOs actually look like, so please expand the component below by clicking the plus button near any expandable node.</p>
            <p>If you can't see any UTXOs, you probably don't have any BTC available in the wallet to spend. Please ensure you utilize the testnet faucet and then try this again.</p>
            <TextInputBox onChange={(e) => setGetUtxoWallet(e.target.value)} value={getUtxoWallet} placeholder="Enter a wallet address (NOT the private key)"/>
            <AsyncActionButton onClick={() => axios.get('/crypto/wallet/utxos', {params: {address: getUtxoWallet}})} renderResults={renderAvailableUTXOs} loadingText="Getting UTXOs...">Get UTXOs</AsyncActionButton>
          </div>
        </Section>
    )
}

export default Step4;