import request from '@/utils/request' /**utils下的request.js文件对axios进行了封装，直接引用即可 */

/**模块化写法 */
export default{
  //获取list列表
  getHospSetList(pageIndex,pageSize,searchObj){
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${pageIndex}/${pageSize}`, //请求的路径 
      method: 'post',      //请求的方式
      data: searchObj      //data 使用json传递参数
    })
  },
  //根据id删除
  deleteHospSetById(id){
    return request({
      url: `/admin/hosp/hospitalSet/delete/${id}`, //请求的路径 
      method: 'delete'      //请求的方式
    })
  },
  //批量删除
  brachHospSetByIds(list){
    return request({
      url: `/admin/hosp/hospitalSet/deleteBatchByIds`, //请求的路径 
      method: 'delete',      //请求的方式
      data: list    //data：采用json数据传到后端，因为后端加了@RequestBody
    })
  },
  //锁定与取消锁定
  lockHospSet(id,status){
    return request({
      url: `/admin/hosp/hospitalSet/lockHospSet/${id}/${status}`, //请求的路径 
      method: 'put'      //请求的方式
    })
  },
  //新增医院数据
  insertHospitalSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/insertHospitalSet`, //请求的路径 
      method: 'post',      //请求的方式
      data: hospitalSet
    })
  },
  //根据id获取医院对象
  getHospSetById(id){
    return request({
      url: `/admin/hosp/hospitalSet/getHospSetById/${id}`, //请求的路径 
      method: 'get'      //请求的方式
    })
  },
  //修改医院的数据
  updateHospSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/updateHospSetById`, //请求的路径 
      method: 'post',      //请求的方式
      data: hospitalSet
    })
  }
}


