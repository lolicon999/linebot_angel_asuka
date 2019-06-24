'use strict';
let assert = require("assert");

// dice content data
const kanColleDiceTable = {
    act: {
        diceNumber:1
    },
    evnt: {
        diceNumber:2
    },
    evkt: {
        diceNumber:2
    },
    evat: {
        diceNumber:2
    },
    evet: {
        diceNumber:2
    },
    event: {
        diceNumber:2
    },
    evst: {
        diceNumber:2
    },
    snz: {
        diceNumber:1
    },
    rnt: {
        diceNumber:1
    },
    spsnt: {
        diceNumber:1
    },
    snt: {
        diceNumber:1
    },
    dvt: {
        diceNumber:1
    },
    wp1t: {
        diceNumber:1
    },
    wp2t: {
        diceNumber:1
    },
    wp3t: {
        diceNumber:1
    },
    wp4t: {
        diceNumber:1
    },
    wpfa: {
        diceNumber:4
    },
    wpcn: {
        diceNumber:4
    },
    wpmc: {
        diceNumber:2
    },
    itt: {
        diceNumber:1
    },
    et: {
        diceNumber:1
    },
    lsft: {
        diceNumber:1
    },
    lfvt: {
        diceNumber:1
    },
    lfdt: {
        diceNumber:1
    },
    help: {
        diceNumber:0
    },
}

