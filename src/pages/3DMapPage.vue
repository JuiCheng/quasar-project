<template>
  <div id="viewDiv"></div>
  <!-- 顯示地圖的容器 -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue'; // 從 Vue 引入 onMounted 函數
import WebScene from '@arcgis/core/WebScene'; // 引入 WebScene 類別
import SceneView from '@arcgis/core/views/SceneView'; // 引入 SceneView 類別
import IntegratedMesh3DTilesLayer from '@arcgis/core/layers/IntegratedMesh3DTilesLayer'; // 引入 3D 磁磚圖層類別
import Expand from '@arcgis/core/widgets/Expand'; // 引入 Expand 小工具，用於擴展內容
import LayerList from '@arcgis/core/widgets/LayerList'; // 引入 LayerList 小工具，顯示圖層列表
import Legend from '@arcgis/core/widgets/Legend'; // 引入 Legend 小工具，用於顯示圖例
// import SpatialReference from '@arcgis/core/geometry/SpatialReference'; // 可選，可能用於處理空間參考

onMounted(() => {
  // 當組件掛載後執行以下代碼
  /*************************************
   * 加載顯示建築能耗評級的 WebScene
   *************************************/
  const webscene = new WebScene({
    // 創建新的 WebScene 實例
    portalItem: {
      id: '5b177c2579bf45159bb91e2a13b4218b', // 使用指定的 Portal Item ID 加載場景
    },
  });

  /*************************************
   * 創建 IntegratedMesh3DTilesLayer 層
   * 並將其添加到 WebScene
   *************************************/
  const layer = new IntegratedMesh3DTilesLayer({
    // 創建 3D 磁磚圖層實例
    url: 'https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Utrecht_3D_Tiles_Integrated_Mesh/3DTilesServer/tileset.json', // 磁磚數據的 URL
    title: 'Utrecht Integrated Mesh 3D Tiles', // 圖層的標題
  });

  webscene.add(layer); // 將圖層添加到 WebScene 中

  /*************************************
   * 創建 SceneView 並將可擴展的
   * LayerList 和 Legend 小工具添加到 UI
   *************************************/
  const view = new SceneView({
    // 創建新的 SceneView 實例
    container: 'viewDiv', // 將視圖綁定到指定的容器
    map: webscene, // 將 WebScene 設定為場景地圖
  });

  const expandLegend = new Expand({
    // 創建圖例擴展小工具
    content: new Legend({
      // 設定擴展內容為圖例
      view: view, // 將圖例的視圖設置為 SceneView
    }),
    expanded: true, // 預設為展開狀態
    expandTooltip: 'Expand Legend', // 懸停提示
    group: 'top-right', // 設定位置為右上角
    view: view, // 參考視圖
  });

  const expandLayerList = new Expand({
    // 創建圖層列表擴展小工具
    content: new LayerList({
      // 設定擴展內容為圖層列表
      view: view, // 將圖層列表的視圖設置為 SceneView
    }),
    expandTooltip: 'Expand Layer List', // 懸停提示
    group: 'top-right', // 設定位置為右上角
    view: view, // 參考視圖
  });

  view.ui.add([expandLegend, expandLayerList], 'top-right'); // 將擴展小工具添加到視圖的右上角
});
</script>
