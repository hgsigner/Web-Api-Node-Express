module.exports = function(sequelize, DataTypes){
	var Company = sequelize.define('Company',{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	},{
		classMethods: {
			associate: function(models){
				Company.hasMany(models.User);
			}
		}
	});

	return Company;
};