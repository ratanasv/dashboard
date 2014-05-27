angular.module('templates-app', ['areaChart/areaChart.html', 'dashboard/cubeboard/cubeboard.html', 'dashboard/dashboard.html', 'main/main.html', 'multiLineChart/multiLineChart.html', 'scatterPlotMatrix/scatterPlotMatrix.html']);

angular.module("areaChart/areaChart.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("areaChart/areaChart.html",
    "<div>\n" +
    "	<slider-with-label slider-id='heightSlider'></slider-with-label>\n" +
    "	<slider-with-label slider-id='widthSlider'></slider-with-label>\n" +
    "</div>\n" +
    "<svg id='chart' ng-attr-width='{{widthSlider.value}}' ng-attr-height='{{heightSlider.value}}'>\n" +
    "	<path class='area' ng-attr-d='{{areaPath(widthSlider.value, heightSlider.value)}}'></path>\n" +
    "</svg>");
}]);

angular.module("dashboard/cubeboard/cubeboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/cubeboard/cubeboard.html",
    "<p>\n" +
    "CubeBoard\n" +
    "</p>\n" +
    "<div id='cubeboard'>\n" +
    "\n" +
    "</div>");
}]);

angular.module("dashboard/dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.html",
    "<slider-with-label slider-id='heightSlider'></slider-with-label>\n" +
    "<slider-with-label slider-id='widthSlider'></slider-with-label>\n" +
    "<slider-with-label slider-id='sizeSlider'></slider-with-label>\n" +
    "<br>\n" +
    "<div ng-style='getBigStyle()'>\n" +
    "<div ng-repeat='metric in getMetrics(widthSlider.value, heightSlider.value)' ng-style='metric.style'>\n" +
    "	{{metric.fullyQualifiedName}}\n" +
    "</div>\n" +
    "</div>\n" +
    "<div style='position: relative' ui-view='cubeboard'></div>");
}]);

angular.module("main/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("main/main.html",
    "<div>\n" +
    "Navigate Above.\n" +
    "</div>\n" +
    "<svg id='chart'></svg>");
}]);

angular.module("multiLineChart/multiLineChart.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("multiLineChart/multiLineChart.html",
    "<div>\n" +
    "	<slider-with-label slider-id='heightSlider'></slider-with-label>\n" +
    "	<slider-with-label slider-id='widthSlider'></slider-with-label>\n" +
    "	<slider-with-label slider-id='numLinesSlider'></slider-with-label>\n" +
    "</div>\n" +
    "<svg ng-attr-width='{{widthSlider.value}}' ng-attr-height='{{heightSlider.value}}'>\n" +
    "	<path ng-repeat='line in getNLines(numLinesSlider.value)' class='line' \n" +
    "		ng-attr-d='{{linePath(line.data(), widthSlider.value, heightSlider.value)}}' \n" +
    "		ng-style='line.style'>\n" +
    "	</path>\n" +
    "</svg>\n" +
    "\n" +
    "<p ng-repeat='perlin in perlins'>\n" +
    "X: <input type='number' ng-model='perlin.x' required>\n" +
    "Y: <input type='number' ng-model='perlin.y' required>\n" +
    "Slope: <input type='number' ng-model='perlin.slope' required>\n" +
    "</p>");
}]);

angular.module("scatterPlotMatrix/scatterPlotMatrix.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scatterPlotMatrix/scatterPlotMatrix.html",
    "<div>\n" +
    "	<slider-with-label slider-id='heightSlider'></slider-with-label>\n" +
    "	<slider-with-label slider-id='widthSlider'></slider-with-label>\n" +
    "	<slider-with-label slider-id='dataDimension'></slider-with-label>\n" +
    "</div>\n" +
    "<svg>\n" +
    "	<g ng-repeat='translate in translates' ng-attr-transform='{{computeTranslate(translate.i, translate.j)}}'>\n" +
    "		<circle ng-repeat='circle in circles' r='3' ng-attr-cx='{{computePositionX(translate.i, translate.j, circle.id)}}' ng-attr-cy='{{computePositionY(translate.i, translate.j, circle.id)}}' ng-style='computeStyle(translate.i, translate.j)'>\n" +
    "	</g>\n" +
    "</svg>");
}]);
