module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/mockfirebase/browser/mockfirebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'test/lib/**/*.js',
      'app/app.js',
      'app/config.js',
      'app/components/**/*.js',
      'app/account/**/*.js',
      'app/chat/**/*.js',
      'app/home/**/*.js',
      'app/login/**/*.js',
      'app/config_test.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
