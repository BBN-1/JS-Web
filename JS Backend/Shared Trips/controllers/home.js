const { isUser } = require("../middleware/guards");
const preLoad = require("../middleware/preload");
const { getAllTrips, getTripsByCreator } = require("../services/trip");
const { postViewModel } = require("../util/mappers");

const router = require("express").Router();

router.get('/', (req, res) =>{

    res.render('home', {title: 'Home page'})

});


router.get('/catalog', async (req, res) => {


    const allTrips = (await getAllTrips()).map(postViewModel);
    console.log(allTrips);

    res.render('catalog', {title: 'Catalog page', allTrips})

});


router.get('/catalog/:id', preLoad(true), (req, res) => {

    const trip = res.locals.trip;
    
    
    trip.remainingSeats = trip.seats - trip.buddies.length;
    trip.buddiesList = trip.buddies.map(x => x.email).join(', ')

    if(trip.buddiesList.length > 0){
        trip.hasBuddies = true;
    }

    if(trip.remainingSeats > 0){
        trip.hasSeats = true;
    }

  
    

  
    if (req.session.user) {
        trip.hasUser = true;
        const creatorId = trip.creator._id;

        trip.isOwner = req.session.user._id == creatorId;

        if(trip.buddies.some(b => b._id == req.session.user._id)){
            trip.isJoined = true;
        }


    }


    


    res.render('details', {title: 'Details page'})

});

router.get('/profile', isUser(), async (req, res) => {

  
    const raw = await getTripsByCreator(req.session.user._id);
    console.log(raw);
    console.log("next");
    const tripsByUser = (await getTripsByCreator(req.session.user._id)).map(postViewModel);
    console.log(tripsByUser);


    res.render('profile', {title: 'Profile page', tripsByUser})


});


module.exports = router;