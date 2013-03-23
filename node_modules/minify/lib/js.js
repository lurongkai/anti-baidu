/* сжимаем код через uglify-js */

(function(){
    "use strict";
    
    var main        = global.minify.main,
        Util        = main.util,
        uglify      = main.require("uglify-js"),
        
        ErrorMsg    =   'can\'n load uglify-js          \n' +
                        'npm install uglify-js          \n' +
                        'https://github.com/mishoo/UglifyJS';
    
    /** 
     * minify js data.
     * if can not minify return pData
     * 
     * @param pData
     */
    exports._uglifyJS = function (pData){
        if(uglify){
            var jsp = uglify.parser,
                pro = uglify.uglify,
                /* parse code and get the initial AST */
                ast = jsp.parse( pData.toString() );
            
            ast = pro.ast_mangle(ast);  /* get a new AST with mangled names             */
            ast = pro.ast_squeeze(ast); /* get an AST with compression optimizations    */
            pData = pro.gen_code(ast);  /* compressed code here                         */
        }
        else
            Util.log(ErrorMsg);
        
        return pData;
    };

})();