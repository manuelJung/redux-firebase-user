
/**
 * 
 * @param {object} store 
 * @param {function} shouldUpdate should return bool
 * @param {function} triggerUpdate 
 * @returns {function} unsubscribeStore
 */
export const subscribeStore = (store, shouldUpdate, triggerUpdate) => {
  let prevState = store.getState()
  let mounted = true

  const unsubscribe = store.subscribe(() => {
    const nextState = store.getState()
    mounted && shouldUpdate(prevState, nextState) && triggerUpdate()
    prevState = nextState
  })

  return () => (mounted = false) || unsubscribe()
}