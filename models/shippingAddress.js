module.exports = (sequelize, DataTypes) => {
    const ShippingAddress = sequelize.define('shippingAddress', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        street: DataTypes.STRING(100),
        number: DataTypes.INTEGER,
        city: DataTypes.STRING(50),
        location: DataTypes.STRING(50),
        postal_code: DataTypes.INTEGER,
    },
    {
        freezeTableName: true, // Para que no agrege s, friza la tabla. No cambiar la tabla
        timestamps: false // Crea dos campos adicionales con la fecha de creacion y modificacion. Con esto lo desactivamos
    });

    ShippingAddress.associate = (models) => {
        ShippingAddress.belongsTo(models.user);
    };

    return ShippingAddress;
}