//角度转化
//角度转弧度 
var radians = Cesium.Math.toRadians(90) 
//弧度转角度
var degrees = Cesium.Math.toDegrees(Math.PI) 
//经纬度转成空间坐标 
console.log('radians',radians)
console.log('degrees',degrees)
// 经纬度坐标
var longitude = 89.5;
var latitude = 20.4;
var height = 100;

// 将经纬度坐标转换为三维笛卡尔坐标
var cartesianPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);

// 将三维笛卡尔坐标转换为经纬度坐标
var cartographicPosition = Cesium.Cartographic.fromCartesian(cartesianPosition);

// 获取经度、纬度和高度
var resultLongitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
var resultLatitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
var resultHeight = cartographicPosition.height;

console.log("原始经纬度坐标:", longitude, latitude, height);
console.log("转换后经纬度坐标:", resultLongitude, resultLatitude, resultHeight);
//给相机一个坐标
var  position = Cesium.Cartesian3.fromDegrees(116.397428,39.90923,100)
//瞬间到达指定点
viewer.camera.setView({
    destination:position,
    orientation:{
      //相机的朝向,沿着Y轴旋转
      heading:Cesium.Math.toRadians(0),
      //俯仰角,沿着x轴
      pitch:Cesium.Math.toRadians(-90),
      //翻滚角,沿着z轴
      roll:0
    }
   })
//过五秒飞另外一地
setTimeout(()=>{
    var camera = viewer.camera
    camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          -73.98580932617188,
          40.74843406689482,
          363.34038727246224),
          //完成之后再飞
          complete: function () {
            setTimeout(function () {
              camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(
                    113.199869,
                    22.102645,
                  500.0000
                ),
                orientation: {
                  heading: Cesium.Math.toRadians(200.0),
                  pitch: Cesium.Math.toRadians(-50.0),
                },
                easingFunction: Cesium.EasingFunction.LINEAR_NONE,
              });
            }, 1000);
          },    
    })
},5000)
