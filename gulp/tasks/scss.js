import dartSass from "sass";
import gulpSass from "gulp-sass";

import autoPrefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
    return (
        app.gulp
            .src(app.path.src.scss, { sourcemaps: app.isDev })
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: "SCSS",
                        message: "Error: <%= error.message %>",
                    })
                )
            )

            .pipe(app.plugins.replace(/@img\//g, 'images/'))

            .pipe(sass({ outputStyle: "expanded" }))

            .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))

            .pipe(
                app.plugins.if(
                    app.isBuild,
                    autoPrefixer({
                        grid: true,
                        overrideBrowserslist: ["last 3 versions"],
                        cascade: true,
                    })
                )
            )

            .pipe(app.gulp.dest(app.path.build.css))
            .pipe(app.plugins.browserSync.stream())
    );
};
