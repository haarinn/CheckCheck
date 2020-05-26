var express = require('express');
var router = express.Router();

var moment=require('moment');

const utils = require('../../utils/utils.js');
const statusCode = require('../../utils/statusCode');
const responseMessage = require('../../utils/responseMessage');
const db = require('../../module/pool');

//이 페이지의 현재 주소: localhost:3000/user/signin
 /**1. 로그인
    METHOD : GET
    url : 
    authorization : token
    입력 : userId, userPw
    출력 :
 */
router.get('/', async (req, res) => { 
    var userinfo;
    var userId=req.params.userId;

    //db Query 날리기
    const userInfoQuery='SELECT userPw FROM user WHERE userId=?';
    const userInfoResult=await db.queryParam_Parse(userInfoQuery, userId);

    //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
    if(!userInfoResult){ //실패했을 경우
        res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.LOGIN_FAIL));
    }else{ //잘 된 경우
        userinfo=userInfoResult;
        res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.LOGIN_SUCCESS, userinfo));
    }
});

module.exports = router;