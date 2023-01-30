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
    patchNextjsWebpackImageLoaderForInline(config);
    // workaround for Next.js overriding webpack `config.module.generator` which breaks asset/inline
    // https://github.com/vercel/next.js/discussions/36981#discussioncomment-3167331
    // config.module.generator["asset/resource"] =
    //   config.module.generator["asset"];
    // config.module.generator["asset/source"] = config.module.generator["asset"];
    // delete config.module.generator["asset"];
    return config;
  },
};

function patchNextjsWebpackImageLoaderForInline(config) {
  // workaround for Next.js overriding webpack `config.module.generator` for all of "asset" module types
  // although it works for "asset/resource" and "asset/source" types, it breaks asset/inline
  // https://github.com/vercel/next.js/discussions/36981#discussioncomment-3167331
  config.module.generator["asset/resource"] = config.module.generator["asset"];
  config.module.generator["asset/source"] = config.module.generator["asset"];
  delete config.module.generator["asset"];

  // find the Next.js image loader rule configured by Next.js automatically
  // disable it for imports with a query parameter ?inline
  const imageRule = config.module.rules.find(
    (rule) => rule.loader === "next-image-loader"
  );
  imageRule.resourceQuery = { not: /inline/ };

  // add a custom rule for importing bitmap files with a query parameter ?inline
  // to use the webpack asset/inline module
  config.module.rules.push({
    test: /\.(jpg|gif|png)$/i,
    resourceQuery: /inline/,
    type: "asset/inline",
  });
}

module.exports = nextConfig;