const NCMirenTable = {
    snm: {
        diceNumber: 1,
        1: "01嫌惡\n濃濃的惡意。理由什麼的隨便找一個都好，總之就是看對方怎樣都不順眼。\n發狂：敵對認識\n「那種東西，壞掉了最好啦！」\n效果：戰鬥中，沒有命中敵方的攻擊，全部都會擊中嫌惡的對象。(如果有在射程內的話)",
        2: "02獨占\n對於對象抱有強烈的佔有慾。想要讓對方成為自己的東西，絕對不會讓給任何人。名為愛戀的邪惡慾望。\n發狂：獨占衝動\n「果然妳的眼睛，真的好漂亮。」\n效果：戰鬥開始與戰鬥結束，各別選擇損傷1個對象的部件。",
        3: "03依存\n對妳而言，那是不能沒有的存在。如果那個人不在的話，妳會無法承受。\n發狂：幼兒退行\n「別讓我一個人……不要這樣、好恐怖哦……」\n效果：妳的最大行動值減少2。",
        4: "04執著\n好想待在那個人的旁邊，不想離開。妳的容身之處就是在那個人的旁邊，不想離開、不會離開，直到永遠。\n發狂：跟蹤監視\\n效果：戰鬥開始與戰鬥結束時，對象對妳的依戀精神壓力點數各增加1點。(如果已經處在精神崩壞狀態，可以不用作此處理)",
        5: "05戀心\n只要想起那個人，心裡就充滿酸楚。不想被那個人討厭，請不要移開妳的視線，可是人家也好害羞……\n發狂：自傷行為\n「如果沒辦法讓那個人看上我的話，這樣的身體我也不需要……」\n效果：戰鬥開始與戰鬥結束時，各別選擇損傷1個自己的部件。",
        6: "06對抗\n就只有那個人，妳不能輸！也不是說妳討厭她什麼的，只是妳不想要輸。妳會跟她一直競爭下去。\n發狂：過度競爭\n「是我比較優秀！因為我很優秀所以我絕對比較優秀！我比妳還優秀啦！」\n效果：戰鬥開始與戰鬥結束時，各別選擇任意依戀，增加1點精神壓力點數。(如果已經處在精神崩壞狀態，可以不用作此處理)",
        7: "07友情\n在朋友當中，那個人是最重要的。如果是那個人的話，妳願意盡妳所能地，去幫助她，因為她是妳的摯友。\n發狂：共鳴依存\n「妳的腳沒了的呢？沒關係，我也拔掉我的腳吧！」\n效果：單元結束時，對象的損傷部件比妳還要多的時候，妳的部件損傷數，要增加到與對方相同。",
        8: "08保護\n那個孩子很弱小，如果妳不去看著她、不去幫助她的話，讓她獨自一人，妳辦不到。\n發狂：過度保護\n「不可以離開！因為妳是我要保護的！」\n效果：戰鬥當中，妳跟「依戀的對象」處於不同區域的時候，無法宣告「移動以外的戰鬥宣言」，此外妳沒有辦法把「自身」與「依戀對象」以外的單位當成移動對象。",
        9: "09憧憬\n好想變得跟她一樣。那是妳所憧憬的對象，是自己想要成為的理想樣貌的那個人。\n發狂：贗作妄想\n「騙人！姊姊大人才不會說出那樣的話來！妳一定是假的吧！我才不會被妳騙到！」\n效果：戰鬥當中，妳跟「依戀的對象」處於同樣區域的時候，無法宣告「移動以外的戰鬥宣言」，此外妳沒有辦法把「自身」與「依戀對象」以外的單位當成移動對象。",
        10: "10信賴\n妳與對方一心同體，是可以把妳的一切交給對方的存在。如果與那個人一同行動的話，那就沒有什麼好怕的。\n發狂：疑心暗鬼\n「……我過去的話，妳會從後面開槍吧。才不會讓妳得逞！」\n效果：除了妳以外的所有姊妹，最大行動值減少1。"
    },
    nnm: {
        diceNumber: 1,
        1: "01忌諱\n感覺好噁心，完全不想要靠近，更不用說肢體上的接觸了，甚至連視線也不想要對上。\n發狂：刻意迴避\n「別、別靠過來！不要靠近我！快給我滾開！」\n效果：妳與「依戀的對象」或者「僕從」在同一個區域的時候，無法宣告「具有移動以外效果的戰鬥宣言」。此外妳沒有辦法把「自身」與「依戀對象」與「僕從」以外的單位當成移動對象。",
        2: "02嫉妒\n妳的身體明明都傷成這樣了，為什麼她的身體卻是那麼地……為什麼？\n發狂：不和諧音\n「大家……大家都變得跟我一樣的話就好了……」\n效果：全體姊妹行動判定修正-1。",
        3: "03依存\n妳完全無法想像沒有那個人的世界，妳不想要離開、一刻也不想分開，想要一直、一直在一起……\n發狂：幼兒退行\n「不要離開我……求求妳、不要走……」\n效果：自身最大行動值-2。",
        4: "04憐憫\n為什麼那個孩子會變成這副德性？她到底經歷過怎樣的苦難？\n發狂：投入過剩\n「快點住手！為什麼、為什麼要、這麼做呢！？」\n效果：妳對「僕從」的攻擊判定修正值-1。",
        5: "05感謝\n你有著純然的感謝心情。妳能夠有著現在的心靈與身體，都是托了那個人的福。所以，不管自己會變成什麼樣子都……\n發狂：病態謝禮\n「至少請妳收下我的眼睛吧！多虧了妳，這雙眼睛看到了許多美好的事物。」\n效果：這個依戀發狂的時候，妳要選擇任意2個基本部件損傷，如果基本部件數目不夠損傷，則選擇一個等級最低的強化部件損傷。",
        6: "06悔恨\n讓那孩子變成這個樣子的，正是妳的傑作。這件事情，至今依然在妳的心中寢寤伴之。\n發狂：自暴自棄\n「啊啊，都是我的錯。因為我的關係，大家、大家都變成這個樣子了……！」\n效果：戰鬥中，妳所有失敗的攻擊判定都會打在自己身上，部位自選。",
        7: "07期待\n妳堅信著，那個人有著能夠將現狀，引導向光明未來的能力。絕對不會錯、絕對是這樣、絕對沒有問題、絕對……\n發狂：期望落空\n「我是這麼相信著妳啊！垃圾！廢物！屍渣！沒有用的東西！」\n效果：妳消耗精神壓力點數重骰的判定，修正值-1(這個效果會累積)。",
        8: "08保護\n需要妳守護的不只是姊妹，還有其他重要的……\n發狂：生前回歸\n「大家都活過來了……太好了……太好了……」\n效果：妳無法將「集團」當作目標。",
        9: "09尊敬\n妳很清楚，自己絕對沒有辦法像她那樣。不過正因為如此，那個人才是妳所嚮往的對象。\n發狂：神化崇拜\n「為了姊姊大人，我什麼都可以不要！」\n效果：妳無法將「其他姊妹」當作目標。",
        10: "10信賴\n她是妳打從心底信任，而且願意委以重任的人。即使世界都變成了完全不同的樣貌，妳對那個人的信賴也永遠不會變。\n發狂：疑神疑鬼\n「……反正妳就是敵人吧，少給我裝了！」\n效果：除了妳之外的所有姊妹最大行動值-1。"
    },
    enm: {
        diceNumber: 1,
        1: "01恐懼\n不可以去想、不可以思考，關於那個傢伙的事情，絕對、絕對不可以去碰觸，因為那個傢伙正是妳恐懼的根源。\n發狂：拒絕理解\n「那個是幻覺、一切都是假的，其實根本沒・有・任・何・人在那邊，所以沒關係……不怕、不怕……」\n效果：妳所有的行為判定、發狂判定全部修正-1。",
        2: "02隸屬\n在妳的心中，深深刻印著對那個傢伙的服從意識。有的時候，這樣的感覺會讓妳苦惱地不知所措。\n發狂：造反有理\\n效果：戰鬥中，妳所有攻擊判定的失敗都以大失敗論處。",
        3: "03焦慮\n從見面的那一刻起妳就知道，那個傢伙絕對握有什麼可怕的秘密存在，然後、那個秘密則是……\n「怎怎怎怎怎怎怎麼、可、可能……不對、不、這是騙、騙人的吧？」\n效果：妳的最大行動值減少2。",
        4: "04憐憫\n就算刻意去否認，妳的心中依然明白這個道理。站在妳們對面的並不是可恨的敵人，而是可憐的對手。\n發狂：斯德哥爾摩症候群\n「這也是沒有辦法的事情……畢竟妳也是不想要這樣的不是嗎……」\n效果：妳對「僕從」的攻擊判定修正-1。",
        5: "05愛恨\n明明應該是可恨的敵人，妳卻無法去恨她。那個傢伙的優點，妳全部都知道。\n發狂：殉情\n「我到底該怎麼辦？明明是那麼愛著妳的！可是我也不想看著妳就這樣死掉！」\n效果：妳的發狂判定、攻擊判定大成功的時候，自身選擇「判定值-10」個部件損壞。",
        6: "06悔恨\n妳正是讓那個傢伙，變成現在這樣的其中一個原因。對此，妳的心中充滿了抱歉與後悔。\n發狂：自暴自棄\n「對不起對不起對不起對不起對不起，如果我不在的話，如果我不在這個世界上的話就好了！」\n效果：戰鬥中，妳所有失敗的攻擊判定都會打在自己身上，部位自選。",
        7: "07輕視\n那個到底有什麼好的？不要說作為對手了，根本連注目都嫌浪費時間！\n發狂：目中無人\n「好了啦，在這裡磨磨蹭蹭的幹什麼？還不趕快走！」\n效果：戰鬥中，同區域的敵方單位對妳的攻擊判定修正+1。",
        8: "08憤怒\n無法抑制的憤怒渦流，將妳整個人給吞噬進去。把那個傢伙給打倒的聲音，在妳的心中不斷迴盪著。\n發狂：感情失控\n「…………！！！！」\n效果：妳的行為判定、發狂判定修正值-1。",
        9: "09怨恨\n只有那個渾蛋絕對不能原諒，不可以忘記，絕對要讓那個傢伙付出代價，絕對要報仇！\n發狂：不共戴天\n「以為死掉我就會放過妳嗎？少開玩笑啦！」\n效果：戰鬥當中，妳無法進行逃走判定。此外，妳的戰鬥動作的目標如果是「自身與此依戀的對象」之外的對象，該戰鬥動作要多消費1點行動值(這個增加的行動值消費無法被減輕)。",
        10: "10憎恨\n妳有著鋼鐵般沉著而堅定的憎恨，這樣的意志支持著妳的行動。為了將那個傢伙從這個世界上消去，妳抱著這樣的情感持續活動著。\n發狂：痕跡破壞\n「這是碰過那個傢伙的手嗎——讓我把它砍了吧！」\n效果：這個依戀發狂的時候，從其他姊妹當中選1人，該姊妹損傷任意2個部件。"
    }
}

