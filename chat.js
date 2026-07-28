// Chatversa Chat System


// Send Message Function

function sendMessage(){

    let input = document.getElementById("messageInput");

    let text = input.value.trim();


    if(text === ""){
        return;
    }


    let message = document.createElement("div");

    message.className = "sent-message";

    message.innerText = text;


    document.getElementById("messages")
    .appendChild(message);


    input.value = "";


    let box = document.getElementById("messages");

    box.scrollTop = box.scrollHeight;

}



// Voice Call Button

function voiceCall(){

    alert("📞 Voice Call feature coming soon!");

}



// Video Call Button

function videoCall(){

    alert("🎥 Video Call feature coming soon!");

}



// Load User Info (Future Firebase Ready)

window.onload = function(){

    let name = localStorage.getItem("chatUserName");


    if(name){

        document.getElementById("username")
        .innerText = name;

    }

};