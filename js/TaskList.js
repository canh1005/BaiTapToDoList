function TaskList(){
    this.arr = [];
    this.addTask = function(Task){
        this.arr.push(Task);
    }
    this.timViTri = function(id){
        return viTri = this.arr.findIndex(function(item){
            return item.id === id;
        });
    }
    this.deleteTask = function(id){
        var index = this.timViTri(id);
        if(index != -1){
            this.arr.splice(index,1);
            alert("Delete Complete!");
        }
    }
    this.getTaskById = function(id){
        return this.arr.find(function(item){
            return item.id === id;
        });
    }
}