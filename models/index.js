const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
})

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'testTitle'
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'testSlug'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'testContent'
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'testName'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    defaultValue: 'testEmail'
  }
});


Page.belongsTo(User,{as: 'author'});


module.exports = {
  db,
  Page,
  User
}