function tokenize(code) {
    let results = [];
    let tokenRegExp = /\s*([A-Za-z0-9]+|[0-9]+|\S)\s*/g;
    let match;
    while ((match = tokenRegExp.exec(code)) !== null) {
        results.push(match[1]);
    }
    return results;
}

function isNumber(token) {
    return token !== undefined && token.match(/^[0-9]+$/) !==null;
}

function isName(token) {
    return token !== undefined && token.match(/^[A-Za-z]+$/) !== null;
}

function isDice(token) {
    return token !== undefined && token.match(/^\d+d\d+[lho]?\d*$/)
}

function parse(code) {
    let tokens = tokenize(code);
    let position = 0;

    function peek() {
        return tokens[position];
    }

    function consume(token) {
        assert.strictEqual(token, tokens[position]);
        position++;
    }

    function parsePrimaryExpr() {
        let t = peek();
        if (isNumber(t)) {
            consume(t);
            return {type: "number", value: t};
        } else if (isName(t)) {
            consume(t);
            return {type: "name", id: t};
        } else if (isDice(t)) {
            consume(t);
            return {type: "dice", value: t};
        } else if (t === "(") {
            consume(t);
            let expr = parseExpr();
            if (peek() !== ")") {
                throw new SyntaxError("expect )");
            }
            consume(")");
            return expr;
        } else {
            throw new SyntaxError("expected a number, a variable, or parentheses");
        }
    }

    function parseMulExpr() {
        let expr = parsePrimaryExpr();
        let t = peek();
        while ( t === "*" || t === "/") {
            consume(t);
            let rhs = parsePrimaryExpr();
            expr = {type: t, left: expr, right: rhs};
            t = peek();
        }
        return expr;
    }

    function parseExpr() {
        let expr = parseMulExpr();
        let t = peek();
        while (t === "+" || t === "-") {
            consume(t);
            let rhs = parseMulExpr();
            expr = {type: t, left: expr, right : rhs};
            t = peek();
        }
        return expr;
    }

    let result = parseExpr();
    if (position !== tokens.length) {
        throw new SyntaxError("unexpected '" + peek() + "'");
    }
    return result;
}

