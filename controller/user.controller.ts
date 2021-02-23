import { Request, Response } from "express";

import User from "../models/user";

export const getUsers = async ( req: Request, res: Response ) => {

    const users = await User.findAll()

    res.json(users)
}

export const getUser = async ( req: Request, res: Response ) => {

    const { id } = req.params

    const user = await User.findByPk( id )

    if(!user){
        return res.status(404).json({
            msg: `No existe el id ${id}`
        })
    }

    res.json(user)
}

export const createUser = async ( req: Request, res: Response ) => {

    const { body } = req

    try {

        const emailExist = await User.findOne({
            where: {
                email: body.email
            }
        })
        if (emailExist) {
            return res.status(500).json({
                msg: `Email Already Exists on DB`
            })
        }

        const user = new User(body)
        await user.save()

        res.json(user)

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: `Server Internal Error`
        })
    }
}

export const updateUser = async ( req: Request, res: Response ) => {
    
    const { id } = req.params
    const { body } = req

    try {

        const user = await User.findByPk( id )
        if (!user) {
            return res.status(404).json({
                msg: `User doesnt exist on DB`
            })
        }

        user.update( body )

        res.json(user)

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: `Server Internal Error`
        })
    }
}

export const deleteUser = async ( req: Request, res: Response ) => {

    const { id } = req.params

    const user = await User.findByPk( id )

    if(!user){
        return res.status(404).json({
            msg: `No existe el id ${id}`
        })
    }

    // DELETE FROM DB
    // await user.destroy()

    // INACTIVE
    await user.update({status: 0})

    res.json(user)
}