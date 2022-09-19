'use strict'


class GenericRoutes {
    constructor(model) {
        this.model = model;
    }

    async get(next) {
        try {
            return await this.model.findAll()
        } catch (e) {
            next(e)
        }
    }

    async getPopulated(id, next, args) {
        if (args) {
            try {
                return await this.model.findOne({
                    where: { id },
                    include: args
                })
            } catch (e) {
                next(e)
            }
        } else {
            try {
                return await this.model.findOne({
                    where: {
                        id
                    }
                })
            } catch (e) {
                next(e)
            }

        }
    }


    async create(data, next) {
        try {
            return await this.model.create(data)
        } catch (e) {
            next(e)
        };
    }

    async update(id, data, next) {
        try {
            return await this.model.update(data, {
                where: { id },
                returning: true
            })
        } catch (e) {
            next(e)
        };
    }
    async delete(id, next) {
        try {
            return await this.model.destroy({
                where: { id },
                returning: true
            })
        } catch (e) {
            next(e);
        }
    }

    async populate(next, args) {
        try {
            return await this.model.findAll({ include: args })
        } catch (e) {
            next(e)
        }
    }
}
module.exports = { GenericRoutes }