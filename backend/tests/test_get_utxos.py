import unittest
from flask import Flask
from crypto_blueprint import crypto_blueprint
from cryptos import Bitcoin

app = Flask(__name__)
app.register_blueprint(crypto_blueprint)
c = Bitcoin(testnet=True)

class TestGetUtxos(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test_client = app.test_client()

    def test_get_utxos(self):
        utxos = self.test_client.get("/crypto/wallet/utxos?address=tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262")
        self.assertEqual(utxos.json, {'success': True, 'utxos': [{"txid":"4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752","vout":0,"status":{"confirmed":True,"block_height":2287015,"block_hash":"000000000000002f6e40da79151c2bd0c678465f0f2a57267610d24046139fdd","block_time":1658365882},"value":10000}]})

    def test_get_utxos_invalid_address(self):
        utxos = self.test_client.get("/crypto/wallet/utxos?address=pfdkospk")
        self.assertEqual(utxos.json, {"success": False, "error": "Invalid address"})