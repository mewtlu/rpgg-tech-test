import dayjs from 'dayjs'
import calculatePaymentDatesInRange, {prettyPrintRangeOutput} from '../../src'

const DateFormat = 'YYYY-MM-DD'

it('returns dates for the correct number of months in the given range', () => {
  const start = dayjs()
  const end = start.add(11, 'month')
  const expectedMonths = 12 // Range spans 12 months total

  const dates = calculatePaymentDatesInRange(start, end)

  const keys = Object.keys(dates)
  // Our range only spanned one month, so only one row should have been returned.
  expect(keys).toHaveLength(expectedMonths)
})

it('calculates valid payment dates for salaries and bonuses', () => {
  const startDate = '2021-03-01'
  const expectedSalaryPaymentDate = '2021-03-31'
  const expectedBonusPaymentDate = '2021-04-15' // Bonus should be paid on the 15th of the next month

  const start = dayjs(startDate)
  const end = start.endOf('month')

  const dates = calculatePaymentDatesInRange(start, end)

  const keys = Object.keys(dates)
  // Our range only spanned one month, so only one row should have been returned.
  expect(keys).toHaveLength(1)

  const firstMonth = dates[keys[0]]

  expect(firstMonth.salaries.format(DateFormat)).toBe(expectedSalaryPaymentDate)
  expect(firstMonth.bonuses.format(DateFormat)).toBe(expectedBonusPaymentDate)

  prettyPrintRangeOutput(dates)
})

it('uses the last Friday if the salary payment date was on a weekend', () => {
  const startDate = '2021-01-01' // (2021-01-30 is a Saturday)
  const expectedSalaryPaymentDate = '2021-01-29' // Last Friday before 2021-01-30

  const start = dayjs(startDate)
  const end = start.endOf('month')

  const dates = calculatePaymentDatesInRange(start, end)

  const keys = Object.keys(dates)
  // Our range only spanned one month, so only one row should have been returned.
  expect(keys).toHaveLength(1)

  expect(dates[keys[0]].salaries.format(DateFormat)).toBe(expectedSalaryPaymentDate)
})

it('uses the next Wednesday if the bonus payment date was on a weekend', () => {
  const startDate = '2021-04-01' // (2021-05-15 is a Saturday)
  const expectedBonusPaymentDate = '2021-05-19' // First Wednesday after 2021-05-15

  const start = dayjs(startDate)
  const end = start.endOf('month')

  const dates = calculatePaymentDatesInRange(start, end)

  const keys = Object.keys(dates)
  // Our range only spanned one month, so only one row should have been returned.
  expect(keys).toHaveLength(1)

  expect(dates[keys[0]].bonuses.format(DateFormat)).toBe(expectedBonusPaymentDate)
})