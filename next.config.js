/** @type {import('next').NextConfig} */
const config = {
  swcMinify: false,
  reactStrictMode: false,
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error);
});
