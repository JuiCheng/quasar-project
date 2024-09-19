<template>
  <div id="viewDiv"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import WebScene from '@arcgis/core/WebScene';
import SceneView from '@arcgis/core/views/SceneView';
import IntegratedMesh3DTilesLayer from '@arcgis/core/layers/IntegratedMesh3DTilesLayer';
import Expand from '@arcgis/core/widgets/Expand';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
// import SpatialReference from '@arcgis/core/geometry/SpatialReference';

onMounted(() => {
  /*************************************
   * Load webscene with layer showing
   * building energy ratings
   *************************************/
  const webscene = new WebScene({
    portalItem: {
      id: '5b177c2579bf45159bb91e2a13b4218b',
    },
  });

  /*************************************
   * Create IntegratedMesh3DTilesLayer layer
   * and add it to the webscene
   ***********************************/
  const layer = new IntegratedMesh3DTilesLayer({
    url: 'https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Utrecht_3D_Tiles_Integrated_Mesh/3DTilesServer/tileset.json',
    title: 'Utrecht Integrated Mesh 3D Tiles',
  });

  webscene.add(layer);

  /*************************************
   * Create the View and add expandable
   * LayerList and Legend widgets to the UI
   ***********************************/
  const view = new SceneView({
    container: 'viewDiv',
    map: webscene,
  });

  const expandLegend = new Expand({
    content: new Legend({
      view: view,
    }),
    expanded: true,
    expandTooltip: 'Expand Legend',
    group: 'top-right',
    view: view,
  });

  const expandLayerList = new Expand({
    content: new LayerList({
      view: view,
    }),
    expandTooltip: 'Expand Layer List',
    group: 'top-right',
    view: view,
  });

  view.ui.add([expandLegend, expandLayerList], 'top-right');
});
</script>
