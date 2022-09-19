'use strict'

const User = (sequelize, DataTypes, zlib, bcrypt) => sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'New User'
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hashed = bcrypt.hashSync(value, 12)
            this.setDataValue('password', hashed)
        }
    },
    about: {
        type: DataTypes.STRING,
        set(data) {
            const deflated = zlib.deflateSync(data).toString('base64')
            this.setDataValue('about', deflated)
        },
        get() {
            const data = this.getDataValue('about');
            const inflated = zlib.inflateSync(Buffer.from(data, 'base64')).toString();
            return inflated

        }

    }
})

module.exports = { User }