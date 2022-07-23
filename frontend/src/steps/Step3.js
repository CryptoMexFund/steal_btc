import React, {useState} from 'react';
import axios from 'axios';
import {AsyncActionButton} from "../components/Buttons";
import Section from "../components/Section";
import TextInputBox from "../components/TextInputBox";

function Step3(){
    const [seed, setSeed] = useState(null);

    function renderGeneratedWallet(data){
        return (
            <div className="flex flex-col">
                <div className="flex flex-row space-x-2 items-end">
                    <h4>Address:</h4>
                    <span>{data.address}</span>
                </div>
                <div className="flex flex-row space-x-2 items-end">
                    <h4>Private Key:</h4>
                    <span>{data.private_key}</span>
                </div>
            </div>
        )
    }

    return (
        <Section title="Step 3. Generate a receiving private key/address">
          <div className="flex flex-col space-y-4">
            <p>This will be the bitcoin address and corresponding private key of the wallet we are trying to get bitcoins into. If you already have a target address, you can skip this step.</p>
            <p>Just like step 1, you can also enter a seed here. Make sure to note your address and key since we will need it later.</p>
            <TextInputBox onChange={(e) => setSeed(e.target.value)} value={seed} placeholder="Enter a seed (i.e. i like apples)"/>
            <AsyncActionButton onClick={() => axios.get('/crypto/wallet/generate', {params: {seed: seed}})} renderResults={renderGeneratedWallet} loadingText="Generating...">Generate wallet</AsyncActionButton>
          </div>
        </Section>
    )
}

export default Step3;