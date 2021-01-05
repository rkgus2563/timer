String.prototype.zero = function(){
    return this.substring(this.length - 2);
}

window.onload = function(){
    const h = $(".h"); //각 시,분 초를 나타내는 dom을 가져온다. 가져온 돔은 제이쿼리 객체다.
    const m = $(".m");
    const s = $(".s");

    let timeLabel = [h, m, s];
    
    let clicks = false;
    $("#start").on("click", e => {
        if(!clicks) {
            $("#start").html("<i class='fas fa-pause'></i>");
            clicks = true;
        } else {
            $("#start").html("<i class='fas fa-play'></i>");
            clearInterval(timerId);
            clicks = false;

            return;
        }
        
        let time = h.text() * 3600 + m.text() * 60 + s.text() * 1;
        timerId = setInterval(()=>{
            time--;

            let hour = "00" + Math.floor(time / 3600); //시간을 구한다.
            let min = "00" + Math.floor((time - hour * 3600) / 60); //분을 구한다.
            let sec = "00" + time % 60;

            h.text(hour.zero());
            m.text(min.zero());
            s.text(sec.zero());
            //자릿수가 한자리 일때도 앞에 0이 붙어서 나오도록 변경해라.
            if(time <= 0){
                clearInterval(timerId); //시간이 0이되면 타이머를 멈춘다.
            }
        }, 1000);
    });


    const spins = $(".spin"); //3개의 스핀을 가져온다.
    let ends = [23, 59, 59];
    for(let i = 0; i < 3; i++){
        fillNumber(spins.eq(i), ends[i]);
    }


    function fillNumber(target, endNumber){
        target.empty(); //타겟내에 있는거 지우고
        target.append(`<div class="block">--</div><div class="block">--</div>`);
        for(let i = 0; i <= endNumber; i++){
            target.append(`<div class="block">${ (i + "").zero() }</div>`);
        }
        target.append(`<div class="block">--</div><div class="block">--</div>`);
    }

    let isDrag = false;
    let target = undefined;
    let startY = undefined;

    let max = [-920, -2320, -2320];
    $(".spin").on("mousedown", e => {
        isDrag = true;
        target = e.currentTarget;
        startY = e.pageY;
    });
    $(".spin").on("mousemove", function(e) {
            if(!isDrag) return;

        let delta = (startY - e.pageY) / 10; //속도 10분의1


        let top = parseInt($(target).css("top"));
        top -= delta;
        if(top > 0) top = 0;
        if(top < max[$(this).index()]) top = max[$(this).index()];
    
        //23 * 40 = 920
        $(target).css({top: `${top}px`});
        start = e.offsetY;
    });
    $("#popup").on("mouseup", e => {
            isDrag = false;
            let top = parseInt($(target).css("top"));
            top = Math.floor(top/40)*40;
            $(target).animate({top: `${top}px`}, 300);
    });

    $("#saveBtn").on("click", e => {
        $(".total").html("");
        $(".spin").each( (idx, item) => {
            let top = parseInt($(item).css("top"));
            top = Math.abs(top / 40); 
            timeLabel[idx].html( ("00" + top ).zero()  );
            $(".total").html($(".total").text() + ("00" + top ).zero()); 
            if(idx != 2) $(".total").html($(".total").text() + ":");           
        });
        $("#popup").fadeOut(500);
    });

}
