const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3002;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("Hi from server side!")
    }

    function fallback(agent) {
        console.log(`intent  =>  fallback`);
       agent.add("fallback from server side!")
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', hi); 
    intentMap.set('Default Fallback Intent', fallback);
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});