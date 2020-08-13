module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        brand: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        stock: DataTypes.INTEGER,
        image: DataTypes.STRING,
        description: DataTypes.TEXT,
    },
    {
        freezeTableName: true, // Para que no agrege s, friza la tabla. No cambiar la tabla
        timestamps: false // Crea dos campos adicionales con la fecha de creacion y modificacion. Con esto lo desactivamos
    });

    Product.associate = (models) => {
        Product.hasMany( models.comment );
        Product.belongsTo( models.category );
        Product.belongsToMany( models.user, { through: models.favorite } );
        Product.belongsToMany( models.user, { through: models.cart } );
    };

    return Product;
}