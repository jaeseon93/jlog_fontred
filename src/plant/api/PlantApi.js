import axios from "axios";
import XMLParser from "react-xml-parser/xmlParser";


export default async function getGardenList(params) {
    console.log('params', params)
    return await axios.get('/service/garden/gardenList', {
        params: {
            apiKey: process.env.REACT_APP_NONGSARO_API_KEY,
            pageNo: params.pageNo,
            numOfRows: params.numOfRows
        }
    }).then(async (response) => {
        let gardenList = [];
        const resultList = [];
        const xmltoJson = new XMLParser().parseFromString(response.data);
        const jsonData = xmltoJson.children[1].children[0].children;
        if (jsonData.length !== 0) {
            gardenList = await jsonData.filter(row => row.name === 'item');
            gardenList && gardenList?.map((element) => {
                element.children.filter(row=>row.name === "rtnThumbFileUrl").map((url, key) => {
                    resultList.push(url.value.split('|',1));
                });
            });
            return resultList;
        }
    })
}

