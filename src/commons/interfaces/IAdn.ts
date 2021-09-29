import  mongoose  from "mongoose";

export interface IAdn{
    adn: string;
    isMutant: boolean
}

export interface AdnModelInterface extends mongoose.Model<AdnDoc>{
    build(attr: IAdn): AdnDoc
}

interface AdnDoc extends mongoose.Document{
    adn: string;
    isMutant: boolean
}