import { makeObservable, observable, action } from 'mobx'

class ActiveWallet {
    wallet = ''

    constructor() {
        makeObservable(
            this,
            {
              wallet: observable,
            },
            { autoBind: true }
        )
    }
    changeCurrentActiveAccount(chain, wallet, account, privateKey) {
        this.activeWallet = { chain, wallet, account, privateKey }
    }


}

export default activeWallet = new ActiveWallet()   