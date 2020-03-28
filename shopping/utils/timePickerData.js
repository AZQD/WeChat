// 年月日时使用类别
const years = [];
const months = [];
const days = [];
const hours = [];
for (let i = 2019; i <= 2022; i++) {
  i = i < 10 ? '0' + i : i;
  years.push({
    value: i,
    unit: i + '年'
  });
}
for (let i = 1; i <= 12; i++) {
  i = i < 10 ? '0' + i : i;
  months.push({
    value: i,
    unit: i + '月'
  });
}

for (let i = 1; i <= 31; i++) {
  i = i < 10 ? '0' + i : i;
  days.push({
    value: i,
    unit: i + '日'
  });
}

for (let i = 0; i < 24; i++) {
  i = i < 10 ? '0' + i : i;
  hours.push({
    value: i,
    unit: i + '点'
  });
}
let timePickerData = [
  years,
  months,
  days,
  hours
];

module.exports = timePickerData;