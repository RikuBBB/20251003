const { createApp, ref } = Vue;
// Vuetify を取り出し
const { createVuetify } = Vuetify;

// Vuetify を作ってプラグイン登録する
const vuetify = createVuetify();
createApp({
  setup: function () {
    // Vue内部で使いたい変数は全て ref で定義する
    const task = ref('');          // タスク内容を保持する
    const todoList = ref([]);      // タスク一覧（配列）

    // 関数はここ
    function addTask() {
      console.log('次のタスクが追加されました：', task.value);
      // 配列の先頭に現在のタスク内容を追加する（最後尾の場合は push）
      todoList.value.unshift(task.value);
      console.log('現在のToDo一覧：', todoList.value);
    }
      
    // 全てのタスクを消去する
    function clearAll() {
      todoList.value = []; // 配列を空にする
      console.log('全てのタスクを削除しました');
    }

    // HTML から使いたい変数や関数を return で返す、clearAllも追加
    return { task, todoList, addTask, clearAll };
  }
}).use(vuetify).mount('#app'); // Vue が管理する一番外側の DOM 要素