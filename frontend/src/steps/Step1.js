import React, {useState} from 'react';
import axios from 'axios';
import {AsyncActionButton} from "../components/Buttons";
import Section from "../components/Section";
import TextInputBox from "../components/TextInputBox";

function Step1(){
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
        <Section title="Step 1. Generate a target private key/address">
          <div className="flex flex-col space-y-4">
            <p>This will be the bitcoin address and corresponding private key of the wallet we are trying to steal Bitcoins from. If you already have a target private key, you can skip this step.</p>
            <p>You can optionally enter a seed (literally anything, i.e. a word or sentence) here, and the wallet will be generated deterministically. If you don't enter a seed, a random wallet will be generated.</p>
            <p>Although keeping your private keys like this is very not recommended in normal circumstances for the reasons discussed in the article and demonstrated here, please note down your wallet's private key and address somewhere. You will need it later.</p>
            <TextInputBox onChange={(e) => setSeed(e.target.value)} value={seed} placeholder="Enter a seed (i.e. i like apples)"/>
            <AsyncActionButton onClick={() => axios.get('/crypto/wallet/generate', {params: {seed: seed}})} renderResults={renderGeneratedWallet} loadingText="Generating...">Generate wallet</AsyncActionButton>
          </div>
        </Section>
    )
}

export default Step1;