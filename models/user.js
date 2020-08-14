module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.STRING(100),
        pass: DataTypes.STRING(100),
        name: DataTypes.STRING(20),
        lastname: DataTypes.STRING(20),
        gender: DataTypes.STRING(20),
        date: DataTypes.DATEONLY,
        telephone: DataTypes.STRING(15),
    },
    {
        freezeTableName: true, // Para que no agrege s, friza la tabla. No cambiar la tabla
        timestamps: false // Crea dos campos adicionales con la fecha de creacion y modificacion. Con esto lo desactivamos
    });

    User.associate = (models) => {
        User.hasMany(models.comment);
        User.hasOne(models.billingAddress);
        User.hasOne(models.shippingAddress);
        User.belongsToMany( models.product, { through: models.favorite } );
        User.belongsToMany( models.product, { through: models.purchase } );
    };

    return User;
}