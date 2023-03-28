import { http } from "@/plugin/axios";
import qs from 'qs'

class User{
    table = 'user'

    check(data:object){
        return http.request({
            method:'post',
            url: this.table+'/check',
            data: qs.stringify(data)
        })
    }
}

export default new User()