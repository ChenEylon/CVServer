const express=require('express')
const cvController=require('../controllers/cvController');
const router = express.Router();

// router.route('/get').get( cvController.getdata);
router.route('/create').post(cvController.create);
router.route('/patch').patch(cvController.patch);

module.exports = router;