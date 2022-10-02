//TO D0 - change nMW TO APPR SERVICE

const Publication = require('../models/publication');


async function getAllPublications() {
    return Publication.find({}).lean();
    
}


async function getPublicationById(id){
    return Publication.findById(id).lean();
}



async function getPublicationByCreator(userId){
    return Publication.find({author: userId})
}


async function getPublicationAndSharers(id){
    return Publication.findById(id).populate('author').populate('usersShared').lean();
}

async function createPublication(publication){
    const result = new Publication(publication);

    await result.save();
}


async function sharePublication(publicationId, userId) {
    const publication = await Publication.findById(publicationId);

    if(publication.usersShared.includes(userId)){
        throw new Error ('User already shared the publication');
    } 

    publication.usersShared.push(userId);
    await publication.save();



}

async function deleteById(id) {
    await Publication.findByIdAndDelete(id);
}

async function updatePublication(id, publication ) {
    const existing = await Publication.findById(id);

    existing.title = publication.title;
    existing.paintingTechnique = publication.paintingTechnique;
    existing.certificate = publication.certificate;
    existing.artPicture = publication.artPicture;

 

    await existing.save();
}


module.exports = {
    createPublication,
    getAllPublications,
    getPublicationById,
    getPublicationAndSharers,
    sharePublication,
    updatePublication,
    deleteById,
    getPublicationByCreator,
  


};