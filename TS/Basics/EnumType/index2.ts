enum Language {
  Chinese = 'zh'
}

enum Language {
  Italian,
  Spanish, // 可以不初始化值，上一个 Language 没有未初始化的成员
  French = 'fr'
}

enum Language {
  English = 'en'
  // Russian 报错，如果前面同名的枚举结构中已经包含了未初始化的成员，那么后面同名的枚举结构中就都必须初始化成员值
}

enum Language {
  // French = 'fr', // 报错，不能包含同名成员
  German = 'de'
}

console.log(Language.Chinese) // zh
console.log(Language.English) // en
