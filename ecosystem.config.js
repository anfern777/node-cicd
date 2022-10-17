module.exports = {
  apps: [
    {
      name: 'metadex-admin-api',
      script: 'npm',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: '3000',
      },
    },
  ],
};
