module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('purchase', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: DataTypes.DATE,
        info: DataTypes.TEXT
    },
    {
        freezeTableName: true,
        timestamps: false
    });

    Purchase.associate = (models) => {
        Purchase.belongsTo( models.user );
    };

    return Purchase;
}