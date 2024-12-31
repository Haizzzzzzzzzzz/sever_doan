module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        url: '/uploads', // URL tương đối cho hình ảnh
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
