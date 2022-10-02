const { isUser, isOwner } = require("../middleware/guards");
const preLoad = require("../middleware/preload");
const { createPost, vote, deletePostById, updatePost } = require("../services/post");
const { getUserByUserEmail } = require("../services/user");
const { mapErrors } = require("../util/mappers");

const router = require("express").Router();

router.get('/create', isUser(), (req, res) =>{
    res.render('create', {title: 'Create Post', });
});



router.post('/create', isUser(), async(req, res) =>{


    
    
    
    
    
    

    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        dateOfCreation: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: req.session.user._id
    };

    try{
        const mail = req.session.user.email
        await createPost(data, mail);
        res.redirect('/catalog');

    } catch(err) {
       

        console.error(err);
        //TODO send error msg

        const errors = mapErrors(err);
        
        res.render("create", { title: 'Create Post',

            data , errors
        });
    }




    
});


router.get('/edit/:id', preLoad(), isOwner(), (req, res) =>{
   

  

    res.render('edit', {title: 'Edit Post' });
});

router.post('/edit/:id', preLoad(), isOwner(), async (req, res) => {
    const id = req.params.id;
  


    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        dateOfCreation: req.body.date,
        image: req.body.image,
        description: req.body.description
        

    };

    try{

        await updatePost(id, post);
       
        res.redirect('/catalog/' + id);


    } catch (err) {
        console.error(err);
        post._id = id;
        const errors = mapErrors(err);
        res.render('edit', {title: 'Edit Post', post, errors});
    }




});



router.get('/delete/:id', preLoad(), isOwner(), async (req, res) => {
    await deletePostById(req.params.id);
    res.redirect('/catalog');

});






router.get('/vote/:id/:type', isUser(), async (req, res) =>{

    
    const id = req.params.id;
    
    const value = req.params.type == 'upvote' ? 1 : -1;
    console.log(req.session.user._id);

    try{
        await vote(id, req.session.user._id, value);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('catalog', {title: "Post catalog", errors});
    }
}) ;





module.exports = router;