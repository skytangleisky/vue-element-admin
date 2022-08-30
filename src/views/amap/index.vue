<template>
  <div class="mapContainer">
    <!-- <el-amap
      style="position:relative;width:100%;height:100%"
      class="amap-demo"
      tabindex="0"
      vid="amap"
      view-mode="3D"
      is-hotspot="true"
      :resize-enable="true"
      :pitch="66"
    /> -->
    <div id="amap" style="width:100%;height:100%;position:relative;" />
    <div id="layerNum">层级</div>
    <div id="panel" class="scrollbar1">
      <div style="height:calc(100% - 6px);overflow:auto;margin:3px;">
        <ul id="area-tree" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AMap',
  data() {
    return {
      map: null,
      polygon: {},
      districtExplorer: null,
      currentAreaNode: null, // 当前聚焦的区域
      lngLatList: null, // 要聚合的点列表
      groupedPointsCache: {}, // 缓存数据
      pointSimplifierIns: null, // 这里创建一个海量点组件
      tipMarker: null,
      tipMarkerContent: null,
      colors: null
    }
  },
  mounted() {
    const that = this
    that.map = new AMap.Map('amap', {
      layers: [
        // new AMap.TileLayer.Satellite(),
        // new AMap.TileLayer.RoadNet({
        //   zIndex: 10
        // }),
        // new AMap.TileLayer({
        //   zIndex: 12,
        //   opacity: 1,
        //   getTileUrl: 'https://t{1,2,3,4}.tianditu.gov.cn/DataServer?T=ter_w&x=[x]&y=[y]&l=[z]'
        // }),
        // new AMap.TileLayer({
        //   zIndex: 12,
        //   opacity: 1,
        //   zoom: [4, 18],
        //   getTileUrl: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=[x]&y=[y]&z=[z]'
        // }),
        // new AMap.TileLayer({
        //   zIndex: 12,
        //   opacity: 1,
        //   zoom: [3, 18],
        //   getTileUrl: 'https://webst02.is.autonavi.com/appmaptile?style=6&x=[x]&y=[y]&z=[z]'
        // }),
        new AMap.TileLayer({
          zIndex: 12,
          opacity: 1,
          zoom: [4, 15],
          // getTileUrl: 'http://tanglei.top:9091/googlemap/[z]/[x]/[y].jpg'
          getTileUrl: 'http://127.0.0.1:8000/[z]/[y]/[x]'
        })
      ],
      // viewMode: '3D',
      zoom: 4
    })
    $('#layerNum').text(that.map.getZoom())
    that.map.on('zoomchange', function(e) {
      $('#layerNum').text(that.map.getZoom())
    })
    // just some colors
    that.colors = [
      '#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00',
      '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707',
      '#651067', '#329262', '#5574a6', '#3b3eac'
    ]
    AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$', 'ui/misc/PointSimplifier'], function(DistrictExplorer, $, PointSimplifier) {
      // 创建一个实例
      that.districtExplorer = new DistrictExplorer({
        map: that.map,
        eventSupport: true, // 打开事件支持
        preload: [100000] // 预加载全国
      })
      // 鼠标hover提示内容
      that.tipMarkerContent = $('<div class="tipMarker top"></div>')
      that.tipMarker = new AMap.Marker({
        content: that.tipMarkerContent.get(0),
        offset: new AMap.Pixel(0, 0),
        bubble: true
      })
      // 监听feature的hover事件
      that.districtExplorer.on('featureMouseout featureMouseover', function(e, feature) {
        that.toggleHoverFeature(feature, e.type === 'featureMouseover',
          e.originalEvent ? e.originalEvent.lnglat : null)
      })
      // 监听鼠标在feature上滑动
      that.districtExplorer.on('featureMousemove', function(e, feature) {
        // 更新提示位置
        that.tipMarker.setPosition(e.originalEvent.lnglat)
      })
      // feature被点击
      that.districtExplorer.on('featureClick', function(e, feature) {
        var props = feature.properties
        // 如果存在子节点
        if (props.childrenNum > 0) {
          // 切换聚焦区域
          that.switch2AreaNode(props.adcode)
        }
      })
      // 外部区域被点击
      that.districtExplorer.on('outsideClick', function(e) {
        that.districtExplorer.locatePosition(e.originalEvent.lnglat, function(error, routeFeatures) {
          console.error(error)
          if (routeFeatures && routeFeatures.length > 1) {
            // 切换到省级区域
            that.switch2AreaNode(routeFeatures[1].properties.adcode)
          } else {
            // 切换到全国
            that.switch2AreaNode(100000)
          }
        }, {
          levelLimit: 2
        })
      })
      var questionContent = PointSimplifier.Render.Canvas.getImageContent(
        'http://webapi.amap.com/ui/1.1/ui/geo/DistrictExplorer/examples/imgs/question.png',
        function onload() {
          that.pointSimplifierIns.renderLater()
        },
        function onerror() {
          alert('图片加载失败！')
        })
      that.pointSimplifierIns = new PointSimplifier({
        zIndex: 115,
        autoSetFitView: false,
        map: that.map, // 所属的地图实例
        getPosition: function(item) {
          return item.pos
        },
        getHoverTitle: function(item, idx) {
          if (item.gid === -1) {
            return '区域外'
          }
        },
        // 使用GroupStyleRender
        renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
        renderOptions: {
          // 点的样式
          pointStyle: {
            fillStyle: 'red',
            width: 5,
            height: 5
          },
          getGroupId: function(item) {
            return item.gid
          },
          groupStyleOptions: function(gid) {
            // 未知区域
            if (gid === -1) {
              return {
                pointStyle: {
                  content: questionContent,
                  fillStyle: null,
                  strokeStyle: null,
                  lineWidth: 2,
                  width: 16,
                  height: 16
                }
              }
            }
            return {
              pointStyle: {
                fillStyle: that.colors[gid % that.colors.length],
                // strokeStyle: 'rgba(255,255,255,0.3)',
                lineWidth: 1
              }
            }
          }
        }
      })
      $('#area-tree').on('mouseenter mouseleave', 'h2[data-adcode]', function(e) {
        if (e.type === 'mouseleave') {
          that.districtExplorer.setHoverFeature(null)
          return
        }
        var adcode = $(this).attr('data-adcode')
        that.districtExplorer.setHoverFeature(that.currentAreaNode.getSubFeatureByAdcode(adcode))
      })
      $('#area-tree').on('click', 'h2[data-children-num]', function() {
        var adcode = $(this).attr('data-adcode')
        that.switch2AreaNode(adcode)
      })
      $('#area-tree').on('click', '.showHideBtn', function() {
        var $li = $(this).closest('li')
        $li.toggleClass('hide-sub')
        if (!$li.hasClass('hide-sub')) {
          // 子节点列表被展开
          var $subList = $li.children('ul.sublist')
          // 尚未加载
          if (!$subList.attr('data-loaded')) {
            $subList.attr('data-loaded', 'loading')
            $li.addClass('loading')
            // 加载
            that.loadAreaNode($li.children('h2').attr('data-adcode'), function() {
              $li.removeClass('loading')
            })
          }
        }
      })
      // $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body)
      // $.get('https://a.amap.com/amap-ui/static/data/10w.txt',
      //   function(csv) {
      //     $('#loadingTip').remove()
      //     var lines = csv.split('\n')
      //     var lngLats = []
      //     for (var i = 0, len = lines.length; i < len; i++) {
      //       if (!lines[i]) {
      //         continue
      //       }
      //       var parts = lines[i].split(',')
      //       lngLats.push([parseFloat(parts[0]), parseFloat(parts[1])])
      //     }
      //     that.lngLatList = lngLats
      //     that.groupedPointsCache['100000'] = lngLats
      //     // 加载全国
      //     that.switch2AreaNode(100000)
      //   }
      // );
    })
  },
  beforeDestroy() {
    const that = this
    that.polygon.off('click', that.polygonClick)
  },
  methods: {
    renderAreaPanelNode(ele, props, color) { // 绘制区域面板的节点
      const that = this
      var $box = $('<li/>').addClass('lv_' + props.level)
      var points = that.groupedPointsCache[props.adcode] || []
      var $h2 = $('<h2/>').addClass('lv_' + props.level).attr({
        'data-adcode': props.adcode,
        'data-level': props.level,
        'data-children-num': props.childrenNum || void (0),
        'data-center': props.center.join(',')
      }).html(props.name + '(' + points.length + ')').appendTo($box)
      if (color) {
        $h2.css('borderColor', color)
      }
      // 如果存在子节点
      if (props.childrenNum > 0) {
        // 显示隐藏
        $('<div class="showHideBtn"></div>').appendTo($box)
        // 子区域列表
        $('<ul/>').addClass('sublist lv_' + props.level).appendTo($box)
        $('<div class="clear"></div>').appendTo($box)
        if (props.level !== 'country') {
          $box.addClass('hide-sub')
        }
      }
      $box.appendTo(ele)
    },
    renderAreaPanel(areaNode) { // 填充某个节点的子区域列表
      const that = this
      var props = areaNode.getProps()
      var $subBox = $('#area-tree').find('h2[data-adcode="' + props.adcode + '"]').siblings('ul.sublist')
      if (!$subBox.length) {
        // 父节点不存在，先创建
        that.renderAreaPanelNode($('#area-tree'), props)
        $subBox = $('#area-tree').find('ul.sublist')
      }
      if ($subBox.attr('data-loaded') === 'rendered') {
        return
      }
      $subBox.attr('data-loaded', 'rendered')
      var subFeatures = areaNode.getSubFeatures()
      subFeatures.sort(function(f1, f2) {
        var props1 = areaNode.getPropsOfFeature(f1)
        var props2 = areaNode.getPropsOfFeature(f2)
        var points1 = that.groupedPointsCache[props1.adcode] || []
        var points2 = that.groupedPointsCache[props2.adcode] || []
        return points2.length - points1.length
      })
      // 填充子区域
      for (var i = 0, len = subFeatures.length; i < len; i++) {
        that.renderAreaPanelNode($subBox, areaNode.getPropsOfFeature(subFeatures[i]), that.colors[i % that.colors.length])
      }
      return $subBox
    },
    toggleHoverFeature(feature, isHover, position) { // 根据Hover状态设置相关样式
      const that = this
      that.tipMarker.setMap(isHover ? that.map : null)
      if (!feature) {
        return
      }
      var props = feature.properties
      if (isHover) {
        var points = that.groupedPointsCache[props.adcode] || []
        // 更新提示内容
        that.tipMarkerContent.html(props.adcode + ': ' + props.name + '(' + points.length + ')')
        // 更新位置
        that.tipMarker.setPosition(position || props.center)
      }
      $('#area-tree').find('h2[data-adcode="' + props.adcode + '"]').toggleClass('hover', isHover)
      // 更新相关多边形的样式
      var polys = that.districtExplorer.findFeaturePolygonsByAdcode(props.adcode)
      for (var i = 0, len = polys.length; i < len; i++) {
        polys[i].setOptions({
          fillOpacity: isHover ? 0.5 : 0.2
        })
      }
    },
    renderAreaPolygons(areaNode) { // 绘制某个区域的边界
      const that = this
      // 更新地图视野
      that.map.setBounds(areaNode.getBounds(), null, null, true)
      // 清除已有的绘制内容
      that.districtExplorer.clearFeaturePolygons()
      that.map.remove(that.polygon)
      // 绘制子区域
      that.districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
        var fillColor = that.colors[i % that.colors.length]
        var strokeColor = that.colors[that.colors.length - 1 - i % that.colors.length]
        return {
          cursor: 'default',
          bubble: true,
          strokeColor: strokeColor, // 线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 1, // 线宽
          fillColor: fillColor, // 填充色
          fillOpacity: 0.35 // 填充透明度
        }
      })
      // 绘制父区域
      that.districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        strokeColor: 'cyan', // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 1, // 线宽
        fillColor: null, // 填充色
        fillOpacity: 0.35 // 填充透明度
      })
      // 外多边形坐标数组和内多边形坐标数组
      var outer = [
        new AMap.LngLat(-360, 90, true),
        new AMap.LngLat(-360, -90, true),
        new AMap.LngLat(360, -90, true),
        new AMap.LngLat(360, 90, true)
      ]
      var coordinates = areaNode._data.geoData.lngLatParent.geometry.coordinates
      var pathArray = [
        outer
      ]
      for (let i = 0; i < coordinates.length; i++) {
        const holes = coordinates[i]
        pathArray.push.apply(pathArray, holes)
      }
      that.polygon = new AMap.Polygon({
        pathL: pathArray,
        strokeColor: 'cyan',
        strokeWeight: 1,
        // fillColor: '#71B3ff',
        fillColor: '#000',
        fillOpacity: 0.5
      })
      that.polygon.setPath(pathArray)
      that.polygon.on('click', that.polygonClick)
      that.map.add(that.polygon)
    },
    refreshAreaNode(areaNode) { // 切换区域后刷新显示内容
      const that = this
      that.districtExplorer.setHoverFeature(null)
      that.renderAreaPolygons(areaNode)
      // 更新选中节点的class
      var $nodeEles = $('#area-tree').find('h2')
      $nodeEles.removeClass('selected')
      var $selectedNode = $nodeEles.filter('h2[data-adcode=' + areaNode.getAdcode() + ']').addClass('selected')
      // 展开下层节点
      $selectedNode.closest('li').removeClass('hide-sub')
      // 折叠下层的子节点
      $selectedNode.siblings('ul.sublist').children().addClass('hide-sub')
    },
    saveGroupedPoints(areaNode, groups) { // 保留中间聚合结果
      const that = this
      for (var i = 0, len = groups.length; i < len; i++) {
        var subFeature = groups[i].subFeature // 所属子区域
        if (!subFeature) {
          that.groupedPointsCache['-out-' + areaNode.getAdcode()] = groups[i].points
          continue
        }
        that.groupedPointsCache[subFeature.properties.adcode] = groups[i].points
      }
    },
    renderGroupedPoints(groups) {
      const that = this
      var pointsData = []
      for (var i = 0, len = groups.length; i < len; i++) {
        var gid = groups[i].subFeatureIndex
        for (var j = 0, jlen = groups[i].points.length; j < jlen; j++) {
          pointsData.push({
            gid: gid,
            pos: groups[i].points[j]
          })
        }
      }
      that.pointSimplifierIns.setData(pointsData)
    },
    getGroupedPoints(adcode) {
      const that = this
      return that.groupedPointsCache[adcode] || that.lngLatList
    },
    loadAreaNode(adcode, callback) {
      const that = this
      that.districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
        if (error) {
          if (callback) {
            callback(error)
          }
          console.error(error)
          return
        }
        var points = that.getGroupedPoints(adcode)
        // 当前子区域聚合
        var groups = areaNode.groupByPosition(points, function(item) {
          return item
        })
        that.saveGroupedPoints(areaNode, groups)
        var $subBox = that.renderAreaPanel(areaNode)
        if (groups.length &&
                  !groups[groups.length - 1].subFeature) {
          that.renderAreaPanelNode($subBox, {
            adcode: '-out-' + areaNode.getAdcode(),
            name: '区域外',
            center: groups[groups.length - 1].points[0]
          }, 'gray')
        }
        that.renderGroupedPoints(groups)
        if (callback) {
          callback(null, areaNode)
        }
      })
    },
    switch2AreaNode(adcode, callback) {
      const that = this
      if (that.currentAreaNode && ('' + that.currentAreaNode.getAdcode() === '' + adcode)) {
        return
      }
      that.loadAreaNode(adcode, function(error, areaNode) {
        if (error) {
          if (callback) {
            callback(error)
          }
          return
        }
        that.currentAreaNode = areaNode
        // 设置当前使用的定位用节点
        that.districtExplorer.setAreaNodesForLocating([that.currentAreaNode])
        that.refreshAreaNode(areaNode)
        if (callback) {
          callback(null, areaNode)
        }
      })
    },
    polygonClick(e) {
      const that = this
      that.districtExplorer.locatePosition(e.lnglat, function(error, routeFeatures) {
        if (error) throw Error(error)
        if (routeFeatures && routeFeatures.length > 1) {
          // 切换到省级区域
          that.switch2AreaNode(routeFeatures[1].properties.adcode)
        } else {
          // 切换到全国
          that.switch2AreaNode(100000)
        }
      })
    }
  }
}
</script>
<style  lang="scss">
  .mapContainer{
    position:relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 50px);
    color:black;
  }
  .hasTagsView .mapContainer{
    height: calc(100vh - 84px);
  }
  #loadingTip {
    position: absolute;
    z-index: 9999;
    top: 10px;
    left: calc(50% - 100px);
    border-radius: 10px;
    overflow:hidden;
    width:200px;
    text-align: center;
    padding: 3px 10px;
    background: #ff000044;
    color: #fff;
    font-size: 14px;
  }
