module.exports = function(grunt){
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      img: {expand: true, cwd: '../src/images/', src: '*', dest: '../app/images/'},
      html: {expand: true, cwd: '../src/html/', src: '*', dest: '../app/html/'}
    },
    sass: {                              
      builda: {
        options: {                      
          style: 'expanded',
          map:false
        },
        files: {                        
          '../src/css/base.css': '../src/css/base.scss'
        }
      },
      buildb: {
        options: {                      
          style: 'expanded',
          map:false
        },
        files: {                        
          '../src/css/xxxx.css': '../src/css/xxxx.scss'
        }
      }
    },
    autoprefixer:{
      options:{
        browserslist:['last 2 versions','chrome','ie'],
        map:false
      },
      mutiple_files: {
        expand: true,
        flatten: true,
        src: '../src/css/*.css',
        dest: '../app/css/'
      }
    },
    cssmin: {
      options: {
        stripBanners: true,
        banner: '/*! <%=pkg.name %>-<%=pkg.version%>.css <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      builda: {
        src: '../app/css/base.css',
        dest: '../app/css/base.css'
      },
      buildb: {
        src: '../app/css/xxxx.css',
        dest: '../app/css/xxxx.css'
      }
    },
    // concat: {
    //   build: {
    //     src: ['../src/js/zepto.min.js','../src/js/xxxx.js'],
    //     dest: '../app/js/xxxx.js'
    //   }
    // },
    uglify: {
      options: {
        stripBanners: true,
        banner: '/*! <%=pkg.name %>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      builda: {
        src: ['../src/js/zepto.min.js'],
        dest: '../app/js/zepto.min.js'
      },
      buildb: {
        src: ['../src/js/xxxx.js'],
        dest: '../app/js/xxxx.js'
      }
    },
    inline: {
      demo: {
        options: {
          cssmin: true, 
          uglify: true  
        },
        src: [ '../app/html/*.html' ]
      }
    },
    usemin: {
      html: '../app/html/*.html'
    },
    watch:{
      build:{
        files:['../src/images/*','../src/html/*.html','../src/js/*.js','../src/css/*'],
        tasks:['sass','autoprefixer','uglify','cssmin','copy','inline','usemin'],
        options:{ spawn:false}
      }
    }
  });
  grunt.registerTask('default',[]);
};
// npm-check -u -g
// npm install -g browser-sync(全局)
// npm install browser-sync --save-dev
// E:/XX/目录下
// browser-sync start --server --files "E:/XX/src/css/*.css,E:/XX/src/images/*, E:/XX/src/html/*.html, E:/XX/src/js/*.js"
// http://localhost:3000/src/html/index.html
// npm install spy-debugger -g(全局)
// spy-debugger 192.168.1.10 9888
// ../Public/XX
