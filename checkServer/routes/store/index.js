var express = require('express');
var router = express.Router();

//이 페이지의 현재 주소: http:localhost:3000/store
//목적 주소: :3000/store/list 등등

router.use('/lookupStoreList',require('./lookupStoreList'));
router.use('/signupStore',require('./signupStore'));

module.exports = router;