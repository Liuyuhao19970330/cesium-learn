3D Tiles 是一种用于存储、传输和渲染大规模三维地理空间数据的规范。在 3D Tiles 中，tileset.json 文件描述了整个数据集的结构和元信息。以下是 tileset.json 文件中一些常见参数的解释：

asset: 描述整个 tileset 的基本信息，如版本、生成工具等。

json
"asset": {
    "version": "1.0",
    "tilesetVersion": "1.0.0-alpha",
    "gltfUpAxis": "Y"
}
version: 3D Tiles 规范的版本。
tilesetVersion: tileset 的版本。
gltfUpAxis: glTF 模型中的上轴方向，通常为 "Y"。
geometricError: 描述每个瓦片的几何误差，即在显示过程中该瓦片的几何细节级别。

json
"geometricError": 70.0
geometricError: 瓦片的几何误差，用于控制瓦片的加载和显示级别。
root: 描述 tileset 中根级别的瓦片的属性。

json
"root": {
    "boundingVolume": {...},
    "geometricError": 500.0,
    "refine": "REPLACE",
    "content": {...}
}
boundingVolume: 根级别瓦片的边界体积。
geometricError: 根级别瓦片的几何误差。
refine: 控制子瓦片的细化策略，可以是 "REPLACE"、"ADD" 或 "REPLACE_DUPLICATE"。
content: 描述实际几何和属性数据的文件路径等信息。
refine: 描述瓦片的细化策略，与根级别的 refine 类似。

json
"refine": "ADD"
refine: 控制子瓦片的细化策略，可以是 "REPLACE"、"ADD" 或 "REPLACE_DUPLICATE"。
content: 描述实际几何和属性数据的信息。

json
"content": {
    "uri": "tile.b3dm"
}
uri: 包含实际几何和属性数据的文件路径。
这只是 tileset.json 文件中的一些基本参数。具体的参数和结构可能会根据数据集的内容和实际需求而有所不同。详细的规范和参数说明可以参考 3D Tiles 的官方文档：3D Tiles Specification。

viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);瓦片调节,性能监控面板