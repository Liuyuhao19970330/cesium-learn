//矩形的纹理材质MaterialProperty
const greenRectangle = viewer.entities.add({
  name:
    "Green translucent, rotated, and extruded rectangle at height with outline",
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(
      -110.0, // 西经度
      30.0,   // 南纬度
      -100.0, // 东经度
      40.0    // 北纬度
    ),
    material: Cesium.Color.GREEN.withAlpha(0.5), // 设置为半透明的绿色
    rotation: Cesium.Math.toRadians(45), // 旋转45度，单位是弧度
    height: 100000.0, // 高度设置为100,000米
    outline: true, // 开启轮廓线
    outlineColor: Cesium.Color.BLACK, // 轮廓线颜色设置为黑色
  },
});

// 将矩形的材质更改为棋盘格材质
greenRectangle.rectangle.material = new Cesium.CheckerboardMaterialProperty({
  evenColor: Cesium.Color.BLUE, // 棋盘格的偶数格颜色设为蓝色
  oddColor: Cesium.Color.BLACK, // 棋盘格的奇数格颜色设为黑色
  repeat: new Cesium.Cartesian2(8, 8), // 设置在每个方向上的重复次数为8
});




//折线的纹理材质
const glowingLine = viewer.entities.add({
  name: "Glowing blue line on the surface",
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
    width: 10,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.2,
      taperPower: 0.5,
      color: Cesium.Color.CORNFLOWERBLUE,
    }),
  },
});
glowingLine.polyline.material =  new Cesium.PolylineOutlineMaterialProperty({
  color: Cesium.Color.ORANGE,
  outlineWidth: 2,
  outlineColor: Cesium.Color.BLACK,
})





// 1. 在表面上绘制一个半透明的椭圆，使用棋盘格图案
var scene = viewer.scene
const instance = new Cesium.GeometryInstance({
    geometry : new Cesium.EllipseGeometry({
        center : Cesium.Cartesian3.fromDegrees(-100.0, 20.0), // 设定椭圆的中心位置，经度 -100.0，纬度 20.0
        semiMinorAxis : 500000.0, // 设置椭圆短轴的长度为 500000.0
        semiMajorAxis : 1000000.0, // 设置椭圆长轴的长度为 1000000.0
        rotation : Cesium.Math.PI_OVER_FOUR, // 将椭圆旋转 π/4 弧度（45度）
        //vertexFormat : Cesium.VertexFormat.POSITION_AND_ST // 顶点格式，包括位置和纹理坐标
        vertexFormat : Cesium.MaterialAppearance.VERTEX_FORMAT 
    }),
    id : 'object returned when this instance is picked and to get/set per-instance attributes' // 椭圆实例的标识，用于选取和设置每个实例的属性
  });
  scene.primitives.add(new Cesium.Primitive({
    geometryInstances : instance, // 指定几何实例
    appearance : new Cesium.EllipsoidSurfaceAppearance({
      material : Cesium.Material.fromType('Checkerboard') // 使用棋盘格纹理材质
    })
  }));





  // 2. 绘制不同实例，每个实例具有唯一颜色
// 创建一个矩形实例
const rectangleInstance = new Cesium.GeometryInstance({
    geometry : new Cesium.RectangleGeometry({
      rectangle : Cesium.Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0), // 设置矩形的经纬度范围
     //vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT // 顶点格式，包括颜色信息
      vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
    }),
    id : 'rectangle', // 实例标识
    // attributes : {
    //   color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5) // 设置矩形的颜色属性，RGBA颜色值，透明度为0.5
    // }
  }); 
  // 创建一个椭球实例
  const ellipsoidInstance = new Cesium.GeometryInstance({
    geometry : new Cesium.EllipsoidGeometry({
      radii : new Cesium.Cartesian3(500000.0, 500000.0, 1000000.0), // 设置椭球的半径
      vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT, // 顶点格式，包括位置和法线信息
    }),
    modelMatrix : Cesium.Matrix4.multiplyByTranslation(
      Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)),
      new Cesium.Cartesian3(0.0, 0.0, 500000.0),
      new Cesium.Matrix4()
    ), // 设置椭球的模型矩阵，包括平移和坐标系转换
    id : 'ellipsoid', // 实例标识
    // attributes : {
    //   color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA) // 设置椭球的颜色属性，使用Cesium内置颜色AQUA
    // }
  }); 
  // 向场景添加一个 Primitive 对象，包含矩形和椭球实例
const primitive = (new Cesium.Primitive({
    geometryInstances : [rectangleInstance, ellipsoidInstance], // 指定几何实例数组
    //appearance : new Cesium.PerInstanceColorAppearance() // 使用每个实例的颜色进行渲染
    appearance : new Cesium.EllipsoidSurfaceAppearance({
      material : new Cesium.Material.fromType('Image',{
        // color: Cesium.Color.RED, // RGBA color for the whole material
        // cellAlpha: 0.2, // Alpha value for the cells between grid lines (combined with color.alpha)
        // lineCount: new Cesium.Cartesian2(4,4), // Number of columns and rows in the grid
        // lineThickness: new Cesium.Cartesian2(4.0,4.0), // Thickness of grid lines in pixels (if available
        image: './public/image/RC.jpg',
        repeat: new Cesium.Cartesian2(1.0,1.0)
      }),
      
    })  //基类appearance
  }));
  scene.primitives.add(primitive)


  //appearance设置,每种几何体都有它的特定外观
  // 创建一个与地球椭球体平行的外观
// let appearance = new Cesium.EllipsoidSurfaceAppearance({
//   material: material // 假设"material"是预先定义的材质变量
// });


//修改primitive材质 Material






// 动态修改图元颜色
// 使用 setTimeout 在延迟时间后执行代码
// setInterval(() => {
//   // 获取图元的几何实例属性
//   let attributes = primitive.getGeometryInstanceAttributes("rectangle");
//   // 修改几何实例的颜色属性为黄色，并设置透明度为0.5
//   attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.fromRandom({
//     alpha:0.5
//   }));
// }, 2000);







//entity和primitive交互,点击得到信息,ray
//创建一个屏幕空间事件处理程序，用于处理鼠标交互
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// 添加鼠标移动事件处理函数
handler.setInputAction((movement) => {
    // 打印鼠标移动的信息对象
    console.log(movement);
    // 使用场景的 pick 方法获取鼠标位置处的对象
    var pickedObject = viewer.scene.pick(movement.position);
    console.log(pickedObject);
    // 检查是否拾取到了对象
    if (Cesium.defined(pickedObject)&&typeof(pickedObject.id)=="string") {
        // 打印拾取到的对象的ID
        console.log(pickedObject.id);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK); // 使用 MOUSE_MOVE 替换原来的 LEFT_CLICK ，以适应移动事件







  

