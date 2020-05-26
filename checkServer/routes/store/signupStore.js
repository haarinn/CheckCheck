var express = require('express');
var router = express.Router();

var moment=require('moment');

const utils = require('../../utils/utils.js');
const statusCode = require('../../utils/statusCode');
const responseMessage = require('../../utils/responseMessage');
const db = require('../../module/pool');

//이 페이지의 현재 주소: localhost:3000/store/regStore
 /**1. 선한가게 등록하기
    METHOD : POST
    url : 
    authorization : token
    입력 : storeId, storeName, storeHashedPw, storeRegNum, storePhoneNum, storeCategory
    출력 : X
     */
    router.post('/', async (req, res) => { 
        var signupStoreInfo;

        //values
        var storeId= req.body.storeId;
        var storeName= req.body.storeName;
        var storeHashedPw= req.body.storeHashedPw;
        var storeRegNum= req.body.storeRegNum;
        var storePhoneNum= req.body.storePhoneNum;
        var storeCategory= req.body.storeCategory;
        
        var inputParams=[storeId, storeName, storeHashedPw, storeRegNum, storePhoneNum, storeCategory];

        //db Query 날리기
        const signupStoreQuery='INSERT INTO store (storeId, storeName, storeHashedPw, storeRegNum, storePhoneNum, storeCategory) VALUES (?,?,?,?,?,?)';
        const signupStoreResult=await db.queryParam_Parse(signupStoreQuery,inputParams);
    
        //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
        if(!signupStoreResult){ //실패했을 경우
            res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.STORE_SIGNUP_FAIL));
        }else{ //잘 된 경우
          signupStoreInfo=signupStoreResult;
          res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.STORE_SIGNUP_SUCCESS,signupStoreInfo));
        }
    });

//이 페이지의 현재 주소: localhost:3000/user/reviseinfo
 /**2. 회원정보 수정
    METHOD : PUT
    url : 
    authorization : token
    입력 : storeName, storeHashedPw, storePhoneNum, storeCategory
    출력 : X
     */
    router.put('/:storeIdx', async (req, res) => { 
        var reviseStoreInfo;
        
        //values
        var storeIdx=req.params.storeIdx;
        var storeName= req.body.storeName;
        var storeHashedPw= req.body.storeHashedPw;
        var storePhoneNum= req.body.storePhoneNum;
        var storeCategory= req.body.storeCategory;
        
        var inputParams=[storeName, storeHashedPw, storePhoneNum, storeCategory, storeIdx];
        //var inputParams=['버거킹', 'burgerking12', '139353554', '패스트푸드', 3];//test

        //db Query 날리기
        const storeReviseQuery='UPDATE store SET storeName=?, storeHashedPw=?, storePhoneNum=?, storeCategory=? WHERE storeIdx=?';
        const storeReviseResult=await db.queryParam_Parse(storeReviseQuery,inputParams);
    
        //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
        if(!storeReviseResult){ //실패했을 경우
            res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.STOREINFO_UPDATE_FAIL));
        }else{ //잘 된 경우
          reviseStoreInfo=storeReviseResult;
          res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.STOREINFO_UPDATE_SUCCESS,reviseStoreInfo));
        }
    });


module.exports = router;