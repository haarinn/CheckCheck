var express = require('express');
var router = express.Router();

var moment=require('moment');

const utils = require('../../utils/utils.js');
const statusCode = require('../../utils/statusCode');
const responseMessage = require('../../utils/responseMessage');
const db = require('../../module/pool');

//이 페이지의 현재 주소: localhost:3000/card/cardinfo
 /**1. 카드정보 조회
    METHOD : GET
    url : 
    authorization : token
    입력 : X
    출력 : cardNum, balance, usedAmountMonth, limitAmountMonth, limitAmountOnce, limitAmountDay, availableDay
 */
router.get('/:userIdx', async (req, res) => { 
    var cardinfo;
    var userIdx = req.params.userIdx;

    //db Query 날리기
    const cardInfoQuery='SELECT * FROM card WHERE userIdx=?';
    const cardInfoResult=await db.queryParam_Parse(cardInfoQuery, userIdx);

    //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
    if(!cardInfoResult){ //실패했을 경우
        res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CARDINFO_FAIL));
    }else{ //잘 된 경우
        cardinfo= cardInfoResult;
        res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.CARDINFO_SUCCESS, cardinfo));
    }
});


//이 페이지의 현재 주소: localhost:3000/card/cardinfo
 /**2. 카드정보  전체조회
    METHOD : GET
    url : 
    authorization : token
    입력 : X
    출력 : cardNum, balance, usedAmountMonth, limitAmountMonth, limitAmountOnce, limitAmountDay, availableDay
 */
router.get('/', async (req, res) => { 
    var cardinfo;
    var userIdx = req.params.userIdx;

    //db Query 날리기
    const cardInfoQuery='SELECT * FROM card';
    const cardInfoResult=await db.queryParam_Parse(cardInfoQuery);

    //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
    if(!cardInfoResult){ //실패했을 경우
        res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CARDINFO_FAIL));
    }else{ //잘 된 경우
        cardinfo= cardInfoResult;
        res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.CARDINFO_SUCCESS, cardinfo));
    }
});


module.exports = router;