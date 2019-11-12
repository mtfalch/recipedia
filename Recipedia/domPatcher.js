//DomPatcher
//Author: Alphaarrius
//Description: Rendering Utility
//Version:
//  Span Difference Patching v0.1
(
    function(global){

        function isDef(r){
            return r !== null && r !== undefined;
        }

        var $keys = Object.keys;
        function keys(r){
            return $keys.call(null, r);
        }

        function $spanDiffPatching($element, $template){

            const   STRUCTURAL_INCOMPATABLE_ERROR = 1,
                    ELEMENTARY_INCOMPATABLE_ERROR = 2;
            
            var $elementTree = {},
                $elementTrace = [],
                $elementSpan = [],
                $templateSpan = [],
                $renderBuffer = [];

            function $iterate(index, $el, $tree, $trace, $span){
                if(isDef($tree))
                    $tree[index] = {};
                var $nodes = $el.childNodes;
                if(!$nodes)
                    return;
                var $node;
                for($node of $nodes){
                    if(isDef($trace))
                        $trace.push($node);
                    var subIndex = $span.push($node.cloneNode()) - 1;
                    if(isDef($tree))
                        $tree[index][subIndex] = {};
                    $iterate(subIndex, $node, $tree, $trace, $span);
                }
            }
            
            $elementTrace.push($element);
            $elementSpan.push($element.cloneNode());
            $iterate(0, $element, $elementTree, $elementTrace, $elementSpan);
            $templateSpan.push($template.cloneNode());
            $iterate(0, $template, null, null, $templateSpan);

            var elementSpanLength = $elementSpan.length;
            var templateSpanLength = $templateSpan.length;
            if(elementSpanLength != templateSpanLength)
                return STRUCTURAL_INCOMPATABLE_ERROR;
            
            var i; for(i = 0; i < elementSpanLength; i++){

                var $nodeE = $elementSpan[i];
                var nodeEType = $nodeE.nodeType;
                var $nodeT = $templateSpan[i];
                var nodeTType = $nodeT.nodeType;

                if(nodeEType != nodeTType)
                    return ELEMENTARY_INCOMPATABLE_ERROR;
                
                if(nodeEType == 1 || nodeEType == 2)
                    $nodeE.innerHTML = '';
                if(nodeTType == 1 || nodeTType == 2)
                    $nodeT.innerHTML = '';

                var rawE = nodeEType == 3 ?
                    $nodeE.textContent :
                    $nodeE.outerHTML;

                var rawT = nodeTType == 3 ?
                    $nodeT.textContent :
                    $nodeT.outerHTML;

                if(rawE != rawT)
                    $renderBuffer.push(i);

            }

            for(i = templateSpanLength - 1; i >= 0; i--){
                var branch = $elementTree[i];
                var twig; for(twig of keys(branch)){
                    var nodeType = $templateSpan[i].nodeType;
                    if(nodeType == 1 || nodeType == 2){
                        $templateSpan[i].appendChild(
                            $templateSpan[twig]);
                    }
                }
            }

            var update; for(update of $renderBuffer){
                if(update == 0)
                    continue;
                var nodeType = $elementTrace[update].nodeType;
                if(nodeType == 3)
                    $elementTrace[update].textContent = 
                        $templateSpan[update].textContent;
                if(nodeType == 1 || nodeType == 2)
                    $elementTrace[update].outerHTML = 
                        $templateSpan[update].outerHTML;
            }
            
            return 0;

        }

        global.spanDiffPatching = $spanDiffPatching;

    }
)(this);