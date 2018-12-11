const initYear = 1990
const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const hour = date.getHours()
const minute = date.getMinutes()
for (let i = initYear; i <= date.getFullYear() + 2; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  i = i < 10 ? '0' + i : i
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  i = i < 10 ? '0' + i : i
  days.push(i)
}

for (let i = 0; i < 24; i++) {
  i = i < 10 ? '0' + i : i
  hours.push(i)
}

for (let i = 0; i < 60; i++) {
  i = i < 10 ? '0' + i : i
  minutes.push(i)
}

Page({
  data: {
    years,
    year,
    months,
    month,
    days,
    day,
    hours,
    hour,
    minutes,
    minute,
    value: [year - initYear, month, day, hour, minute],
  },
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]]
    })
  }
})