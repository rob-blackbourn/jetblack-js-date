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
      ).getTime()
    ).toBe(janFirst.getTime())
  })

  it('should adjust', () => {
    expect(
      adjustBusinessDay(
        janFirst,
        BusinessDayConvention.FOLLOWING,
        true,
        cal,
        tzUtc
      ).getTime()
    ).toBe(janSecond.getTime())
  })
})
