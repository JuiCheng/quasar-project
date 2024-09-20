<template>
  <!-- 定義一個div元素來容納地圖視圖 -->
  <div id="viewDiv"></div>
</template>

<script setup lang="ts">
// 從Vue中導入onMounted鉤子函數，用於在組件掛載後執行代碼
import { onMounted } from 'vue';

// 從ArcGIS API導入必要的類
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';

// 創建一個空間參考對象，使用WKID 102100（Web墨卡托投影）
const spatialReference = new SpatialReference({
  wkid: 102100, // Web墨卡托投影的WKID
});

// 當組件掛載完成後執行的函數
onMounted(() => {
  // 創建一個新的Map實例，使用'topo-vector'作為底圖
  const map = new Map({
    basemap: 'topo-vector',
  });

  // 創建一個新的MapView實例
  new MapView({
    container: 'viewDiv', // 指定地圖容器的HTML元素id
    map: map, // 設置要顯示的地圖
    // zoom: 4, // 縮放級別（已註釋掉）
    // center: [15, 65], // 中心點坐標（已註釋掉）
    extent: {
      // 設置地圖的顯示範圍
      xmin: -9177811,
      ymin: 4247000,
      xmax: -9176791,
      ymax: 4247784,
      spatialReference: spatialReference, // 使用前面定義的空間參考
    },
  });

  // 創建一個新的FeatureLayer實例，顯示Warren Wilson College的樹木碳儲存數據
  const featureLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0',
  });

  // 將FeatureLayer添加到地圖中
  map.add(featureLayer);
});
</script>
