const { isUser, isOwner } = require("../middleware/guards");
const preLoad = require("../middleware/preload");
const { createPublication, getPublicationById, getPublicationAndSharers, sharePublication, updatePublication, deleteById } = require("../services/publication");
const { mapErrors } = require("../util/mappers");

const router = require("express").Router();

router.get('/create', isUser(), (req, res) =>{
    res.render('create', {title: 'Create Page'})
});

router.post('/create', isUser(), async (req, res) => {

    const publication = {

        title: req.body.title,
        paintingTechnique: req.body.technique,
        certificate: req.body.certificate,
        artPicture: req.body.picture,
        author: req.session.user._id
    }

    try{

        await createPublication(publication);
        res.redirect('/catalog')

    } catch(error) {
        console.error(error);

        const errors = mapErrors(error);
        res.render('create', {title: 'Create Page', publication, errors})


    }

    
})


router.get('/catalog/:id', preLoad(true), async (req, res) =>{

    
    const publication = res.locals.publication
    

    if(req.session.user){
        publication.hasUser = true;

        if(req.session.user._id == publication.author._id){
            publication.isOwner = true;
        }

        if(publication.usersShared.some(x => x._id == req.session.user._id)){
            publication.hasShared = true;
        }

    }
    

    res.render('details', {title: 'Details Page', publication})

})

router.get('/share/:id', isUser(), async (req, res) =>{

    const id = req.params.id
    // console.log(id);
    // console.log(req.session.user._id);

    try{
        await sharePublication(id, req.session.user._id);
    }catch(error){
        console.error(error)
    }finally{
        res.redirect('/');
    }
});


router.get('/edit/:id', preLoad(),isOwner(), (req, res) =>{

    

    res.render('edit', {title: 'Edit Page'})

})


router.post('/edit/:id', preLoad() , isOwner(),  async (req, res) => {

    
    
    const id = req.params.id;

    const publication = {

        title: req.body.title,
        paintingTechnique: req.body.paintingTechnique,
        certificate: req.body.certificate,
        artPicture: req.body.artPicture,
      
    }

    try{

        await updatePublication(id, publication );
        res.redirect('/catalog/' + id)

    } catch(error) {
        console.error(error);
        publication._id = id

        const errors = mapErrors(error);
        res.render('edit', {title: 'Edit Page', publication, errors})


    }

    

    
});


router.get('/delete/:id', async (req, res) =>{

    const id = req.params.id;

    try{
        await deleteById(id)
        res.redirect('/catalog')
    } catch(err){

        console.error(err)
        
    }

})




module.exports = router;