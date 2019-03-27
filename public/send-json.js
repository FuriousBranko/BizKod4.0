var thedata;
var tekst = "";
$(document).ready(function (){
    console.log("Doc loaded");
    $("#thebutton").click(function(){
        console.log(document.getElementById("tekst").value);
        tekst = document.getElementById("tekst").value;
        thedata = {
            "name" : tekst
        };
        $.ajax({
            type: "POST",
            url: "",
            data: JSON.stringify(thedata),
            success: function(result){
                console.log(err);
                console.log("Server response:" + result);
            },
            dataType: "json",
            contentType: "application/json"
        });
    });
    
});
