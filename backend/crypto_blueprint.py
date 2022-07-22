import string

from cryptos import Bitcoin, sha256
import random
from flask import Blueprint, request, jsonify

btc = Bitcoin(testnet=True)
crypto_blueprint = Blueprint('crypto_blueprint', __name__, url_prefix='/crypto')

@crypto_blueprint.route('/generate', methods=['get'])
def generate_crypto_wallet():
    """
    Generates a crypto wallet w/ a given seed (or a random one if not specified).

    Arguments (in JSON):
        <string> seed: The seed to use for the wallet. If not specified, a random one will be generated.

    Returns:
        <dict>: A dictionary containing the wallet's address and private key.
    """
    # Get the seed. If one is not given, generate a random 32 character long string.
    seed = request.args.get('seed', ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(32)))
    # Generate the wallet.
    private_key = sha256(seed)
    address = btc.pubtoaddr(btc.privtopub(private_key))
    return jsonify({'address': address, 'private_key': private_key})
