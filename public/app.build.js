({
    appDir: "app-dev",
    baseUrl: "js",
    dir: "app",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS.
    //optimize: "none",

    paths: {
        "jquery": "lib/require-jquery",
		"socket.io": "empty:"
    },

    modules: [
        {
            name: "main",
            exclude: ["jquery"]
        }
    ]
})