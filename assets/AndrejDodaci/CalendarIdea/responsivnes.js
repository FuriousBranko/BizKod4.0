$(document).ready(function ()
{

function daysInMonth (month, year, day) {
        return new Date(year, month, day).getDate();
    }
    var date = new Date();
    var daysinMon = daysInMonth(date.getMonth() + 1,date.getFullYear(), 0);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    for(x=1; x<=daysinMon;x++) {

        var cal = document.createElement('div');
        cal.id = "day"+x;
        cal.className = "containter";

        var date1 = new Date(date.getMonth()+1+" "+x+" "+date.getFullYear());
        var dd = date1.getDay();
        console.log(date1);
        var dayName = days[dd];

        var title = document.createElement('div');
        title.id = "Name"+x;
        title.className = "NameDiv";
        title.innerHTML = x+" "+dayName;
        cal.appendChild(title);

        var numbers = document.createElement('div');
        numbers.id = "content" + x;
        numbers.className="day";
        cal.appendChild(numbers);




        //cal.innerHTML = x + " " +dayName;


        for(y = 1; y<=24;y++)
        {
            var day = document.getElementById("day"+x);
            day = document.createElement('div');
            day.innerHTML=y;
            day.id = "day"+x+"slot"+y;
            day.className = 'slot';
            numbers.appendChild(day);
        }

        document.getElementById('calendar').appendChild(cal);



    }


});