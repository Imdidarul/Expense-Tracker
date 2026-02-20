const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('testdb','root','04082002@Didar',{
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});


(async()=>{ try {
    await sequelize.authenticate();
    console.log("Connected to database");

}catch(err){
    console.log(err);
}})();


module.exports = sequelize