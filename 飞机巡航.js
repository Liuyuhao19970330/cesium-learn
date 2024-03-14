// 定义函数，用于在两个值之间进行线性插值
function interpolate(startValue, endValue, steps) {
    const stepSize = (endValue - startValue) / (steps + 1);
    const interpolatedValues = [];

    for (let i = 1; i <= steps; i++) {
        interpolatedValues.push(startValue + stepSize * i);
    }

    return interpolatedValues;
}

// 初始坐标
const startPoint = { longitude: -119.11109, latitude: 40.66152, height: 10041.4 };

// 结束坐标
const endPoint = { longitude: -169.11109, latitude: 68.66152, height: 10041.4 };

// 插值数量
const numPoints = 298;

// 在经度、纬度和高度上进行线性插值
const lonValues = interpolate(startPoint.longitude, endPoint.longitude, numPoints);
const latValues = interpolate(startPoint.latitude, endPoint.latitude, numPoints);
const heightValues = interpolate(startPoint.height, endPoint.height, numPoints);

// 生成插值点列表
const planeData = [];

for (let i = 0; i < numPoints; i++) {
    const point = {
        longitude: lonValues[i],
        latitude: latValues[i],
        height: heightValues[i]
    };
    planeData.push(point);
}

// 打印插值后的坐标
console.log(planeData)

//添加3D建筑
const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();
      viewer.scene.primitives.add(osmBuildingsTileset);

  
// 创建一个 SampledPositionProperty 对象，用于存储飞机位置随时间变化的信息
const positionProperty = new Cesium.SampledPositionProperty();

// 定义每个时间步长的间隔，这里设置为 30 秒
const timeStepInSeconds = 30;

// 获取飞机数据数组的长度，假设 planeData 是一个包含位置信息的数组
const totalSeconds = (planeData.length-1) * timeStepInSeconds;


// 设置起点时间
const time = new Date("2022-03-09T23:10:00");
// cesium 默认使用的是儒略日的时间，所以需要将起点时间转换成儒略日的时间
const startJulianDate = Cesium.JulianDate.fromDate(time);
// 设置终点时间，假设 startJulianDate.totalSeconds 包含了起点时间的总秒数
// 如果不是这样，请根据实际情况提供正确的秒数
const stopJulianDate = Cesium.JulianDate.addSeconds(
    startJulianDate,
    totalSeconds,
    new Cesium.JulianDate()

);
// 将查看器的时间调整到起点和结束点的范围
viewer.clock.startTime = startJulianDate.clone(); // 设置查看器时间的起点为起始儒略日时间
viewer.clock.stopTime = stopJulianDate.clone(); // 设置查看器时间的终点为结束儒略日时间
viewer.clock.currentTime = startJulianDate.clone(); // 设置查看器当前时间为起始儒略日时间

// 调整时间轴的显示范围以显示起始和结束儒略日时间之间的时间段
viewer.timeline.zoomTo(startJulianDate, stopJulianDate);

// 使用 forEach 遍历 planeData 数组中的每个数据点
planeData.forEach((dataPoint, i) => {
    // 计算当前点的时间，根据索引 i 和时间步长 timeStepInSeconds
    const time = Cesium.JulianDate.addSeconds(
        startJulianDate,
        i * timeStepInSeconds,
        new Cesium.JulianDate()
    );

    // 设置当前点的位置，使用经度、纬度和高度信息
    const position = Cesium.Cartesian3.fromDegrees(
        dataPoint.longitude,
        dataPoint.latitude,
        dataPoint.height
    );

    // 将当前时间点和位置信息添加到 positionProperty 中
    positionProperty.addSample(time, position);
    viewer.entities.add({
        position: position,
        point: {
          material: Cesium.Color.BLUE,
        },
      });
});

// 创建飞机实体
const planeEntity = viewer.entities.add({
     // 设置飞机实体的可用性，即飞机存在的时间段
    availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
            // 起始时间为起点儒略日时间
            start: startJulianDate,
            
            // 终止时间为终点儒略日时间
            stop: stopJulianDate,
        })
    ]),
    // 设置飞机的名称
    name: "飞机",
    // 设置飞机的位置和方向
    position: positionProperty,
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    // 设置飞机的模型属性
    model: {
        // 指定飞机模型的 URI（资源定位符）
        uri: "./20221017150727_parent_directory_战机16.gltf",

        // 设置飞机模型的最小可见大小（以像素为单位）
        minimumPixelSize: 128,

        // 设置飞机模型的最大缩放比例
        maximumScale: 20000
    },
    //轨迹线
    // path:new Cesium.PathGraphics({
    //     width:1
    // })
});

viewer.trackedEntity = planeEntity


