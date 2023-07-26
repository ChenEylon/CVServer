const express=require('express')
const userController=require('../controllers/userController');
const { jwtMiddleware } = require('../middlewares/jwtMiddleware');
const router = express.Router();

router.route('/get').get(jwtMiddleware, userController.getusers);
router.route('/getsearch/:name').get( userController.getsearch);
router.route('/create').post(userController.SignUp);
router.route('/login').post(userController.Login);
router.route('/translateToken').post(userController.translateToken);
// router.route('/delete').delete(userController.deleteuser);
// router.route('/patch').patch(userController.patcheduser);

module.exports = router;