import * as Immutable from 'immutable'

export default Immutable.Map<string, any>()
  .set('tree', Immutable.OrderedMap())
  .setIn(
    ['tree', '/{11111111-1111-1111-1111-111111111111}'],
    Immutable.fromJS({
      id: '{11111111-1111-1111-1111-111111111111}',
      name: 'sitecore',
      path: '/{11111111-1111-1111-1111-111111111111}'
    }))