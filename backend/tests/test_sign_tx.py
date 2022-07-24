import os
import unittest
from flask import Flask
from crypto_blueprint import crypto_blueprint
from cryptos import Bitcoin

app = Flask(__name__)
app.register_blueprint(crypto_blueprint)
c = Bitcoin(testnet=True)


class TestSignTx(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test_client = app.test_client()

    def test_sign_tx(self):
        resp = self.test_client.post(
            "/crypto/transaction/sign",
            json={
                "tx": "0100000002a498cc0d45ff455e4d77a7aef2d2934e906f046c1025fe74ec993cc74fffc9640100000000ffffffffffe8f777689d2f8013d620fccf329ea58305385a55ba9ad6e1eb07b6c96a02c40100000000ffffffff01b45f0000000000001976a9144709ee59d3da729b56656d8d214040d2eed66ea088ac00000000",
                "private_key": os.environ.get("PRIVATE_KEY"),
            },
        )
        self.assertEqual(
            resp.json["tx"],
            "0100000002a498cc0d45ff455e4d77a7aef2d2934e906f046c1025fe74ec993cc74fffc964010000008b483045022100a2b9472e607f765b0c51fd3cc169d1e2c551eef5a65cfbb70ae1ee6bb5a365a102203aba60d4b8ea15cc259cf50a90e1c6a2e6aad6a2966e57e5b92bb0f9fb478a670141047313760e5885894148167e57b89271cf9e00b7a32f58125fbd2b5b60771bb2b64ddb1c3dd1480ecc3bf73716f709fcada8f60a9fb234e54d67b88d384310cbf3ffffffffffe8f777689d2f8013d620fccf329ea58305385a55ba9ad6e1eb07b6c96a02c4010000008b483045022100caa057d19f5c6d419040ecbb3e170d5ca5ecf1714c1809f8a35f8b819433b18502205d486b94c62c8c6ef222dba1635a85f549f89aca62528d38aa87b0f4c50c8e030141047313760e5885894148167e57b89271cf9e00b7a32f58125fbd2b5b60771bb2b64ddb1c3dd1480ecc3bf73716f709fcada8f60a9fb234e54d67b88d384310cbf3ffffffff01b45f0000000000001976a9144709ee59d3da729b56656d8d214040d2eed66ea088ac00000000",
        )
        self.assertEqual(resp.status_code, 200)

    def test_sign_tx_bad_tx(self):
        resp = self.test_client.post(
            "/crypto/transaction/sign", json={"tx": "notreal", "private_key": "fake"}
        )
        self.assertEqual(
            resp.json,
            {
                "success": False,
                "error": "Something is probably wrong with your transaction hex. Please ensure everything is correct.",
            },
        )
