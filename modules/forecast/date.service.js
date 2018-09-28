weatherApp.factory('dateService', function () {
  var services = {};

  services.getDate = function (date) {
    return new Date(date * 1000).getDate();
  }

  services.getDay = function (date) {
    var weekDay;
    switch (new Date(date * 1000).getDay()) {
      case 0:
        weekDay = "Sun"
        break;
      case 1:
        weekDay = "Mon"
        break;
      case 2:
        weekDay = "Tue"
        break;
      case 3:
        weekDay = "Wed"
        break;
      case 4:
        weekDay = "Thu"
        break;
      case 5:
        weekDay = "Fri"
        break;
      case 6:
        weekDay = "Sat"
        break;
      default:
        weekDay = "Not Valid Weekday"
    }
    return weekDay;
  }

  services.getMonth = function (date) {
    var month;
    switch (new Date(date * 1000).getMonth()) {
      case 0:
        month = "Jan"
        break;
      case 1:
        month = "Feb"
        break;
      case 2:
        month = "Mar"
        break;
      case 3:
        month = "Apr"
        break;
      case 4:
        month = "May"
        break;
      case 5:
        month = "Jun"
        break;
      case 6:
        month = "Jul"
        break;
      case 7:
        month = "Aug"
        break;
      case 8:
        month = "Sep"
        break;
      case 9:
        month = "Oct"
        break;
      case 10:
        month = "Nov"
        break;
      case 11:
        month = "Dec"
        break;
      default:
        month = "Not Valid Month"
    }
    return month;
  }

  services.getTime = function (date) {
    var date = new Date(date * 1000);
    var unit, time;
    var hour = date.getHours();

    if (hour == 0 || hour < 12) {
      unit = "AM";
    } else {
      unit = "PM";
    }

    time = hour + ":00 " + unit
    return time;
  }

  return services;
});
