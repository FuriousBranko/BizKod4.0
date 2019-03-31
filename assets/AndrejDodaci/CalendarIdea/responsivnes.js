function daysInMonth (month, year, day) {
        return new Date(year, month, day).getDate();
    }


    var date = new Date();
    var daysinMon = daysInMonth(date.getMonth()+1,date.getFullYear(), 0);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];


    //Month text and Year text
    function YearandMonth(month1,year1) {
    //var month1 = new Date(date.getMonth()+1+" "+date.getDay()+" "+date.getFullYear());
    var month2 = new Date(year1,month1+1,date.getDay());
    var mm = month2.getMonth();
    var monthName = month[mm];
    document.getElementById("Mname").innerHTML = monthName;
    var yy = month2.getFullYear();
    document.getElementById("Yname").innerHTML = yy;
    return month2;
    }
    YearandMonth(date.getMonth(), date.getFullYear());

    var mooo = YearandMonth(date.getMonth(), date.getFullYear());
    var mm = mooo.getMonth();

    //month -1
    function leftM()
{
    mm--;

    if(mm < 0)
    {
        mm = 11;
    }
    else if (mm > 11)
    {
        mm = 0;
    }
    var mm2 = new Date(date.getFullYear(),mm,+date.getDay());
    var mnthchange = mm2.getMonth();
    var monthName = month[mnthchange];
    document.getElementById("Mname").innerHTML = monthName;
}
    //month +1
    function rightM()
    {
        mm++;
        if(mm < 0)
        {
            mm = 11;
        }
        else if (mm > 11)
        {
            mm = 0;
        }
        var mm2 = new Date(date.getFullYear(),mm,+date.getDay());
        var mnthchange = mm2.getMonth();
        var monthName = month[mnthchange];
        document.getElementById("Mname").innerHTML = monthName;

        console.log(YearandMonth().getFullYear()+" " +mm);

        genDays(YearandMonth(mnthchange,date.getFullYear()).getFullYear(),mm);
    }
    //Generate days
function genDays(year,month) {

        for (var i = 0; i < del.length;i++)
        {
            document.getElementById("day"+i).remove();
        }
        delete(del);
    }
    for(x=1; x<=daysinMon;x++) {

        var cal = document.createElement('div');
        cal.id = "day"+x;
        cal.className = "containter";

        var date1 = new Date(year,month,x);
        var dd = date1.getDay();
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
}
