'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// custom module
const diceRoller = require("./dice.js")
const Asuka = require("./asuka.js")

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);
const dice = new diceRoller();
const asuka = new Asuka()
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
      console.log("wtf")
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  console.log(event)
  // create a echoing text message
  let msgStr = event.message.text
  let reply_text
  if (msgStr.match(/^隨機/) !== null) {
    reply_text = selectRandom(msgStr);
  } else if (msgStr.match(/運勢|運氣/) !== null) {
    reply_text = testLuck();  
  } else if (msgStr.match(/^明日香/) !== null) {
    reply_text = asuka.say(msgStr);
  } else {
    reply_text = dice.roll(msgStr);
  }
  let texts = Array.isArray(reply_text) ? reply_text : [reply_text];
  return client.replyMessage(
    event.replyToken,
    texts.map((text) => ({ type: 'text', text }))
  );
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

function selectRandom(selectStr) {
    let itemArray = selectStr.split(' ');
    itemArray.shift();
    if(itemArray.length<2) return undefined;
    let replStr = '[' + itemArray.join(",") + '] → ';
    replStr += itemArray[Math.floor((Math.random() * (itemArray.length)) + 0)];
    return replStr;
}

function testLuck() {
    console.log("in luck");
    let replyArr = [
      "超幸運的一天，骰子女神眷顧你，骰10個大成功也不是夢呢",
      "大吉，超幸運的，絕對會成功的",
      "中吉，很不錯呢，事情會很順利的",
      "小吉，這是好機會，趁著勢頭往前吧",
      "半吉，加油，是表現的好機會",
      "末吉，雖然有著一些運氣，但不把握的話是沒辦法留住的呢。",
      "末小吉，很微妙的運氣呢，這時用實力證明自己吧",
      "凶，雖然事情可能會有些不順利，這時就用努力撐過去吧，明日香會在旁邊幫你加油的",
      "小凶，只要撐過這段時間，好運一定會降臨的，FIGHT！",
      "半凶，就算碰到不順利的事，也沒有人會怪你的喔，整頓好心情，邁向明天吧",
      "末凶，事情不會變得更糟了，抱著樂觀的心情上吧，想跟我傾訴也沒關係的喔",
      "大凶，這樣的運氣，就算連骰5個大失敗也有可能呢，啊！請不要靠近我，不然我也會變得不幸的",
      "恭喜，這裡是特別獎，可以得到明日香的摸摸頭一次呢(摸摸~摸摸",
    ];
    let randomResult = Math.floor((Math.random()*1000+1));
    if (randomResult<=20) return replyArr[0];
    else if (randomResult<=90) return replyArr[1];
    else if (randomResult<=160) return replyArr[2];
    else if (randomResult<=250) return replyArr[3];
    else if (randomResult<=363) return replyArr[4];
    else if (randomResult<=444) return replyArr[5];
    else if (randomResult<=525) return replyArr[6];
    else if (randomResult<=600) return replyArr[7];
    else if (randomResult<=720) return replyArr[8];
    else if (randomResult<=825) return replyArr[9];
    else if (randomResult<=929) return replyArr[10];
    else if (randomResult<=989) return replyArr[11];
    else if (randomResult<=1000) return replyArr[12];
    else return undefined;
}