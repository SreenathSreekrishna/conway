const SIZE=100;
var html=('<tr>'+('<td></td>'.repeat(SIZE))+'</tr>').repeat(SIZE);
$('table').html(html);
$('td').click(function(e){
    if (this.id=='grey'){
        this.id='black';
    }
    else {
        this.id='grey';
    }
})
function get_vals(){
    var vals = [];
    var chidders = $('table').children();
    for (var i of chidders){
        var tmp=[];
        var chidders_chidders = $(i).children();
        for (var j of chidders_chidders){
            if (j.id == 'grey'){
                tmp.push(1);
            }
            else {
                tmp.push(0);
            }
        }
        vals.push(tmp);
    }
    return vals;
}
class Game{
    constructor (size){
        this.size=size
        this.game=[];
        for (var i = 0; i<size; i++){
            var tmp = [];
            for (var j = 0; j<size; j++){
                tmp.push(0);
            }
            this.game.push(tmp);
        }
    }
    count_neighbours(x,y){
        var neigh=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
        var final=0
        for (var i of neigh){
            try{
                var one = x+i[0];
                var two = y+i[1];
                if (one<0 || two<0){
                    throw Error();
                }
                var cell=this.game[one][two]
                if (cell){
                    final++;
                }
            }
            catch(err){
                continue;
            }
        }
        return final;
    }
    progress(){
        var g = [];
        for (var i of this.game){
            var tmp = [];
            for (var j of i){
                tmp.push(j)
            }
            g.push(tmp)
        }
        for (var i = 0; i<this.size; i++){
            for (var j = 0; j<this.size; j++){
                var neighbours = this.count_neighbours(i,j);
                if (neighbours<2){
                    g[i][j] = 0;
                }
                else if (neighbours>3){
                    g[i][j] = 0;
                }
                else if (neighbours==3){
                    g[i][j] = 1;
                }
            }
        }
        this.game = g;
    }
    reflect() {
        var data = [];
        var chidders = $('table').children();
        for (var i in this.game){
            var tmp = $(chidders[i]).children();
            for (var j in this.game[i]){
                var id = this.game[i][j];
                if (id){
                    tmp[j].id = 'grey';
                }
                else {
                    tmp[j].id = 'black';
                }
            }
        }
    }
}
function decodePreset(preset){
    var end = []
    for (var j = 0; j<SIZE; j++){
        var i = preset[j];
        i = i ? i : '0';
        var tmp = [];
        var vals = i.toString(2).padStart(SIZE,'0');
        for (var k of vals){
            tmp.push(Number(k));
        }
        end.push(tmp)
    }
    return end;
}
function progress(){
    game.game = get_vals();
    game.progress();
    game.reflect();
}
var PRESETS = {
    glider:[0, 2305843009213694000, 1152921504606847000, 8070450532247929000],
    glider_gun:[0, 274877906944, 1374389534720, 1695447332683776, 2399134774460416, 6922109593082397000, 6922421029750964000, 4574243249455104, 2392537302040576, 1688849860263936]
}
var time = 1;
var game = new Game(SIZE);
game.game = get_vals();
$('#start').click(function(e){
    setInterval(progress,time);
})
function createPreset(name){
    var st=[];
    for (var i of get_vals()){
        var tmp="";
        for (var j of i){
            tmp+=j;
        } 
        st.push(parseInt(tmp,2))
    }
    PRESETS[name] = st;
    $('body').append(`<button onclick="usePreset(PRESETS['${name}'])">${name}</button>`)
}
function usePreset(preset){
    game.game = decodePreset(preset);
    game.reflect();
}
function _new(){
    $('body').append('<input type="text" autofocus>');
    $('input').keypress(function(e){
        if (e.key == 'Enter'){
            createPreset(this.value);
            this.remove();
        }
    });
}