Vue.use(Buefy.default)



var today = new Date();
var todaymonths = today.getMonth(); 
var monthsNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
//Current Month
//alert(cm);



var vm = new Vue({
    el: '#app',
    data: {
        startLoading : true,
        sociosData : [],
        sociosPerDay : [],
        currentMonth : monthsNames[todaymonths],
        daysInMonth : new Date(today.getFullYear(), today.getMonth()+1, 0).getDate(),
        randomfigure : ['01.svg', '02.svg','03.svg', '04.svg','05.svg', '06.svg', '07.svg', '08.svg','09.svg', '10.svg','11.svg', '12.svg', '13.svg','14.svg', '15.svg', '16.svg']
    },
    methods: {
        randomImage : function(){
            var rand = this.randomfigure[Math.floor(Math.random() * this.randomfigure.length)];
            return rand;
        },
    }
})




fetch('https://dragonbarbudo.com/api/redm-socios.php').then(
    function(u){ return u.json();}
  ).then(
    function(json){
        var sociosByDay = {};
        for(var indx in json){
            var thefecha = json[indx].Fecha;
            var thepart = thefecha.split('/');
            var theday = thepart[1];

            if( sociosByDay[theday]==undefined ){
                sociosByDay[theday] = [];
            }
            sociosByDay[theday].push(json[indx]);

        }
        vm.sociosPerDay = sociosByDay;
        vm.sociosData = json;
        vm.startLoading = false;
    }
  )