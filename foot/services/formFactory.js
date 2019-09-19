app.factory('Form',function(){
    return{
        checkedAction:function($scope,cl){
            $scope.sltAll = function(){
                $(cl).prop('checked',true)
            }
            $scope.cancel = function(){
                $(cl).prop('checked',false)
            }
            $scope.reverse = function(){
                $(cl).prop('checked',function(k , v){
                    return !v;
                })
            }
        },
        checkedValToJson:function(cl){
            var idsArr = []
            $.each($(cl),function(i,v){
                if($(v).prop('checked')){
                    idsArr.push($(v).val())
                }
            })
            idsStr = idsArr.join(',')
            var idsObj = {ids:idsStr}
            idsJson = JSON.stringify(idsObj)
            console.log(idsJson)
            return idsJson;
        }
    }
})