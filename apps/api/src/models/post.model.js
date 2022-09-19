'use strict'

const post = (sequelize, DataTypes, zlib) => sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        set(data) {
            const deflated = zlib.deflateSync(data).toString('base64')
            this.setDataValue('content', deflated)
        },
        get() {
            const data = this.getDataValue('content');
            const inflated = zlib.inflateSync(Buffer.from(data, 'base64'));
            return inflated.toString()
        }
    }
})

module.exports = { post }