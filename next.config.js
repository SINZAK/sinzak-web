/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["sinzakimage.s3.ap-northeast-2.amazonaws.com"],
  },
  ...(process.env.NODE_ENV === "development" && {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination:
            "http://ec2-13-209-121-29.ap-northeast-2.compute.amazonaws.com:8080/:path*",
        },
      ];
    },
  }),
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
