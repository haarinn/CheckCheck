var express = require('express');
var router = express.Router();

var moment=require('moment');

const utils = require('../../utils/utils.js');
const statusCode = require('../../utils/statusCode');
const responseMessage = require('../../utils/responseMessage');
const db = require('../../module/pool');


//이 페이지의 현재 주소: localhost:3000/user/reviseinfo
 /**1. 회원정보 수정
    METHOD : PUT
    url : 
    authorization : token
    입력 : userPw, userCardNum, userPhoneNum
    출력 : X
     */
    router.put('/', async (req, res) => { 
        var reviseUserInfo;
        
        var userId= req.body.userId;
        var userPw = req.body.userPw;
        var userCardNum = req.body.userCardNum;
        var userPhoneNum= req.body.userPhoneNum;

        //var inputParams=['gggkkk',1002234567834,1012345678,'gkfla1017']; //test
        var inputParams=[userPw,userCardNum,userPhoneNum,userId];

        //db Query 날리기
        const userReviseQuery='UPDATE user SET userPw=?, userCardNum=?, userPhoneNum=? WHERE userId=?';
        const userReviseResult=await db.queryParam_Parse(userReviseQuery,inputParams);
    
        //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
        if(!userReviseResult){ //실패했을 경우
            res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_USER_FAIL));
        }else{ //잘 된 경우
          reviseUserInfo=userReviseResult;
          res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.UPDATE_USER_SUCCESS,reviseUserInfo));
        }
    });



module.exports = router;