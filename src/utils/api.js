import request from '@u/request'

const APPID = 'wx840c12eab0902958'
const url = process.env.NODE_ENV === 'production' ? '/' : '/api'

export function getActivityList() {
    const data = {
        action: 'custmng.getCampaignList',
        data: {
            appId: APPID
        }
    }
    return request({
        url,
        data,
        method: 'POSt'
    })
}