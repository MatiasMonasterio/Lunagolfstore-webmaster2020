const db = require('../models');
const moment = require('moment');

const getCommentsByProduct = async( id ) => {
    const commentList = await db.comment.findAll({
        where: {
            productId: id
        },
        include: db.user,
    }).then( resp => resp );

    return commentList;
}

const addComment = async( productId, userId, content ) => {
    const dateTime = moment( new Date ).format( 'YYYY-MM-DD hh:mm:ss' );
    const newComment = await db.comment.create({
        content: content,
        date: dateTime,
        userId: userId,
        productId: productId
    });

    const comment = db.comment.findByPk( newComment.id );
    return comment;
}

module.exports = {
    getCommentsByProduct,
    addComment
}