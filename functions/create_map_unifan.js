//Imports
const mongoose = require('mongoose')
const UnifanMap = require('../models/Unifan_map')

//Enviroment Variables
const db_user = process.env.DB_TI_USER
const db_pass = process.env.DB_TI_PASSWORD
const cluster = process.env.DB_TI_CLUSTER
const db_name = process.env.DB_TI_NAME

exports.handler = async function (event, context){
    //Connection with MongoDB Atlas
    let connection = await mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@${cluster}.qk8butq.mongodb.net/${db_name}?retryWrites=true&w=majority`)

    //Check if connetion succeeded
    if(connection){
        console.log('Connection successful!')
    }else{
        return{
            statusCode: 500,
            body: JSON.stringify({
                resposta: "Connection failed."
            })
        }
    }

    // Destructuring variabels
    const eventBody = await JSON.parse(event.body)
    let { CURSO, MODALIDADE, VESPERTINO, NOTURNO } = eventBody

    // Discipline object if VESPERTINO and NOTURNO needs to be registered
    if (VESPERTINO && NOTURNO){
        let newMap = {
            CURSO,
            MODALIDADE,
            VESPERTINO,
            NOTURNO
    }
    // Create discipline
    try {
        await UnifanMap.create(newMap)
        return{
            statusCode: 200,
            body: JSON.stringify({
                resposta: 'Map registered'
            })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                resposta: 'It was not possible to registrate this map'
                })
            }
        }
    }
    // Discipline object if only VESPERTINO needs to be registered
    else if (VESPERTINO){
        let newMap = {
                CURSO,
                MODALIDADE,
                VESPERTINO
        }
        // Create discipline
        try {
            await UnifanMap.create(newMap)
            return{
                statusCode: 200,
                body: JSON.stringify({
                    resposta: 'Map registered'
                })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    resposta: 'It was not possible to registrate this map'
                })
            }
        }
    }
    // Discipline object if only NOTURNO needs to be registered
    else if (NOTURNO){
        let newMap = {
            CURSO,
            MODALIDADE,
            NOTURNO
    }
    // Create Discipline
    try {
        await UnifanMap.create(newMap)
        return{
            statusCode: 200,
            body: JSON.stringify({
                resposta: 'Map registered'
            })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                resposta: 'It was not possible to registrate this map'
                })
            }
        }
    }
}