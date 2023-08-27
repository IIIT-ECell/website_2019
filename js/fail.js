
<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
</script>

function sendEmail(){
    let Message = document.getElementById("story").value;
    console.log(Message);
    emailjs.init("dWkyD2LG6Dqn2zTq2");
    emailjs.send("service_m6l9w24","template_qondvvv",{
        message: Message,
    });
}