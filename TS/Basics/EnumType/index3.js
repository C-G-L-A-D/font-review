var SUBJECTS;
(function (SUBJECTS) {
    SUBJECTS["MATH"] = "\u6570\u5B66";
    SUBJECTS["CHINESE"] = "\u8BED\u6587";
    SUBJECTS["ENGLISH"] = "\u82F1\u8BED";
    SUBJECTS["PHYSICS"] = "\u7269\u7406";
    SUBJECTS["CHEMISTRY"] = "\u5316\u5B66";
})(SUBJECTS || (SUBJECTS = {}));
var subject = SUBJECTS.MATH;
console.log(subject);
// subject = '语文'  // 报错，此时 subject 为 SUBJECTS 类型，不能再赋值其他类型的值，包括 string 类型
subject = SUBJECTS.ENGLISH;
console.log(SUBJECTS.ENGLISH);
function getSubject(subject) {
    return subject;
}
// getSubject('数学') // 报错
