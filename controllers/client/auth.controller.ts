import { Request, Response } from "express";
import User from "../../models/user.model";
import * as generate from "../../helpers/generate"



// [GET] /auth/register
export const upsertUserSocialMedia = async (res: Response, typeAcc, dataRaw) => {
    try {
        let user = null
        user = await User.findOne(
            {
                email: dataRaw.email,
                type: typeAcc
            }
        )
        if (!user) {
            user = new User({
                fullName: dataRaw.fullName,
                email: dataRaw.email,
                type: typeAcc,
                avatar: dataRaw.avatar,
                tokenUser: generate.generateRandomString(20)
            })
            await user.save()
        } 
        return user
    }catch(error) {
        console.log(error)
    }
}