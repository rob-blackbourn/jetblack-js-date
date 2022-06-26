import { areInSameQuarter } from '../src'

describe('areInSameQuarter', () => {
  it('should be true', () => {
    expect(
      areInSameQuarter(new Date('2000-01-01'), new Date('2000-03-01'))
    ).toBeTruthy()

    expect(
      areInSameQuarter(new Date('2000-04-01'), new Date('2000-04-01'))
    ).toBeTruthy()

    expect(
      areInSameQuarter(new Date('2000-07-01'), new Date('2000-09-01'))
    ).toBeTruthy()

    expect(
      areInSameQuarter(new Date('2000-10-01'), new Date('2000-12-01'))
    ).toBeTruthy()

    expect(
      areInSameQuarter(new Date('2000-01-01'), new Date('2001-02-01'))
    ).toBeTruthy()
  })

  it('should be false', () => {
    expect(
      areInSameQuarter(new Date('2000-01-01'), new Date('2000-04-01'))
    ).toBeFalsy()

    expect(
      areInSameQuarter(new Date('2000-01-01'), new Date('2001-04-01'))
    ).toBeFalsy()
  })
})
