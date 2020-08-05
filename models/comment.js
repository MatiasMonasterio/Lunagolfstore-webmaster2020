module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: DataTypes.TEXT,
        date: DataTypes.DATE
    },
    {
        freezeTableName: true, // Para que no agrege s, friza la tabla. No cambiar la tabla
        timestamps: false // Crea dos campos adicionales con la fecha de creacion y modificacion. Con esto lo desactivamos
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.user);
        Comment.belongsTo(models.product);
    };

    return Comment;
}