ul,
li{
padding:0;
margin:0;
list-style:none;
}
#outer-box{
height:100%;
padding-right:300px;
}
#container{
height:100%;
width:100%;
}
#panel{
position:absolute;
top:20px;
bottom:20px;
right:10px;
border-radius:6px;
overflow:hidden;
width:300px;
z-index:999;
border-left:1px solid #eaeaea55;
background:#ffffff55;
}
.scrollbar1::-webkit-scrollbar-track{
box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
background-color:#fff;
}
.scrollbar1::-webkit-scrollbar{
width:6px;
background-color:#fff;
}
.scrollbar1::-webkit-scrollbar-thumb{
background-color:#aaa;
}
.clear{
clear:both;
}
.tipMarker{
color:#555;
background-color:rgba(255,254,239,0.8);
border:1px solid #7E7E7E;
padding:2px 6px;
font-size:12px;
white-space:nowrap;
display:inline-block;
}
.tipMarker:before,
.tipMarker:after{
content:'';
display:block;
position:absolute;
margin:auto;
width:0;
height:0;
border:solid transparent;
border-width:5px 5px;
}
.tipMarker.top{
transform:translate(-50%,-110%);
}
.tipMarker.top:before,
.tipMarker.top:after{
bottom:-9px;
left:0;
right:0;
border-top-color:rgba(255,254,239,0.8);
}
.tipMarker.top:before{
bottom:-10px;
border-top-color:#7E7E7E;
}

