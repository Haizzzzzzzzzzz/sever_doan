'use strict';

/**
 *  profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile', ({ strapi }) => ({
  async createMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [{ messages: "No authorized user found!" }]);
      }

      // Tạo hồ sơ người dùng
      const result = await strapi.entityService.create('api::profile.profile', {
        data: {
          fullName: ctx.request.body.fullName,
          email: user.email,
          user: user.id,
        },
      });

      // Sau khi tạo hồ sơ thành công, tạo giỏ hàng cho người dùng
      await strapi.entityService.create('api::cart.cart', {
        data: {
          cart_user: user.id, // Liên kết với user vừa tạo hồ sơ
          status: user.email, // Trạng thái mặc định của giỏ hàng
          publishedAt: new Date(),  // Đặt trạng thái Published ngay khi tạo
        },
      });

      return result;
    } catch (err) {
      return ctx.badRequest(500, [{ messages: [{ id: err.message }] }]);
    }
  },

  async getMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [{ messages: "No authorized user found!" }]);
      }
      const result = await strapi.db.query('api::profile.profile').findOne({
        where: {
          user: {
            id: {
              $eq: user.id,
            },
          },
        },
        populate: {
          image: true,
        },
      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [{ messages: [{ id: 'Error' }] }]);
    }
  },
}));
