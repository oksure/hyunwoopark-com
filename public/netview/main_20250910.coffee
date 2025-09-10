# future features

# force label placement & highlights
# https://bl.ocks.org/mapio/53fed7d84cd1812d6a6639ed7aa83868
# http://bl.ocks.org/MoritzStefaner/1377729

# curved edges
# https://bl.ocks.org/almsuarez/baa897c189ed64ba2bb32cde2876533b

# force tooltip & highlights
# https://bl.ocks.org/almsuarez/4333a12d2531d6c1f6f22b74f2c57102

# align tooltip position when zoomed (mismatch because of transform, translate, scale)
# https://bl.ocks.org/anonymous/3e3e5333ff24a2c9972bc9320dc6f712/f4dcd09a07b5eafdc78efa0cf45948021e003739




# global variables
# [svg, svgNodes, svgLinks, svgTexts, width, height, color, nodes, links, force, node, link, text, zoom, drag, graph] = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
svg = null
g = null
svgNodes = null
svgLinks = null
svgTexts = null
width = null
height = null
color = null
nodes = null
links = null
simulation = null
node = null
link = null
text = null
zoom = null
drag = null
graph = null
selected = null
dragging = null
nborsdic = null
gc20 = '#3366cc #dc3912 #ff9900 #109618 #990099 #0099c6 #dd4477 #66aa00 #b82e2e #316395 #994499 #22aa99 #aaaa11 #6633cc #e67300 #8b0707 #651067 #329262 #5574a6 #3b3eac'.split(' ')

url = if location.search.substr(1,24)=="https://www.dropbox.com/" then location.search.substr(1).replace('www.dropbox.com', 'dl.dropboxusercontent.com') else "https://dl.dropboxusercontent.com/s/vn98nq1g5fn6dkk/miserable.json?dl=0"





# initialize ui
init = ->
  $('#last-updated').text document.lastModified
  # initTooltips()
  initUI()

  color = d3.scaleOrdinal().domain([0..19]).range(gc20)
  drag = d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
  zoom = d3.zoom()
    .scaleExtent [.1, 10]
    .on 'zoom', -> g.attr 'transform', d3.event.transform; return

  # render graph
  resetCanvas()
  $('#spinner').show()
  d3.json url
    .then (data) ->
      graph = data
      # console.log graph

      nborsdic = {}
      $.map graph.nodes, (v) -> nborsdic[v.id] = []; return
      $.map graph.links, (e) ->
        if not nborsdic.hasOwnProperty(e.source)
          nborsdic[e.source] = []
        if not nborsdic.hasOwnProperty(e.target)
          nborsdic[e.target] = []
        nborsdic[e.source].push e.target
        nborsdic[e.target].push e.source
        return


      # simulation
      simulation = d3.forceSimulation graph.nodes
        .force 'charge', d3.forceManyBody().strength(-100)
        # .force 'charge', d3.forceManyBody()
        .force 'collide', d3.forceCollide()
        .force 'link', d3.forceLink(graph.links).id((d) -> d.id)
        .force 'center', d3.forceCenter(width/2, height/2)
        .on 'tick', tick

      # link line
      link = svgLinks.selectAll '.link'
      link = link.data graph.links, (d) -> d.source.id + '-' + d.target.id
        .enter()
        .append 'line'
        .attr 'class', 'link'
        .style 'stroke-width', (d) -> if d.hasOwnProperty 'value' then d.value else 1
        .on 'mouseover', (d) ->
          # setHighlightByEdge d, true
          showDetails d
          return
        .on 'mouseout', (d) ->
          # exitHighlight()
          hideDetails()
          return
      link.exit().remove()
      # node circle
      node = svgNodes.selectAll '.node'
      node = node.data graph.nodes, (d) -> d.id
        .enter()
        .append 'circle'
        .attr 'class', 'node'
        .attr 'r', (d) -> if d.hasOwnProperty 'size' then d.size else 6
        .style 'fill', (d) -> nodeColor d
        # .style 'fill-opacity', '.8'
        .style 'stroke', (d) -> nodeColor d
        # .style 'stroke-opacity', '.5'
        # .style 'stroke-width', '5'
        .call drag
        .on 'mouseover', (d) ->
          setHighlightByNode d, true
          showDetails d
          return
        .on 'mouseout', (d) ->
          exitHighlight()
          hideDetails()
          return
        .on 'click', (d) ->
          d3.event.stopPropagation()
          if not d3.event.defaultPrevented    # distinguishing from click from dragging
            # node gets selected
            centerToXY d.x, d.y, getTransform()[2], 750
            if d.hasOwnProperty 'url' then window.open d.url
      node.exit().remove()
      # node label
      text = svgTexts.selectAll '.text'
      text = text.data graph.nodes, (d) -> d.id
        .enter()
        .append 'text'
        .attr 'class', 'text'
        # .attr 'dx', (d) -> labelOffset + nodeSize d
        .attr 'dx', (d) -> if d.hasOwnProperty 'size' then d.size+4 else 10
        .attr 'dy', '.35em'
        .attr 'font-size', '9pt'
        .text (d) -> if d.hasOwnProperty 'label' then d.label else d.id
        .call drag
        .on 'mouseover', (d) ->
          setHighlightByNode d, true
          showDetails d
          return
        .on 'mouseout', (d) ->
          exitHighlight()
          hideDetails()
          return
        .on 'click', (d) ->
          d3.event.stopPropagation()
          if not d3.event.defaultPrevented    # distinguishing from click from dragging
            # node gets selected
            centerToXY d.x, d.y, getTransform()[2], 750
            if d.hasOwnProperty 'url' then window.open d.url
      text.exit().remove()
      svg.call zoom.transform, d3.zoomIdentity

      # drawGraph()
      $('#spinner').hide()

  return

