import { makeObservable, observable, action } from 'mobx'

class CurrentChain {
  chain = 'Bitcoin'

  constructor() {
      makeObservable(
          this,
          {
              chain: observable,
          },
          { autoBind: true }
      )
  }
  
  setChain(chain) {
      this.chain = chain
  }
}

export default currentChain = new CurrentChain()