function rollDice(diceStr) {
    let diceReg = /(\d+)d(\d+)([lho]?)(\d*)/;
    let match = diceReg.exec(diceStr);
    let diceNumber = parseInt(match[1]);
    let diceType = parseInt(match[2]);
    let selectMode = match[3];
    let selectNumber = parseInt(match[4]);

    if ( diceType === 0) {
        throw "沒有零面骰這種東西啦，笨笨主人。";
    } else if (diceNumber > 200) {
        throw "笨笨主人2";
    } else if (diceType > 500) {
        throw "笨笨主人3";
    } else if (diceType === 1 ) {
        throw "笨笨主人4";
    } else if (selectNumber > diceNumber) {
        throw "笨笨主人5";
    }
    let result = {
        replyStr: "",
        value: 0
    };
    let resultList = [];
    for (let i = 0; i < diceNumber; i += 1) {
        resultList.push(Math.floor((Math.random() * diceType) + 1))
    }
    if (diceNumber <= 20) {
        result.replyStr = "[" + resultList.join(",") + "]";
    }
    if (selectMode !== "") {
        resultList.sort((a, b) => {
            return a - b
        });
        let deleteTimes = diceNumber - selectNumber;
        switch (selectMode) {
            
            case "h":
                for (let i = 0; i < deleteTimes; i += 1) {
                    resultList.shift();
                }
                break;
            case "l":
                for (let i = 0; i < deleteTimes; i += 1) {
                    resultList.pop();
                }
                break;
            case "o":
                resultList.pop();
                resultList.shift();
                break;
        }
    }
    result.value = resultList.reduce((a, b) => {
        return a + b;
    });
    result.replyStr = result.value.toString() + result.replyStr
    return result;
}



function evaluate(obj) {
    let result = {
        replyStr: "",
        value: 0
    };
    let leftResult, rightResult;
    switch (obj.type) {
    case "number":
        result.replyStr = obj.value;
        result.value = parseInt(obj.value)
        return result;
    case "name":  return variables[obj.id] || 0;
    case "dice":
        return rollDice(obj.value);
    case "+":
        leftResult = evaluate(obj.left);
        rightResult = evaluate(obj. right);
        result.replyStr = "(" + leftResult.replyStr + "+" +  rightResult.replyStr + ")";
        result.value = leftResult.value + rightResult.value;
        return result;
    case "-":
        leftResult = evaluate(obj.left);
        rightResult = evaluate(obj. right);
        result.replyStr = "(" + leftResult.replyStr + "-" +  rightResult.replyStr + ")";
        result.value = leftResult.value - rightResult.value;
        return result;
    case "*":
        leftResult = evaluate(obj.left);
        rightResult = evaluate(obj. right);
        result.replyStr = "(" + leftResult.replyStr + "*" +  rightResult.replyStr + ")";
        result.value = leftResult.value * rightResult.value;
        return result;
    case "/":
        leftResult = evaluate(obj.left);
        rightResult = evaluate(obj. right);
        result.replyStr = "(" + leftResult.replyStr + "/" +  rightResult.replyStr + ")";
        result.value = leftResult.value / rightResult.value;
        return result;
    }
}

