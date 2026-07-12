
function addUserMessage(msg) {
    const message = document.createElement("div")
    const message_container = document.getElementById("messages")
    message.className = "ai chatbox"
    message.textContent = msg
    message_container.appendChild(message)
}

function addResponseMessage(msg) {
    const message = document.createElement("div")
    const message_precontainer = document.createElement("div") // This is that container that goes around it.
    const message_container = document.getElementById("messages") // this is where all the messages go 
    message.className = "user chatbox"
    message.textContent = msg


    message_precontainer.className = "chatbox-container"

    // Don't think about this too hard.
    message_precontainer.appendChild(message)
    message_container.appendChild(message_precontainer)
}

messages = [
    {"user": "hi"},
    {"ai": "hi"},
    {"user": "This is a demo message."}
]

addUserMessage("This is added using JS")
addResponseMessage("This is added using JS")