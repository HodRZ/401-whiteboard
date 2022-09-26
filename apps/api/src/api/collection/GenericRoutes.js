'use strict'


class GenericRoutes {
    constructor(model) {
        this.model = model;
    }

    async get(next) {
        try {
            return await this.model.findAll({
                attributes: { exclude: ['password'] }
            })
        } catch (e) {
            next(e)
        }
    }

    async getPopulated(id, next, args) {
        if (args) {
            const data = args.map((model) => {
                return {
                    association: model,
                    attributes: { exclude: ['password'] }
                }
            })
            try {
                return await this.model.findOne({
                    where: { id },
                    include: [...data]
                })
            } catch (e) {
                next(e)
            }
        } else {
            try {
                return await this.model.findOne({
                    where: { id },
                    include: {
                        all: true,
                        nested: true,
                    },
                    attributes: { exclude: ['password'] }

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
                returning: true,
                attributes: { exclude: ['password', 'refresh_token'] }
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
        if (args) {
            const data = args.map((model) => {
                return {
                    association: model,
                    attributes: { exclude: ['password'] }
                }
            })
            try {
                return await this.model.findAll({
                    include: [...data],
                })
            } catch (e) {
                next(e)
            }
        }
        try {
            return await this.model.findAll({
                include: {
                    all: true,
                    nested: true,
                    attributes: { exclude: ['password'] }
                },
                attributes: { exclude: ['password'] }
            })
        } catch (e) {
            next(e)
        }
    }
}
module.exports = { GenericRoutes }