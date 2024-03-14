// 创建一个新的 Cesium 材质
var scene = viewer.scene
let material = new Cesium.Material({
    // 定义材质外观为颜色类型
    fabric: {
      type: "Color",
      
      // 设置颜色类型的材质参数
      uniforms: {
        // 使用 Cesium.Color 创建一个颜色对象，表示白色，透明度为0.5
        color: new Cesium.Color(1.0, 1.0, 1.0, 0.5)
      }
    }
  });
  material = new Cesium.Material({
    // 定义材质外观为颜色类型
    fabric: {
      type: "Image",
      
      // 设置颜色类型的材质参数
      uniforms: {
        // 使用 Cesium.Color 创建一个颜色对象，表示白色，透明度为0.5
        image: './public/image/RC.jpg'
        
      }
    }
  });

 // 编写着色器
// https://cesium.com/downloads/cesiumjs/releases/b28/Documentation/
// 创建一个新的 Cesium 材质
material = new Cesium.Material({
    // 定义材质外观为颜色类型
    fabric: {
      // uniforms 对象用于存储材质的 uniform 变量，这里为空对象，表示没有 uniform 变量
      uniforms: {},
  
      // source 字符串包含 GLSL 代码，用于定义材质的外观
      source: `
        // GLSL 函数定义，用于获取材质
        czm_material czm_getMaterial(czm_materialInput materialInput) {
          // 在函数中调用 czm_getDefaultMaterial 函数获取默认材质
          czm_material material = czm_getDefaultMaterial(materialInput);
          material.diffuse = vec3(materialInput.st,0.5);
          // 返回获取到的材质
          return material;
        }
      `
    }
  });

  //条纹
//   material = new Cesium.Material({
//     // 定义材质外观为颜色类型
//     fabric: {
//       // uniforms 对象用于存储材质的 uniform 变量，这里为空对象，表示没有 uniform 变量
//       uniforms: {
//         uTime:0
//       },
  
//       // source 字符串包含 GLSL 代码，用于定义材质的外观
//       source: `
//         // GLSL 函数定义，用于获取材质
//         czm_material czm_getMaterial(czm_materialInput materialInput) {
//             // 创建一个新的 czm_material 对象，使用默认材质作为基础
//             czm_material material = czm_getDefaultMaterial(materialInput);
        
//             // 计算一个强度值，该值是输入纹理坐标的 s 分量乘以 10 的余数
//             float strength = mod(materialInput.s * 10.0+uTime*5.0, 1.0);
        
//             // 将材质的漫反射颜色设置为一个向量，包含强度值和两个零分量
//             material.diffuse = vec3(strength, strength, strength);
        
//             // 返回最终的材质
//             return material;
//         }
//       `
//     }
//   });
  
  // 修正后的代码：

// 使用 gsap.to 方法对 material1.uniforms 进行动画操作
// gsap.to(material.uniforms, {
//     // 动画属性：uTime
//     uTime: 1,
  
//     // 动画持续时间：2 秒
//     duration: 10,
  
//     // 动画重复次数：-1 表示无限重复
//     repeat: -1
//   });
  




//自己写顶点片元着色器,不用写材质,直接写appearance




  const rectangleInstance = new Cesium.GeometryInstance({
    geometry : new Cesium.RectangleGeometry({
      rectangle : Cesium.Rectangle.fromDegrees(-120.0, 30.0, -80.0, 40.0), // 设置矩形的经纬度范围
     //vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT // 顶点格式，包括颜色信息
      vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
    }),
    id : 'rectangle', // 实例标识
    // attributes : {
    //   color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5) // 设置矩形的颜色属性，RGBA颜色值，透明度为0.5
    // }
  }); 

  const primitive = (new Cesium.Primitive({
    geometryInstances : rectangleInstance, // 指定几何实例数组
    //appearance : new Cesium.PerInstanceColorAppearance() // 使用每个实例的颜色进行渲染
    appearance : new Cesium.EllipsoidSurfaceAppearance({
      material : material,
      
    })  //基类appearance
  }));
  console.log(primitive.appearance)

  scene.primitives.add(primitive)

  const rectangleInstance1 = new Cesium.GeometryInstance({
    geometry : new Cesium.RectangleGeometry({
      rectangle : Cesium.Rectangle.fromDegrees(-180.0, 30.0, -140.0, 40.0), // 设置矩形的经纬度范围
     //vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT // 顶点格式，包括颜色信息
      vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
    }),
    id : 'rectangle1', // 实例标识
    // attributes : {
    //   color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5) // 设置矩形的颜色属性，RGBA颜色值，透明度为0.5
    // }
  }); 

  let appearance = new Cesium.EllipsoidSurfaceAppearance({

    // material: material1, // 你需要为 material1 提供正确的材质
    // aboveGround: false, // 是否显示在地面之上，根据需要设置
    // translucent: true // 是否透明，根据需要设置
    fragmentShaderSource: `
    // 输入变量：顶点在模型坐标系中的位置
    in vec3 v_positionMC;
    
    // 输入变量：顶点在眼睛坐标系中的位置
    in vec3 v_positionEC;
    
    // 输入变量：顶点的纹理坐标
    in vec2 v_st;
    
    // uniform变量：时间
    uniform float uTime;
    
    // 主函数
    void main() 
    {
        // 在这里添加你的着色器逻辑，根据需要使用传入的变量进行计算
        
        // Cesium特定结构体，可能包含与材质相关的输入
        czm_materialInput materialInput;
        
        // 设置片元的颜色，使用纹理坐标和时间
        out_FragColor = vec4(v_st + uTime, 1.0, 1.0);         
    }
`
});

