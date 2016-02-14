export const Logger = (store) => {
  return (next) => (action) => {
    console.info('action', action)
    const result = next(action)
    console.info('state', store.getState())
    return result
  }
}

export default Logger