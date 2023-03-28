import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router"

class Api{
    private table = ''

    // 设置table
    setTable(table:string){
        this.table = table
        return this
    }

    // 获取数据
    get(id:number | string | LocationQueryValue[] = 0){
        if(!id){
            return http.request({url:this.table})
        }
        return http.request({url:this.table+'/'+id})
    }

    // 获取显示列表数据
    show(data:Object){
        return http.request({method:'post',url:this.table+'/show',data:data})
    }

    // 新增数据
    add(data:object){
        return http.request({
            method:'post',
            url: this.table+'/add',
            data: qs.stringify(data)
        })
    }

    // 修改数据
    mod(data:object){
        return http.request({
            method:'post',
            url: this.table+'/mod',
            data: qs.stringify(data)
        })
    }

    // 保存数据
    save(data:object){
        return http.request({
            method:'post',
            url: this.table+'/save',
            data: qs.stringify(data)
        })
    }

    // 删除数据
    del(id:string|number){
        return http.request({
            method:'post',
            url: this.table+'/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Api()