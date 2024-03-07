import axios from "axios";
import {isEmpty} from "../../utils/utils";

export async function getPlantLights() {
    let result = "";
    await axios.get('/service/dryGarden/clList', {
        params: {
            apiKey: '20240304MO67LTIT7335EJIUMK94WG',
            // cntntsNo: 1,
            pageNo: 1,
            numOfRows: 10
        }
    }).then(async (res) => {
        console.log('res', res)
        // const items = res.data.response.body.items.item;
        // if(!isEmpty(items)) {
        //     result = items;
        // } else {
        //     result = '없음';
        // }
    });
    return result;
}