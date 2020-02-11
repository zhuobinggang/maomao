const db = require('./sqlite')

test('The count will be added by one after inserting', () => {
  return db.getCount('view_stastics').then(oldCount => {
    return db.incViewCount('fake.fake.fake').then(() => {
      return oldCount
    })
  }).then(oldCount => {
    return db.getCount('view_stastics').then(newCount => {
      return [oldCount, newCount]
    })
  }).then(([oldCount, newCount]) => {
    expect(newCount == oldCount + 1).toBe(true)
  })
})