const readXlsxFile = require('read-excel-file/node');
module.exports =
    Readxlsx=async()=>{
        const schema  = {   
            'RK':{
                prop:'rank',
                type:Number,
            },
            'NAME':{
                prop:'name',
                type: String
            }, 
            'TEAM':{
                prop:'team',
                type: String
            }, 
            'POS':{
                prop:'pos',
                type: String
            }, 
            'BYE WEEK':{
                prop:'bye',
                type: Number
            }

        }
        console.log('redXlsx')
       let players=await readXlsxFile('./pList.xlsx',{schema})
       return players
    }
