const message_container = document.getElementById("messages")
const prompt_input = document.getElementById("chat")
// These two functions add messages to the HTML DOM
function addResponseMessage(msg) {
    const message = document.createElement("div")
    message.className = "ai chatbox"
    message.textContent = msg
    message_container.appendChild(message)

    gsap.from(message, {scale: 0.3,  duration: 1, ease: "elastic.out(1.2, 0.3)"});

}

function addUserMessage(msg) {
    const message = document.createElement("div")
    const message_precontainer = document.createElement("div") // This is that container that goes around it.
    message.className = "user chatbox"
    message.textContent = msg
    message_precontainer.className = "chatbox-container"
    // Don't think about this too hard.
    message_precontainer.appendChild(message)
    message_container.appendChild(message_precontainer)

    gsap.from(message, {scale: 0.3,  duration: 1, ease: "elastic.out(1.2, 0.3)"});
}


async function makeRequest(msg) {
    addUserMessage(msg)
    prompt_input.value = ""

    const response = await fetch(`http://localhost:3000/aicall?prompt=${msg}`)
    const result = await response.json()
    console.log(result.result)
    addResponseMessage(result.result)
}

// addUserMessage("A message here.")
//addResponseMessage("The response goes here!")
// addUserMessage("Are you AI?")
// addResponseMessage("Maybe I am...")
// addResponseMessage("...maybe not")
// addUserMessage("👀👀👀")

prompt_input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (prompt_input.value) {
            makeRequest(prompt_input.value)
        }
    }
});