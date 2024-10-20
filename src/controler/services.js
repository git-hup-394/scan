const axios = require('axios');
const qs = require('qs');


class Services {


    async scan(kverify, Cookie, i) {
        console.log(i);

        try {
            const url = `https://sv.haui.edu.vn/ajax/register/action.htm?cmd=classbymodulesid&v=${kverify}`;
            const payload = qs.stringify({
                fid: i
            });

            const config = {
                headers: {
                    'Cookie': Cookie,
                    'Origin': 'https://sv.haui.edu.vn',
                    'Referer': 'https://sv.haui.edu.vn/register/',
                }
            };

            await axios.post(url, payload, config)
                .then(response => {
                    let data = response?.data?.data
                    if (data?.length) {
                        if (!globalThis.module_ids.include(i)) {
                            globalThis.new_module.push({ module_name: data[0].ModulesName, module_id: i, module_code: data[0].ModulesCode })
                        }
                    }

                })
                .catch(error => {
                });
        } catch (error) {

            console.log("error when scan id : ", i);


        }
    }


    async executeScan(kverify, Cookie, start = 2000, end = 11000) {
        globalThis.isScanning = true
        try {
            globalThis.new_module = []
            for (let i = start; i <= end; i++) {
                await this.scan(kverify, Cookie, i)
            }
        } catch (error) {
            console.log("err when execute scan : ", error);

        }
        globalThis.isScanning = false;
    }




}




module.exports = Services