import unittest
from flask import Flask
from crypto_blueprint import crypto_blueprint
from cryptos import Bitcoin

app = Flask(__name__)
app.register_blueprint(crypto_blueprint)
c = Bitcoin(testnet=True)

class TestGenerateTransaction(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test_client = app.test_client()

    def test_generate_unsigned_transaction(self):
        res = self.test_client.post(
            "/crypto/transaction/generate",
            json={
                "from_address": "n1XMyLcoCGpzvtcQ4UVWdUBXSXZGjEvUS4",
                "utxo_inputs": [
                    "c4026ac9b607ebe1d69aba555a380583a59e32cffc20d613802f9d6877f7e8ff",
                    "64c9ff4fc73c99ec74fe25106c046f904e93d2f2aea7774d5e45ff450dcc98a4"
                ],
                "outputs": [
                    {"address": "n1XMyLcoCGpzvtcQ4UVWdUBXSXZGjEvUS4", "value": 0.000005},
                    {"address": "mnFMstk4ZejC5W21r6tG3uLMFTkT3CtG2F", "value": 0.0000045}
                ]
            }
        )
        self.assertEqual(res.json, {'success': True, 'tx': '0100000002ffe8f777689d2f8013d620fccf329ea58305385a55ba9ad6e1eb07b6c96a02c40100000000ffffffffa498cc0d45ff455e4d77a7aef2d2934e906f046c1025fe74ec993cc74fffc9640100000000ffffffff02f4010000000000001976a914db7647cfbd439b705b675fa960dd8cd9375025b588acc2010000000000001976a91449d5e95b8e8a83060a150f242fb8ffbcfdf8475288ac00000000'})
        self.assertEqual(res.status_code, 200)


    def test_generate_bad_utxo(self):
        res = self.test_client.post(
            "/crypto/transaction/generate",
            json={
                "from_address": "tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262",
                "utxo_inputs": [
                    "fds"
                ],
                "outputs": [
                    {"address": "tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262", "value": 0.00005},
                    {"address": "mnFMstk4ZejC5W21r6tG3uLMFTkT3CtG2F", "value": 0.000045}
                ]
            }
        )
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.json['error'], 'Invalid UTXO input')

    def test_generate_bad_output(self):
        res = self.test_client.post(
            "/crypto/transaction/generate",
            json={
                "from_address": "tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262",
                "utxo_inputs": [
                    "4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752"
                ],
                "outputs": [
                    {"address": "tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262"}
                ]
            }
        )
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.json['error'], 'Invalid output')

    def test_generate_insufficient_balance(self):
        res = self.test_client.post(
            "/crypto/transaction/generate",
            json={
                "from_address": "tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262",
                "utxo_inputs": [
                    "4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752"
                ],
                "outputs": [
                    {"address": "tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262", "value": 0.0004},
                    {"address": "mnFMstk4ZejC5W21r6tG3uLMFTkT3CtG2F", "value": 0.01}
                ]
            }
        )
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.json['error'], 'You are trying to create a transaction that will output more than the UTXOs inputted.')

