var thedata;
$(document).ready(function (){
    console.log("Doc loaded");
    $("#submit").click(function(){
        console.log("clicked");
        var s_name = document.getElementById("username").value;
        var s_mail = document.getElementById("email").value;
        var s_password = document.getElementById("password").value;
        thedata = {
            "username" : s_name,
            "email" : s_mail,
            "password" : s_password
        };
        $.ajax({
            type: "POST",
            url: "/register",
            data: JSON.stringify(thedata),
            success: function(data){
                window.location.href=data.url;        
            },
            datatype: "json",
            contentType: 'application/json',
            error: function(){
                console.log("something went wrong");
            }
        });
    });
    
});
