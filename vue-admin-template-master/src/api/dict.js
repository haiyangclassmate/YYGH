import request from '@/utils/request' /**utils下的request.js文件对axios进行了封装，直接引用即可 */

/**模块化写法 */
export default{
  //获取list列表
  getDictList(id){
    return request({
      url: `/admin/cmn/dict/getChildData/${id}`, //请求的路径 
      method: 'get'      //请求的方式
    })
  }
}


