const { isUser, isOwner } = require("../middleware/guards");
const preLoad = require("../middleware/preload");
const { createHousing, rentProperty, deleteById, updateOffer } = require("../services/housing");
const { mapErrors } = require("../util/mappers");

const router = require("express").Router();

router.get('/create', isUser(), (req, res) => {
  
    res.render('create', {title: 'Create Page'})
})

router.post('/create', isUser(), async (req, res) => {
  

    const housing = {

        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        homeImage: req.body.homeImage,
        propertyDescription: req.body.description,
        availablePieces: req.body.availablePieces,
        owner: req.session.user._id,

    }

    try {

        await createHousing(housing);
        res.redirect('/catalog');
    }catch (error) {

        console.error(error);
        const errors = mapErrors(error);
        res.render('create', {title: 'Create Page', errors, housing});

    }



    
})

router.get('/catalog/:id', preLoad(true), async (req, res) => {

    const id = req.params.id;

    const housing = res.locals.housing;
    housing.placeLeft = housing.availablePieces - housing.rentedAHome.length;

    if(housing.placeLeft > 0){
        housing.hasPlaces = true
    }

    if(housing.rentedAHome.length > 0){
        housing.hasRenters = true

        housing.renters = housing.rentedAHome.map(x => x.fullname).join(', ')
    }

    






    if(req.session.user){
        housing.hasUser = true;

        if(housing.owner._id == req.session.user._id){
            housing.isOwner = true;
        }

        if(housing.rentedAHome.some(x => x._id == req.session.user._id)){
            housing.alreadyRented = true;
        }


    }

  
   

    res.render('details', {title: 'Details Page', housing});


})


router.get('/rent/:id', isUser(), async (req, res) =>{

    const id = req.params.id;
    const userId = req.session.user._id

    try{
        await rentProperty(id, userId);

    }catch(err){
        console.error(err);

    }finally {
        res.redirect('/catalog/' + id)
    }

})

router.get('/delete/:id', preLoad(), isOwner(), async (req, res) =>{

    const id = req.params.id;
    await deleteById(id);
    res.redirect('/catalog')



})

router.get('/edit/:id', preLoad(), isOwner(), (req, res) => {

    
  
    res.render('edit', {title: 'Edit Page'})
})



router.post('/edit/:id', preLoad(), isOwner(), async (req, res) => {
  
    const id = req.params.id

    const housing = {

        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        homeImage: req.body.homeImage,
        propertyDescription: req.body.description,
        availablePieces: req.body.availablePieces,
        

    }

    try {

        await updateOffer(id, housing);
        res.redirect('/catalog/' + id);
    }catch (error) {
        housing._id = id

        console.error(error);
        const errors = mapErrors(error);
        res.render('edit', {title: 'Edit Page', errors, housing});

    }



    
})






module.exports = router;