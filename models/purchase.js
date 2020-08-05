module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('purchase', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: DataTypes.DATE,
        total: DataTypes.DECIMAL(10,2)
    },
    {
        freezeTableName: true, // Para que no agrege s, friza la tabla. No cambiar la tabla
        timestamps: false // Crea dos campos adicionales con la fecha de creacion y modificacion. Con esto lo desactivamos
    });

    Purchase.associate = (models) => {
        Purchase.belongsTo( models.product );
        Purchase.belongsTo( models.user );
    };

    return Purchase;
}