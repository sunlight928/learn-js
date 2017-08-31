var container,windowWidth,boxArrs,boxWidth,cols;
window.onload = function(){
    getBasicInfo();
   
    //滚动加载数据
    var imgs = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},        {"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"}]};
    
    window.onscroll = function(){
        var lastBox = boxArrs[boxArrs.length-1];
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight;
        if(lastBox.offsetTop+(lastBox.offsetHeight)/2 < scrollHeight + windowHeight){
            for(var i =0;i<imgs.data.length;i++){
                var divBox = document.createElement("div");
                divBox.className = "box";
                container.appendChild(divBox);
                var imgBox = document.createElement("div");
                imgBox.className = "imgcontent";
                divBox.appendChild(imgBox);
                var image = document.createElement("img");
                image.src = "img/"+imgs.data[i].src;
                imgBox.appendChild(image);
            }
        }
        boxArrs = getBoxs(container,"box");
        getNextBoxLocation(boxArrs,cols)
    }
    
}
//设置窗口大小自适应 监听窗口大小变化
window.onresize = function(){
    getBasicInfo();
}
function getBasicInfo(){
     //确定一行放多少个
    container = document.getElementById("container");
    windowWidth = document.documentElement.clientWidth;
    boxArrs = getBoxs(container,"box");
    boxWidth = boxArrs[0].offsetWidth;
    cols = Math.floor(windowWidth/boxWidth);
    container.style.cssText = "width:"+boxWidth*cols+"px;margin:0 auto";
    getNextBoxLocation(boxArrs,cols);
     console.log(windowWidth,cols);
    
}
/* 模拟后台取数据  原生ajax
function getImgData(url){
    var xhr = null;
    var datas;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        if(window.ActiveXObject){
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if(xhr!= null){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if((xhr.status >=200 &&xhr.status <300) || xhr.status == 304){
                    datas = JSON.parse(xhr.responseText);
                    
                }
            }
        }
        xhr.open("GET",url,true);
        xhr.send(null);
    }
    return datas;
}
*/

function getBoxs(parent,content){
    var divArr = parent.getElementsByTagName("div");
    var boxArr = [];
    for(var i=0;i<divArr.length;i++){
        if(divArr[i].className == "box"){
            boxArr.push(divArr[i]);
        }
    }
    return boxArr;
}
function getNextBoxLocation(boxs,cols){
    var boxHeights = [];
    for(var i=0;i<boxs.length;i++){
        //窗口变大自适应
        boxs[i].style.position = "absolute";
        if(i<cols){
             boxHeights.push(boxs[i].offsetHeight);
             boxs[i].style.top = "0px";
            if(i>0){
                 boxs[i].style.left = boxs[i-1].offsetLeft+boxs[i-1].offsetWidth;
            }
        }else{
             var minHeight = Math.min.apply(null,boxHeights);
             boxs[i].style.top = minHeight+"px";
             var minIndex = getMinHeightBoxIndex(boxHeights,minHeight);
             boxs[i].style.left = boxs[minIndex].offsetLeft;//都以第一排为基准取offsetLeft 
             boxHeights[minIndex]+=boxs[i].offsetHeight;
        }
       
    }    
}
function getMinHeightBoxIndex(boxHeights,minHeight){
    for(var i=0;i<boxHeights.length;i++){
        if(boxHeights[i] == minHeight){
            return i;
        }
    }
   
}