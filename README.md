# 高雄旅遊資訊
##### 前端 API 
![image](https://img.shields.io/badge/exercise-JavaScript-FFC800.svg) ![image](https://img.shields.io/badge/exercise-jQuery-1D85FE.svg) ![image](https://img.shields.io/badge/exercise-RWD-FF6C0F.svg) ![image](https://img.shields.io/badge/exercise-SCSS-E6097D.svg)

***
<img src="https://github.com/physicx594/Kaohsiung-Travel/blob/master/readme_IMG.png"  width=500  />



# 簡介
使用 HTML、SCSS、JavaScript、jQuery 的應用。

### 獲取 API 資料

- 使用 `new XMLHttpRequest();` 取得 API
- `get` 讀取資料
- `send()` 送出連線
- `onload()` xhr 其中一個事件 onload，當確定資料有回傳時，就執行 function

```
let xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true)
xhr.send(null)
xhr.onload = function(){
  if(xhr.readyState == 4 && xhr.status == 200){
    console.log('讀取資料成功');
    xhrData();
  }else{
    console.log('讀取資料失敗');
  }
}
```

### 資料設定 data

- 篩選select選單的資料`(刪掉重複地區)`
``` 
    //select資料
    let selectList =[]
    for(let i=0; i<len; i++){
      let selectZoneData = data[i].Zone
      selectList.push(selectZoneData) 
    }
    //篩選重複
    let selectFilter= {}
    selectList.forEach(function(value){
      selectFilter[value]= value
    })
    //物件轉陣列，帶入for迴圈
    let selectFilterArr = Object.keys(selectFilter)
    let selectLen =selectFilterArr.length
    let selectStr = `<option selected  disabled="disabled">--請選擇行政區--</option>`
    for(let i=0; i<selectLen; i++){
      selectStr += `<option data-num="${i}"
      value="${selectFilterArr[i]}">${selectFilterArr[i]}</option>`
      selection.innerHTML = selectStr
    } 
```

- 根據點擊目標來判斷撈的資料
```
        if (data[i].Zone == e.target.textContent)
```
### 事件 event

- 用change綁定select
- 用click綁定button


### 分頁效果 

- `根據資料量來計算按鈕數`
```
    function Btn(){
      let page = document.querySelector('.pageBtn')
      let btnNum = Math.ceil(data.length/10)

      let str = ''
      for(let i=0; i<btnNum; i++){
        str += `<span>${i+1}</span>`
      }
      page.innerHTML= str
    }
    for(let i=0; i<pageBtn.length; i++){
      pageBtn[i].addEventListener('click',changePage.bind(this,i+1,data))
    }
```

- 根據頁碼來呼叫相對應的資料
```
    let items = 6
    let pageStart = (page-1) * items
    let pageEnd = page * items
    let str= ''
    for(let i=pageStart; i<pageEnd; i++){
    }
```

### 初始化頁面 & 增加動態滑動
- jQuery 增加選擇區域動態效果
```
    function goTop(){
      $("html").animate({
          scrollTop: 0
      },1000)
    }

    $(window).scroll(function() {
      if ($(this).scrollTop() >= 300) {
        $('.scrollTop').fadeIn('fast');
      } else {
        $('.scrollTop')
          .stop()
          .fadeOut('fast');
      }
    });
```
