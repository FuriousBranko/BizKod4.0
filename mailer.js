const mailer = require("nodemailer");

var transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: "rasuo49@gmail.com",
        clientId: "321031576720-uoh98e525qctjt7h762tnotq1v3v5iub.apps.googleusercontent.com",
        clientSecret: " kOjqz90WHq-3YAX0TpRybPFl ",
        refreshToken: "1/DHicFWddGXfZLA6t4P1okkX8SOdj0atbJ7jgdJUsLJy6fX5Matc4xTYfsU6Vm2ND",
        accessToken: "ya29.GlvcBvWFWoeWLcIG-Ki35jiYEaHzANw4DilTO7HRUk_bA0fDNYlDWwQInUM48eHEmwNs42HwwmwbdMwgrRlruYhgdyU7RK02qirMYvf3DhRgj9OhcPvr_KPXSGft",
  },
});

var skeet = "<h2>boopity skeet kachau pliba</h2></body>";

const message = 
`
<body style="background-color: blue"
<h1>YOU WERENT REJECTED!</h1>
<img src="./VSCODE/assets/images/FF.png" alt="didnt work">
<p>congratz my dude</p>
<h2></h2>
random
shizz
woop
woop
skiyah

`;

var mailOptions= {
    from: "DEFEC7 <rasuo49@gmail.com>",
    to: "rasuo49@gmail.com",
    subject: "test",
    html: message + skeet
}

transporter.sendMail(mailOptions, function(err,res){
    if(err){
        console.log(err);
    }
    else
    {
        console.log(res);
    }
});
