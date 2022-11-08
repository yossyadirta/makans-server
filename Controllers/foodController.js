const { Food, Category } = require("../models/index");
const { Op } = require("sequelize");

class FoodController {
  static async findAllFoods(req, res, next) {
    try {
      let options = {};
      options = {
        order: [["id", "DESC"]],
        include: [
          {
            model: Category,
          },
        ],
      };

      const data = await Food.findAll(options);

      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async createFood(req, res, next) {
    try {
      const { name, price, imageUrl, CategoryId } = req.body;
      let data = await Food.create({
        name,
        price,
        imageUrl,
        CategoryId,
      });

      res.status(201).json({
        message: `Success create Food`,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editFood(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, imageUrl, CategoryId } = req.body;
      await Food.update(
        {
          name,
          price,
          imageUrl,
          CategoryId,
        },
        { where: { id } }
      );

      res.status(200).json({
        message: `Success update Food id: ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFood(req, res, next) {
    try {
      const { id } = req.params;
      await Food.destroy({
        where: { id },
      });
      res.status(200).json({
        message: `Success delete id: ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findFoodById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Food.findByPk(id, {
        include: [
          {
            model: Category,
          },
        ],
      });
      if (!data) {
        throw { name: "DATA_NOT_FOUND", model: "Food", id };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FoodController;