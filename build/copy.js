var fs = require('fs');
var path = require('path');
var stat = fs.stat;
var inputDir =  path.join(__dirname + "/input");
var outputDir =  path.join(__dirname + "/output");

/*
05
 * 复制目录中的所有文件包括子目录
06
 * @param{ String } 需要复制的目录
07
 * @param{ String } 复制到指定的目录
08
 */
var copy = function( src, dst ){
  // 读取目录中的所有文件/目录
  fs.readdir( src, function( err, paths ){
    if( err ){
      throw err;
    }

    paths.forEach(function( path ){
      var _src = src + '/' + path,
        _dst = dst + '/' + path,
        readable, writable;      

      stat( _src, function( err, st ){
        if( err ){
          throw err;
        }
        // 判断是否为文件
        if( st.isFile() ){
          // 创建读取流
          readable = fs.createReadStream( _src );
          // 创建写入流
          writable = fs.createWriteStream( _dst ); 
          // 通过管道来传输流
          readable.pipe( writable );
        }
        // 如果是目录则递归调用自身
        else if( st.isDirectory() ){
          exists( _src, _dst, copy );
        }
      });
    });
  });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
  fs.exists( dst, function( exists ){
    // 已存在
    if( exists ){
      callback( src, dst );
    }
    // 不存在
    else{
      fs.mkdir( dst, function(){
        callback( src, dst );
      });
    }
  });
};
 
// 复制目录
function transform(inputDir, outputDir) {
  // 事先删除文件
  deleteFolderRecursive(outputDir);
  exists( inputDir, outputDir, copy );
}

/**
 *
 * @param {*} url
 */
function deleteFolderRecursive(url) {
  let files = [];
  /**
   * 判断给定的路径是否存在
   */
  if (fs.existsSync(url)) {
    /**
     * 返回文件和子目录的数组
     */
    files = fs.readdirSync(url);
    files.forEach(function (file, index) {
      const curPath = path.join(url, file);
      // console.log(curPath);
      /**
       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
       */
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    /**
     * 清除文件夹
     */
    fs.rmdirSync(url);
  } else {
    // console.log("给定的路径不存在，请给出正确的路径");
  }
}

// transform(inputDir, outputDir);
module.exports = transform;
