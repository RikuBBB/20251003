//画像出典元


// Copyright (c) 2014-2024 David Marby & Nijiko Yonskai
// https://github.com/DMarby/picsum-photos/blob/main/LICENSE.md

console.log(Vue.version)

const { createApp, ref } = Vue;
// Vuetify を取り出し
const { createVuetify } = Vuetify;
// Vuetify を作ってプラグイン登録する
const vuetify = createVuetify();
// Vuetify を作ってプラグイン登録する

  const myData = {
    appName: "現在時刻",// アプリ名
    clock: "00:00:00"// 時計の文字列
  };


  const GetData = () =>{
  //緯度経度取得ここから
  const ipapiAPI = "https://ipapi.co/json/";
  //const axios = require('axios');    const app = createApp({の中に入れるとエラーになる

	const IPGet = axios.get(ipapiAPI)
  .then(response => {
    console.log(response.data.ip);
    console.log("緯度(latitude)" + response.data.latitude);
    console.log("軽度(longitude)" + response.data.longitude);
    const IPAddress = response.data.ip;
    console.log(IPAddress);
    const IPAPIInfo = response.data;
		// console.log(IPAPIInfo);  //後で復活させます！！！！！！！！！！！！！！！！！！！！
    const Latitude = response.data.latitude;
    const Longitude = response.data.longitude;
    console.log(Latitude);
    console.log(Longitude);
    document.getElementById("Address")
      .innerHTML = `緯度：${IPAPIInfo.latitude}　経度：${IPAPIInfo.longitude}`;
    console.log(Latitude,Longitude);
    //return [Latitude,Longitude];　//関数の処理終了
    
    //天気情報取得ここから

    var today = new Date();  // Dateオブジェクトを作る
    let year = today.getFullYear(); //年
    let month = today.getMonth();  // 月
    let date = today.getDate(); //日
    let day = today.getDay(); //曜日
    let h = today.getHours();  // 時
    let m = today.getMinutes();// 分
    let s = today.getSeconds();// 秒
    let TodayYMD = year + "/" + (month+1) + "/" + date
    console.log("today = " + today);
    console.log(day); //曜日は数字
    console.log(TodayYMD);
    
    const MeteoAPI = `https://api.open-meteo.com/v1/forecast?latitude=${IPAPIInfo.latitude}&longitude=${IPAPIInfo.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=Asia%2FTokyo`;
    // console.log(MeteoAPI);
    
  const WeeklyWeather = axios.get(MeteoAPI)
  .then(response => {
    // console.log(response.data);　//後で復活させます！！！！！！！！！！！！！！！！！！！！
    // const date = new Date(days[i]);
    // console.log(date);
    const WeatherDays = response.data.daily.time;
    const minTemps = response.data.daily.temperature_2m_min;
    const maxTemps = response.data.daily.temperature_2m_max;
    const weatherCodes = response.data.daily.weather_code;
    console.log(WeatherDays,minTemps,maxTemps,weatherCodes);
  
    var OneWeek = new Date();
    var OneWeekYMD = OneWeek.getFullYear() + "/" + (OneWeek.getMonth()+1) + "/" + OneWeek.getDate();
    console.log("OneWeek = " + OneWeek);
    console.log("OneWeekYMD = " + OneWeekYMD);

    var x = 0
    for (let i = 0; i < 7; i++) {
      var x = x +i
      console.log("var x = x +i = " + x);
      OneWeek.setDate(OneWeek.getDate() + x);  //forでループする度、OneWeekの日付に１プラスしている
      console.log("一週間の年月日データ=" + OneWeek);
      const monthDay = OneWeek.getMonth() + "/" + OneWeek.getDate();  //○○/○○にしたい
      console.log("monthDay=" + monthDay);
      const DayOfTheWeek = ['日', '月', '火', '水', '木', '金', '土'][OneWeek.getDay()];
      console.log("曜日=" + OneWeek.getDay());
      console.log("DayOfTheWeek=" + DayOfTheWeek);
      const min = minTemps[i].toFixed(1);
      const max = maxTemps[i].toFixed(1);
      console.log("minTemps=" + minTemps);
      console.log("maxTemps=" + maxTemps);

      const description = weatherDescription(weatherCodes[i]);
      const emoji = getWeatherEmoji(weatherCodes[i]);
      console.log("description=" + description);
      console.log("emoji=" + emoji);

      const cols = [
        `${monthDay} (${DayOfTheWeek})`,
        description + emoji,
        `最高 ${max}°C`,
        `最低 ${min}°C`,
      ];
      console.log("cols=" + cols);

      console.log("forの中　TodayYMD = " + TodayYMD);
      var OneWeekYMD = OneWeek.getFullYear() + "/" + (OneWeek.getMonth()+1) + "/" + OneWeek.getDate(); // ここで宣言しなおすことで未来日付となるOneWeekを取得
      console.log("forの中　OneWeekYMD = " + OneWeekYMD);
      var weathercontainer = `weathercontainer${x+1}`
      console.log(weathercontainer);

      cols.forEach((content) => {
        //console.log(content);
        var contentsList = document.createElement(`div`);
        contentsList.textContent = content ;
        console.log(contentsList);
        document.getElementById(weathercontainer).appendChild(contentsList);
        // if (TodayYMD == OneWeekYMD){
        //   document.getElementById(weathercontainer).appendChild(contentsList);
        // };

        // switch (){
        //   case 
        // }

      });
      OneWeek.setDate(OneWeek.getDate() - x);  //OneWeekの日付を今日日付にリセット
      console.log("基準日リセット=" + OneWeek);
      var x = 0;
      console.log("var x = 0; = " + x);
      console.log(today);

    }　//forの終わり


  })　//.then(response => の終わり

    .catch(error => console.error(error));　//axios.get(MeteoAPI) の終わり
  //天気情報取得ここまで

  })
  .catch(error => console.error(error));
  //緯度経度取得ここまで

};  //GetData()の終わり
  GetData();

  setInterval(() =>{
    GetData();
  },36000000); //納得いかないが全体再読み込みとする １時間ごとに再読み込み




  const app = createApp({
    //※ここにVueアプリケーションの処理の中身を書いていく※
      //時刻表示用ここから
        data(){
        return myData;// 扱うデータを指定する
      },
        created(){
          console.log("created!!");
          this.tick();// tick関数を実行する
        },
        methods:{
          tick(){// 現在時刻を取得する関数
        /*console.log("tick!!");*/
          const date = new Date();  // Dateオブジェクトを作る
          let year = date.getFullYear(); //年
          let month = date.getMonth();  // 月
          let day = date.getDate(); //日
          let h = date.getHours();  // 時
          let m = date.getMinutes();// 分
          let s = date.getSeconds();// 秒

          if(h < 10) h = "0" + h;   // 10未満であれば頭に0を付ける
          if(m < 10) m = "0" + m;
          if(s < 10) s = "0" + s;
          this.clock = year + "/" + (month+1) + "/" + day + "　" + h + ":" + m + ":" + s;// 文字列を結合する

            // 100ミリ秒経ったら1度だけ実行する
          setTimeout(()=>{
            this.tick();// tick関数を実行する
          }, 100);
        }}
      //時刻表示用ここまで
  });



  app.use(vuetify);
  app.mount('#app');
   ////.use(vuetify)          // Vuetify を使う宣言
   ////.mount('#app');        // Vue が管理するDOM



  function weatherDescription(code) {
    const map = {
      0: '快晴',
      1: 'ほぼ晴れ',
      2: '薄曇り',
      3: '曇り',
      45: '霧',
      48: '霧（霧氷）',

      51: '弱い霧雨',
      53: '中程度の霧雨',
      55: '強い霧雨',
      56: '弱い凍結霧雨',
      57: '強い凍結霧雨',

      61: '弱い雨',
      63: '中程度の雨',
      65: '強い雨',
      66: '弱い凍結雨',
      67: '強い凍結雨',

      71: '弱い雪',
      73: '中程度の雪',
      75: '強い雪',
      77: '雪あられ',

      80: '弱いにわか雨',
      81: '中程度のにわか雨',
      82: '激しいにわか雨',

      85: '弱いにわか雪',
      86: '強いにわか雪',

      95: '雷雨',
      96: '雷雨（弱い雹）',
      99: '雷雨（強い雹）'
    };

    return map[code] || `コード${code}：不明`;
  }

  function getWeatherEmoji(code) {
    if (code === 0) return '☀️';           // 快晴
    if (code === 1) return '🌤️';          // ほぼ晴れ
    if (code === 2) return '⛅';           // 薄曇り
    if (code === 3) return '☁️';           // 曇り

    if (code === 45 || code === 48) return '🌫️'; // 霧

    if (code === 51 || code === 53 || code === 55) return '🌦️'; // 霧雨
    if (code === 56 || code === 57) return '🌧️❄️';              // 凍結霧雨

    if (code === 61 || code === 63) return '🌧️';      // 弱〜中程度の雨
    if (code === 65) return '🌧️🌧️';                  // 強い雨
    if (code === 66 || code === 67) return '🌧️❄️';    // 凍結雨

    if (code === 71 || code === 73) return '🌨️';      // 弱〜中程度の雪
    if (code === 75) return '❄️❄️';                  // 強い雪
    if (code === 77) return '🌨️⛄';                   // 雪あられ

    if (code === 80) return '🚿';           // 弱いにわか雨
    if (code === 81) return '🌧️🚿';         // 中程度のにわか雨
    if (code === 82) return '🌧️🌧️🚿';       // 激しいにわか雨

    if (code === 85) return '🌨️🚿';         // 弱いにわか雪
    if (code === 86) return '🌨️❄️❄️';       // 強いにわか雪

    if (code === 95) return '⛈️';           // 雷雨
    if (code === 96) return '⛈️🧊';         // 雷雨（弱い雹）
    if (code === 99) return '⛈️🧊🧊';       // 雷雨（強い雹）

    return '❔'; // 未定義コードのフォールバック
  };