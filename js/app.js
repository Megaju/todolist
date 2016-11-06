var app = angular.module('todoApp', []);
app.controller('todoCtrl', function($scope, filterFilter, $http, $location) {
    
    // Liste des total tâches
    $scope.todos = [];
    $scope.placeholder = "Chargement . . .";
    $scope.status = {};
    
    $http.get('tasks.php').success(function(data){
        $scope.todos = data;
        $scope.placeholder = "Ajouter une nouvelle tâche";
    })
    
    // Nombres de tâches en cours + détecter si tout est coché (voir fonction checkAllTask)
    $scope.$watch('todos', function(){
        $scope.nbTaskUncompleted = filterFilter($scope.todos, {completed:false}).length;
        $scope.nbTaskCompleted = filterFilter($scope.todos, {completed:true}).length;
        $scope.allChecked = !$scope.nbTaskUncompleted;
    }, true) // on ajoute true en 3e paramètre pour dire qu'on l'observe tout le temps!
    
    // Tri des tâches par : toutes / en cours / finis
    if ($location.path() == '') {
        $location.path('/');
    };
    
    $scope.location = $location;
    $scope.$watch('location.path()', function(path){
        $scope.status = 
            (path == '/activetasks') ? {completed : false} : 
            (path == '/completetasks') ? {completed : true} : 
            {};
    });
    
    // Fonction d'ajout de tâche
    $scope.addTask = function() {
        $scope.todos.push({
            name : $scope.newTask,
            completed : false
        });
        $scope.newTask = '';
    }
    
    // Fonction de supression des tâches
    $scope.removeTask = function(index) {
        $scope.todos.splice(index, 1); // on retire 1 élément à partir de l'élément lui-même.
    }
    
    // Fonction pour cocher toutes les tâches d'un coup
    $scope.checkAllTask = function(allChecked) {
        $scope.todos.forEach(function(todo){ // boucle foreach avec AngularJS
            todo.completed = allChecked;
        })
    }
    
    // Fonction pour confirmer la modification de la tâche
    $scope.editTask = function(todo) {
        todo.editing = false;
    }
    
});