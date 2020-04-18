/*
Các bước minify: 
    + minify js: https://www.minifier.org/
    + minify text: https://codebeautify.org/text-minifier
    + replace `` thành '': dùng code editor
*/

javascript: (function() {
    console.log('hacked by hoang tran');

    _utils = {
        getPlayer: () => gunners.find(g => g.id == socket.id),
        getPosVector: (pos) => createVector(pos.x, pos.y),
        getClosestEnermy: () => {
            let player = _utils.getPlayer();
            let closestDist = 10000;
            let closestE = null;
            for (let g of gunners) {
                if (g == player || g.dead) continue;

                let mouse = _camera.screenToWorld({
                    x: mouseX,
                    y: mouseY
                });

                let d = dist(mouse.x, mouse.y, g.pos.x, g.pos.y);
                if (d < closestDist) {
                    closestDist = d;
                    closestE = g;
                }
            }
            return closestE;
        }
    };

    _hack = {
        scale: 1,
        autoAim: true,
        lineToEnermy: true,

        run: function() {
            // begin hack

            _registeredMethods['pre'].push(function() {
                // aim hack
                if (_hack.autoAim && mouseIsPressed) {
                    let closestEnermy = _utils.getClosestEnermy();

                    if (closestEnermy) {
                        let ePos = _camera.worldToScreen(closestEnermy.pos);

                        mouseX = ePos.x;
                        mouseY = ePos.y;
                    }
                }
            });

            _registeredMethods['post'].push(function() {

                let player = _utils.getPlayer();

                // scale hack
                _camera.scale = _hack.scale;

                // line hack
                if (_hack.lineToEnermy) {
                    strokeWeight(2);

                    for (let g of gunners) {

                        if (g.id == player.id) continue;

                        let ePos = _camera.worldToScreen(g.pos);
                        let pPos = _camera.worldToScreen(player.pos);
                        let distance = ~~dist(g.pos.x, g.pos.y, player.pos.x, player.pos.y);


                        let evPos = _utils.getPosVector(ePos);
                        let pvPos = _utils.getPosVector(pPos);
                        let direction = p5.Vector.sub(evPos, pvPos).setMag(200);
                        let tPos = p5.Vector.add(pvPos, direction);

                        if (g.dead) {
                            stroke('gray');
                        } else {
                            stroke('red');
                            text(distance, tPos.x, tPos.y);
                        }

                        line(ePos.x, ePos.y, pPos.x, pPos.y);
                    }
                }
            });
        }
    };


    // ========================= DOM ============================

    _dom = {};

    const initDom = function() {
        let _hackUI = $(`
        		<div id="hack-container">
					<p>HACKED by HOANGTRAN</p>

        			<span>Scale:</span>
        			<input id="sldScale" type="range" min="0.01" max="1" step="0.01" value="1"/><br/>	

					<span>Line to enermy:</span>
					<input id="chkLine" type="checkbox" checked/><br/>

					<span>Auto Aim:</span>
					<input id="chkAim" type="checkbox" checked/>
					
        		</div>
        	`);

        _hackUI.appendTo('body');

        $("head").append(`<style>
			#hack-container {
				position:fixed; 
				z-index:10; 
				bottom:10px; 
				left:10px; 
				background: #489e;
				color: white;
				font-size: 12px; 
				padding:5px; 
				opacity: 0.4;
			}
			#hack-container:hover {
				opacity: 1;
			}
			#hack-container p {
				text-align: center;
			}
			#hack-container input {
				display: inline-block;
			}
        </style>`);

        //  scale
        _dom.scaleSlider = $('#sldScale');
        _dom.scaleSlider.on('input', function() {
            _hack.scale = Number($(this).val());
        });

        // line to enermy
        _dom.lineToEnermy = $('#chkLine');
        _dom.lineToEnermy.on('input', function() {
            _hack.lineToEnermy = $(this).is(":checked");
        });

        // auto aim
        _dom.autoAim = $('#chkAim');
        _dom.autoAim.on('input', function() {
            _hack.autoAim = $(this).is(':checked');
        });
    };

    initDom();
    _hack.run();


    // socket.emit('room create', {
    //     mode: 'CREATIVE',
    //     maxPlayer: 5,
    //     text: "Hack - Auto generated!!"
    // })
})()