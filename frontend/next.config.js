module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '5000',
          pathname: '**',
        },
      ],
    },
  }