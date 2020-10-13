function Validation(){
    this.ktraRong = function(taskName, spanId, mess){
        if(taskName === ""){
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = mess;
        return true;
    }
    this.ktraTrung = function(taskName,spanId,mess,taskList){
        var trungTen = false;
        trungTen = taskList.some(function(item){
            return item.taskName === taskName;
        })
        if(trungTen){
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = mess;
        return true;
    }
}