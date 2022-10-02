const { isUser } = require("../middleware/guards");
const preLoad = require("../middleware/preload");
const { getAllPublications, getPublicationByCreator,  } = require("../services/publication");
const { postViewModel } = require("../util/mappers");

const router = require("express").Router();

router.get('/', async (req, res) => {

    const allPublications = (await getAllPublications()).map(postViewModel);
    //console.log(allPublications);

    res.render('home', {title: 'Home Page', allPublications});
})

router.get('/catalog', async (req, res) => {


    const allPublications = (await getAllPublications()).map(postViewModel);
    

    res.render('catalog', {title: 'Catalog Page', allPublications});
})



router.get('/profile',  isUser(), async (req, res) => {

    const id = req.session.user._id
    console.log(id);

    const authorPublications = (await getPublicationByCreator(id)).map(x => x.title).join(', ')
    console.log(authorPublications);

    res.render('profile', {title: 'Profile Page', authorPublications})
});


module.exports = router;