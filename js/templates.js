// Generated by CoffeeScript 1.3.3
(function() {

  if (window.eur00t == null) {
    window.eur00t = {};
  }

  if (window.eur00t.templates == null) {
    window.eur00t.templates = {};
  }

  if (window.eur00t.templates.jewel == null) {
    window.eur00t.templates.jewel = {};
  }

  /*
    Board template.
    
    width, height: size in pixels
  */


  eur00t.templates.jewel.board = "<div class=\"board\" style=\"width: <%=width %>px; height: <%=height %>px;\">\n</div>";

  /*
    Scores template.
  */


  eur00t.templates.jewel.scores = "<div class=\"caption\">\n  <h2 class=\"scores\"></h2>\n</div>";

  /*
    Jewel template.
    
    color: 'orange', 'blue', 'yellow', 'brown'
    size: a size of jewel
    i,j: position of jewel
    i: row coordinate 0,1,...
    j: column coordinate 0,1,...
    gap: a gap between items
    border: border for each gem
  */


  eur00t.templates.jewel.item = "<div class=\"jewel <%=color %>\" style=\"width: <%=size %>px; height: <%=size %>px; left: <%=gap+j*(size+2*gap)-border %>px; top: <%=gap+i*(size+2*gap)-border %>px;\">\n</div>";

}).call(this);
