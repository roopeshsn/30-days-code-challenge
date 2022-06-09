const http = require("http")
const fs = require("fs/promises")

const host = "localhost"
const port = 8000
let aboutFile

const server = http.createServer(function (req, res) {
  if (req.url == "/") {
    // response header
    res.writeHead(200, { "Content-Type": "text/html" })

    // response content
    res.write(`<html><body><p>This is Home Page. ${req.url}</p></body></html>`)
    res.end()
  } else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(aboutFile)
  } else if (req.url == "/data") {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.write(JSON.stringify({ message: "Hello World" }))
    res.end()
  } else {
    res.writeHead(404, { "Content-Type": "text/html" })
    res.write("<html><body><p>Page not found</p></body></html>")
    res.end()
  }
})

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})

fs.readFile(__dirname + "/about.html")
  .then((contents) => {
    aboutFile = contents
    console.log("about page in use")
  })
  .catch((err) => {
    console.error(`Could not read index.html file: ${err}`)
    process.exit(1)
  })
