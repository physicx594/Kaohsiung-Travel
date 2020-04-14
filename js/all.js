//連線
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

function xhrData(){
    let callbackdata = JSON.parse(xhr.responseText)
    let len = callbackdata.result.records.length
    let data = callbackdata.result.records
    // console.log(xhr)
    console.log(data.length)
    let selection = document.querySelector('.selection')
    let btn = document.querySelectorAll('.btn')
    let location = document.querySelector('.location')
    selection.addEventListener('change', selectZone)

    for(let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', hotBtn)
    }
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
      selectStr += `<option data-num="${i}" value="${selectFilterArr[i]}">${selectFilterArr[i]}</option>`
      selection.innerHTML = selectStr
    }

    function Btn(){
      let page = document.querySelector('.pageBtn')
      let btnNum = Math.ceil(data.length/10)

      let str = ''
      for(let i=0; i<btnNum; i++){
        str += `<span>${i+1}</span>`
      }
      page.innerHTML= str
    }
    Btn()

    let pageBtn = document.querySelectorAll('.pageBtn span')

    for(let i=0; i<pageBtn.length; i++){
      pageBtn[i].addEventListener('click',changePage.bind(this,i+1,data))
    }
    changePage(1,data)

    function changePage(page,data){

      $("html").animate({
          scrollTop: 300
      },1000)

      let contentTitle = `<span>全部區域</span>`
      document.querySelector('.location').innerHTML = contentTitle
      let items = 6
      let pageStart = (page-1) * items
      let pageEnd = page * items
      let str= ''
      for(let i=pageStart; i<pageEnd; i++){
        str +=`<li>
          <div
            data-num="${i}"
            class="contentImg d-flex align-items-end justify-content-between " style="background: url(${data[i].Picture1}) center center;		background-size: cover"
          >
          </div>
          <div class="contentBody">
            <div class="d-flex justify-content-between ">
              <p style="font-size: 24px ;color: rgb(245,208,5);" class=" font-weight-bold">${data[i].Name}</p>
              <p style="font-size: 16px;">${data[i].Zone}</p>
            </div>
            <div>
              <img src="images/icons_clock.png" class="mr-2" /><span>${data[i].Opentime}</span>
            </div>
            <div><img src="images/icons_pin.png" class="mr-2" /><span>${data[i].Add}</span></div>
            <div class="d-flex justify-content-between">
              <div><img src="images/icons_phone.png" class="mr-2" /><span>${data[i].Tel}</span></div>
              <div><img src="images/icons_tag.png" class="mr-2" /><span>${data[i].Ticketinfo}</span></div>
            </div>
          </div>
        </li>` 
      }
      document.querySelector('.list').innerHTML = str
    }



    //區域資料

    function selectZone(e) {
      let selectData = []
        $("html").animate({
            scrollTop: 300
        },1000)
        location.textContent = e.target.value
        let str = ''
      for(let i=0; i<len; i++){
        if (data[i].Zone == e.target.value) {
          selectData.push(data[i])
          str +=`<li>
          <div
            data-num="${i}"
            class="contentImg d-flex align-items-end justify-content-between " style="background: url(${data[i].Picture1}) center center;		background-size: cover"
          >
          </div>
          <div class="contentBody">
            <div class="d-flex justify-content-between ">
              <p style="font-size: 24px ;color: rgb(245,208,5);" class=" font-weight-bold">${data[i].Name}</p>
              <p style="font-size: 16px;">${data[i].Zone}</p>
            </div>
            <div>
              <img src="images/icons_clock.png" class="mr-2" /><span>${data[i].Opentime}</span>
            </div>
            <div><img src="images/icons_pin.png" class="mr-2" /><span>${data[i].Add}</span></div>
            <div class="d-flex justify-content-between">
              <div><img src="images/icons_phone.png" class="mr-2" /><span>${data[i].Tel}</span></div>
              <div><img src="images/icons_tag.png" class="mr-2" /><span>${data[i].Ticketinfo}</span></div>
            </div>
          </div>
        </li>` 
        }
        list.innerHTML = str
      }
      let page = document.querySelector('.pageBtn')
      let btnNum = Math.ceil(selectData.length/15) 
      let selectPage = ''
      for(let i=0; i<btnNum; i++){
        selectPage += `<span>${i+1}</span>`
      }
      page.innerHTML= selectPage
    }
    
    //熱門資料
    function hotBtn(e) {
      $("html").animate({
          scrollTop: 300
      },1000)

      let hotData=[]
      location.textContent= e.target.textContent
      let str = ''
      for(let i=0; i<len; i++){
        if (data[i].Zone == e.target.textContent) {
          hotData.push(data[i])
          str +=`<li>
          <div
            data-num="${i}"
            class="contentImg d-flex align-items-end justify-content-between " style="background: url(${data[i].Picture1}) center center;		background-size: cover">
          </div>
          <div class="contentBody">
            <div class="d-flex justify-content-between ">
              <p style="font-size: 24px ;color: rgb(245,208,5);" class=" font-weight-bold">${data[i].Name}</p>
              <p style="font-size: 16px;">${data[i].Zone}</p>
            </div>
            <div>
              <img src="images/icons_clock.png" class="mr-2" /><span>${data[i].Opentime}</span>
            </div>
            <div><img src="images/icons_pin.png" class="mr-2" /><span>${data[i].Add}</span></div>
            <div class="d-flex justify-content-between">
              <div><img src="images/icons_phone.png" class="mr-2" /><span>${data[i].Tel}</span></div>
              <div><img src="images/icons_tag.png" class="mr-2" /><span>${data[i].Ticketinfo}</span></div>
            </div>
          </div>
        </li>`
        }
        list.innerHTML = str
      }
      console.log(hotData)
      let page = document.querySelector('.pageBtn')
      let btnNum = Math.ceil(hotData.length/15) 
      let hotPage = ''
      for(let i=0; i<btnNum; i++){
          hotPage += `<span>${i+1}</span>`
      }
      page.innerHTML= hotPage
    }
}

let list = document.querySelector('.list')

let scrollTop = document.querySelector('.scrollTop').addEventListener('click', goTop)

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