#area-tree h2{
display:inline-block;
font-weight:500;
font-size:13px;
padding:3px 5px;
margin:0;
border:1px solid #2ca02c;
border-width:1px 3px;
cursor:pointer;
}
#area-tree h2:hover,
#area-tree h2.hover,
#area-tree h2.selected{
background:#3366cc;
color:#fff;
}
#area-tree h2.lv_outside{
border-color:#666;
padding:3px 10px;
}
#area-tree h2.lv_country{
border-color:#d62728;
padding:3px 27px;
margin:5px 0;
}
#area-tree h2.lv_province{
border-color:#ff7f0e;
padding:3px 10px;
}
#area-tree h2.lv_district{
border-color:#dd4477
}
#area-tree ul{
margin-left:23px;
clear:both;
}
#area-tree li{
float:left;
margin:5px 5px 0 0;
font-size:12px;
}
#area-tree li.lv_province{
margin:5px 5px 5px 0;
}
.showHideBtn{
display:inline-block;
position:relative;
width:20px;
height:20px;
overflow:hidden;
vertical-align:middle;
margin:0;
cursor:pointer;
}
@keyframes rotate-forever{
0%{
-webkit-transform:rotate(0deg);
}
100%{
-webkit-transform:rotate(360deg);
}
}
.loading > .showHideBtn{
animation:1s ease-in-out infinite rotate-forever;
}
.showHideBtn:after{
content:'';
position:absolute;
width:0;
height:0;
top:4px;
left:4px;
border:solid rgba(0,0,0,0);
border-width:10px 6px;
border-top-color:#ddd;
transition-property:all;
transition-duration:.2s;
}
.hide-sub .showHideBtn:after{
transform-origin:50% 20%;
transform:rotate(-90deg);
}
.hide-sub > ul{
display:none;
}
.amap-logo,.amap-copyright{
  opacity: 0;
}
#layerNum{
  position:absolute;
  color:white;
  left:0px;
  top:0px;
  font-size:20px;
  text-shadow: .2rem 0rem .5rem black,-.2rem 0rem .5rem black,0rem .2rem .5rem black,0rem -.2rem .5rem black;
}
</style>
