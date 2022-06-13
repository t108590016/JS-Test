const factories = [
      { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
      { name: "BR2", employees: ["Jessie", "Karen", "John"] },
      { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
      { name: "BR4", employees: [] }
];
    
console.log("1.");
/* 1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ] */
function getEmployeesNumberByFactory() {
      var factoriesNumber = [];
      factories.forEach(element => {
            var object = {name: element['name'], count: element['employees'].length};
            factoriesNumber.push(object);
      });
      return (factoriesNumber);
}
console.log(getEmployeesNumberByFactory());

console.log("2.");
/* 2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ] */
function getFactoriesNumberByEmployee() {
      var factoriesNumber = [];
      var found = 0;
      factories.forEach(element => {
            element['employees'].forEach(value => {          
                  found = 0;
                  /* 
                  尋找該名字是否已經加到factoriesNumber裡面
                  有 => count++
                  沒有 => 建一個object，推到factoriesNumber裡面
                  */
                  factoriesNumber.forEach(employees => {
                        if (value == employees?.name) {
                              employees['count']++;
                              found = 1;
                        }
                  });
                  if (found == 0) {
                        var object = {name: value, count: 1};
                        factoriesNumber.push(object);
                  }

            });
      });
      return factoriesNumber;
}
console.log(getFactoriesNumberByEmployee());

console.log("3.");
/* 3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }*/
function orderEmployeesList() {
      var factoriesNumber = [];
      factories.forEach(element => {
            // 將employees排列後放到新建的object裡面，再將object推到factoriesNumber裡面
            var object = {name: element['name'], employees: element['employees'].sort()};
            factoriesNumber.push(object);
      });
      return factoriesNumber;
}
console.log(orderEmployeesList());

const employeeType = [
      {id: 1, "name": "FullTime", work_begin: "09:20:00", work_end: "17:30:00"},
      {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
      {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
      {id: 1, name: "Alice", type: 2},
      {id: 2, name: "Bob", type: 3},
      {id: 3, name: "John", type: 2},
      {id: 4, name: "Karen", type: 1},
      {id: 5, name: "Miles", type: 3},
      {id: 6, name: "Henry", type: 1}
];

const tasks = [
      {id: 1, title: "task01", duration: 60 /* min */},
      {id: 2, title: "task02", duration: 120},
      {id: 3, title: "task03", duration: 180},
      {id: 4, title: "task04", duration: 360},
      {id: 5, title: "task05", duration: 30},
      {id: 6, title: "task06", duration: 220},
      {id: 7, title: "task07", duration: 640},
      {id: 8, title: "task08", duration: 250},
      {id: 9, title: "task09", duration: 119},
      {id: 10, title: "task10", duration: 560},
      {id: 11, title: "task11", duration: 340},
      {id: 12, title: "task12", duration: 45},
      {id: 13, title: "task13", duration: 86},
      {id: 14, title: "task14", duration: 480},
      {id: 15, title: "task15", duration: 900}
];

console.log("4.");
/* 4. Count total hours worked in 1 day ? // => 39 */
function totalHours() {
      var work_hours = 0;
      employeeType.forEach(element => {
            // 將時間根據':'分割開來
            const begin_time = element['work_begin'].split(':');
            const end_time = element['work_end'].split(':');
            /*
            工作時數的計算分為兩部分，第一部分是小時，第二部分是分，我認為分的部分也會影響到總時數，故列入計算，
            而秒數影響不大，故不列入。
            而計算方式根據開始時間比較大或是開始時間比較小而有區分，若開始時間較大代表有跨日，故需要特別處理。
            */
            if (parseInt(begin_time[0]) <= parseInt(end_time[0])) {
                  /*
                  沒有跨日的情況下：
                  假設begin => h1:m1:s1, end => h2:m2:s2
                  則時數為(h2 - h1) + ((m2 - m1) / 60)
                  */
                  work_hours += (parseInt(end_time[0]) - parseInt(begin_time[0])) + ((parseInt(end_time[1]) - parseInt(begin_time[1])) / 60);
            }
            else {
                  /*
                  有跨日的情況下：
                  假設begin => h1:m1:s1, end => h2:m2:s2
                  則時數為(24 - h1) + h2 + ((m2 - m1) / 60)
                  */
                  work_hours += (24 - parseInt(begin_time[0])) + parseInt(end_time[0]) + ((parseInt(end_time[1]) - parseInt(begin_time[1])) / 60);
            }
      });
      return work_hours;
}
console.log(totalHours());

console.log("5.");
/* 5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int */
function getWorkTime(inputType) {
      var result = {};
      employeeType.forEach(type => {
            if (inputType == type['id']) {
                  result = {begin_time: type['work_begin'], end_time: type['work_end']};
            }
      });
      return result;
}

function howManyEmployeeByTime(time) {
      var number = 0; //這個時間點有多少人在工作
      employees.forEach(employee => {
            // 尋找employee裡的type對應到employeeType的工作時間為何
            var work_time = getWorkTime(employee['type']);
            /*
            沒有跨日 => begin_time <= time <= end_time 代表正在工作
            有跨日 => begin_time <= time <= "23:59:59" OR "00:00:00" <= time <= end_time 代表正在工作
            */
            if (work_time['begin_time'] <= work_time['end_time'])
                  if ((time >= work_time['begin_time']) && (time <= work_time['end_time']))
                        number++;
            else
                  if ((time >= work_time['begin_time'] && time <= "23:59:59") || (time <= work_time['end_time'] && time >= "00:00:00"))
                        number++;
      });
      return number;
}
console.log(howManyEmployeeByTime("00:00:00"));

console.log("6.");
/* 6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count. */
function howManyDaysToDoneAllTasks() {
      const minute = (24 - 9) * 60; //一天 = 幾分鐘
      var totalMinute = 0; // 總共花費幾分鐘
      tasks.forEach(element => {
            totalMinute += element['duration'];
      });
      return totalMinute / minute; 
}
console.log(howManyDaysToDoneAllTasks());
