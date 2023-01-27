/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["sinzakimage.s3.ap-northeast-2.amazonaws.com"],
  },
  experimental: {
    scrollRestoration: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path((?!stomp).*)*", //api request path
  //       destination: "http://localhost:8080/api/:path*", //목적 path
  //     },
  //   ];
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            ext: "tsx",
            icon: "1.4em",
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
