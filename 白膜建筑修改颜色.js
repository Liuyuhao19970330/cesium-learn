//添加3D建筑
console.log(viewer)
const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();
    // 设置 Cesium3DTileStyle
//     osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
//     // 设置颜色为黄色（通过 color 函数）
//     color: "rgba(51, 204, 255,0.5)",
//     // 或者设置颜色为半透明白色（通过 rgba 函数）
//     // color: "rgba(255, 255, 255, 0.5)",
//     // 显示该样式
//     show: true,
// });

// osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
//     // 设置颜色条件
//     color: {
//         conditions: [
//             // 如果 feature 的 'building' 属性等于 'apartments'，设置颜色为半透明淡蓝色
//             ["${feature['building']} === 'apartments'", "color('rgba(255,0,0,0.5)')"],
//             // 如果条件不匹配，默认颜色为绿色
//             ["true", "color('rgba(51, 204, 255,0.5)')"]
//         ]
//     },
//     // 显示该样式
//     show: true,
// });

osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
    // 定义距离
    defines: {
        distance: "distance(vec2(${feature['cesium#longitude']}, ${feature['cesium#latitude']}), vec2(113.3191, 23.109))"
    },
    // 设置颜色条件
    color: {
        conditions: [
            // 如果 distance 小于 0.2，设置颜色为半透明红色
            ["${distance} < 0.005", "color('rgba(255, 0, 50, 0.5)')"],
            ["${distance} < 0.012", "color('rgba(255, 255,0 , 0.5)')"],
            ["${distance} < 0.02", "color('rgba(255, 255, 155, 0.5)')"],
            // 如果条件不匹配，默认颜色为白色
            ["true", "color('rgba(0,255,255,0.5)')"]
        ]
    },
    // 显示该样式
    show: true,
});

      viewer.scene.primitives.add(osmBuildingsTileset);
// 将 Cesium3DTileset 添加到场景的图元集合中


      const position = Cesium.Cartesian3.fromDegrees(
        113.318977,
        23.114155,
        500
      );
viewer.camera.setView({
    destination:position
})

