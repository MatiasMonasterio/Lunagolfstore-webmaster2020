module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
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

    Cart.associate = (models) => {
        Cart.belongsTo( models.product );
        Cart.belongsTo( models.user );
    };

    return Cart;
}