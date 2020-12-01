# RPGG Tech Test

## Spec

Create a small command line utility to help a small fictional company calculate the dates on which they should pay their
sales staff.

Company payroll is handled like so:
- Sales staff are paid a regular ﬁxed base salary each month, plus a regular monthly bonus.
- Base salaries are paid on the last day of each month, unless that day is a Saturday or Sunday (a weekend), in which 
case they are paid on the Friday before the weekend
- On the 15th of each month, bonuses are paid for the previous month, unless that day is a weekend, in which case they
are paid on the first Wednesday after the 15th.

Your utility should calculate the payment dates for the next 12 months, including the current month, and output to the
screen in a CSV format.


## Requirements
CLI application

### Output
CSV format

### Functionality

- Calculate payment dates for both salaries and bonuses for the next 12 months
- Salaries are paid on the final day of the month, unless this is a weekend, in which case the Friday before is used.
- Bonuses are paid on the 15th of the next month, unless this is a weekend, in which case the Wednesday after is used.
- By default, the application should calculate and output all payment dates for the next 12 months, including the
  current month.