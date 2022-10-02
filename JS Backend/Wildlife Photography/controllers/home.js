const { isUser } = require("../middleware/guards");
const preLoad = require("../middleware/preload");
const { getAllPosts, getPostById, getPostsByAuthor } = require("../services/post");
const { postViewModel } = require("../util/mappers");

const router = require("express").Router();

router.get("/",  (req, res) => {
    res.render("home", {title: 'Home Page'});
});

router.get("/catalog",  async (req, res) => {


    allPosts = await getAllPosts();

    res.render("catalog", {title: 'Catalog Page', allPosts});
});


router.get('/catalog/:id', preLoad(true), ( req, res) => {

    

    const post = res.locals.post
    
    const peopleWhoVoted = post.votesOnPost.map(x => x.email).join(', ')
    
    res.locals.post.peopleWhoRent = peopleWhoVoted;

    if(res.locals.post.peopleWhoRent.length > 0){
        res.locals.hasVotes = true
    }
    
    

    // offer.remainingPieces = offer.availablePieces - offer.rentedAHome.length;
    
    //trip.buddiesList = trip.buddies.map(b => b.email).join(', ');

    // if(offer.remainingPieces > 0) {
    //     offer.hasPieces = true
    // } 






    if (req.session.user) {
        post.hasUser = true;
        post.isOwner = req.session.user._id == post.author._id;

        if(!post.votesOnPost.some(b => b._id == req.session.user._id)){
            post.hasNotVoted = true;
        }


    }

    //console.log(res.locals.offer.remainingPieces)
    
    
    

    res.render('details', {title: 'Post Details'});
});

router.get('/profile', isUser(), async (req, res) => {
    const posts = (await getPostsByAuthor(req.session.user._id)).map(postViewModel);
    res.render('profile', {title: 'Catalog Page', posts});

});








module.exports = router;