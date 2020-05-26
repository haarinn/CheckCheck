var express = require('express');
var router = express.Router();

var moment=require('moment');

const utils = require('../../utils/utils.js');
const statusCode = require('../../utils/statusCode');
const responseMessage = require('../../utils/responseMessage');
const db = require('../../module/pool');
//var mySQL = require('mysql');

//이 페이지의 현재 주소: localhost:3000/store/lookupStoreList
 /**1. 가맹점 정보 전체 조회
    METHOD : GET
    url : 
    authorization : token
    입력 : X
    출력 : storeName
     */
router.get('/', async (req, res) => { 
    var storeList;
    
    //db Query 날리기
    const storeListQuery='SELECT * FROM store';
    const storeListResult=await db.queryParam_Parse(storeListQuery);

    //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
    if(!storeListResult){ //실패했을 경우
        res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.STORELIST_ALL_FAIL));
    }else{ //잘 된 경우
      storeList=storeListResult;
      res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.STORELIST_ALL_SUCCESS, storeList));
    }
});

//이 페이지의 현재 주소: localhost:3000/store/lookupStoreList/storeIdx
/**2. 가맹점 정보 상세 조회
    METHOD : GET
    url : 
    authorization : token
    입력 : X
    출력 : storeName, storeLongtitude, storeLatitude, storeGu, storeCategory,storePhoneNum //Q. 위치
     */
    router.get('/:storeIdx', async (req, res) => {
      var storeSelected;
  
      //db Query 날리기
      var storeIdx = req.params.storeIdx;
      const storeSelectQuery='SELECT storeName, storeCategory, storePhoneNum FROM store WHERE storeIdx=?';
      const storeSelectResult=await db.queryParam_Parse(storeSelectQuery, storeIdx);
  
      //result를 받고 success/ fail 여부 안드로이드한테 res로 응답
    if(!storeSelectResult){ //실패했을 경우
      res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.STORE_DETAIL_FAIL));
    }else{ //잘 된 경우
      storeSelected= storeSelectResult[0];
      res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.STORE_DETAIL_SUCCEESS, storeSelected));
  }
  });
 

module.exports = router;