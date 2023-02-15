module.exports = {
  // 문자열은 singleQuote로 ("" -> '')
  singleQuote: true,
  //코드 마지막에 세미콜론이 있게 formatting
  semi: true,
  // 들여쓰기 너비는 2칸
  tabWidth: 2,
  // 배열 키:값 뒤에 항상 콤마를 붙히도록 formatting
  trailingComma: 'all',
  // 코드 한줄이 maximum 80칸
  printWidth: 100,
  // 화살표 함수가 하나의 매개변수를 받을 때 괄호를 생략하게 formatting
  arrowParens: 'avoid',
  // windows에 뜨는 'Delete cr' 에러 해결
  endOfLine: "auto",
  bracketSpacing: true,

  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^components/(.*)$",
    "^containers/(.*)$",
    "^pages/(.*)$",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
