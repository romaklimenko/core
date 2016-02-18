export const Logger = store => next => action => {
  console.info('action', action)
  const result = next(action)
  console.log('state', store.getState())
  return result
}

export default Logger