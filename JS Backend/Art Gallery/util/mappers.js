function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [
            {
                msg: err.message
            }
        ];
    } else {
        return [{ msg: 'Request Error' }];
    }
}


function postViewModel(post) {
    return {
        title: post.title,
        _id: post._id,
        paintingTechnique: post.paintingTechnique,
        certificate: post.certificate,
        artPicture: post.artPicture,
        author: authorViewModel(post.author),
        usersShared: post.usersShared,
      

    }
}


function authorViewModel(user) {
    return {
        _id: user._id,
        username: user.username,
        address: user.address,
    }
}

module.exports = {
    mapErrors,
    postViewModel,
    authorViewModel
};

