const authController  = require('../controllers/auth');
const postController  = require('../controllers/post');
const homeController  = require('../controllers/home');

module.exports = (app) => {
    app.use(authController);
    app.use(postController);
    app.use(homeController);


    app.get('*', (req, res) => {
        res.render('404', {title: 'Page you were lookign for does not exist'});
    });
    
}