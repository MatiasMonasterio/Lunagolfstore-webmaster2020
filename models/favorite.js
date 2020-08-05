module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('favorite', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        freezeTableName: true, // Para que no agrege s, friza la tabla. No cambiar la tabla
        timestamps: false // Crea dos campos adicionales con la fecha de creacion y modificacion. Con esto lo desactivamos
    });

    Favorite.associate = (models) => {
        Favorite.belongsTo( models.product );
        Favorite.belongsTo( models.user );
    };

    return Favorite;
}