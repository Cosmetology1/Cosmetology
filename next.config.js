/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// const ignoreESLint = {
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// };

module.exports = {
  nextConfig,
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = {
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false,
      path: false,
      nock: false,
      child_process: false,
      tls: false,
      // mock-aws-s3: false,
      net: false,
      dns: false,
    };

    return config;
  },
};
