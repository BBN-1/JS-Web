const { isGuest, isUser } = require("../middleware/guards");
const { register, login } = require("../services/user");
const {mapErrors} = require("../util/mappers");

const router = require("express").Router();

router.get("/register", isGuest(), (req, res) => {
    res.render("register");
});

//TO DO check form for actrion/methods/ missing name/values
router.post("/register", isGuest(), async (req, res) => {
    try {

        if (req.body.password.trim().length < 4) {
            throw new Error("Passwords should be at least 4 characters long");
        }

        if (req.body.password != req.body.repass) {
            throw new Error("Passwords don't match");
        }

        const user = await register(req.body.username, req.body.password, req.body.address);
        req.session.user = user;
        res.redirect("/"); 
    } catch (error) {
        console.error(error);
        

        const errors = mapErrors(error);
        res.render("register", {

            data: { username: req.body.username, address: req.body.address }, errors
        });
    }
});

router.get("/login", isGuest(), (req, res) => {
    res.render("login");
});


router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); 
    } catch (error) {
        console.error(error);

        
        const errors = mapErrors(error);
        res.render("login", {

            data: { username: req.body.username }, errors
        });
    }
});

router.get('/logout', isUser(), (req,res) =>{
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;
