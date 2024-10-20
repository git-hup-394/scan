const Services = require('./services.js')


const services = new Services()


class Controler {



    async scan(req, res) {

        try {

            console.log(globalThis.isScanning);


            if (globalThis.isScanning) {
                res.status(200).json({
                    message: "start scanning"
                })
                return

            }

            if (globalThis.max_age_data >= Date.now()) {
                res.status(200).json({
                    message: "ok",
                    dataScan: JSON.stringify(globalThis.new_module)
                })
                return

            }




            let { kverify, Cookie } = req.body


            res.status(200).json({
                message: "scanning!!!!"
            })

            await services.executeScan(kverify, Cookie, 2000, 2100)

            globalThis.max_age_data = Date.now() + 120 * 1000


        } catch (error) {
            console.log("err when scan", error);
            globalThis.isScanning = false;
            res.status(500).json({
                message: "have wrong scan server"
            })


        }


    }



}


module.exports = Controler