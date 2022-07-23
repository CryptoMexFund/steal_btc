import unittest

from wallet import Wallet

# Note: No tests are provided for the create_transaction method
# Since I don't want to create a bunch of testnet transactions.

class TestGetLastTX(unittest.TestCase):
    def test_get_utxos(self):
        wallet = Wallet("tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262")
        self.assertEqual(wallet.utxos, [{"txid":"4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752","vout":0,"status":{"confirmed":True,"block_height":2287015,"block_hash":"000000000000002f6e40da79151c2bd0c678465f0f2a57267610d24046139fdd","block_time":1658365882},"value":10000}])

    def test_invalid_address(self):
        wallet = Wallet("fake_address")
        self.assertEqual(wallet.utxos, None)

    def test_no_transactions(self):
        wallet = Wallet("my2FPnigaXVDG8vZnYDmNneEYi1zpSDxHY")
        self.assertEqual(wallet.utxos, [])


class TestGetWalletBalance(unittest.TestCase):
    def test_get_balance(self):
        wallet = Wallet("tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262")
        self.assertEqual(wallet.balance, 10000)

    def test_invalid_address(self):
        wallet = Wallet("fake_address")
        self.assertEqual(wallet.balance, None)

    def test_no_transactions(self):
        wallet = Wallet("my2FPnigaXVDG8vZnYDmNneEYi1zpSDxHY")
        self.assertEqual(wallet.balance, 0)

class TestGetTxById(unittest.TestCase):
    def test_get_tx(self):
        wallet = Wallet("tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262")
        self.assertEqual(wallet.get_utxo_by_txid("4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752"), {"txid":"4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752","vout":0,"status":{"confirmed":True,"block_height":2287015,"block_hash":"000000000000002f6e40da79151c2bd0c678465f0f2a57267610d24046139fdd","block_time":1658365882},"value":10000})

    def test_invalid_address(self):
        wallet = Wallet("fake_address")
        self.assertEqual(wallet.get_utxo_by_txid("4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752"), None)

    def test_no_transactions(self):
        wallet = Wallet("my2FPnigaXVDG8vZnYDmNneEYi1zpSDxHY")
        self.assertEqual(wallet.get_utxo_by_txid("4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752"), None)

class TestGetTotalUtxoValue(unittest.TestCase):
    def test_get_total_utxo_value(self):
        wallet = Wallet("tb1qsajy7ag7xs47vqltlr939gtm28dx2kdthlt262")
        self.assertEqual(wallet.get_total_utxo_value(["4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752"]), 10000)

    def test_invalid_address(self):
        wallet = Wallet("fake_address")
        self.assertEqual(wallet.get_total_utxo_value(["4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752"]), None)

    def test_no_transactions(self):
        wallet = Wallet("my2FPnigaXVDG8vZnYDmNneEYi1zpSDxHY")
        self.assertEqual(wallet.get_total_utxo_value(["4e77f8a34f0fa4fca2ab296a39375630b48d4cb15dda0aa5e5f3c3cef89bb752"]), 0)


