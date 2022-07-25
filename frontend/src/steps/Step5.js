import React, {useState} from 'react';
import axios from 'axios';
import {AsyncActionButton, ButtonRed, ButtonGreen} from "../components/Buttons";
import Section from "../components/Section";
import TextInputBox from "../components/TextInputBox";
import {NestedTextCollapse} from "../components/TextCollapse";
import {TextHyperlink} from "../components/Links";

function Step5(){
    const [inputs, setInputs] = useState([""]);
    const [outputs, setOutputs] = useState([{}]);

    return (
        <Section title="Step 5. Create an unsigned hex transaction">
            <p>At this point, we are going to actually generate a raw bitcoin transaction that we will later sign and broadcast to the bitcoin network.</p>
            <Section title="Step 5.1. Create inputs">
                <p>First, enter the TXIDs of the UTXOs you would like to use as inputs into the transaction (these can be found in Step 4 under the "Available UTXO TXIDs" section). These will be consumed.</p>
                <p>You can enter multiple TXIDs by clicking the "Add TX" button, but you should only enter TXIDs that are available in the UTXOs you have selected. If you enter a TXID that is not available, an error will be thrown.</p>
                <div className="flex flex-col w-full space-y-2">
                    {inputs.map((input, i) => {
                        return (
                            <div key={i} className="flex flex-row w-full space-x-2 items-end justify-between">
                                <TextInputBox className="w-full" onChange={(e) => setInputs(inputs.map((input, j) => {if(j === i) return e.target.value; else return input}))} value={input} placeholder="Enter a TXID"/>
                                <ButtonRed onClick={() => setInputs(inputs.filter((input, j) => j !== i))}>Remove</ButtonRed>
                            </div>
                        )
                    })}
                    <ButtonGreen onClick={() => setInputs(inputs.concat([""]))}>Add TX</ButtonGreen>
                </div>
            </Section>
            <Section title="Step 5.2. Create outputs">
                <p>Now you will have to create the outputs manually. In each output, enter an address and an amount you want to send to that address (in BTC). Remember that ALL of the coins in the inputs you selected will be sent, so you have to create at least two outputs (one to a target and one back to you) if you don't want to send all of the bitcoins.</p>
                <p>For a simple transaction where you just want to send X BTC to an address, follow the following steps:</p>
                <p>
                    <ol className="flex flex-col space-y-2">
                        <li>1. Create an output with the receiving address (address generated in step 3) and amount X (note, in the actual BTC backend the amount would be denoted in Satoshis, but here just type in the amount of BTC)</li>
                        <li>2. Determine what "fee" you want to pay. Usually, 0.00001 BTC should be more than enough.</li>
                        <li>3. Create a second output with the sending address (address from step 1) in the amount (total_btc_being_inputted - X - fee). The total BTC being inputted is given to you in the Get UTXOs step above.</li>
                    </ol>
                </p>
                <p>As an example, if wallet A had 1 BTC in inputted UTXOs and wanted to send 0.5 BTC to wallet B w/ a fee of 0.05 BTC, two outputs would be created, one with wallet address B in the amount of 0.5 BTC and the other with wallet address A in the amount of 0.45 BTC.</p>
                <p>Since we want to steal all the bitcoins from our sending address, you can just create one output with the address being the address generated in step 3 and the amunt being the total amount of inputted BTC - 0.00001. This amount is given to you in the recommended send amount from the Get UTXOs section. Note that if you didn't input all of the UTXO TXIDs in the above section you will have to calculate the amount manually.</p>
                <div className="flex flex-col w-full space-y-2">
                    {outputs.map((output, i) => {
                        return (
                            <div key={i} className="flex flex-row w-full space-x-2 items-end justify-between">
                                <TextInputBox className="w-full" onChange={(e) => setOutputs(outputs.map((output, j) => {if(j === i) return {address: e.target.value, value: output.value}; else return output}))} value={output.address} placeholder="Enter a wallet address (NOT the private key)"/>
                                <TextInputBox className="w-full" onChange={(e) => setOutputs(outputs.map((output, j) => {if(j === i) return {address: output.address, value: e.target.value}; else return output}))} value={output.value} placeholder="Enter an amount (in BTC)"/>
                                <ButtonRed onClick={() => setOutputs(outputs.filter((output, j) => j !== i))}>Remove</ButtonRed>
                            </div>
                        )
                    })}
                    <ButtonGreen onClick={() => setOutputs(outputs.concat([{address: "", amount: ""}]))}>Add Output</ButtonGreen>
                </div>
            </Section>
            <Section title="Step 5.3. Create the transaction">
                <p>Click this button to generate a raw hex transaction from your inputs and outputs</p>
                <AsyncActionButton onClick={() => axios.post('/crypto/transaction/generate', {from_address: localStorage.getItem('sendingWallet'), outputs: outputs, utxo_inputs: inputs})} renderResults={data => <p className="break-all">{data.tx}</p>} loadingText="Creating transaction...">Create Transaction</AsyncActionButton>
                <p>Above, you should now see a raw unsigned transaction (we will sign it in the next step). I recommend checking out what this actually looks like <TextHyperlink href="https://live.blockcypher.com/btc/decodetx/">here</TextHyperlink>. Just copy and paste the transaction and it will show you its decoded form. <span className="font-semibold">NOTE: Change the network at the bottom from "Bitcoin" to "Bitcoin Testnet"</span></p>
            </Section>
        </Section>
    )
}

export default Step5;