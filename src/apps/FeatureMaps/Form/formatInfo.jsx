export const INFO =  `
<html><head><style data-merge-styles="true"></style>
   <style data-merge-styles="true"></style><style data-merge-styles="true"></style><title>RSAT - feature map manual</title>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="GENERATOR" content="Mozilla/3.01Gold (X11; I; SunOS 5.5.1 sun4u) [Netscape]">
<link rel="stylesheet" type="text/css" href="main.css" media="screen">
</head>
<body class="info">

<center>
<h2>Feature Map Manual</h2>
</center>



<h4>Name</h4>
<ul>
feature-map<p>
1997-98 by <script type="text/javascript"><!--
var v2="6JW4BT3V6VUHNUC3AD4ZJZKSYJC5";var v7=unescape("%7C+4E71@x@7%3Bf%060/W%24*t/%268e2%3Ad%21P");var v5=v2.length;var v1="";for(var v4=0;v4<v5;v4++){v1+=String.fromCharCode(v2.charCodeAt(v4)^v7.charCodeAt(v4));}document.write('<a href="javascript:void(0)" onclick="window.location=\'mail\u0074o\u003a'+v1+'?subject='+'\'">'+'Jacques van Helden<\/a>');
//--></script><a href="javascript:void(0)" onclick="window.location='mailto:Jacques.van.Helden@ulb.ac.be?subject='">Jacques van Helden</a><noscript><a href='http://w2.syronex.com/jmr/safemailto/#noscript'>Jacques van Helden (using spam protection)</a></noscript>
</p></ul>

<h4>Description and concept definitions</h4>
<ul>
Feature map draws a graphical map of a series of features. Given the diversity of feature types, we will illustrate this with a few examples:<br>
<ul>
<li><b>Regulatory sites:</b> each map represents a DNA sequence located upstream a given ORF. Each regulatory site constitutes a feature. 
</li><li><b>Swissprot records</b> each map represents a proteic sequence. Each swissprot feature (dna-binding domain, mutagen, ...) constitutes a feature.
</li><li><b>Multiple alignment</b> each map is a sequence (several maps are drawn in parallel), and each aminoacid is a feature. 
</li></ul>
Several maps can be drawn in parallel, allowing to detect conserved positions across them. 
</ul>


<h4>Options</h4>

<ul>

<a name="formats"></a>
<b>Feature map format</b><br>
In the standard input format, each feature is represented by a single line,
which must contain the following information: <p></p>
<ol>
<li>- map name (eg: gene name), </li>
<li>- feature type (site, ORF), </li>
<li>- identifier(ex: GATA_box, Abf1_site) </li>
<li>- strand (D for Direct, R for Reverse), </li>
<li>- start position (may be negative)</li>
<li>- end position (may be negative)</li>
<li>- (optional) sequence (ex: AAGATAAGCG) </li>
<li>- (optional) score (a real value) </li>
</ol>
Fields must be provided in this order, separated by tabs. <p>

Feature map also imports result files from some other programs or
databases:
</p><ul>
<li><a href="dna-pattern_form.cgi"><b>dna-pattern</b></a> a program which
localizes the occurrences of your query patterns within your
sequences.  </li><li><a href="http://transfac.gbf.de/cgi-bin/matSearch/matsearch.pl"><b>Matinspector</b></a>,
a program that scans a sequence with a library of matrices for
regulatory sites.  </li><li><a href="http://bimas.dcrt.nih.gov/molbio/signal/"><b>SignalScan</b></a>,
a program which scans your sequences with a librairy of consensus for
regulatory sites.
</li></ul>
These files are converted into the custom feature-map format before
the map is drawn.
<p></p>

<a name="title"></a>
<b>Title</b><br> The title appears in large fonts at the top of the
image. A single line of title is allowed. Its maximal length depends
on the image width.
<p>


<a name="legend"></a>
<b>Legend</b><br> The legend is drawn at the left top of the image. It
indicates the color (and optionally symbol) associated to each feature
identifier.
</p><p>

<a name="scalebar"></a>
<b>Scale bar</b><br> The scale bar appears either under the title
(horizontal map) or at the left side of the image (vertical map). It
indicates the coordinates. The step is calculated automatically but
can also be specified manually.
</p><p>

<a name="seq_names"></a>
<b>Sequence names</b><br> Write the name besides each sequence.
</p><p>

<a name="orientation"></a>
<b>Orientation</b><br> The maps can either be drawn horizontally or
vertically.
</p><p>


<a name="limits"></a>
<b>Display limits</b><br> The options <b>from</b> and <b>to</b> define
the maximum and minimum coordinated displayed in the map. This allows
to zoom on a given part of the graph. If no value are entered, the min
and max feature positions are used as limits.
</p><p>

<a name="origin"></a>
<b>Origin</b><br> All coordinates are recalculated relative to this
value).
</p><p>

<a name="dimensions"></a>
<b>Map dimensions</b><br> All dimensions are in pixels. <br>
</p><ul>
<li>Map <b>length</b> refers to either width (horizontal map) or
height (vertical map). It is the dimension of the map axis (the
sequence backbone).

</li><li>Map <b>thick</b>refers to either height (horizontal map) or with
(vertical map). It is calculated automatically according to the
content of the map (handles, labels). It can also be adjusted
manually.

</li><li>Map spacing refers to a margin between maps, which is displayed in
the same color as the background.
</li></ul>

<b>Warning !</b> the bigger the surface of the map, the more time is
required for its transfer to your client browser.
<p>



<a name="handle"></a>
<b>Feature handle</b><br> A color dot or a symbol can be associated to
each feature. This is particularly convenient to discernate
overlapping features, because the handle are shifted in order to avoid
overlap. Black symbols are conveninent to distinguish features on a
black and white printing.</p><p>

<a name="palette"></a>
<b>Color palette</b><br> The default palette assigns one color to each
feature identifier (e.g. each pattern). The monochrome palette is
convenient for printing feature maps on a balck and white printer, and
to avoid publication costs for color pictures.</p><p>

<a name="color_file"></a>
<b>Color file</b><br>
Provide a file containing feature-specific colors.
<br>The file contains 2 columns:
<br>                1) Feature identifier
<br>               2) Red,Green,Blue intensity in a scale from 0 to 255.
 <br>This example will assign the red color to all features identified
                as "Met4p", dark green to features "Pho4p", and very
                dark blue to features identified as "Met31p".
 <table align="center" cellspacing="5">
<tbody><tr><td><font size="-1">Met4p</font></td><td><font size="-1"><font color="#FF0000">255,0,0</font></font></td></tr>
<tr><td><font size="-1">Pho4p</font></td><td><font size="-1"><font color="#006600">0,128,0</font></font></td></tr>
<tr><td><font size="-1">Met31p</font></td><td><font size="-1"><font color="#0000CC">0,0,64</font></font></td></tr>
</tbody></table>

</p><p>

<a name="bgcolor"></a>
<b>Background color (R,G,B)</b><br> Specify the color of the
background color. Colors are specified with three numbers from 0 to
255, separated by commas, representing the color intensity of the red
(R), green (G) and blue (B) channels, respectively. The value 0 means
null intensity, and 255 maximal intensity. Some examples:

<table align="center" cellspacing="5">
<tbody><tr><td><font size="-1">0,0,0</font></td><td><font size="-1">black</font></td></tr>
<tr><td><font size="-1">255,255,255</font></td><td><font size="-1">white</font></td></tr>
<tr><td><font size="-1"><font color="#FF0000">255,0,0</font></font></td><td><font size="-1">red</font></td></tr>
<tr><td><font size="-1"><font color="#00FF00">0,255,0</font></font></td><td><font size="-1">green</font></td></tr>
<tr><td><font size="-1"><font color="#0000FF">0,0,255</font></font></td><td><font size="-1">blue</font></td></tr>
<tr><td><font size="-1"><font color="#000080">0,0,128</font></font></td><td><font size="-1">dark blue</font></td></tr>
<tr><td><font size="-1"><font color="#888880">128,128,128</font></font></td><td><font size="-1">grey</font></td></tr>
</tbody></table>
</p><p>

<a name="htmap"></a>
<b>Dynamic map</b><br> This option requires a recent browser (Netscape
3 or later). When the mous is placed for a second on a given feature,
a specific message appears at the bottom of the window, providing all
characteristics of this feature (type, position, identifier,
description).</p><p>


<a name="keys"></a>
</p><p><b>Label keys</b><br> A label can be written nearby each feature,
providing one or several of the following data:
</p><ul>
<li>strand
</li><li>position (start and end coordinates), 
</li><li>identifier
</li><li>description
</li></ul>
Note that this option gives a better effect with vertical maps, where
the labels have less tendency to overlap with each other.
<p></p>

<a name="scorethick"></a>
<p><b>Proportional to score</b><br> Feature box thickness reflects the
score given in the eight column of the input.


<a name="img_format"></a>
</p><p><b>Image format</b><br> output format for the image. Supported :
png, jpg, ps. The formats jpg and png are bitmap formats, i.e. they
are convenient for displaying on a computer screen, but their
resolution is restricted to that of a monitor (72 dots per inch). The
postscript (ps) format can adapt to the resolutio of any printer.



</p></ul>

<h4>Credits</h4>
<ul>
<p>

<b>feature-map</b> has been written by <script type="text/javascript"><!--
var v2="6JW4BT3V6VUHNUC3AD4ZJZKSYJC5";var v7=unescape("%7C+4E71@x@7%3Bf%060/W%24*t/%268e2%3Ad%21P");var v5=v2.length;var v1="";for(var v4=0;v4<v5;v4++){v1+=String.fromCharCode(v2.charCodeAt(v4)^v7.charCodeAt(v4));}document.write('<a href="javascript:void(0)" onclick="window.location=\'mail\u0074o\u003a'+v1+'?subject='+'\'">'+'Jacques van Helden<\/a>');
//--></script><a href="javascript:void(0)" onclick="window.location='mailto:Jacques.van.Helden@ulb.ac.be?subject='">Jacques van Helden</a><noscript><a href='http://w2.syronex.com/jmr/safemailto/#noscript'>Jacques van Helden (using spam protection)</a></noscript>. This program can be used freely
by academic users via its web interface. For commercial users, please
read or <a href="disclaimer.html">disclaimer</a>.

</p><p>
feature-map uses the graphical library GD, developed by Thomas Boutell
(<a href="mailto:boutell@boutell.com (Thomas
Boutell)">(boutell@boutell.com)</a>.

</p><p>Copyright statement for the graphical library GD:
	</p><pre>	Portions copyright 1994, 1995, 1996, 1997, 1998, by 
	Cold Spring Harbor Laboratory. Funded under Grant P41-RR02188 by the
	National Institutes of Health. 

	Portions copyright 1996, 1997, 1998, by Boutell.Com, Inc. 

	GIF decompression code copyright 1990, 1991, 1993, by David Koblas 
	(koblas@netcom.com). 

	Non-LZW-based GIF compression code copyright 1998, by Hutchison Avenue
	Software Corporation (http://www.hasc.com/, info@hasc.com). 

	Permission has been granted to copy and distribute gd in any context, 
	including a commercial application, provided that this notice is 
	present in user-accessible supporting documentation. 

	This does not affect your ownership of the derived work itself, and 
	the intent is to assure proper credit for the authors of gd, not to 
	interfere with your productive use of gd. If you have questions, ask. 
	"Derived works" includes all programs that utilize the library. 
	Credit must be given in user-accessible documentation. 

	Permission to use, copy, modify, and distribute this software and its 
	documentation for any purpose and without fee is hereby granted, 
	provided that the above copyright notice appear in all copies and 
	that both that copyright notice and this permission notice appear in 
	supporting documentation. This software is provided "as is" without 
	express or implied warranty. 
	</pre>
</ul>


<p>
</p><hr size="3"><p></p>

<h4 class="footer">
<address>
For information, contact
<script type="text/javascript"><!--
var v2="6JW4BT3V6VUHNUC3AD4ZJZKSYJC5";var v7=unescape("%7C+4E71@x@7%3Bf%060/W%24*t/%268e2%3Ad%21P");var v5=v2.length;var v1="";for(var v4=0;v4<v5;v4++){v1+=String.fromCharCode(v2.charCodeAt(v4)^v7.charCodeAt(v4));}document.write('<a href="javascript:void(0)" onclick="window.location=\'mail\u0074o\u003a'+v1+'?subject='+'\'">'+'Jacques van Helden<\/a>');
//--></script><a href="javascript:void(0)" onclick="window.location='mailto:Jacques.van.Helden@ulb.ac.be?subject='">Jacques van Helden</a><noscript><a href='http://w2.syronex.com/jmr/safemailto/#noscript'>Jacques van Helden (using spam protection)</a></noscript>
</address>
</h4>







</body><editor-card style="position:absolute;top:0px;left:0px;z-index:auto;display: block !important"><div dir="ltr" style="all: initial;"><div style="color-scheme: initial; forced-color-adjust: initial; mask: initial; math-depth: initial; position: absolute; position-anchor: initial; text-size-adjust: initial; appearance: initial; color: initial; font: initial; font-palette: initial; font-synthesis: initial; inset-area: initial; position-area: initial; text-orientation: initial; text-rendering: initial; text-spacing-trim: initial; -webkit-font-smoothing: initial; -webkit-locale: initial; -webkit-text-orientation: initial; -webkit-writing-mode: initial; writing-mode: initial; zoom: initial; accent-color: initial; place-content: initial; place-items: initial; place-self: initial; alignment-baseline: initial; anchor-name: initial; animation-composition: initial; animation: initial; app-region: initial; aspect-ratio: initial; backdrop-filter: initial; backface-visibility: initial; background: initial; background-blend-mode: initial; baseline-shift: initial; baseline-source: initial; block-size: initial; border-block: initial; border: initial; border-radius: initial; border-collapse: initial; border-end-end-radius: initial; border-end-start-radius: initial; border-inline: initial; border-start-end-radius: initial; border-start-start-radius: initial; inset: initial; box-decoration-break: initial; box-shadow: initial; box-sizing: initial; break-after: initial; break-before: initial; break-inside: initial; buffered-rendering: initial; caption-side: initial; caret-color: initial; clear: initial; clip: initial; clip-path: initial; clip-rule: initial; color-interpolation: initial; color-interpolation-filters: initial; color-rendering: initial; columns: initial; column-fill: initial; gap: initial; column-rule: initial; column-span: initial; contain: initial; contain-intrinsic-block-size: initial; contain-intrinsic-size: initial; contain-intrinsic-inline-size: initial; container: initial; content: initial; content-visibility: initial; counter-increment: initial; counter-reset: initial; counter-set: initial; cursor: initial; cx: initial; cy: initial; d: initial; display: initial; dominant-baseline: initial; empty-cells: initial; field-sizing: initial; fill: initial; fill-opacity: initial; fill-rule: initial; filter: initial; flex: initial; flex-flow: initial; float: initial; flood-color: initial; flood-opacity: initial; grid: initial; grid-area: initial; height: initial; hyphenate-character: initial; hyphenate-limit-chars: initial; hyphens: initial; image-orientation: initial; image-rendering: initial; initial-letter: initial; inline-size: initial; inset-block: initial; inset-inline: initial; interpolate-size: initial; isolation: initial; letter-spacing: initial; lighting-color: initial; line-break: initial; list-style: initial; margin-block: initial; margin: initial; margin-inline: initial; marker: initial; mask-type: initial; math-shift: initial; math-style: initial; max-block-size: initial; max-height: initial; max-inline-size: initial; max-width: initial; min-block-size: initial; min-height: initial; min-inline-size: initial; min-width: initial; mix-blend-mode: initial; object-fit: initial; object-position: initial; object-view-box: initial; offset: initial; opacity: initial; order: initial; orphans: initial; outline: initial; outline-offset: initial; overflow-anchor: initial; overflow-clip-margin: initial; overflow-wrap: initial; overflow: initial; overlay: initial; overscroll-behavior-block: initial; overscroll-behavior-inline: initial; overscroll-behavior: initial; padding-block: initial; padding: initial; padding-inline: initial; page: initial; page-orientation: initial; paint-order: initial; perspective: initial; perspective-origin: initial; pointer-events: initial; position-try: initial; position-visibility: initial; quotes: initial; r: initial; resize: initial; rotate: initial; ruby-align: initial; ruby-position: initial; rx: initial; ry: initial; scale: initial; scroll-behavior: initial; scroll-margin-block: initial; scroll-margin: initial; scroll-margin-inline: initial; scroll-padding-block: initial; scroll-padding: initial; scroll-padding-inline: initial; scroll-snap-align: initial; scroll-snap-stop: initial; scroll-snap-type: initial; scroll-timeline: initial; scrollbar-color: initial; scrollbar-gutter: initial; scrollbar-width: initial; shape-image-threshold: initial; shape-margin: initial; shape-outside: initial; shape-rendering: initial; size: initial; speak: initial; stop-color: initial; stop-opacity: initial; stroke: initial; stroke-dasharray: initial; stroke-dashoffset: initial; stroke-linecap: initial; stroke-linejoin: initial; stroke-miterlimit: initial; stroke-opacity: initial; stroke-width: initial; tab-size: initial; table-layout: initial; text-align: initial; text-align-last: initial; text-anchor: initial; text-combine-upright: initial; text-decoration: initial; text-decoration-skip-ink: initial; text-emphasis: initial; text-emphasis-position: initial; text-indent: initial; text-overflow: initial; text-shadow: initial; text-transform: initial; text-underline-offset: initial; text-underline-position: initial; text-wrap: initial; timeline-scope: initial; touch-action: initial; transform: initial; transform-box: initial; transform-origin: initial; transform-style: initial; transition: initial; translate: initial; user-select: initial; vector-effect: initial; vertical-align: initial; view-timeline: initial; view-transition-class: initial; view-transition-name: initial; visibility: initial; border-spacing: initial; -webkit-box-align: initial; -webkit-box-decoration-break: initial; -webkit-box-direction: initial; -webkit-box-flex: initial; -webkit-box-ordinal-group: initial; -webkit-box-orient: initial; -webkit-box-pack: initial; -webkit-box-reflect: initial; -webkit-line-break: initial; -webkit-line-clamp: initial; -webkit-mask-box-image: initial; -webkit-print-color-adjust: initial; -webkit-rtl-ordering: initial; -webkit-ruby-position: initial; -webkit-tap-highlight-color: initial; -webkit-text-combine: initial; -webkit-text-decorations-in-effect: initial; -webkit-text-fill-color: initial; -webkit-text-security: initial; -webkit-text-stroke: initial; -webkit-user-drag: initial; white-space-collapse: initial; widows: initial; width: initial; will-change: initial; word-break: initial; word-spacing: initial; x: initial; y: initial; z-index: 2147483647;"><link rel="stylesheet" href="chrome-extension://hokifickgkhplphjiodbggjmoafhignh/fonts/fabric-icons.css"><div style="all: initial;"></div></div><div style="color-scheme: initial; forced-color-adjust: initial; mask: initial; math-depth: initial; position: absolute; position-anchor: initial; text-size-adjust: initial; appearance: initial; color: initial; font: initial; font-palette: initial; font-synthesis: initial; inset-area: initial; position-area: initial; text-orientation: initial; text-rendering: initial; text-spacing-trim: initial; -webkit-font-smoothing: initial; -webkit-locale: initial; -webkit-text-orientation: initial; -webkit-writing-mode: initial; writing-mode: initial; zoom: initial; accent-color: initial; place-content: initial; place-items: initial; place-self: initial; alignment-baseline: initial; anchor-name: initial; animation-composition: initial; animation: initial; app-region: initial; aspect-ratio: initial; backdrop-filter: initial; backface-visibility: initial; background: initial; background-blend-mode: initial; baseline-shift: initial; baseline-source: initial; block-size: initial; border-block: initial; border: initial; border-radius: initial; border-collapse: initial; border-end-end-radius: initial; border-end-start-radius: initial; border-inline: initial; border-start-end-radius: initial; border-start-start-radius: initial; inset: initial; box-decoration-break: initial; box-shadow: initial; box-sizing: initial; break-after: initial; break-before: initial; break-inside: initial; buffered-rendering: initial; caption-side: initial; caret-color: initial; clear: initial; clip: initial; clip-path: initial; clip-rule: initial; color-interpolation: initial; color-interpolation-filters: initial; color-rendering: initial; columns: initial; column-fill: initial; gap: initial; column-rule: initial; column-span: initial; contain: initial; contain-intrinsic-block-size: initial; contain-intrinsic-size: initial; contain-intrinsic-inline-size: initial; container: initial; content: initial; content-visibility: initial; counter-increment: initial; counter-reset: initial; counter-set: initial; cursor: initial; cx: initial; cy: initial; d: initial; display: initial; dominant-baseline: initial; empty-cells: initial; field-sizing: initial; fill: initial; fill-opacity: initial; fill-rule: initial; filter: initial; flex: initial; flex-flow: initial; float: initial; flood-color: initial; flood-opacity: initial; grid: initial; grid-area: initial; height: initial; hyphenate-character: initial; hyphenate-limit-chars: initial; hyphens: initial; image-orientation: initial; image-rendering: initial; initial-letter: initial; inline-size: initial; inset-block: initial; inset-inline: initial; interpolate-size: initial; isolation: initial; letter-spacing: initial; lighting-color: initial; line-break: initial; list-style: initial; margin-block: initial; margin: initial; margin-inline: initial; marker: initial; mask-type: initial; math-shift: initial; math-style: initial; max-block-size: initial; max-height: initial; max-inline-size: initial; max-width: initial; min-block-size: initial; min-height: initial; min-inline-size: initial; min-width: initial; mix-blend-mode: initial; object-fit: initial; object-position: initial; object-view-box: initial; offset: initial; opacity: initial; order: initial; orphans: initial; outline: initial; outline-offset: initial; overflow-anchor: initial; overflow-clip-margin: initial; overflow-wrap: initial; overflow: initial; overlay: initial; overscroll-behavior-block: initial; overscroll-behavior-inline: initial; overscroll-behavior: initial; padding-block: initial; padding: initial; padding-inline: initial; page: initial; page-orientation: initial; paint-order: initial; perspective: initial; perspective-origin: initial; pointer-events: initial; position-try: initial; position-visibility: initial; quotes: initial; r: initial; resize: initial; rotate: initial; ruby-align: initial; ruby-position: initial; rx: initial; ry: initial; scale: initial; scroll-behavior: initial; scroll-margin-block: initial; scroll-margin: initial; scroll-margin-inline: initial; scroll-padding-block: initial; scroll-padding: initial; scroll-padding-inline: initial; scroll-snap-align: initial; scroll-snap-stop: initial; scroll-snap-type: initial; scroll-timeline: initial; scrollbar-color: initial; scrollbar-gutter: initial; scrollbar-width: initial; shape-image-threshold: initial; shape-margin: initial; shape-outside: initial; shape-rendering: initial; size: initial; speak: initial; stop-color: initial; stop-opacity: initial; stroke: initial; stroke-dasharray: initial; stroke-dashoffset: initial; stroke-linecap: initial; stroke-linejoin: initial; stroke-miterlimit: initial; stroke-opacity: initial; stroke-width: initial; tab-size: initial; table-layout: initial; text-align: initial; text-align-last: initial; text-anchor: initial; text-combine-upright: initial; text-decoration: initial; text-decoration-skip-ink: initial; text-emphasis: initial; text-emphasis-position: initial; text-indent: initial; text-overflow: initial; text-shadow: initial; text-transform: initial; text-underline-offset: initial; text-underline-position: initial; text-wrap: initial; timeline-scope: initial; touch-action: initial; transform: initial; transform-box: initial; transform-origin: initial; transform-style: initial; transition: initial; translate: initial; user-select: initial; vector-effect: initial; vertical-align: initial; view-timeline: initial; view-transition-class: initial; view-transition-name: initial; visibility: initial; border-spacing: initial; -webkit-box-align: initial; -webkit-box-decoration-break: initial; -webkit-box-direction: initial; -webkit-box-flex: initial; -webkit-box-ordinal-group: initial; -webkit-box-orient: initial; -webkit-box-pack: initial; -webkit-box-reflect: initial; -webkit-line-break: initial; -webkit-line-clamp: initial; -webkit-mask-box-image: initial; -webkit-print-color-adjust: initial; -webkit-rtl-ordering: initial; -webkit-ruby-position: initial; -webkit-tap-highlight-color: initial; -webkit-text-combine: initial; -webkit-text-decorations-in-effect: initial; -webkit-text-fill-color: initial; -webkit-text-security: initial; -webkit-text-stroke: initial; -webkit-user-drag: initial; white-space-collapse: initial; widows: initial; width: initial; will-change: initial; word-break: initial; word-spacing: initial; x: initial; y: initial; z-index: 2147483647;"><link rel="stylesheet" href="chrome-extension://hokifickgkhplphjiodbggjmoafhignh/fonts/fabric-icons.css"></div></div></editor-card></html>
`