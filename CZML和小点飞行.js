// 定义一个包含不同形状及其属性的 CZML（Cesium Markup Language）数组
const czml = [
    // CZML 文档信息
    {
      id: "document",
      name: "box",
      version: "1.0",
    },
    // 第一个形状（蓝色盒子）具有位置和材质属性
    {
      id: "shape1",
      name: "蓝色盒子",
      position: {
        cartographicDegrees: [-114.0, 40.0, 300000.0],
      },
      box: {
        dimensions: {
          cartesian: [400000.0, 300000.0, 500000.0],
        },
        material: {
          solidColor: {
            color: {
              rgba: [0, 0, 255, 255],
            },
          },
        },
      },
    },
    // 第二个形状（红色盒子带黑色轮廓）具有位置、材质和轮廓属性
    {
      id: "shape2",
      name: "红色盒子带黑色轮廓",
      position: {
        cartographicDegrees: [-107.0, 40.0, 300000.0],
      },
      box: {
        dimensions: {
          cartesian: [400000.0, 300000.0, 500000.0],
        },
        material: {
          solidColor: {
            color: {
              rgba: [255, 0, 0, 128],
            },
          },
        },
        outline: true,
        outlineColor: {
          rgba: [0, 0, 0, 255],
        },
      },
    },
    // 第三个形状（黄色盒子轮廓）具有位置、尺寸和轮廓颜色
    {
      id: "shape3",
      name: "黄色盒子轮廓",
      position: {
        cartographicDegrees: [-100.0, 40.0, 300000.0],
      },
      box: {
        dimensions: {
          cartesian: [400000.0, 300000.0, 500000.0],
        },
        fill: false,
        outline: true,
        outlineColor: {
          rgba: [255, 255, 0, 255],
        },
      },
    },
    {
        id: "point",
        availability: "2012-08-04T16:00:00Z/2012-08-04T16:05:00Z", // 物体的可用时间范围是从 2012-08-04T16:00:00Z 到 2012-08-04T16:05:00Z
        position: {
          epoch: "2012-08-04T16:00:00Z", // 物体起始时间是 2012-08-04T16:00:00Z
          cartographicDegrees: [
            0, -78, 20, 150008,  // 时间：150008，经度：8，纬度：-78，高度：20
            10, -88, 44, 150088, // 时间：150888，经度：108，纬度：-88，高度：44
            20, -98, 18, 150008,  // 时间：150808，经度：20，纬度：-98，高度：18
            //const longitude = 116.3912757;
// const latitude = 39.906217;
// const height = 10000000; // 高度，单位为米
            30, 116.3912757, 39.906217, 150000, // 时间：150000，经度：308，纬度：-98，高度：52
          ],
        },
        point: {
          color: {
            rgba: [255, 255, 255, 128], // 点的颜色为白色，带有50%的不透明度
          },
          outlineColor: {
            rgba: [255, 0, 0, 128], // 点的轮廓颜色为红色，带有50%的不透明度
          },
          outlineWidth: 3, // 点的轮廓线宽为 3
          pixelSize: 15, // 点的大小为 15 像素
        },
      },
  ];
  
  // 在具有 id 为 "cesiumContainer" 的 HTML 元素中创建一个 Cesium Viewer
  // 将 CZML 数据源加载到 Viewer 中，并缩放以适应加载的数据
  const dataSourcePromise = Cesium.CzmlDataSource.load(czml);
  dataSourcePromise.then((e)=>{
    viewer.dataSources.add(e);
    const entity = e.entities.getById("point");
    console.log(entity)

  })
  
  
  