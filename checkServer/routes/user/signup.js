var express = require('express');
var router = express.Router();

var moment=require('moment');

const utils = require('../../utils/utils.js');
const statusCode = require('../../utils/statusCode');
const responseMessage = require('../../utils/responseMessage');
const db = require('../../module/pool');

//이 페이지의 현재 주소: localhost:3000/user/signup
 /**1. 회원가입
    METHOD : POST
    url : 
    authorization : token
    입력 : userId, userName, userPw, userCardNum, userPhoneNum
    출력 : X
     */
    router.post('/', async (req, res) => { 
        var signupUserInfo;
        
        var userId = req.body.userId;
        var userPw = req.body.userPw;
        var userName = req.body.userName;
        var userCardNum = req.body.userCardNum;
        var userPhoneNum= req.body.userPhoneNum;

        var inputParams=[userId,userPw,userName,userCardNum,userPhoneNum];

        //db Query 날리기
        const userSignupQuery='INSERT INTO user (userId, userPw, userName, userCardNum, userPhoneNum) VALUES (?,?,?,?,?)';
        const userSignupResult=await db.queryParam_Parse(userSignupQuery,inputParams);
    
        //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
        if(!userSignupResult){ //실패했을 경우
            res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATED_USER_FAIL));
        }else{ //잘 된 경우
          signupUserInfo=userSignupResult;
          res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.CREATED_USER,signupUserInfo));
        }
    });


module.exports = router;