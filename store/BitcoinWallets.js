import { makeObservable, observable, action } from 'mobx'

class BitcoinWallets {
    wallets = []
    constructor() {
        makeObservable(
            this,
            {
                wallets: observable,
                addBitcoinWallet: action,
                deleteBitcoinWallet: action,
            },
            { autoBind: true }
        )
    }

    // public key is also to be added here.
    addBitcoinWallet(wallet, privateKey, account) {
        this.wallets.push({ wallet, privateKey })
    }
    deleteBitcoinWallet(wallet) {
        this.wallets = this.wallets.filter((w) => w.wallet !== wallet)
    }
}

export default bitcoinWallets = new BitcoinWallets()
