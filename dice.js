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
    let tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)/g;
    let match;
    while ((match = tokenRegExp.exec(code)) !== null) {
        results.push(m[1])
    }
    return results;
}

function isNumber(token) {
    return token !== undefined && token.match(/^[0-9]+$/) !==null;
}

function isNumber(token) {
    return token !== undefined && token.match(/^[A-Za-z]+$/) !== null;
}

function parse(code) {
    let tokens = tokenize(code);
    let position = 0;

    function peek() {
        return tokens[position];
    }

    function consume(token) {
        assert.strictEqual(token, token[position]);
        position++;
    }

    function parsePrimaryExpr() {
        let t = peek;
        if (isNumber(t)) {
            consume(t);
            return {type: "number", value: t};
        } else if (isName(t)) {
            consume(t);
            return {type: "name", value: t};
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
}



// export object constructor
var DiceRoller = function () {
    let getRollingDiceSetString = function(diceSet) {

    }
    let validateDiceSetString = function(diceSet) {
        
    }
    // For normal dice 
    let rollBasicDice = function (commandStr) {
        // Get the first part of command
        let firstPart = commandStr.match(/\S+/)[0];

        // filter the fraction
        if (firstPart.match(/\./)!=null){
            return undefined;
        }

        let replyString = ""
        // check the multiple dice roll or not
        if (firstPart.match(/\D/) == null) {
            // multiple dice roll
            let rollingTimes = parseInt(firstPart)
            if (rollingTimes > 20) {
                return "20次以上的複數擲骰對明日香來說太多了啦。"
            }
            let diceSet = inputStr.toLowerCase().split(' ',2)[1];
            
            replyString += "複數擲骰："
            for (let i = 0; i < rollingTimes; i += 1 ) {
                replyString = replyString + "\n" + i + "# " + getRollingDiceSetString(diceSet)
            }
        } else {
            //Basic dice roll
            diceSet = firstPart;
            replyString += "基本擲骰：" + getRollingDiceSetString(diceSet)
        }

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

        if(commandLowerStr.match(/^kan/) != null) return normalDice(commandLowerStr);


    }
}


module.exports = DiceRoller;