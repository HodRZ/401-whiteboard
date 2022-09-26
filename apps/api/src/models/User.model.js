'use strict'

const User = (sequelize, DataTypes, zlib, bcrypt) => sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'New User'
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false,
        set(data) {
            const sanitized = data.toLowerCase()
            this.setDataValue('email', sanitized)
        }
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
        type: DataTypes.TEXT,
        set(data) {
            const deflated = zlib.deflateSync(data).toString('base64')
            this.setDataValue('about', deflated)
        },
        get() {
            const data = this.getDataValue('about');
            if (data) {
                const inflated = zlib.inflateSync(Buffer.from(data, 'base64'));
                return inflated.toString()
            } else {
                return '--'
            }

        }
    },
    access_token: {
        type: DataTypes.VIRTUAL
    }

})

module.exports = { User }