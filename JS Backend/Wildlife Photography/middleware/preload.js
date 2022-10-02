//TODO change property name to match collection

const postService = require('../services/post'); 

function preLoad(populate) {

    return async function (req, res, next) {

        const id = req.params.id;

        if(populate) {

            res.locals.post = await postService.getPostnAndVotes(id);
        } else {
            res.locals.post = await postService.getPostById(id);
        }
        //TODO change property name to match collection
        


        next();
    };

}

module.exports = preLoad;