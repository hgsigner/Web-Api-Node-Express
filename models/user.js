module.exports = function(sequelize, DataTypes){
	var User = sequelize.define('User',{ 
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				notEmpty: true
			}
		},
		last_name: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
				isEmail: true
			}
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				isIn: [['master', 'manager', 'colaborator']]
			}
		}
	},{
		classMethods: {
     	associate: function(models){
        User.belongsTo(models.Company);
      }
    },
    instanceMethods: {
    	fullname: function(){
    		return this.first_name + this.last_name;
    	}
    }
	});

	return User;
}