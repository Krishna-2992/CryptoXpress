import { makeObservable, observable, action } from 'mobx'

class PolygonWallets {
    wallets = []
    constructor() {
        makeObservable(
            this,
            {
                wallets: observable,
                addPolygonWallet: true,
                deletePolygonWallet: true,
            },
            { autoBind: true }
        )
    }

    // public key is also to be added here.
    addPolygonWallet(wallet, privateKey, account) {
        this.wallets.push({ wallet, privateKey, account })
    }
    deletePolygonWallet(wallet) {
        this.wallets = this.wallets.filter((w) => w.wallet !== wallet)
    }
}

export default polygonWallets = new PolygonWallets()
