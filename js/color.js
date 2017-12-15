
//Calls the wrapper function for the JavaScript to be used
let wrapperEl = document.querySelector('.wrapper');

//Any number between 10 and 100 should be fine, but any thing above, the page will load slowly
let numberOfEls = 10;

//How long it will take for the ripples to be drawn
let duration = 10000;
let delay = duration / numberOfEls;

//This is important as it allows each ring to be drawn without conflicting with the other rings.
let gap = 30;

//This allows us to restart the ripples at the start after ending
let tl = anime.timeline({
    duration: delay / 1,
    complete: function () { tl.restart(); }
});

//This function is important as it allows the ripples to be drawn
function createEl(i) {
    //Creates it own div class, this is tricky - see colors.html
    let el = document.createElement('div');

    //The ripples rotates in according to how many rings are there
    let rotate = (1080 / numberOfEls) * i;
    let translateY = -(numberOfEls - i) * .1;
    let hue = Math.round(180 / numberOfEls * i);

    //Tells how the wide the circles will be
    let diameter = gap + (i * gap);
    let scale = (diameter + gap) / diameter;
    el.classList.add('el');

    //This refers to the depth, or position of the z plane
    el.zIndex = 1;

    //Decides on where the position of each rings are.
    el.style.width = diameter + 'px';
    el.style.height = diameter + 'px';

    //This doesn't have style in order to offset the position
    el.marginTop = -(diameter / 2) + 'px';
    el.style.marginLeft = -(diameter / 2) + 'px';

    //Needed to block the black outlines that first show upon loading
    el.style.opacity = 0;

    //Adds the color to the rings
    el.style.color = 'hsl(' + hue + ', 10%, 10%)';

    //Calls the tl created earlier
    tl.add({

        //Starts the animation
        begin: function () {
            anime({
                targets: el,
                opacity: [0, 1],
                color: ['hsl(' + hue + ', 10%, 10%)', 'hsl(' + hue + ', 50%, 50%)'],
                translateY: [0, translateY],
                rotate: [0, 90],

                //Allows the rings to appear and dissappear easily
                borderRadius: {
                    value: ['30%', '50%'],
                    easing: 'easeInOutQuad'
                },
                easing: 'easeInOutSine',
                direction: 'alternate',
                duration: duration / 4
            });
        }
    });

    //Modifies the wrapper div to accomidate the code
    wrapperEl.appendChild(el);
};

//Allows the animation to play
for (let i = 0; i < numberOfEls; i++) createEl(i);
let playPause = anime({
    targets: '#playPause .el',
    translateX: 250,
    delay: function (el, i, l) { return i * 100; },
    direction: 'alternate',
    loop: true,
    autoplay: false
});

//document.querySelector('#playPause .play').onclick = playPause.play;
//document.querySelector('#playPause .pause').onclick = playPause.pause;