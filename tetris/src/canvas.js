var utils=require("./utils.js"),consts=require("./consts.js"),lineColor=consts.GRID_LINE_COLOR,boxBorderColor=consts.BOX_BORDER_COLOR,drawLine=function(e,t,i,r){e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(i.x,i.y),e.lineWidth=1,e.strokeStyle=r,e.stroke(),e.closePath()},drawGrids=function(e,t,i,r,o,n){var s=e.getContext("2d"),h=e.width,a=e.height;s.rect(0,0,h,a);var c=s.createLinearGradient(0,0,0,a);c.addColorStop(0,o),c.addColorStop(1,n),s.fillStyle=c,s.fill();for(var d=1;d<i;d++){var l=t*d+.5;drawLine(s,{x:l,y:0},{x:l,y:a},lineColor)}for(d=1;d<r;d++){var w=t*d+.5;drawLine(s,{x:0,y:w},{x:h,y:w},lineColor)}},drawBox=function(e,t,i,r,o){r<0||(e.beginPath(),e.rect(i,r,o,o),e.fillStyle=t,e.fill(),e.strokeStyle=boxBorderColor,e.lineWidth=1,e.stroke(),e.closePath())},tetrisCanvas={init:function(e,t){this.scene=e,this.preview=t,this.sceneContext=e.getContext("2d"),this.previewContext=t.getContext("2d"),this.gridSize=e.width/consts.COLUMN_COUNT,this.previewGridSize=t.width/consts.PREVIEW_COUNT,this.drawScene()},clearScene:function(){this.sceneContext.clearRect(0,0,this.scene.width,this.scene.height)},clearPreview:function(){this.previewContext.clearRect(0,0,this.preview.width,this.preview.height)},drawScene:function(){this.clearScene(),drawGrids(this.scene,this.gridSize,consts.COLUMN_COUNT,consts.ROW_COUNT,consts.SCENE_BG_START,consts.SCENE_BG_END)},drawMatrix:function(e){for(var t=0;t<e.length;t++)for(var i=e[t],r=0;r<i.length;r++)0!==i[r]&&drawBox(this.sceneContext,i[r],r*this.gridSize,t*this.gridSize,this.gridSize)},drawPreview:function(){drawGrids(this.preview,this.previewGridSize,consts.PREVIEW_COUNT,consts.PREVIEW_COUNT,consts.PREVIEW_BG,consts.PREVIEW_BG)},drawShape:function(e){if(e)for(var t=e.matrix(),i=this.gridSize,r=0;r<t.length;r++)for(var o=0;o<t[r].length;o++){if(1===t[r][o]){var n=i*(e.x+o),s=i*(e.y+r);drawBox(this.sceneContext,e.color,n,s,i)}}},drawPreviewShape:function(e){if(e){this.clearPreview();for(var t=e.matrix(),i=this.previewGridSize,r=(this.preview.width-i*e.getColumnCount())/2,o=(this.preview.height-i*e.getRowCount())/2,n=0;n<t.length;n++)for(var s=0;s<t[n].length;s++){if(1===t[n][s]){var h=r+i*s,a=o+i*n;drawBox(this.previewContext,e.color,h,a,i)}}}}};module.exports=tetrisCanvas;