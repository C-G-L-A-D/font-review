import count from "./js/count.js";
import sum from "./js/sum.js";
import createPdf from "./js/pdf.js";

import "./font/iconfont.css";
import "./css/index.css";
import "./css/index.less";
import "./css/index.scss";
import "./css/index.sass";

console.log(count(32, 42));
console.log(sum(1, 31, 35, 21, 456));

const { createApp, ref } = window.Vue;

createApp({
  setup() {
    const message = ref("Hello vue!");
    const formInline = ref({
      user: "",
      password: "",
      date: "",
    });

    const formRef = ref(null);

    const onSubmit = () => {
      // 生成pdf
      createPdf(formRef.value);
    };
    return {
      message,
      formInline,
      onSubmit,
      formRef,
    };
  },
}).mount("#app");
