import { makeObservable, observable } from "mobx"

class BitcoinWallets {
  wallets = []
  constructor() {
    makeObservable(this, {
      wallets: observable,
      addBitcoinWallet: action,
      deleteBitcoinWallet: action
    }, {autoBind: true})
  }
  addBitcoinWallet(wallet, privateKey) {
    this.wallets.push({wallet, privateKey})
  }
  deleteBitcoinWallet(wallet) {
    this.wallets = this.wallets.filter((w) => w.wallet !== wallet)
  }
}

export default bitcoinWallets = new BitcoinWallets()