var DiceRoller = function () {

    // For normal dice
        
    let evaluateDiceSet  = function(diceSet) {
        let compareRegExp = /(>=|<=|={1,2}|>|<)/;
        let splitedDice = diceSet.split(compareRegExp);
        if (splitedDice.length == 3) {
            let leftRet = evaluate(parse(splitedDice[0]));
            let rightRet = evaluate(parse(splitedDice[2]));
            let isSeuccess = "失敗";
            switch(splitedDice[1]) {
                case "<=":
                    if (leftRet.value <= rightRet.value) {
                        isSeuccess = "成功";
                    }
                    break;
                case "<":
                    if (leftRet.value < rightRet.value) {
                        isSeuccess = "成功";
                    }
                    break;
                case ">=":
                    if (leftRet.value >= rightRet.value) {
                        isSeuccess = "成功";
                    }
                    break;
                case ">":
                    if (leftRet.value > rightRet.value) {
                        isSeuccess = "成功";
                    }
                    break;
                case "=":
                case "==":
                    if (leftRet.value === rightRet.value) {
                        isSeuccess = "成功";
                    }
                    break;
                default:
                    break;
            }
            return leftRet.replyStr + splitedDice[1] + rightRet.replyStr + "→" + isSeuccess;

        } else if (splitedDice.length == 1) {
            let result = evaluate(parse(diceSet));
            return result.replyStr + " = " + result.value.toString();

        }
    };

    let rollBasicDice = function (commandStr) {
        // Get the first part of command
        let firstPart = commandStr.match(/\S+/)[0];
        // filter the fraction
        if (firstPart.match(/\./)!=null){
            return undefined;
        }

        let replyString = "";
        // check the multiple dice roll or not
        if (firstPart.match(/\D/) == null) {
            // multiple dice roll
            let rollingTimes = parseInt(firstPart)
            if (rollingTimes > 20) {
                return "20次以上的複數擲骰對明日香來說太多了啦。"
            }
            let diceSet = commandStr.toLowerCase().split(' ',2)[1];
            
            replyString += "複數擲骰："
            for (let i = 1; i <= rollingTimes; i += 1 ) {
                replyString = replyString + "\n" + i + "# " + evaluateDiceSet(diceSet);
            }
        } else {
            //Basic dice roll
            let diceSet = firstPart;
            replyString += "基本擲骰：" + evaluateDiceSet(diceSet);
        }
        return replyString;
    }

    // D66
    let rollD66 = function () {
        let first = Math.floor(Math.random() * 6 + 1);
        let second = Math.floor(Math.random() * 6 + 1);
        return first.toString() + second.toString();
    };

    //dice pool
    let rollDicepool = function (commandLowerStr) {
        let dicePoolRegRxp = /^(\d+)b(\d+)(>=|<=|={1,2}|>|<)?(\d*)/;
        let poolMatch = dicePoolRegRxp.exec(commandLowerStr);
        let replyStr = "骰池："
        let diceNumber = parseInt(poolMatch[1]);
        let diceType = parseInt(poolMatch[2]);
        let isCompare = poolMatch[3];
        let successLevel = parseInt(poolMatch[4]);
        let dicePool = [];
        for (let i = 0; i < diceNumber; i += 1) {
            let diceValue = Math.floor(Math.random() * diceType + 1);
            dicePool.push(diceValue);
        }
        replyStr += "[" + dicePool.join(",") + "]";
        if (isNaN(successLevel) !== true && isCompare !== undefined) {
            let successNumber;
            switch (isCompare) {
                case ">=":
                    successNumber = dicePool.filter((value) => {return value >= successLevel}).length;
                    break;
                case "<=":
                    successNumber = dicePool.filter((value) => {return value <= successLevel}).length;
                    break;
                case ">":
                    successNumber = dicePool.filter((value) => {return value > successLevel}).length;
                    break;
                case "<":
                    successNumber = dicePool.filter((value) => {return value < successLevel}).length;
                    break;
                case "=":
                case "==":
                    successNumber = dicePool.filter((value) => {return value === successLevel}).length;
                    break;
            }
            replyStr += " 成功數：" + successNumber.toString();
        }

        return replyStr;
    };

    //rollDiceTable
    let rollDiceTable = function (table, tableName, diceType) {
        console.log("here2");
        let diceNumber = table[tableName].diceNumber;
        console.log("diceNumber: " + diceNumber.toString());
        let diceValue = evaluate(parse(diceNumber + "d" + diceType)).value;
        console.log("diceValue: " + diceValue.toString());
        return table[tableName][diceValue];
    } 

    //  Nechronica dice
    let rollNCCheck = function (command) {
        let NCCheckRegExp = /^(\d+)(n[ac])([+-]?\d*)/;
        let matchResult = NCCheckRegExp.exec(command);
        let diceNumber = parseInt(matchResult[1]);
        let modifier = parseInt(matchResult[3]) || 0;
        if (diceNumber > 4) {
            throw "主人，判定最多只能加骰到4顆喔。";
        } else if (diceNumber <= 0) {
            throw null;
        }
        console.log("in");
        let diceResult = [];
        let modifiedResult = [];
        let replyStr = "";
        for (let i = 0; i < diceNumber; i += 1) {
            let diceValue = Math.floor(Math.random() * 10 + 1);
            console.log(diceValue);
            diceResult.push(diceValue);
            modifiedResult.push(diceValue + modifier);
        }
        replyStr += "["+ diceResult.join(",") + "]" + matchResult[3];
        replyStr += "→[" + modifiedResult.join(",") + "]→";
        console.log(replyStr);
        if (matchResult[2] === "na") {
            let maxValue =Math.max(...modifiedResult);
            if(maxValue > 10) replyStr += "攻擊大成功，由攻擊方決定命中部位，增加" + (maxValue - 10).toString() + "點傷害。"; 
            else if(maxValue === 10) replyStr += "攻擊成功，命中頭部。";
            else if(maxValue === 9) replyStr += "成功成功，命中手部。";
            else if(maxValue === 8) replyStr += "成功成功，命中軀幹。";
            else if(maxValue === 7) replyStr += "成功成功，命中足部。";
            else if(maxValue === 6) replyStr += "成功成功，由防禦方決定命中部位。";
            else if(maxValue <= 1) replyStr += "大失敗。";
            else replyStr += "失敗";
        } else if (matchResult[2] === "nc") {
            if(Math.max(...modifiedResult)>10) replyStr += "大成功";
            else if(Math.max(...modifiedResult)>=6) replyStr += "成功";
            else if(Math.min(...modifiedResult)<=1) replyStr += "大失敗";
            else replyStr += "失敗";
        }
        return replyStr;
    }
    
    let rollNCMiren = function (command) {
        console.log("here1");
        let mirenRexExp = /^([sne]nm)/;
        let matchResult = mirenRexExp.exec(command)[1];
        return rollDiceTable(NCMirenTable, matchResult, 10);
    }

    let kancolleRoller = function (commandLowerStr) {
        
    };
    

    // dice entry
    this.roll = function (command) {
        let commandLowerStr = command = command.toLowerCase();
        let diceMsg = "";
        if (commandLowerStr.match(/^d66/) !== null) {
            diceMsg = rollD66(commandLowerStr);
        } else if (commandLowerStr.match(/^\d+b\d+/) !== null){
            diceMsg = rollDicepool(commandLowerStr);
        } else if (commandLowerStr.match(/^[sne]nm/) !== null){
            diceMsg = rollNCMiren(commandLowerStr);
        } else if (commandLowerStr.match(/^\d+n[ac]/) !== null){
            try {
                diceMsg = rollNCCheck(commandLowerStr);
            } catch(e) {
                diceMsg = e;
            }
        } else if (commandLowerStr.match(/\w/) !== null) {
            try {
                diceMsg = rollBasicDice(commandLowerStr);
            } catch(e) {
                diceMsg = e;
            }
        }

        return diceMsg;
    }
}

module.exports = DiceRoller;