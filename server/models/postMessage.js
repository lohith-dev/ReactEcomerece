const Sequelize=require('sequelize');
const sequelize=require('../Database');


const postMessage=sequelize.define('postMessage',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    title: {
        type: Sequelize.STRING,
      },
    message: {
        type: Sequelize.STRING,
      },
    creator: {
        type: Sequelize.STRING,
      },
    tags: {
        type: Sequelize.STRING,
      },
      SelectedFile: {
        type: Sequelize.STRING,
      },
      like: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    }
  }
  );
  
  module.exports=postMessage;