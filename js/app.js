var app = angular.module('todoApp', []);
app.controller('todoCtrl', function($scope, filterFilter) {
    
    // Liste des total tâches
    $scope.todos = [
        {
            name : 'Tâche incomplète',
            completed : false
        },
        {
            name : 'Tâche complète',
            completed : true
        }
    ];
    
    // Nombres de tâches en cours + détecter si tout est coché (voir fonction checkAllTask)
    $scope.$watch('todos', function(){
        $scope.nbTaskUncompleted = filterFilter($scope.todos, {completed:false}).length;
        $scope.nbTaskCompleted = filterFilter($scope.todos, {completed:true}).length;
        $scope.allChecked = !$scope.nbTaskUncompleted;
    }, true) // on ajoute true en 3e paramètre pour dire qu'on l'observe tout le temps!
    
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
    
});