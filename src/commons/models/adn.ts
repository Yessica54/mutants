import  mongoose  from "mongoose";
import {IAdn, AdnModelInterface} from '../interfaces/IAdn'


const adnSchema = new mongoose.Schema({
    adn: {
        type: String,
        required: true
    },
    isMutant: {
        type: Boolean,
        required: true
    }
})

adnSchema.statics.build = (attr: IAdn) => {
    return new Adn(attr)
}

const Adn = mongoose.model<any,AdnModelInterface>("Adn", adnSchema)
export {Adn} 