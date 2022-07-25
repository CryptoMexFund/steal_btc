import React, {useState} from 'react';
import axios from 'axios';
import {AsyncActionButton} from "../components/Buttons";
import Section from "../components/Section";
import TextInputBox from "../components/TextInputBox";
import {NestedTextCollapse} from "../components/TextCollapse";

function renderAvailableUTXOs(data){
    // Get total amount of BTC in UTXOs
    let total = 0;
    for(let i = 0; i < data.utxos.length; i++){
        total += data.utxos[i].value;
    }
    
    return (
        <div className="flex flex-col space-y-2">
            <NestedTextCollapse title="UTXOs" json={data} />
            <div className="flex flex-col">
                <span className="text-body font-semibold">Available UTXO TXIDs:</span>
                {data.utxos.map((utxo, i) => {
                    return (<span key={utxo.txid}>{utxo.txid}</span>)
                })}
            </div>
            <div className="flex flex-row items-end">
                <span className="font-semibold">Total BTC in UTXOs:&nbsp;</span>
                <span>{(total/(10**8)).toFixed(8)}</span>
            </div>
            <div className="flex flex-row items-end">
                <span className="font-semibold">Recommended Send Amount:&nbsp;</span>
                <span>{(total/(10**8) - 0.00001).toFixed(8)}</span>
            </div>
        </div>
    )
}

function Step4(){
    const [sendingWallet, setSendingWallet] = useState(localStorage.getItem('sendingWallet') || null);

    function updateSendingWallet(e){
        localStorage.setItem('sendingWallet', e.target.value);
        setSendingWallet(e.target.value);
    }

    return (
        <Section title="Step 4. Get Available UTXOs">
            <p>Now that we have made some transactions, we should have some available UTXOs. Enter the address you are trying to send bitcoins from below (the address from step 1) to get a list of its UTXOs (read the article for more details about what exactly this is). I encourage you to take a look at what these UTXOs actually look like, so please expand the component below by clicking the plus button near any expandable node.</p>
            <p>If you can't see any UTXOs, you probably don't have any BTC available in the wallet to spend. Please ensure you utilize the testnet faucet and then try this again.</p>
            <TextInputBox onChange={updateSendingWallet} value={sendingWallet} placeholder="Enter a wallet address (NOT the private key)"/>
            <AsyncActionButton onClick={() => axios.get('/crypto/wallet/utxos', {params: {address: sendingWallet}})} renderResults={renderAvailableUTXOs} loadingText="Getting UTXOs...">Get UTXOs</AsyncActionButton>
        </Section>
    )
}

export default Step4;