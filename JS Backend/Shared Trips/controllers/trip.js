const router = require("express").Router();
const { request } = require("express");
const { isUser, isOwner } = require("../middleware/guards");
const preLoad = require("../middleware/preload");
const { createTrip, deleteById, updateTrip, joinTrip } = require("../services/trip");
const { mapErrors } = require("../util/mappers");

router.get('/create', isUser(), (req, res) =>{
    res.render('create', {title: 'Create Trip Offer'});
});

router.post('/create', isUser(), async(req, res) =>{

    const trip = {

        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time ,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: req.body.seats ,
        price: req.body.price ,
        description: req.body.description ,
        creator: req.session.user._id,
       

    }

    try{

        await createTrip(trip)
        res.redirect('/catalog')

    } catch (error) {

        console.error(error);
        
        const isMale = req.body.gender == "male";

        const errors = mapErrors(error);
        res.render("create", {

            trip, errors
        });


    };

   

});

router.get('/edit/:id',  preLoad(), isOwner(),  (req, res) =>{
    res.render('edit', {title: 'Edit Trip Offer'});
});

router.post('/edit/:id', preLoad(), isOwner(),  async(req, res) =>{

    const id = req.params.id

    const trip = {

        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time ,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: req.body.seats ,
        price: req.body.price ,
        description: req.body.description ,
       
       

    }

    try{

        await updateTrip(id, trip)
        res.redirect('/catalog')

    } catch (error) {

        console.error(error);
        trip._id = id
        
        

        const errors = mapErrors(error);
        res.render("edit", {

            trip, errors
        });


    };



});

router.get('/join/:id', isUser(), async (req, res) => {

    const id = req.params.id;

    try {
        await joinTrip(id, req.session.user._id);
        
    } catch(error) {
        console.error(error);

    } finally {
        res.redirect('/catalog/' + id)
    }

})





router.get('/delete/:id', preLoad(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/catalog');

});







module.exports = router;