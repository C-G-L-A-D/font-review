enum SUBJECTS {
  MATH = '数学',
  CHINESE = '语文',
  ENGLISH = '英语',
  PHYSICS = '物理',
  CHEMISTRY = '化学'
}

let subject = SUBJECTS.MATH
console.log(subject)

// subject = '语文'  // 报错，此时 subject 为 SUBJECTS 类型，不能再赋值其他类型的值，包括 string 类型
subject = SUBJECTS.ENGLISH
console.log(SUBJECTS.ENGLISH)
function getSubject(subject: SUBJECTS) {
  return subject
}

// getSubject('数学') // 报错
