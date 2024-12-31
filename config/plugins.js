module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        url: "/uploads", // Đảm bảo URL của ảnh sẽ là dạng tương đối
      },
    },
  },
});
