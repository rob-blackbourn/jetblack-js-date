import {
  adjustBusinessDay,
  BusinessDayConvention,
  HolidayCalendar,
  tzUtc
} from '../src'

describe('adjustBusinessDay', () => {
  const cal = new HolidayCalendar(
    'test',
    [6, 0],
    [
      new Date('2015-01-01'),
      new Date('2015-04-03'),
      new Date('2015-04-06'),
      new Date('2015-05-01'),
      new Date('2015-12-25'),
      new Date('2015-12-16')
    ]
  )

  const decThirtyFirst = new Date('2014-12-31')
  const janFirst = new Date('2015-01-01')
  const janSecond = new Date('2015-01-02')

  it('should not require adjustment', () => {
    expect(
      adjustBusinessDay(
        janFirst,
        BusinessDayConvention.NONE,
        true,
        cal,
        tzUtc
      ).toISOString()
    ).toBe(janFirst.toISOString())
  })

  it('should adjust following', () => {
    expect(
      adjustBusinessDay(
        janFirst,
        BusinessDayConvention.FOLLOWING,
        true,
        cal,
        tzUtc
      ).toISOString()
    ).toBe(janSecond.toISOString())
  })

  it('should adjust preceding', () => {
    expect(
      adjustBusinessDay(
        janFirst,
        BusinessDayConvention.PRECEDING,
        true,
        cal,
        tzUtc
      ).toISOString()
    ).toBe(decThirtyFirst.toISOString())
  })
})
