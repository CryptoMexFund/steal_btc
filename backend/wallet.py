import requests

HEAD_URL = "https://blockstream.info/testnet/api"
ADDRESS_URL = HEAD_URL + "/address"
TX_URL = HEAD_URL + "/tx"


class Wallet:
    def __init__(self, address):
        self.address = address

    @property
    def balance(self):
        """
        Returns the balance of the given address.
        """
        url = f"{ADDRESS_URL}/{self.address}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()["chain_stats"]["funded_txo_sum"]
        else:
            return None

    @property
    def utxos(self):
        """
        Returns the unspent transactions of the given address or None
        """
        url = f"{ADDRESS_URL}/{self.address}/utxo"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return None

    def get_utxo_by_txid(self, txid):
        """
        Returns the unspent transactions of the given address or None
        """
        if not self.utxos:
            return None
        for utxo in self.utxos:
            if utxo["txid"] == txid:
                return utxo
        return None

    def get_total_utxo_value(self, txids):
        """
        Returns the total value of the given txids.
        """
        if self.balance is None: # Invalid addresses are handled as None
            return None
        total = 0
        for txid in txids:
            utxo = self.get_utxo_by_txid(txid)
            if utxo:
                total += utxo["value"]
        return total

    @staticmethod
    def create_transaction(transaction_hex):
        """
        Creates a transaction from the given hex string.
        """
        url = f"{TX_URL}"
        response = requests.post(url, data=transaction_hex, headers={"Content-Type": "text/plain"})
        if response.status_code == 200:
            return response.text
        else:
            return None



