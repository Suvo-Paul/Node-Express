// console.log("hello");


/*
1st step = npm init
2nd step = npm i nodemon
3rd step = npm start
*/
// const express = require("express")
// const http = require("http")
// const port = 3000

const express = require("express")
const app = express()


const users = require("./MOCK_DATA.json")

const myHandler = (req, res) => {
    res.write("Starting. ")
    res.end("Ending")
}

app.get("/", (req, res) => {
    return res.send("welcome to home page")
})

app.get("/about", (req, res) => {
    return res.send("welcome to about page" + " hey " + req.query.name + " your age is " + req.query.age)
})

app.get("/api/users", async (req, res) => {
    const header = req.headers["Purpose"]
    res.setHeader("X-MyName", "Suvo Paul")  // always add X to custom headers
    res.json(users)
})
app.get("/api/users/:id", async (req, res) => {
    const id = Number(req.params.id)
    const response = users.find(users => users.id === id)

    return res.json(response)
})

app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html)
})



// const EventEmitter = require("events")
const event = require("events")
const { ok } = require("assert")

const EventEmitter = new event.EventEmitter()

EventEmitter.on("sayMyName", () => {
    console.log("Your name is Suvo");
})

EventEmitter.on("sayMyName", () => {
    console.log("Your name is Rahul");
})

EventEmitter.on("sayMyName", () => {
    console.log("Your name is John");
})

EventEmitter.on("checkPage", (code, message) => {
    console.log(`status code is ${code}, and page is ${message}`);
})

EventEmitter.emit("sayMyName")
EventEmitter.emit("checkPage", 200, "ok")



const fs = require("fs")

app.get("/stream", (req, res) => {
    const rstream = fs.createReadStream("input.txt")

    rstream.on("data", (chunkData) => {
        res.write(chunkData)
    })

    rstream.on("end", () => {
        res.end()
    })

    rstream.on("error", (error) => {
        res.end("File not found")
    })
})

app.get("/oneLineStream", (req, res) => {
    const rstream = fs.createReadStream("input.txt")

    rstream.pipe(res)
})

// const myServer = http.createServer(app)
const port = 8000
app.listen(port, () => {
    console.log("Server is running on", port);
})