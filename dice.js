'use strict';
let assert = require("assert");

// dice content data
var kanColleDiceData = {
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

function tokenize(code) {
    let results = [];
    let tokenRegExp = /\s*([A-Za-z0-9]+|[0-9]+|\S)\s*/g;
    let match;
    while ((match = tokenRegExp.exec(code)) !== null) {
        results.push(match[1])
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
    console.log(tokens)
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
        console.log("here1");
        throw "笨笨主人";
    } else if (diceNumber > 200) {
        console.log("here2");
        throw "笨笨主人2";
    } else if (diceType > 500) {
        console.log("here3");
        throw "笨笨主人3";
    } else if (diceType === 1 ) {
        console.log("here4");
        throw "笨笨主人4";
    } else if (selectNumber > diceNumber) {
        console.log("here5");
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
    result.replyStr = "[" + resultList.join(",") + "]"

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

// try {
//     console.log(evaluate(parse("(2*5)d8+5")));
// } catch (e) {
//     console.log(e)
// }


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
        console.log(firstPart);
        console.log("here");
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


    let d66 = function(){
        let first = Math.floor(Math.random() * Math.floor(6));
        let second = Math.floor(Math.random() * Math.floor(6));
        return "pass"
    }

    let kancolleRoller = function (commandLowerStr) {
        
    }
    

    // For trpg system

    this.roll = function (command) {
        let commandLowerStr = command = command.toLowerCase();
        let result = rollBasicDice(commandLowerStr)
        return result
    }
}



module.exports = DiceRoller;