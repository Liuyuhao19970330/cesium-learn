//一个点
var box = viewer.entities.add({
    id:"one",
    name:"one",
    position:Cesium.Cartesian3.fromDegrees(113.3191,23.109,1000),
    point:{
      pixelSize:10,
      color:Cesium.Color.RED,
      outlineColor:Cesium.Color.WHITE,
      outlineWidth:4
    }
})

//一个面 
const Plane = viewer.entities.add({
    name: "Blue plane",
    position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
    plane: {
      plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
      dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
      material: Cesium.Color.BLUE,
    },
  });
  //一条折线
  const redLine = viewer.entities.add({
    name: "Red line on terrain",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
      width: 5,
      material: Cesium.Color.RED,
      clampToGround: true,
    },
  });
  //天地图加载
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=7711a24780452f03bb7c02fba98183b9",
    layer: "tdtImgAnnoLayer2",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: false
}))

  //天空盒子
  viewer.scene.skyBox = new Cesium.SkyBox({
    sources : {
      positiveX : './public/sky.jpg',
      negativeX : './public/sky.jpg',
      positiveY : './public/sky.jpg',
      negativeY : './public/sky.jpg',
      positiveZ : './public/sky.jpg',
      negativeZ : './public/sky.jpg'
    }
  });
// 创建一个具名函数以便之后移除监听器
// 创建匿名函数作为监听器
var preRenderHandler = function () {
    // 执行你的操作
    viewer.zoomTo(box)

    // 移除监听器
    viewer.scene.preRender.removeEventListener(preRenderHandler);
};

// 注册监听器
viewer.scene.preRender.addEventListener(preRenderHandler);

