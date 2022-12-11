const Sequelize=require('sequelize');


const sequelize=new Sequelize('memories','root','root',{
dialect:'mysql',
host:'localhost',
});

module.exports=sequelize;
global.sequelize=sequelize;