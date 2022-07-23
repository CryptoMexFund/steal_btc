import string

from cryptos import Bitcoin, sha256
from bitcoin import mktx
import random
from flask import Blueprint, request, jsonify

from utils import to_satoshis
from wallet import Wallet

btc = Bitcoin(testnet=True)
crypto_blueprint = Blueprint('crypto_blueprint', __name__, url_prefix='/crypto')

@crypto_blueprint.route('/wallet/generate', methods=["GET"])
def generate_crypto_wallet():
    """
    Generates a crypto wallet w/ a given seed (or a random one if not specified).

    Arguments (in the query string):
        <string> seed: The seed to use for the wallet. If not specified, a random one will be generated.

    Returns:
        <dict>: A dictionary containing the wallet's address and private key.
    """
    
    # Get the seed. If one is not given, generate a random 32 character long string.
    seed = request.args.get('seed') or ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(32))
    # Generate the wallet.
    private_key = sha256(seed)
    address = btc.pubtoaddr(btc.privtopub(private_key))
    return jsonify({'success': True, 'address': address, 'private_key': private_key})

@crypto_blueprint.route('/wallet/utxos', methods=["GET"])
def get_utxos():
    """
    Gets the UTXOs for a given address.

    Arguments (in the query string):
        <string> address: The address to get the UTXOs for.

    Returns:
        <dict>: A dictionary containing the UTXOs.
    """
    address = request.args.get('address')
    utxos = Wallet(address).utxos
    if utxos is None:
        return jsonify({'success': False, 'error': 'Invalid address'})
    return jsonify({'success': True, 'utxos': utxos})

@crypto_blueprint.route("/transaction/generate", methods=["POST"])
def generate_transaction():
    """
    Generates an unsigned hex transaction transaction.

    In JSON:
        <string> from_address: The address to send the transaction from.
        <string[]> utxo_inputs: Txids of UTXOs to send as inputs in this transaction.
        <dict[]> outputs: A list of dictionaries containing the outputs (should be structured like this: [{'address': 'address', 'value': 'value'}])

    :returns <string: The unsigned hex transaction.
    """
    try:
        data = request.get_json()
        from_address, outputs, utxo_inputs = data['from_address'], data['outputs'], data['utxo_inputs']
        wallet = Wallet(from_address)
        history = []
        # Check to make sure the outputs are valid.
        if not outputs:
            return jsonify({'success': False, 'error': 'No outputs specified.'}), 400
        for output in outputs:
            if output.keys() != {'address', 'value'}:
                return jsonify({'success': False, 'error': 'Invalid output'}), 400
        for utxo_input in utxo_inputs:
            utxo = wallet.get_utxo_by_txid(utxo_input)
            if utxo is None:
                return jsonify({'success': False, 'error': 'Invalid UTXO input'}), 400
            history.append({'output': f"{utxo['txid']}:{utxo['vout']}", 'value': utxo['value'], 'address': from_address})
        # Convert all output amounts to satoshis.
        outputs = [{'address': output['address'], 'value': to_satoshis(output['value'])} for output in outputs]
        total_tx_in = wallet.get_total_utxo_value(utxo_inputs)
        total_tx_out = sum([output['value'] for output in outputs])
        if total_tx_in < total_tx_out:
            return jsonify({'success': False, 'error': 'You are trying to create a transaction that will output more than the UTXOs inputted.'}), 400
        unsigned_tx = mktx(history, outputs)
        return jsonify({'success': True, 'tx': unsigned_tx})
    except KeyError:
        return jsonify({'success': False, 'error': 'Missing required fields.'}), 400

