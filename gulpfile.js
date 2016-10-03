var gulp = require('gulp');
var rimraf=require('gulp-rimraf');//删除文件
var rimraf_folder=require('rimraf');//删除目录
var runSenquence=require('run-sequence');//将task任务按顺序排列
var htmlmin = require('gulp-htmlmin');//压缩html代码
var ejs = require("gulp-ejs");//编译ejs模板
var uglify = require('gulp-uglify');//uglify 压缩js代码
var path=require("path");
var less=require("gulp-less");
var browserSync=require("browser-sync").create();

gulp.task('default',['copy'], function() {
   console.log('this is the default task')
   gulp.start('help');
});

gulp.task('copyjs',function(){
     console.log('copy src project to dist');
     return gulp.src("./src/js/modules/**/*.js").pipe(gulp.dest('./dist/js/modules'));
});
gulp.task('clean',function(){
    console.log('run clean  task: clean the dist directory');
    return gulp.src('./dist/*',{read:false}).pipe(rimraf({force:true}));
});

gulp.task('test-a',function(){
    console.log('run task test-a');
 })
gulp.task('test-b',function(){
    console.log('run task test-b');

})
gulp.task('test-c',function(){
    console.log('run task test-c');
})
var handlerError=function(){
    console.log("handlerError");
};
gulp.task('build-test',function(handlerError){
    //console.log('cb is:'+cb);
   
        handlerError();
    

    runSenquence('test-a','test-b','test-c');


});

gulp.task('build',function(){
    runSenquence(['clean'],'copy');
});


gulp.task('ejs',function(){
    console.log('ejs 模板编译task');
    return  gulp.src('./src/template/test.ejs').pipe(ejs(
        {testInfo:"王世平",
         delimiter:"@",
        _build: {
            version: "0.1.1",
            ts: "20160428",
            env: "env"
        }
        })).pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("./dist/"));
});

gulp.task('uglify',function(){
    console.log('task -->uglify');
    gulp.src("./src/js/**/*.js").pipe(uglify()).pipe(gulp.dest('./dist/js/'));

});

gulp.task("less",function(){
    console.log('task-->less');
    var path1=path.join(__dirname,'src','static','less','include');
    console.log(path1);
    return gulp.src('./src/static/less/*.less')
    .pipe(less({
        paths:[path.join(__dirname,'src','static','less','include')]
        }))
    .pipe(gulp.dest("./dist/static/css/"));
})

gulp.task("watch-less",function(){
    return gulp.watch("./src/static/less/*.less",function(){
        console.log("do less now");
        // gulp.start("less");
        runSenquence('less',function(error){
            if(error){
                console.log(error.message);
            }
            browserSync.reload();
        });
    })
});
gulp.task("watch-html",function(){
    return gulp.watch("./src/**/*.html",function(){
        runSenquence('copyhtml5','copyindex',function(error){
            if(error){
                console.log(error.message);
            }
            browserSync.reload();
        });

    })
});
gulp.task("watch-img",function(){
    return gulp.watch("./src/static/img/*",function(){
        runSenquence('copystatic',function(error){
            if(error){
                console.log(error.message);
            }
            browserSync.reload();
        });

    })
});
gulp.task("watch-js",function(){
    gulp.watch('./src/js/**/*.js',function(){
        runSenquence('uglify',function(error){
            if(error){
                conosole.log(error);
            }
        })
    })
    browserSync.reload();
});

gulp.task("copyhtml5",['copyindex'],function(){
    gulp.src("./src/html5/**/*.html").pipe(gulp.dest(path.join(__dirname,"dist","html5")));
});

gulp.task("copyindex",function(){
    gulp.src("./src/*.html").pipe(gulp.dest("./dist/"));
})

// gulp.task('copyjs',function(){
//      console.log('copy src project to dist');
//      return gulp.src("./src/js/").pipe(gulp.dest('./dist/js/modules'));
// });

gulp.task("copystatic",["clean"],function(){
    gulp.src(["./src/static/**","!./src/static/*less/**"]).pipe(gulp.dest("./dist/static/"));
});
gulp.task("run",function(){
    runSenquence('clean','copyhtml5','copystatic','uglify','watch',function(error){
        if(error){
            console.log(error.message);
        }
        browserSync.init({
            server: path.join('dist')
        })
    })
});

gulp.task("watch",function(){
    runSenquence('watch-html',"watch-less","watch-img",'watch-js',function(error){
        if(error){
            console.log(error.message);
        }
    })
});


gulp.task('help',function(){
    console.log("gulp build   文件打包");
    console.log('gulp watch    文件监控打包');
    console.log('gulp helo     gulp 参数说明');
    console.log('gulp -p     生产环境');
});


    