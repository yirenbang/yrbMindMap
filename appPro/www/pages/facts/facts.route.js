angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tabs.facts', {
          url: "/facts",
          views: {
            'home-tab': {
              templateUrl: "pages/facts/facts.html"
            }
          }
        });
//add router
})