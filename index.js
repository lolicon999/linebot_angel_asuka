'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
// const config = {
//   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.CHANNEL_SECRET,
// };

const config = {
  channelId: "1566752695",
  channelAccessToken: "wGFsJMi13AK4N+DZ7HhSENrk9xHtfxlgzcSjGwr5q9GlKOmkjU7qTXGXHTiKmvSYik9sr7LWDm4cEQumEkCDK0XUtqo0JmEDKD4bQSwYvRT5Bf/5ITV8QniMsRI6FfDZ8mmNtnJyNcUIFCAwPmgQAQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "ded86aca73026ac94e5b4d582c5ac843",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      console.log("here")
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    console.log("here1")
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };
  console.log(echo)
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});