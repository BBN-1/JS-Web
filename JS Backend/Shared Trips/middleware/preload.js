//TODO change property name to match collection

const tripService = require('../services/trip'); 

function preLoad(populate) {

    return async function (req, res, next) {

        const id = req.params.id;

        if(populate) {

            res.locals.trip = await tripService.getTripAndBuddies(id);
        } else {
            res.locals.trip = await tripService.getTripById(id);
        }
        
        


        next();
    };

}

module.exports = preLoad;