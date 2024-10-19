const Services = require('./services.js')


const services = new Services()


class Controler {



    async scan(req, res) {

        try {

            if (globalThis.isScanning) {
                res.status(200).json({
                    message: "scanning!!"
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
                message: "scanning!!"
            })

            globalThis.isScanning = true

            await services.executeScan(kverify, Cookie)

            globalThis.max_age_data = Date.now() + 120 * 1000

            globalThis.isScanning = false;






        } catch (error) {
            console.log(error);
            globalThis.isScanning = false;
            res.status(500).json({
                message: "have wrong scan server"
            })


        }
        finally {
            globalThis.isScanning = false; // Đảm bảo cờ isScanning được tắt
        }


    }



}


module.exports = Controler