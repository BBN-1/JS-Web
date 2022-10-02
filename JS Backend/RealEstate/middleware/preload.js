//TODO change property name to match collection

const housingService = require('../services/housing'); 

function preLoad(populate) {

    return async function (req, res, next) {

        const id = req.params.id;

        if(populate) {

            res.locals.housing = await housingService.getHousingAndRenters(id);
        } else {
            res.locals.housing = await housingService.getHousingById(id);
        }
        //TODO change property name to match collection
        


        next();
    };

}

module.exports = preLoad;