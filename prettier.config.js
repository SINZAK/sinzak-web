module.exports = {
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@lib/(.*)$",
    "^@(pages|public|styles|types)/(.*)$",
    "^@components/(.*)$",
    "^[./]",
  ],
  plugins: [require("prettier-plugin-tailwindcss")],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
