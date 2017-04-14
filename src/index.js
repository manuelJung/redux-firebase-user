import * as fromHocs from './hocs'
import * as fromSelectors from './selectors'
import * as fromActionTypes from './actionTypes'
import * as fromActions from './actions'
import * as fromComponents from './components'
import * as fromUpdaters from './updaters'
import config from './config'

export { default as reducer } from './reducer'
// export { default as config } from './config'

export const hocs        = fromHocs
export const selectors   = fromSelectors
export const actionTypes = fromActionTypes
export const actions     = fromActions
export const components  = fromComponents
export const updaters    = fromUpdaters

export default {
  initializeModule : config.setConfig,
  updateModule     : config.setConfig
}