// uniform变量的值进行更新,在着色器中声明,在外面更新
appearance.uniforms = {
    uTime: 0
};



gsap.to(appearance.uniforms, {
    // 动画属性：uTime
    uTime: 1,
  
    // 动画持续时间：2 秒
    duration: 2,
  
    // 动画重复次数：-1 表示无限重复
    repeat: -1,
    yoyo:true,
    ease:"linear"
  });

  const primitive1 = (new Cesium.Primitive({
    geometryInstances : rectangleInstance1, // 指定几何实例数组
    //appearance : new Cesium.PerInstanceColorAppearance() // 使用每个实例的颜色进行渲染
    // appearance : new Cesium.EllipsoidSurfaceAppearance({
    //   material : material,
      
    // })  //基类appearance
    appearance: appearance
  }));


  scene.primitives.add(primitive1)


//矩形的纹理材质MaterialProperty
// const greenRectangle = viewer.entities.add({
//     name:
//       "Green translucent, rotated, and extruded rectangle at height with outline",
//     rectangle: {
//       coordinates: Cesium.Rectangle.fromDegrees(
//         -110.0, // 西经度
//         30.0,   // 南纬度
//         -100.0, // 东经度
//         40.0    // 北纬度
//       ),
//       material: Cesium.Color.GREEN.withAlpha(0.5), // 设置为半透明的绿色
//       rotation: Cesium.Math.toRadians(45), // 旋转45度，单位是弧度
//       height: 100000.0, // 高度设置为100,000米
//       outline: true, // 开启轮廓线
//       outlineColor: Cesium.Color.BLACK, // 轮廓线颜色设置为黑色
//     },
//   });
//   class CustomMaterialProperty {
//     // 构造函数 
//     constructor() {
//         // 定义改变事件
//         this.definitionChanged = new Cesium.Event();
//         // 将自定义材质添加到材质缓存中
//         Cesium.Material.materialCache.addMaterial("CustomMaterial", {
//             fabric: {
//                 type: "CustomMaterial",
//                 uniforms: {
//                     // 在这里添加自定义材质的uniform变量
//                 }
//             },
//             source: `
//                 czm_material czm_getMaterial(czm_materialInput materialInput)
//                 {
//                     // 生成默认的基础材质
//                     czm_material material = czm_getDefaultMaterial(materialInput);
//                     // 设置漫反射颜色
//                     material.diffuse = vec3(materialInput.st, 1.0);
//                     return material;
//                 }
//             `
//         });
//     }
//     // 获取材质类型
//     getType() {
//         return "CustomMaterial";
//     }
//     // 定义一个函数 getValue，接受两个参数：time 和 result
//    getValue(time, result) {
//   // 使用 performance.now() 获取当前时间戳，除以 1000 转换为秒
//   let t = performance.now() / 1000;
//   // 打印当前时间戳
//   console.log(t);
//   // 打印 result 和 time，根据需要进行其他操作
//   console.log(result, time);
//   // 返回 t，如果有其他需要返回的值，可以根据需求进行修改
//   return t;
// }
// // 调用函数 getValue，并传入适当的参数
// // 这里只是一个示例，你可能需要根据实际情况传入不同的值
// }


const greenRectangle = viewer.entities.add({
    name:
      "Green translucent, rotated, and extruded rectangle at height with outline",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
        -110.0, // 西经度
        60.0,   // 南纬度
        -100.0, // 东经度
        70.0    // 北纬度
      ),
      material: Cesium.Color.GREEN.tieba
      
      , // 设置为半透明的绿色
      rotation: Cesium.Math.toRadians(45), // 旋转45度，单位是弧度
      height: 100000.0, // 高度设置为100,000米
      outline: true, // 开启轮廓线
      outlineColor: Cesium.Color.BLACK // 轮廓线颜色设置为黑色
    }
});
class CustomMaterialProperty {
  constructor() {
      this._color = new Cesium.Color(1.0, 0.0, 0.0, 1.0); // 初始颜色
      this.definitionChanged = new Cesium.Event();

      Cesium.Material._materialCache.addMaterial("CustomMaterial", {
          fabric: {
              type: "CustomMaterial",
              uniforms: {
                  color: this._color
              }
          },
          source: `
              czm_material czm_getMaterial(czm_materialInput materialInput)
              {
                  czm_material material = czm_getDefaultMaterial(materialInput);
                  material.diffuse = color.rgb; // 使用 color uniform
                  return material;
              }
          `
      });
  }

  getType(time) {
      return "CustomMaterial";
  }

  getValue(time, result) {
      if (!Cesium.defined(result)) {
          result = {};
      }

      // 根据时间更新颜色
      result.color = this._color.withAlpha((Math.sin(time / 1000) + 1.0) / 2.0); // 示例：根据时间动态改变透明度
      return result;
  }

  equals(other) {
      return this === other || (other instanceof CustomMaterialProperty && Cesium.Property.equals(this._color, other._color));
  }
}


// 创建自定义材质属性实例
greenRectangle.rectangle.material = new CustomMaterialProperty();
