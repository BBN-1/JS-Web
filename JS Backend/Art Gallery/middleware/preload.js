//TODO change property name to match collection

const publicationService = require('../services/publication'); 

function preLoad(populate) {

    return async function (req, res, next) {

        const id = req.params.id;

        if(populate) {

            res.locals.publication = await publicationService.getPublicationAndSharers(id);
        } else {
            res.locals.publication = await publicationService.getPublicationById(id);
        }
        //TODO change property name to match collection
        


        next();
    };

}

module.exports = preLoad;