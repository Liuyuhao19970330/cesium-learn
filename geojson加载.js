//https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json

//viewer.dataSources.add();
const geoJson = Cesium.GeoJsonDataSource.load('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json', {
    stroke: Cesium.Color.HOTPINK,
    fill: Cesium.Color.SKYBLUE.withAlpha(0.5),
    strokeWidth: 3,
    markerSymbol: '?'
  })
  geoJson.then((e)=>{
    viewer.dataSources.add(e);
    var entities = e.entities.values;
    setInterval(()=>{
        entities.forEach((entity) => {
            entity.polygon.material = new Cesium.ColorMaterialProperty(
                Cesium.Color.fromRandom({
                    alpha:1.0
                })
            );
            entity.polygon.extrudedHeight = Math.random()*1000000
            entity.polygon.outline = false
        });
    },1000)
  })


//加载kml
// 定义 KML 文件的 URL
// let kmlUrl = "./中华人民共和国.kml";

// // 使用 Cesium.KmlDataSource.load 方法加载 KML 数据
// let kmlDataPromise = Cesium.KmlDataSource.load(kmlUrl, {
//   camera: viewer.scene.camera,
//   canvas: viewer.scene.canvas,
//   screenOverlayContainer: viewer.container,
// });

// // 输出 KML 数据的 Promise 对象
// console.log(kmlDataPromise);

// // 处理加载成功后的回调
// kmlDataPromise.then(function (dataSource) {
//   // 输出加载的数据源对象
//   console.log(dataSource);

//   // 将数据源添加到 Cesium Viewer 中
//   viewer.dataSources.add(dataSource);

//   // 获取加载的数据源中的所有实体
//   var entities = dataSource.entities.values;
//     console.log(entities)
//     entities.forEach((entity) => {
//         // 检查实体是否具有 polygon 属性并且不是 undefined
//         if (entity && entity.polygon && entity.polygon instanceof Cesium.PolygonGraphics) {
//           // 检查 material 属性是否存在并且不是 undefined
//           if (!entity.polygon.material) {
//             // 如果 material 不存在，则创建一个新的 ColorMaterialProperty
//             entity.polygon.material = new Cesium.ColorMaterialProperty(
//               Cesium.Color.fromRandom({
//                 alpha: 1.0
//               })
//             );
//           }
//         } else {
//           console.warn('Entity does not have a valid polygon:', entity);
//         }
//       });
    

//     //entities[0].
//   // 对每个实体设置多边形材质
// //   entities.forEach((entity) => {
// //     entity.polygon.material = new Cesium.ColorMaterialProperty(
// //       Cesium.Color.fromRandom({
// //         alpha: 1.0
// //       })
// //     );
// //   });
// })


// 假设这是您想要的经纬度和高度
const longitude = 116.3912757;
const latitude = 39.906217;
const height = 10000000; // 高度，单位为米

// 使用 fromDegrees 方法将经纬度和高度转换为 Cartesian3
const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);

// 设置相机视角
viewer.camera.flyTo({
    destination: position
});