# force computation for every tick
tick = ->
  text.attr 'transform', (d) -> 'translate(' + [d.x, d.y] + ')'
  node.attr 'cx', (d) -> d.x
    .attr 'cy', (d) -> d.y
  link.attr 'x1', (d) -> d.source.x
    .attr 'y1', (d) -> d.source.y
    .attr 'x2', (d) -> d.target.x
    .attr 'y2', (d) -> d.target.y
  return

# node-dragging-related functions
dragstarted = (d) ->
  # d3.event.sourceEvent.stopPropagation()
  if !d3.event.active
    simulation.alphaTarget(0.3).restart()
  d.fx = d.x
  d.fy = d.y
  dragging = true
  return

dragged = (d) ->
  d.fx = d3.event.x
  d.fy = d3.event.y
  return

dragended = (d) ->
  if !d3.event.active
    simulation.alphaTarget(0.0001)
  d.fx = null
  d.fy = null
  dragging = false
  exitHighlight()
  # if not $('#control-force').hasClass 'active' then force.stop()
  return

centerToXY = (x, y, k, delay) ->
  translate = [width/2 - (k*x), height/2 - (k*y)]
  transform = d3.zoomIdentity.translate(translate[0], translate[1]).scale k
  svg.transition().duration(delay).call zoom.transform, transform
  return

getTransform = -> $('svg > g').attr('transform').match(/([\d\.]+)/g).map(parseFloat)


nodeColor = (d) ->
  if d.hasOwnProperty 'color' then return d.color
  return if d.hasOwnProperty 'group' then color d.group else color 1


showDetails = (d) ->
  tt = $('#tooltip')
  tt.html JSON.stringify(d, ['id', 'label', 'group', 'color', 'size', 'source', 'target', 'value', 'url'], 2)
  # tt.html JSON.stringify(d, null, 2)
  if d.hasOwnProperty 'x'
    tt.css 'left', 10+d.x
    tt.css 'top', 10+d.y
  else
    tt.css 'left', 10+(d.source.x+d.target.x)/2
    tt.css 'top', 10+(d.source.y+d.target.y)/2
  if isTooltipOn()
    tt.removeClass 'd-none'
  return

hideDetails = (d) ->
  $('#tooltip').addClass 'd-none'
  return



# init all tooltips
# initTooltips = ->
#   $( -> $('[data-toggle="tooltip"]').tooltip(); return); return

initUI = ->
  $('.nav-toggle').click (event) ->
    event.preventDefault()
    if this.text.split(': ')[1]=='On'
      g.selectAll('.'+this.id.split('-')[1]).classed('d-none', true)
      # $('.main-canvas .'+this.id.split('-')[1]).hide()
      this.text = this.text.split(': ')[0]+': Off'
    else
      g.selectAll('.'+this.id.split('-')[1]).classed('d-none', false)
      # $('.main-canvas .'+this.id.split('-')[1]).show()
      this.text = this.text.split(': ')[0]+': On'
    $(this).blur()
    return

  $('#quick-search').on 'keyup search click', (event) ->
    if selected then resetSelected()
    qsVal = $('#quick-search').val()
    if qsVal.length>0
      setHighlightByStr(qsVal)
    else
      exitHighlight()
    return

  $('.modal').on 'shown.bs.modal', (e) ->
    $('.nav-link').one 'focus', (e) -> $(this).blur()
    return

  return

isTextOn = -> $('#toggle-text').text().split(': ')[1]=='On'
isLinkOn = -> $('#toggle-link').text().split(': ')[1]=='On'
isTooltipOn = -> $('#toggle-tooltip').text().split(': ')[1]=='On'


