module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        url: env('UPLOAD_URL', '/uploads'), // Chỉ đường dẫn tương đối nếu cần
      },
    },
  },
});
