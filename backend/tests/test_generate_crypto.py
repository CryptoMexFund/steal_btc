import unittest
from flask import Flask
from crypto_blueprint import crypto_blueprint
from cryptos import Bitcoin

app = Flask(__name__)
app.register_blueprint(crypto_blueprint)
c = Bitcoin(testnet=True)


class TestGenerateCrypto(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test_client = app.test_client()

    def test_generate_crypto(self):
        res = self.test_client.get("/crypto/wallet/generate")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(
            res.json["address"], c.pubtoaddr(c.privtopub((res.json["private_key"])))
        )

    def test_generate_with_seed(self):
        res = self.test_client.get(
            "/crypto/wallet/generate?seed=a big long brainwallet password"
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(
            res.json["private_key"],
            "89d8d898b95addf569b458fbbd25620e9c9b19c9f730d5d60102abbabcb72678",
        )
        self.assertEqual(res.json["address"], "mwJUQbdhamwemrsR17oy7z9upFh4JtNxm1")
