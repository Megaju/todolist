var app = angular.module('todoApp', []);
app.controller('todoCtrl', function($scope) {
    
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
    
    // Nombres de tâches en cours
    $scope.nbRask = 2;
    
    // Fonction de supression des tâches
    $scope.removeTask = function(index) {
        alert(index);
    }
    
});