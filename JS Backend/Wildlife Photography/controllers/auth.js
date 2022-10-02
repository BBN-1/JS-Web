const { isGuest, isUser } = require("../middleware/guards");
const { register, login } = require("../services/user");
const {mapErrors} = require("../util/mappers");

const router = require("express").Router();

router.get("/register", isGuest(), (req, res) => {
    res.render("register", {title: 'Register Page Me'});
});

//TO DO check form for actrion/methods/ missing name/values
router.post("/register", isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error("Password is required");
        }

        if (req.body.password.trim().length < 4) {
            throw new Error("Password must be at least 4 characters long!");
        }



        if (req.body.password != req.body.rePass) {
            throw new Error("Passwords don't match");
        }

        const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        req.session.user = user;
        res.redirect("/"); 
    } catch (error) {

        const data = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
           

        };

        console.error(error);
        

        const errors = mapErrors(error);
        res.render("register", { title: 'Register Page Me',

            data, errors
        });
    }
});

router.get("/login", isGuest(), (req, res) => {
    res.render("login");
});


router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); 
    } catch (error) {
        console.error(error);

        
        const errors = mapErrors(error);

        const data = {
            email: req.body.email
        }

        res.render("login", {

            data , errors
        });
    }
});

router.get('/logout', isUser(), (req,res) =>{
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;
