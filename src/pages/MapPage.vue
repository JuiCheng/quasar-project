<template>
  <div id="viewDiv"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
const spatialReference = new SpatialReference({
  wkid: 102100, // 例如 WGS 84
});
onMounted(() => {
  const map = new Map({
    basemap: 'topo-vector',
  });

  new MapView({
    container: 'viewDiv', // reference the div id
    map: map,
    //zoom: 4,
    //center: [15, 65],
    extent: {
      // autocasts as new Extent()
      xmin: -9177811,
      ymin: 4247000,
      xmax: -9176791,
      ymax: 4247784,
      spatialReference: spatialReference,
    },
  });
  // Carbon storage of trees in Warren Wilson College.
  const featureLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0',
  });

  map.add(featureLayer);
});
</script>
