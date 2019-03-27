var thedata;
$(document).ready(function (){
    console.log("Doc loaded");
    $("#submit").click(function(){
        console.log("clicked");
        var s_name = document.getElementById("username").value;
        var s_password = document.getElementById("password").value;
        thedata = {
            "username" : s_name,
            "password" : s_password
        };
        $.ajax({
            type: "POST",
            url: "/main",
            data: JSON.stringify(thedata),
            success: function(data){
                window.location.href=data.url;
                console.log(data.error);
            },
            datatype: "json",
            contentType: 'application/json',
            error: function(){
                console.log("something went wrong");
            }
        });
    });
    $("#logout").click(function(){
        window.location.href='/logout'
    });
});

