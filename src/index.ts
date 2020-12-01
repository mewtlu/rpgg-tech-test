import dayjs, { Dayjs as DDate } from 'dayjs'

export interface MonthlyPaymentDates {
  salaries: DDate
  bonuses: DDate
}

export interface DateRangePaymentDates {
  [monthStart: string]: MonthlyPaymentDates
}

export interface PaymentConfig {
  Date: number, // Standard date of payment
  AlternativeDay: number // Alternative day of week to use if payment date was a weekend (dayjs weekday standard: 0 = sun, 6 = sat)
  AlternativeDirection: 1 | -1 // If using alternative day, search forwards (1) or backwards (-1).
}

export enum SalaryPaymentConfig {
  Date = -1, // last day of month
  AlternativeDay = 5, // Friday
  AlternativeDirection = -1, // If using alternative day, search backwards.
}
export enum BonusPaymentConfig {
  Date = 15,
  AlternativeDay = 3, // Wednesday
  AlternativeDirection = 1,
}

const AvoidDates = [ // Days of the week on which payments can not be made
  0, // Sunday
  6, // Saturday
]

function calculatePaymentDateForMonth (monthStartingAt: DDate, paymentConfig: PaymentConfig): DDate {
  let date = paymentConfig.Date === -1 ? monthStartingAt.endOf('month') : monthStartingAt.date(paymentConfig.Date)

  const dayOfWeek = date.day()
  if (AvoidDates.includes(dayOfWeek)) {
    let potentialDate = date
    if (paymentConfig.AlternativeDirection === -1) {
      if (paymentConfig.AlternativeDay > dayOfWeek) {
        potentialDate = potentialDate.subtract(1, 'week')
      }
    } else if (paymentConfig.AlternativeDay < dayOfWeek) {
      potentialDate = potentialDate.add(1, 'week')
    }
    potentialDate = potentialDate.day(paymentConfig.AlternativeDay)
    potentialDate = potentialDate.day(paymentConfig.AlternativeDay)
    date = potentialDate
  }

  return date
}

function calculatePaymentDatesInRange (from: DDate, to: DDate): DateRangePaymentDates {
  const dates: DateRangePaymentDates = {}
  let currentDate = from.startOf('month')
  while (currentDate.isBefore(to)) {
    const dateKey = currentDate.format()
    dates[dateKey] = {
      salaries: calculatePaymentDateForMonth(currentDate, SalaryPaymentConfig),
      bonuses: calculatePaymentDateForMonth(currentDate.add(1, 'month'), BonusPaymentConfig),
    } as MonthlyPaymentDates

    currentDate = currentDate.add(1, 'month')
  }
  return dates
}

export function prettyPrintRangeOutput (output: DateRangePaymentDates, showDays = false): void {
  const displayHeaders = ['Month Commencing', 'Salary Payment Date', 'Bonus Payment Date']
  console.log(displayHeaders.join(`,${' '.repeat(showDays ? 3 : 1)}`))

  let dateFormat = 'YYYY-MM-DD'
  if (showDays) {
    dateFormat = 'dd DD MMM YYYY'
  }
  Object.keys(output).forEach((d) => {
    const monthStartDate = dayjs(d)
    const displayColumns = [monthStartDate.format(dateFormat), output[d].salaries.format(dateFormat), output[d].bonuses.format(dateFormat)]
    console.log(displayColumns.join(`,${' '.repeat(showDays ? 8 : 1)}`))
  })
}

function handler (): void {
  const now = dayjs()
  const oneYearAhead = now.add(1, 'year')

  const dates = calculatePaymentDatesInRange(now, oneYearAhead)

  const flag = process.argv[2]

  prettyPrintRangeOutput(dates, ['-v', '--verbose'].includes(flag))
}

export default calculatePaymentDatesInRange

if (require.main === module) {
  handler()
}