# hover & quick search highlight functions
isNeighbor = (p,d) -> p.id==d.id or nborsdic[d.id].indexOf(p.id)>=0   # check if p is one of d's neighbors
isPartOf = (p,s) ->
  flagId = p.id.toString().toLowerCase().indexOf(s.toLowerCase())>=0
  flagLabel = if p.hasOwnProperty 'label' then p.label.toString().toLowerCase().indexOf(s.toLowerCase())>=0 else false
  flagId || flagLabel
  # check if s [string] is part of p [node] id or label

isSameNode = (p,d) -> p.id==d.id    # check if p [node] is same to d [node]
isSameEdge = (p,d) -> (p.source.id==d.source.id and p.target.id==d.target) or (p.source.id==d.target.id and p.target.id==d.source.id)  # check if p [edge] is same to d [edge]
isEdgeOf = (p,d) -> p.source.id==d.id or p.target.id==d.id    # is p [edge] an edge of d [node]

isNodeSelected = -> selected and not selected.hasOwnProperty('source')
isEdgeSelected = -> selected and selected.hasOwnProperty('source')

setHighlightByNode = (d, hover) ->
  if link!=null
    if not dragging
      link
        .classed 'dim', (p) -> not isEdgeOf p,d
        .classed 'd-none', (p) -> not isLinkOn() and not isEdgeOf p,d
        # .classed 'selected', (p) -> (not hover) and isEdgeSelected() and isSameEdge p,selected
      node
        .classed 'dim', (p) -> not isNeighbor p,d
        # .classed 'selected', (p) -> (not hover) and isNodeSelected() and isSameNode p,selected
      text
        .classed 'dim', (p) -> not isNeighbor p,d
        .classed 'd-none', (p) -> not isTextOn() and not isNeighbor p,d
  return

# setHighlightByEdge = (d, hover) ->
#   if link!=null
#     if not dragging
#       link
#         .classed 'dim', (p) -> not isSameEdge p,d
#         .classed 'd-none', (p) -> not isLinkOn() and not isSameEdge p,d
#         .classed 'selected', (p) -> (not hover) and isEdgeSelected() and isSameEdge p,selected
#       node
#         .classed 'dim', (p) -> not isEdgeOf d,p
#         .classed 'selected', (p) -> (not hover) and isNodeSelected() and isSameNode p,selected
#       text
#         .classed 'dim', (p) -> not isEdgeOf d,p
#         .classed 'd-none', (p) -> not isTextOn() and not isEdgeOf d,p
#   return

setHighlightByStr = (s) ->
  # console.log s.toLowerCase()
  if link!=null
    link
      .classed 'dim', true
      .classed 'd-none', (p) -> not isLinkOn()
      # .classed 'selected', (p) -> isEdgeSelected() and isSameEdge p,selected
    node
      .classed 'dim', (p) -> not isPartOf p,s
      # .classed 'selected', (p) -> isNodeSelected() and isSameNode p,selected
    text
      .classed 'dim', (p) -> not isPartOf p,s
      .classed 'd-none', (p) -> not isTextOn() and not isPartOf p,s
  return

exitHighlight = ->
  if link!=null
    if not dragging
      if selected
        if selected.hasOwnProperty('source') then setHighlightByEdge selected, false else setHighlightByNode selected, false
      else
        if $('#quick-search').val().length>0
          setHighlightByStr $('#quick-search').val()
        else
          link
            .classed 'dim', false
            .classed 'd-none', (p) -> not isLinkOn()
            .classed 'selected', false
          node
            .classed 'dim', false
            .classed 'selected', false
          text
            .classed 'dim', false
            .classed 'd-none', (p) -> not isTextOn()
  return

resetSelected = ->
  if link!=null
    selected = null
    exitHighlight()
  return





resetSize = ->
  width = $('#canvas').width()
  height = $('#canvas').height()
  # if zoom!=null then zoom.center [width / 2, height / 2]
  # if svg!=null then svg.attr "viewBox", "0 0 " + width + " " + height
  return

resetCanvas = ->
  resetSize()
  # zoom.center [width / 2, height / 2]
  # zoom.translate [0, 0]

  $('#canvas').empty()
  svg = d3.select '#canvas'
    .append 'svg'
    .attr 'class', 'main-canvas'
    # .attr "viewBox", "0 0 " + width + " " + height
    # .attr 'cursor', 'move'
    .call zoom
    # .on 'click', (d) ->
    #   if not d3.event.defaultPrevented then resetSelected()
    #   return
  g = svg.append 'g'
  # svg.attr 'transform', d3.zoomIdentity
  svgLinks = g.append 'g'
  svgNodes = g.append 'g'
  svgTexts = g.append 'g'
  return


# initialization when document gets ready
$ ->
  init()
  return